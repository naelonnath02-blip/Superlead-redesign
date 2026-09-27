import React from 'react';
import { 
  Calendar, 
  Phone, 
  MessageSquare, 
  Layers,
  Building2,
  CalendarCheck
} from 'lucide-react';

export function MobileBottomActionBar({
  activeLead,
  onOpenBookConsultation,
  onQuickCall,
  onQuickWhatsApp,
  onOpenColumnManager
}) {
  if (!activeLead) return null;

  return (
    <div className="sl-mobile-bottom-bar" id="mobile-sticky-action-bar">
      <div className="sl-mobile-bar-meta">
        <span className="sl-mobile-patient-name">{activeLead.patient_name}</span>
        <span className="sl-mobile-patient-stage">{activeLead.city} • {activeLead.stage.replace('_', ' ')}</span>
      </div>

      <div className="sl-mobile-bar-buttons">
        <button 
          className="sl-mobile-icon-btn is-call"
          onClick={() => onQuickCall(activeLead)}
          title="Call via Exotel"
        >
          <Phone size={18} />
        </button>

        <button 
          className="sl-mobile-icon-btn is-wa"
          onClick={() => onQuickWhatsApp(activeLead)}
          title="Send WhatsApp"
        >
          <MessageSquare size={18} />
        </button>

        {/* The Hero Button solving Meera's mobile concern */}
        <button 
          className="sl-mobile-primary-btn"
          onClick={() => onOpenBookConsultation(activeLead)}
          id="mobile-book-consult-btn"
        >
          <Calendar size={18} />
          <span>Book Consultation</span>
        </button>
      </div>
    </div>
  );
}
