import React, { useState } from 'react';
import { 
  Calendar, 
  MessageSquare, 
  Phone, 
  CheckCircle2, 
  Clock, 
  Dna, 
  ArrowUpDown, 
  ExternalLink, 
  Sparkles,
  User,
  Building2,
  CalendarCheck,
  Stethoscope,
  Microscope,
  FileSpreadsheet,
  HeartHandshake,
  MessageSquareText,
  AlertCircle
} from 'lucide-react';
import { PATIENT_STAGES } from '../data/mockLeads';
import { ALL_COLUMNS } from '../data/columnsDefinition';

const STAGE_ICON_MAP = {
  MessageSquareText: MessageSquareText,
  Stethoscope: Stethoscope,
  Microscope: Microscope,
  FileSpreadsheet: FileSpreadsheet,
  Dna: Dna,
  HeartHandshake: HeartHandshake
};

export function LeadTable({
  leads,
  visibleColumnIds,
  onSelectLead,
  onOpenBookConsultation,
  onQuickCall,
  onQuickWhatsApp
}) {
  const [sortField, setSortField] = useState('intent_score');
  const [sortAsc, setSortAsc] = useState(false);

  // Sorting
  const sortedLeads = [...leads].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (typeof aVal === 'string') {
      return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return sortAsc ? (aVal - bVal) : (bVal - aVal);
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  // Render cell content based on column id
  const renderCellContent = (lead, colId) => {
    switch (colId) {
      case 'patient':
        return (
          <div className="sl-cell-patient">
            <div className="sl-patient-avatar">
              {lead.patient_name.charAt(0)}
            </div>
            <div className="sl-patient-meta">
              <div className="sl-patient-title-row">
                <span className="sl-patient-name">{lead.patient_name}</span>
                {lead.migration_clean_status?.includes('Restored') && (
                  <span 
                    className="sl-restored-tag"
                    title={`Restored from Zoho UTF-8 corrupted encoding: ${lead.raw_corrupted_name}`}
                  >
                    UTF-8 Fixed
                  </span>
                )}
              </div>
              <div className="sl-patient-sub-row">
                <span className="sl-patient-id">{lead.id}</span>
                <span className="sl-dot-sep">•</span>
                <span className="sl-patient-age">{lead.age} yrs</span>
                {lead.primary_concern && (
                  <>
                    <span className="sl-dot-sep">•</span>
                    <span className="sl-patient-concern" title={lead.primary_concern}>
                      {lead.primary_concern}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="sl-cell-contact">
            <div className="sl-contact-phone">{lead.phone}</div>
            <div className="sl-contact-actions">
              <button 
                className="sl-contact-icon-btn is-wa"
                title="Open WhatsApp Web chat"
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickWhatsApp(lead);
                }}
              >
                <MessageSquare size={13} />
                <span>WA</span>
              </button>
              <button 
                className="sl-contact-icon-btn is-call"
                title="Initiate Exotel click-to-call"
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickCall(lead);
                }}
              >
                <Phone size={13} />
                <span>Call</span>
              </button>
            </div>
          </div>
        );

      case 'clinic':
        return (
          <div className="sl-cell-clinic">
            <span className="sl-clinic-branch">{lead.clinic_name}</span>
            <span className="sl-clinic-manager">Lead: {lead.clinic_manager}</span>
          </div>
        );

      case 'stage': {
        const stageInfo = PATIENT_STAGES[lead.stage] || PATIENT_STAGES.enquiry;
        const IconComponent = STAGE_ICON_MAP[stageInfo.icon] || MessageSquareText;

        return (
          <div 
            className="sl-stage-badge" 
            style={{ 
              backgroundColor: stageInfo.bgColor, 
              color: stageInfo.color,
              borderColor: stageInfo.borderColor
            }}
          >
            <IconComponent size={14} className="sl-stage-icon" />
            <span className="sl-stage-text">{stageInfo.label}</span>
          </div>
        );
      }

      case 'intent_score': {
        const score = lead.intent_score;
        let scoreClass = 'score-warm';
        if (score >= 90) scoreClass = 'score-urgent';
        else if (score >= 80) scoreClass = 'score-high';

        return (
          <div className="sl-cell-score">
            <div className={`sl-score-pill ${scoreClass}`} title={lead.lead_score_reason}>
              <span className="sl-score-num">{score}</span>
              <span className="sl-score-total">/100</span>
            </div>
            <span className="sl-score-sub">{score >= 90 ? 'Urgent' : score >= 80 ? 'High' : 'Warm'}</span>
          </div>
        );
      }

      case 'actions':
        return (
          <div className="sl-cell-actions" onClick={(e) => e.stopPropagation()}>
            <button 
              className="sl-btn sl-btn-book-action"
              onClick={() => onOpenBookConsultation(lead)}
              title="Schedule consultation for this patient"
            >
              <Calendar size={14} />
              <span>Book Consultation</span>
            </button>
          </div>
        );

      case 'assigned_doctor':
        return (
          <div className="sl-cell-doctor">
            <span className="sl-doctor-name">{lead.assigned_doctor || 'Unassigned'}</span>
            <span className="sl-counsellor-sub">{lead.assigned_counsellor}</span>
          </div>
        );

      case 'next_followup':
        return (
          <div className="sl-cell-followup">
            <span className="sl-followup-time">{lead.next_followup || 'None Scheduled'}</span>
            <span className="sl-followup-mode">{lead.consultation_mode}</span>
          </div>
        );

      case 'lead_source':
        return (
          <div className="sl-cell-source">
            <span className="sl-source-badge">{lead.lead_source}</span>
            <span className="sl-campaign-name">{lead.campaign_name}</span>
          </div>
        );

      case 'his_sync': {
        const isCycleActive = lead.his_sync === 'cycle_active';
        const isSynced = lead.his_sync === 'synced';

        return (
          <div className="sl-cell-his">
            {isCycleActive ? (
              <span className="sl-his-badge is-active" title={`Cycle started on ${lead.his_cycle_start}`}>
                <Dna size={13} />
                <span>IVF Cycle Active</span>
              </span>
            ) : isSynced ? (
              <span className="sl-his-badge is-synced" title="Hospital MRN Linked">
                <CheckCircle2 size={13} />
                <span>HIS Synced</span>
              </span>
            ) : (
              <span className="sl-his-badge is-pending" title="Awaiting registration">
                <Clock size={13} />
                <span>Pending Sync</span>
              </span>
            )}
            {lead.his_patient_id && (
              <span className="sl-his-mrn">{lead.his_patient_id}</span>
            )}
          </div>
        );
      }

      case 'cycle_value':
        return (
          <span className="sl-cell-currency">
            ₹{Number(lead.cycle_value || 0).toLocaleString('en-IN')}
          </span>
        );

      case 'notes_summary':
        return (
          <span className="sl-cell-notes" title={lead.notes_summary}>
            {lead.notes_summary}
          </span>
        );

      default:
        return (
          <span className="sl-cell-default">
            {String(lead[colId] ?? '—')}
          </span>
        );
    }
  };

  if (leads.length === 0) {
    return (
      <div className="sl-table-empty-state">
        <div className="sl-empty-icon-wrap">
          <Stethoscope size={32} />
        </div>
        <h4>No Patient Journeys match your active filters</h4>
        <p>Try resetting filters or adjusting search parameters.</p>
      </div>
    );
  }

  return (
    <div className="sl-table-container">
      <div className="sl-table-scroll-wrapper">
        <table className="sl-leads-table">
          <thead>
            <tr>
              {visibleColumnIds.map((colId) => {
                const colDef = ALL_COLUMNS.find(c => c.id === colId);
                const isSortable = ['patient', 'intent_score', 'created_at', 'cycle_value'].includes(colId);

                return (
                  <th 
                    key={colId} 
                    className={`sl-th sl-th-${colId} ${colDef?.alwaysVisible ? 'is-sticky-col' : ''}`}
                    onClick={() => isSortable && handleSort(colId === 'patient' ? 'patient_name' : colId)}
                    style={{ minWidth: colDef?.width || 150 }}
                  >
                    <div className="sl-th-inner">
                      <span>{colDef?.label || colId}</span>
                      {isSortable && (
                        <ArrowUpDown size={12} className="sl-sort-icon" />
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {sortedLeads.map((lead) => (
              <tr 
                key={lead.id} 
                className="sl-lead-row"
                onClick={() => onSelectLead(lead)}
              >
                {visibleColumnIds.map((colId) => {
                  const colDef = ALL_COLUMNS.find(c => c.id === colId);

                  return (
                    <td 
                      key={colId} 
                      className={`sl-td sl-td-${colId} ${colDef?.alwaysVisible ? 'is-sticky-col' : ''}`}
                    >
                      {renderCellContent(lead, colId)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
