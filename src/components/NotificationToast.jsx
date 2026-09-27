import React from 'react';
import { CheckCircle2, Dna, X, AlertCircle, Info, Calendar } from 'lucide-react';

export function NotificationToast({ toast, onDismiss }) {
  if (!toast) return null;

  return (
    <div className={`sl-toast-banner is-${toast.type || 'info'}`}>
      <div className="sl-toast-icon">
        {toast.type === 'his' && <Dna size={18} />}
        {toast.type === 'success' && <CheckCircle2 size={18} />}
        {toast.type === 'booking' && <Calendar size={18} />}
        {(!toast.type || toast.type === 'info') && <Info size={18} />}
      </div>

      <div className="sl-toast-content">
        <span className="sl-toast-title">{toast.title}</span>
        <p className="sl-toast-message">{toast.message}</p>
      </div>

      <button className="sl-toast-close" onClick={onDismiss}>
        <X size={14} />
      </button>
    </div>
  );
}
