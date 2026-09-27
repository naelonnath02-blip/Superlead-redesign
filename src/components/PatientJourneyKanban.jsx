import React from 'react';
import { 
  MessageSquareText, 
  Stethoscope, 
  Microscope, 
  FileSpreadsheet, 
  Dna, 
  HeartHandshake, 
  Calendar, 
  Building2, 
  Flame, 
  UserCheck,
  ChevronRight
} from 'lucide-react';
import { PATIENT_STAGES } from '../data/mockLeads';

const STAGE_ICON_MAP = {
  MessageSquareText: MessageSquareText,
  Stethoscope: Stethoscope,
  Microscope: Microscope,
  FileSpreadsheet: FileSpreadsheet,
  Dna: Dna,
  HeartHandshake: HeartHandshake
};

export function PatientJourneyKanban({
  leads,
  onSelectLead,
  onOpenBookConsultation
}) {
  return (
    <div className="sl-kanban-board">
      <div className="sl-kanban-columns-row">
        {Object.entries(PATIENT_STAGES).map(([stageKey, stageDef]) => {
          const IconComponent = STAGE_ICON_MAP[stageDef.icon] || MessageSquareText;
          const stageLeads = leads.filter(l => l.stage === stageKey);
          const totalValue = stageLeads.reduce((acc, l) => acc + (l.cycle_value || 0), 0);

          return (
            <div key={stageKey} className="sl-kanban-column">
              {/* Column Header */}
              <div 
                className="sl-kanban-col-head"
                style={{ borderTopColor: stageDef.color }}
              >
                <div className="sl-kanban-head-top">
                  <div className="sl-kanban-title-group">
                    <span 
                      className="sl-kanban-icon-pill" 
                      style={{ backgroundColor: stageDef.bgColor, color: stageDef.color }}
                    >
                      <IconComponent size={14} />
                    </span>
                    <h4>{stageDef.label}</h4>
                  </div>
                  <span className="sl-kanban-count">{stageLeads.length}</span>
                </div>
                <div className="sl-kanban-head-sub">
                  <span>₹{(totalValue / 100000).toFixed(1)}L Est.</span>
                  <span className="sl-kanban-desc">{stageDef.description}</span>
                </div>
              </div>

              {/* Cards List */}
              <div className="sl-kanban-cards-list">
                {stageLeads.map((lead) => {
                  const score = lead.intent_score;
                  const isUrgent = score >= 90;

                  return (
                    <div 
                      key={lead.id} 
                      className="sl-kanban-card"
                      onClick={() => onSelectLead(lead)}
                    >
                      <div className="sl-card-top-row">
                        <span className="sl-card-patient-name">{lead.patient_name}</span>
                        <div className={`sl-card-score-pill ${isUrgent ? 'is-urgent' : ''}`}>
                          <Flame size={12} />
                          <span>{score}</span>
                        </div>
                      </div>

                      <div className="sl-card-demographics">
                        <span>{lead.age}y</span>
                        <span>•</span>
                        <span>{lead.city}</span>
                        <span>•</span>
                        <span className="sl-card-concern">{lead.primary_concern}</span>
                      </div>

                      <div className="sl-card-doctor-row">
                        <UserCheck size={12} className="sl-card-doc-icon" />
                        <span>{lead.assigned_doctor || 'Doctor Pending'}</span>
                      </div>

                      {lead.next_followup && (
                        <div className="sl-card-slot-row">
                          <span className="sl-slot-label">Slot:</span>
                          <span className="sl-slot-val">{lead.next_followup}</span>
                        </div>
                      )}

                      {/* Card Footer with 1-Click Consultation CTA */}
                      <div className="sl-card-footer" onClick={(e) => e.stopPropagation()}>
                        <span className="sl-card-mrn">{lead.id}</span>
                        <button 
                          className="sl-card-book-btn"
                          onClick={() => onOpenBookConsultation(lead)}
                          title="Schedule consultation"
                        >
                          <Calendar size={13} />
                          <span>Book Consult</span>
                        </button>
                      </div>
                    </div>
                  );
                })}

                {stageLeads.length === 0 && (
                  <div className="sl-kanban-empty-col">
                    <span>No patients in this stage</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
