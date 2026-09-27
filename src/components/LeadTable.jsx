import React, { useState } from 'react';
import { 
  Calendar, 
  MessageSquare, 
  Phone, 
  Mail,
  Building2,
  MoreHorizontal,
  CheckCircle2, 
  Clock, 
  Dna, 
  ArrowUpDown, 
  ExternalLink, 
  Sparkles,
  User,
  Stethoscope,
  Microscope,
  FileSpreadsheet,
  HeartHandshake,
  MessageSquareText,
  Share2,
  Tag,
  Check
} from 'lucide-react';
import { PATIENT_STAGES } from '../data/mockLeads';
import { ALL_COLUMNS } from '../data/columnsDefinition';

export function LeadTable({
  leads,
  visibleColumnIds,
  onSelectLead,
  onOpenBookConsultation,
  onQuickCall,
  onQuickWhatsApp
}) {
  const [sortField, setSortField] = useState(null);
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedLeadIds, setSelectedLeadIds] = useState(new Set());
  const [activeMenuLeadId, setActiveMenuLeadId] = useState(null);

  // Sorting: when sortField is null, preserves exact Image 1 order
  const sortedLeads = React.useMemo(() => {
    if (!sortField) return leads;
    return [...leads].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (typeof aVal === 'string') {
        return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortAsc ? (aVal - bVal) : (bVal - aVal);
    });
  }, [leads, sortField, sortAsc]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedLeadIds.size === leads.length) {
      setSelectedLeadIds(new Set());
    } else {
      setSelectedLeadIds(new Set(leads.map(l => l.id)));
    }
  };

  const toggleSelectOne = (leadId, e) => {
    e.stopPropagation();
    const next = new Set(selectedLeadIds);
    if (next.has(leadId)) {
      next.delete(leadId);
    } else {
      next.add(leadId);
    }
    setSelectedLeadIds(next);
  };

  // Render Channel Tag matching Image 1
  const renderChannelTag = (lead) => {
    const src = lead.lead_source || 'Website';
    let icon = null;
    let badgeClass = 'sl-tag-blue';

    if (src.includes('Email')) {
      icon = <Mail size={12} />;
      badgeClass = 'sl-tag-email';
    } else if (src.includes('Affiliate')) {
      icon = <Share2 size={12} />;
      badgeClass = 'sl-tag-affiliate';
    } else if (src.includes('Facebook') || src.includes('Meta')) {
      icon = <span className="sl-tag-fb-icon">f</span>;
      badgeClass = 'sl-tag-facebook';
    } else if (src.includes('WhatsApp')) {
      icon = <MessageSquare size={12} />;
      badgeClass = 'sl-tag-whatsapp';
    } else if (src.includes('Content') || src.includes('Blog')) {
      icon = <Tag size={12} />;
      badgeClass = 'sl-tag-content';
    } else if (src.includes('Doctor') || src.includes('Referral')) {
      icon = <Stethoscope size={12} />;
      badgeClass = 'sl-tag-referral';
    } else {
      icon = <Tag size={12} />;
      badgeClass = 'sl-tag-default';
    }

    return (
      <span className={`sl-channel-pill ${badgeClass}`}>
        {icon}
        <span>{src}</span>
      </span>
    );
  };

  // Render Stage Pill matching Image 1
  const renderStagePill = (stageId) => {
    const stageInfo = PATIENT_STAGES[stageId] || PATIENT_STAGES.enquiry;
    
    // Map stage labels to clean Superleap tag styling
    let pillClass = 'sl-stage-blue';
    if (stageId === 'first_consultation') pillClass = 'sl-stage-amber';
    if (stageId === 'diagnostics') pillClass = 'sl-stage-purple';
    if (stageId === 'treatment_plan') pillClass = 'sl-stage-indigo';
    if (stageId === 'ivf_cycle') pillClass = 'sl-stage-teal';
    if (stageId === 'converted') pillClass = 'sl-stage-emerald';

    return (
      <span className={`sl-stage-pill ${pillClass}`}>
        {stageInfo.label}
      </span>
    );
  };

  // Render cell content based on column id
  const renderCellContent = (lead, colId) => {
    switch (colId) {
      case 'patient':
        return (
          <div className="sl-cell-lead-name-group">
            <span className="sl-lead-full-name">{lead.patient_name}</span>
            
            {/* Quick Action Three-dots button right next to name (Image 1) */}
            <div className="sl-lead-more-btn-wrap" onClick={(e) => e.stopPropagation()}>
              <button 
                type="button"
                className="sl-lead-dots-btn"
                onClick={() => setActiveMenuLeadId(activeMenuLeadId === lead.id ? null : lead.id)}
                title="Quick Actions"
              >
                <MoreHorizontal size={13} />
              </button>

              {activeMenuLeadId === lead.id && (
                <div className="sl-lead-row-popover">
                  <button 
                    type="button" 
                    className="sl-row-popover-item"
                    onClick={() => {
                      onSelectLead(lead);
                      setActiveMenuLeadId(null);
                    }}
                  >
                    <span>Open Lead Record</span>
                  </button>
                  <button 
                    type="button" 
                    className="sl-row-popover-item is-primary"
                    onClick={() => {
                      onOpenBookConsultation(lead);
                      setActiveMenuLeadId(null);
                    }}
                  >
                    <span>Book Consultation</span>
                  </button>
                  <button 
                    type="button" 
                    className="sl-row-popover-item"
                    onClick={() => {
                      onQuickWhatsApp(lead);
                      setActiveMenuLeadId(null);
                    }}
                  >
                    <span>WhatsApp Message</span>
                  </button>
                  <button 
                    type="button" 
                    className="sl-row-popover-item"
                    onClick={() => {
                      onQuickCall(lead);
                      setActiveMenuLeadId(null);
                    }}
                  >
                    <span>Exotel CTI Call</span>
                  </button>
                </div>
              )}
            </div>

            {lead.migration_clean_status?.includes('Restored') && (
              <span className="sl-tag-utf8" title="Restored corrupted encoding from Zoho">UTF-8</span>
            )}
          </div>
        );

      case 'phone':
        return (
          <div className="sl-cell-phone">
            <Phone size={13} className="sl-cell-icon-phone" />
            <span 
              className="sl-phone-text"
              onClick={(e) => {
                e.stopPropagation();
                onQuickCall(lead);
              }}
              title="Click to initiate Exotel call"
            >
              {lead.phone}
            </span>
          </div>
        );

      case 'email':
        return (
          <div className="sl-cell-email">
            <Mail size={13} className="sl-cell-icon-mail" />
            <a 
              href={`mailto:${lead.email || `${lead.patient_name.toLowerCase().replace(/[^a-z]/g, '')}@gmail.com`}`}
              className="sl-email-link"
              onClick={(e) => e.stopPropagation()}
              title="Send email"
            >
              {lead.email || `${lead.patient_name.toLowerCase().replace(/[^a-z]/g, '')}@gmail.com`}
            </a>
          </div>
        );

      case 'city':
        return (
          <div className="sl-cell-city">
            <Building2 size={13} className="sl-cell-icon-city" />
            <span className="sl-city-text">{lead.city}</span>
          </div>
        );

      case 'lead_source':
        return renderChannelTag(lead);

      case 'stage':
        return renderStagePill(lead.stage);

      case 'actions':
        return (
          <div className="sl-cell-actions-row">
            {/* Requirement 3: Book Consultation Button prominently on the respective page */}
            <button 
              type="button"
              className="sl-btn-book-consult-table"
              onClick={(e) => {
                e.stopPropagation();
                onOpenBookConsultation(lead);
              }}
              title={`Schedule consultation for ${lead.patient_name}`}
            >
              <Stethoscope size={13} />
              <span>Book Consultation</span>
            </button>
          </div>
        );

      case 'intent_score':
        return (
          <div className="sl-cell-score">
            <span className={`sl-score-chip ${lead.intent_score >= 90 ? 'is-hot' : 'is-warm'}`}>
              <Sparkles size={11} />
              <span>{lead.intent_score}%</span>
            </span>
          </div>
        );

      case 'clinic':
        return (
          <div className="sl-cell-clinic">
            <span className="sl-clinic-branch">{lead.clinic_name}</span>
          </div>
        );

      case 'contact':
        return (
          <div className="sl-cell-contact">
            <span className="sl-contact-phone">{lead.phone}</span>
          </div>
        );

      case 'assigned_doctor':
        return (
          <div className="sl-cell-doctor">
            <span>{lead.assigned_doctor || 'Dr. Kavitha Menon'}</span>
          </div>
        );

      case 'next_followup':
        return (
          <div className="sl-cell-followup">
            <span>{lead.next_followup || 'None Scheduled'}</span>
          </div>
        );

      case 'his_sync': {
        const isCycleActive = lead.his_sync === 'cycle_active';
        return (
          <div className="sl-cell-his">
            {isCycleActive ? (
              <span className="sl-his-badge is-active">
                <Dna size={12} />
                <span>Cycle Active</span>
              </span>
            ) : (
              <span className="sl-his-badge is-synced">
                <CheckCircle2 size={12} />
                <span>Synced</span>
              </span>
            )}
          </div>
        );
      }

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
    <div className="sl-table-viewport">
      <div className="sl-table-scroll-container">
        <table className="sl-authentic-table">
          <thead>
            <tr>
              {/* Checkbox Column */}
              <th className="sl-th-checkbox">
                <input 
                  type="checkbox"
                  checked={selectedLeadIds.size === leads.length && leads.length > 0}
                  onChange={toggleSelectAll}
                  className="sl-row-checkbox"
                />
              </th>

              {/* Dynamic Columns */}
              {visibleColumnIds.map((colId) => {
                const colDef = ALL_COLUMNS.find(c => c.id === colId);
                const isSortable = ['patient', 'intent_score', 'city', 'stage'].includes(colId);

                return (
                  <th 
                    key={colId} 
                    className={`sl-th sl-th-${colId} ${colDef?.alwaysVisible ? 'is-sticky-col' : ''}`}
                    onClick={() => isSortable && handleSort(colId === 'patient' ? 'patient_name' : colId)}
                    style={{ minWidth: colDef?.width || 150 }}
                  >
                    <div className="sl-th-content">
                      {colId === 'phone' && <Phone size={12} className="sl-th-icon" />}
                      {colId === 'email' && <Mail size={12} className="sl-th-icon" />}
                      {colId === 'city' && <Building2 size={12} className="sl-th-icon" />}
                      <span>{colDef?.label || colId.toUpperCase()}</span>
                      {isSortable && (
                        <ArrowUpDown size={11} className="sl-sort-indicator" />
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {sortedLeads.map((lead) => {
              const isSelected = selectedLeadIds.has(lead.id);

              return (
                <tr 
                  key={lead.id} 
                  className={`sl-table-row ${isSelected ? 'is-row-selected' : ''}`}
                  onClick={() => onSelectLead(lead)}
                >
                  {/* Checkbox Cell */}
                  <td className="sl-td-checkbox" onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => toggleSelectOne(lead.id, e)}
                      className="sl-row-checkbox"
                    />
                  </td>

                  {/* Render Visible Column Cells */}
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
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Clean Superleap Table Footer */}
      <div className="sl-table-footer-bar">
        <span className="sl-footer-stats">
          {selectedLeadIds.size > 0 ? (
            <span><strong>{selectedLeadIds.size}</strong> leads selected</span>
          ) : (
            <span>Showing 1 to {sortedLeads.length} of {leads.length} records</span>
          )}
        </span>
        <div className="sl-footer-pagination">
          <span className="sl-page-info">Page 1 of 1</span>
        </div>
      </div>
    </div>
  );
}
