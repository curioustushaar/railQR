import React, { useState, useEffect } from 'react';

// Notification Component
export const Notification = ({ message, type = 'info', duration = 5000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  };

  return (
    <div className={`notification notification-${type}`}>
      <span style={{ marginRight: '8px' }}>{getIcon()}</span>
      {message}
    </div>
  );
};

// Enhanced Button Component
export const EnhancedButton = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  loading = false,
  icon,
  onClick,
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'btn-enhanced';
  const variantClasses = {
    primary: 'btn-primary-enhanced',
    secondary: 'btn-secondary-enhanced'
  };

  const sizeStyles = {
    small: { padding: '12px 24px', fontSize: '0.9rem' },
    medium: { padding: '16px 32px', fontSize: '1rem' },
    large: { padding: '20px 40px', fontSize: '1.2rem' }
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      style={{
        ...sizeStyles[size],
        opacity: disabled || loading ? 0.7 : 1,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        ...props.style
      }}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <div className="loading-spinner" />}
      {!loading && icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

// Enhanced Card Component
export const EnhancedCard = ({ children, onClick, className = '', ...props }) => {
  return (
    <div
      className={`card-enhanced glass-effect ${className}`}
      onClick={onClick}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        ...props.style
      }}
      {...props}
    >
      {children}
    </div>
  );
};

// Enhanced Input Component
export const EnhancedInput = ({ 
  label, 
  error, 
  icon, 
  className = '',
  ...props 
}) => {
  return (
    <div className={`form-group-enhanced ${className}`}>
      {label && (
        <label style={{
          display: 'block',
          marginBottom: '8px',
          fontWeight: '600',
          color: '#87CEEB'
        }}>
          {label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {icon && (
          <span style={{
            position: 'absolute',
            left: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '1.1rem'
          }}>
            {icon}
          </span>
        )}
        <input
          className="form-input-enhanced"
          style={{
            paddingLeft: icon ? '45px' : '20px',
            borderColor: error ? '#dc3545' : 'rgba(255, 255, 255, 0.2)'
          }}
          {...props}
        />
      </div>
      {error && (
        <span style={{
          display: 'block',
          marginTop: '5px',
          color: '#ff6b6b',
          fontSize: '0.9rem'
        }}>
          {error}
        </span>
      )}
    </div>
  );
};

// Loading Overlay Component
export const LoadingOverlay = ({ message = 'Loading...', show = false }) => {
  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      color: 'white'
    }}>
      <div className="loading-spinner" style={{
        width: '50px',
        height: '50px',
        border: '5px solid rgba(255, 255, 255, 0.3)',
        borderTop: '5px solid #007bff'
      }} />
      <p style={{ marginTop: '20px', fontSize: '1.2rem' }}>{message}</p>
    </div>
  );
};

// Animated Counter Component
export const AnimatedCounter = ({ from = 0, to, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    const increment = (to - from) / (duration / 16);
    const timer = setInterval(() => {
      setCount(prev => {
        const next = prev + increment;
        if (next >= to) {
          clearInterval(timer);
          return to;
        }
        return next;
      });
    }, 16);

    return () => clearInterval(timer);
  }, [from, to, duration]);

  return (
    <span className="text-gradient">
      {Math.floor(count)}{suffix}
    </span>
  );
};

// Notification Provider Hook
export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info', duration = 5000) => {
    const id = Date.now();
    const notification = { id, message, type, duration };
    
    setNotifications(prev => [...prev, notification]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const NotificationContainer = () => (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );

  return {
    addNotification,
    NotificationContainer,
    success: (message, duration) => addNotification(message, 'success', duration),
    error: (message, duration) => addNotification(message, 'error', duration),
    warning: (message, duration) => addNotification(message, 'warning', duration),
    info: (message, duration) => addNotification(message, 'info', duration)
  };
};

// Parallax Component
export const Parallax = ({ children, offset = 0.5, ...props }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        transform: `translateY(${scrollY * offset}px)`,
        ...props.style
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default {
  Notification,
  EnhancedButton,
  EnhancedCard,
  EnhancedInput,
  LoadingOverlay,
  AnimatedCounter,
  useNotification,
  Parallax
};