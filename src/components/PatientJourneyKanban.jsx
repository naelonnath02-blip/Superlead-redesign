import React from 'react';
import { 
  MessageSquareText, 
  Stethoscope, 
  Microscope, 
  FileSpreadsheet, 
  Dna, 
  HeartHandshake, 
  Flame
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
                          {isUrgent && <Flame size={11} />}
                          <span>{score}%</span>
                        </div>
                      </div>

                      <p className="sl-card-concern">{lead.primary_concern}</p>

                      <div className="sl-card-meta-row">
                        <span className="sl-card-clinic">{lead.clinic_name || lead.city}</span>
                        {lead.assigned_doctor && (
                          <span className="sl-card-doctor">{lead.assigned_doctor}</span>
                        )}
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
