const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

// In-memory storage for demo (replace with database in production)
let componentsDB = {};

// Get all components for a user
router.get('/', auth, (req, res) => {
  try {
    const userEmail = req.user.email;
    const userComponents = componentsDB[userEmail] || [];
    
    res.json({
      success: true,
      components: userComponents,
      count: userComponents.length
    });
  } catch (error) {
    console.error('Get components error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new component
router.post('/', auth, (req, res) => {
  try {
    const userEmail = req.user.email;
    const componentData = req.body;
    
    // Initialize user components array if doesn't exist
    if (!componentsDB[userEmail]) {
      componentsDB[userEmail] = [];
    }
    
    // Check for duplicate batch ID
    const existingComponent = componentsDB[userEmail].find(
      comp => comp.batchId.toLowerCase() === componentData.batchId.toLowerCase()
    );
    
    if (existingComponent) {
      return res.status(400).json({ 
        message: 'Component with this Batch ID already exists' 
      });
    }
    
    // Create new component
    const newComponent = {
      id: Date.now(),
      ...componentData,
      status: 'Active',
      inspectionHistory: [],
      addedBy: userEmail,
      addedDate: new Date().toISOString().split('T')[0],
      createdAt: new Date()
    };
    
    // Add to user's components
    componentsDB[userEmail].push(newComponent);
    
    console.log(`Component added for user ${userEmail}:`, newComponent.batchId);
    
    res.status(201).json({
      success: true,
      message: 'Component added successfully',
      component: newComponent,
      totalComponents: componentsDB[userEmail].length
    });
  } catch (error) {
    console.error('Add component error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get component by Batch ID
router.get('/search/:batchId', auth, (req, res) => {
  try {
    const userEmail = req.user.email;
    const { batchId } = req.params;
    
    const userComponents = componentsDB[userEmail] || [];
    const component = userComponents.find(
      comp => comp.batchId.toLowerCase() === batchId.toLowerCase()
    );
    
    if (!component) {
      return res.status(404).json({ 
        message: 'Component not found with this Batch ID' 
      });
    }
    
    res.json({
      success: true,
      component: component
    });
  } catch (error) {
    console.error('Search component error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update component
router.put('/:id', auth, (req, res) => {
  try {
    const userEmail = req.user.email;
    const { id } = req.params;
    const updateData = req.body;
    
    const userComponents = componentsDB[userEmail] || [];
    const componentIndex = userComponents.findIndex(comp => comp.id == id);
    
    if (componentIndex === -1) {
      return res.status(404).json({ message: 'Component not found' });
    }
    
    // Update component
    componentsDB[userEmail][componentIndex] = {
      ...userComponents[componentIndex],
      ...updateData,
      updatedAt: new Date()
    };
    
    res.json({
      success: true,
      message: 'Component updated successfully',
      component: componentsDB[userEmail][componentIndex]
    });
  } catch (error) {
    console.error('Update component error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete component
router.delete('/:id', auth, (req, res) => {
  try {
    const userEmail = req.user.email;
    const { id } = req.params;
    
    if (!componentsDB[userEmail]) {
      return res.status(404).json({ message: 'Component not found' });
    }
    
    const initialLength = componentsDB[userEmail].length;
    componentsDB[userEmail] = componentsDB[userEmail].filter(comp => comp.id != id);
    
    if (componentsDB[userEmail].length === initialLength) {
      return res.status(404).json({ message: 'Component not found' });
    }
    
    res.json({
      success: true,
      message: 'Component deleted successfully',
      totalComponents: componentsDB[userEmail].length
    });
  } catch (error) {
    console.error('Delete component error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get database status (for debugging)
router.get('/admin/status', auth, (req, res) => {
  try {
    const status = {};
    for (const email in componentsDB) {
      status[email] = componentsDB[email].length;
    }
    
    res.json({
      success: true,
      totalUsers: Object.keys(componentsDB).length,
      componentsByUser: status,
      totalComponents: Object.values(componentsDB).reduce((sum, components) => sum + components.length, 0)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all components from all users (Admin only)
router.get('/admin/all', auth, (req, res) => {
  try {
    // Check if user is admin (you might want to add proper role checking)
    if (req.user.role !== 'admin' && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
    
    const allComponents = [];
    
    // Flatten all components from all users
    for (const userEmail in componentsDB) {
      const userComponents = componentsDB[userEmail];
      userComponents.forEach(component => {
        allComponents.push({
          ...component,
          addedBy: userEmail,
          vendor: component.supplier || 'Unknown'
        });
      });
    }
    
    // Sort by creation date (newest first)
    allComponents.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.json({
      success: true,
      components: allComponents,
      totalComponents: allComponents.length,
      totalUsers: Object.keys(componentsDB).length
    });
  } catch (error) {
    console.error('Get all components error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;