import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
      <p>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Thử lại
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;