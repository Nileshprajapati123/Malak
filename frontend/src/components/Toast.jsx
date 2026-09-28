import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-item">
          {toast.type === 'error' ? (
            <AlertCircle size={20} color="#ff6b6b" />
          ) : toast.type === 'info' ? (
            <Info size={20} color="#60a5fa" />
          ) : (
            <CheckCircle2 size={20} color="#d4af37" />
          )}
          <span style={{ flex: 1 }}>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            style={{ color: '#9aa0a6', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            aria-label="Close Notification"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
