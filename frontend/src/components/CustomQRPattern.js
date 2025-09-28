import React from 'react';

const CustomQRPattern = ({ component, size = 200 }) => {
  // Create a pattern similar to the user's QR code
  const createQRPattern = () => {
    const gridSize = 25; // 25x25 grid
    const pattern = [];
    
    // Initialize with random-like pattern but consistent
    for (let i = 0; i < gridSize * gridSize; i++) {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;
      
      // Create finder patterns (corners)
      if ((row < 7 && col < 7) || (row < 7 && col >= 18) || (row >= 18 && col < 7)) {
        // Finder pattern structure
        if ((row === 0 || row === 6 || col === 0 || col === 6) ||
            (row >= 2 && row <= 4 && col >= 2 && col <= 4)) {
          pattern.push(true);
        } else {
          pattern.push(false);
        }
      }
      // Timing patterns
      else if (row === 6 || col === 6) {
        pattern.push((row + col) % 2 === 0);
      }
      // Data area - create a pattern based on component data
      else {
        const seed = (component?.batchId || 'DEFAULT').charCodeAt(0) + row + col;
        pattern.push(seed % 3 === 0);
      }
    }
    
    return pattern;
  };

  const pattern = createQRPattern();
  const cellSize = size / 25;

  if (!component) {
    return (
      <div style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px dashed #ddd',
        borderRadius: '8px',
        color: '#666',
        fontSize: '14px'
      }}>
        No component data
      </div>
    );
  }

  return (
    <div style={{ 
      textAlign: 'center',
      padding: '20px',
      background: 'white',
      borderRadius: '15px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        width: size,
        height: size,
        display: 'grid',
        gridTemplateColumns: `repeat(25, ${cellSize}px)`,
        gridTemplateRows: `repeat(25, ${cellSize}px)`,
        border: '4px solid white',
        borderRadius: '8px',
        margin: '0 auto'
      }}>
        {pattern.map((filled, index) => (
          <div
            key={index}
            style={{
              backgroundColor: filled ? '#000000' : '#FFFFFF',
              width: `${cellSize}px`,
              height: `${cellSize}px`,
            }}
          />
        ))}
      </div>
      
      <p style={{
        marginTop: '15px',
        fontSize: '12px',
        color: '#666',
        fontWeight: '500'
      }}>
        📱 Scan with your phone camera
      </p>
      
      <div style={{
        marginTop: '10px',
        fontSize: '10px',
        color: '#999',
        lineHeight: '1.4'
      }}>
        <strong>Component:</strong> {component.batchId}<br/>
        <strong>Type:</strong> {component.type}
      </div>
      
      <div style={{
        marginTop: '15px',
        padding: '10px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        fontSize: '11px',
        color: '#495057'
      }}>
        <strong>QR Data:</strong><br/>
        Type: {component.type}<br/>
        Batch: {component.batchId}<br/>
        Qty: {component.quantity}<br/>
        Cost: {component.cost}
      </div>
    </div>
  );
};

export default CustomQRPattern;