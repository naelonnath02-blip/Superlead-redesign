import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Phone, 
  Mail, 
  Building2, 
  Languages, 
  Home, 
  Filter, 
  RotateCw, 
  ChevronDown, 
  ChevronRight, 
  ExternalLink, 
  Stethoscope, 
  MessageSquare, 
  Send, 
  Sparkles,
  CheckCircle2,
  Clock,
  Dna,
  Share2,
  Globe
} from 'lucide-react';
import { PATIENT_STAGES } from '../data/mockLeads';

export function LeadDetailDrawer({
  lead,
  onClose,
  onOpenBookConsultation,
  onQuickWhatsApp,
  onQuickCall,
  onAdvanceStage
}) {
  const [activeTab, setActiveTab] = useState('activities'); // 'activities' | 'tasks' | 'opportunities' | 'automations'
  const [opportunitiesOpen, setOpportunitiesOpen] = useState(true);
  const [emailDetailsOpen, setEmailDetailsOpen] = useState(true);
  const [leadDetailsOpen, setLeadDetailsOpen] = useState(true);

  if (!lead) return null;

  return (
    <div className="sl-record-drawer-backdrop" onClick={onClose}>
      <div className="sl-record-drawer-container" onClick={(e) => e.stopPropagation()}>
        {/* 1. Header Bar (Matching Image 2: ✕ Lead Record) */}
        <div className="sl-record-top-header">
          <button 
            type="button" 
            className="sl-record-close-btn"
            onClick={onClose}
            title="Close Lead Record"
          >
            <X size={16} />
          </button>
          <div className="sl-record-title-wrap">
            <FileText size={15} className="sl-record-file-icon" />
            <span className="sl-record-header-title">Lead Record</span>
          </div>
        </div>

        {/* 2. Patient Identity Bar (Name Only) */}
        <div className="sl-record-identity-bar">
          <div className="sl-record-identity-main">
            <div className="sl-record-avatar">
              {lead.patient_name.charAt(0)}
            </div>
            <div className="sl-record-name-group">
              <h2 className="sl-record-patient-name">{lead.patient_name}</h2>
            </div>
          </div>

          {/* Quick Primary Action */}
          <div className="sl-record-identity-action">
            <button 
              type="button" 
              className="sl-btn-record-book"
              onClick={() => onOpenBookConsultation(lead)}
            >
              <Stethoscope size={14} />
              <span>Book Consultation</span>
            </button>
          </div>
        </div>

        {/* 3. Record Tabs (Matching Image 2) */}
        <div className="sl-record-tabs-bar">
          <div className="sl-record-tabs-left">
            <button 
              type="button" 
              className={`sl-record-tab-btn ${activeTab === 'activities' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('activities')}
            >
              <span>⚡ Activities</span>
            </button>

            <button 
              type="button" 
              className={`sl-record-tab-btn ${activeTab === 'tasks' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('tasks')}
            >
              <span>📋 Tasks</span>
            </button>

            <button 
              type="button" 
              className={`sl-record-tab-btn ${activeTab === 'opportunities' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('opportunities')}
            >
              <span>💼 Opportunity Details</span>
            </button>

            <button 
              type="button" 
              className={`sl-record-tab-btn ${activeTab === 'automations' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('automations')}
            >
              <span>⚙️ Automation Runs</span>
            </button>
          </div>

          <div className="sl-record-tabs-right">
            <button type="button" className="sl-tab-tool-btn" title="Filter activities">
              <Filter size={13} />
              <span>Filter</span>
            </button>
            <button type="button" className="sl-tab-tool-btn is-icon" title="Refresh activities">
              <RotateCw size={13} />
            </button>
          </div>
        </div>

        {/* 4. Split Two-Column Body (Matching Image 2) */}
        <div className="sl-record-split-body">
          {/* Left Column: Activities Timeline */}
          <div className="sl-record-timeline-col">
            <div className="sl-timeline-section-header">
              <h3>Activities</h3>
              <span className="sl-timeline-day-pill">Today</span>
            </div>

            <div className="sl-activities-feed">
              {/* Event 1: Email Sent (Matching Image 2) */}
              <div className="sl-activity-card-group">
                <div className="sl-activity-time-stamp">
                  <span className="sl-time-text">4:30 PM</span>
                  <div className="sl-event-icon-circle is-email">
                    <Mail size={13} />
                  </div>
                </div>

                <div className="sl-activity-event-card">
                  <div 
                    className="sl-event-header-row"
                    onClick={() => setEmailDetailsOpen(!emailDetailsOpen)}
                  >
                    <ChevronDown size={14} className={`sl-chevron-rot ${emailDetailsOpen ? 'is-open' : ''}`} />
                    <div className="sl-event-header-title">
                      <strong>Email</strong> Sent — Subject: Welcome to Nova Fertility! 🎉 — by Anshula K
                    </div>
                  </div>

                  {emailDetailsOpen && (
                    <div className="sl-event-details-box">
                      <div className="sl-box-caption">EMAIL DETAILS</div>
                      
                      <div className="sl-detail-field-row">
                        <span className="sl-field-name">
                          <FileText size={12} />
                          <span>Subject</span>
                        </span>
                        <span className="sl-field-val">Welcome to Nova Fertility! Personalized Care Protocol Inside 🎉</span>
                      </div>

                      <div className="sl-detail-field-row">
                        <span className="sl-field-name">
                          <span>From</span>
                        </span>
                        <span className="sl-field-val">communications@novafertility.com</span>
                      </div>

                      <div className="sl-detail-field-row">
                        <span className="sl-field-name">
                          <span>To</span>
                        </span>
                        <span className="sl-field-val">{lead.email || 'nikhil@gmail.com'}</span>
                      </div>

                      <div className="sl-detail-field-row">
                        <span className="sl-field-name">
                          <span>Content</span>
                        </span>
                        <button 
                          type="button" 
                          className="sl-btn-click-view"
                          onClick={() => alert(`Email Body:\n\nDear ${lead.patient_name},\n\nThank you for choosing Nova Fertility. Your care protocol has been assigned to Dr. Kavitha Menon at our ${lead.clinic_name} center.\n\nPlease confirm your consultation slot.`)}
                        >
                          Click to view
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Event 2: Create Lead Filled (Matching Image 2) */}
              <div className="sl-activity-card-group">
                <div className="sl-activity-time-stamp">
                  <span className="sl-time-text">3:45 PM</span>
                  <div className="sl-event-icon-circle is-lead">
                    <FileText size={13} />
                  </div>
                </div>

                <div className="sl-activity-event-card">
                  <div 
                    className="sl-event-header-row"
                    onClick={() => setLeadDetailsOpen(!leadDetailsOpen)}
                  >
                    <ChevronDown size={14} className={`sl-chevron-rot ${leadDetailsOpen ? 'is-open' : ''}`} />
                    <div className="sl-event-header-title">
                      <strong>Create Lead</strong> Filled — by Anshula K
                    </div>
                  </div>

                  {leadDetailsOpen && (
                    <div className="sl-event-details-box">
                      <div className="sl-box-caption">LEAD</div>

                      <div className="sl-detail-field-row">
                        <span className="sl-field-name">
                          <Building2 size={12} />
                          <span>City</span>
                        </span>
                        <span className="sl-field-val">{lead.city}</span>
                      </div>

                      <div className="sl-detail-field-row">
                        <span className="sl-field-name">
                          <span>Name</span>
                        </span>
                        <span className="sl-field-val">{lead.patient_name}</span>
                      </div>

                      <div className="sl-detail-field-row">
                        <span className="sl-field-name">
                          <span>Concern</span>
                        </span>
                        <span className="sl-field-val">{lead.primary_concern || 'Primary Infertility Evaluation'}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Event 3: HIS Reverse-Sync Event */}
              {lead.his_sync === 'cycle_active' && (
                <div className="sl-activity-card-group">
                  <div className="sl-activity-time-stamp">
                    <span className="sl-time-text">2:15 PM</span>
                    <div className="sl-event-icon-circle is-his">
                      <Dna size={13} />
                    </div>
                  </div>

                  <div className="sl-activity-event-card">
                    <div className="sl-event-header-row">
                      <ChevronDown size={14} className="sl-chevron-rot is-open" />
                      <div className="sl-event-header-title">
                        <strong>HIS EHR Live Sync</strong> — Cycle Start Stimulation Day 1 Triggered
                      </div>
                    </div>
                    <div className="sl-event-details-box">
                      <div className="sl-box-caption">HOSPITAL CORE REVERSE-SYNC</div>
                      <div className="sl-detail-field-row">
                        <span className="sl-field-name">Hospital MRN</span>
                        <span className="sl-field-val">{lead.his_patient_id || 'NOV-HIS-77401'}</span>
                      </div>
                      <div className="sl-detail-field-row">
                        <span className="sl-field-name">Protocol</span>
                        <span className="sl-field-val">Ovarian Stimulation Started</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Properties & Opportunities (Matching Image 2) */}
          <div className="sl-record-props-col">
            <div className="sl-props-card">
              {/* Field: Name */}
              <div className="sl-prop-row">
                <span className="sl-prop-label">
                  <span className="sl-prop-icon">Abc</span>
                  <span>Name</span>
                </span>
                <span className="sl-prop-value">{lead.patient_name}</span>
              </div>

              {/* Field: Phone No */}
              <div className="sl-prop-row">
                <span className="sl-prop-label">
                  <Phone size={13} className="sl-prop-icon" />
                  <span>Phone No</span>
                </span>
                <span className="sl-prop-value sl-link-val" onClick={() => onQuickCall(lead)}>
                  {lead.phone}
                </span>
              </div>

              {/* Field: Email */}
              <div className="sl-prop-row">
                <span className="sl-prop-label">
                  <Mail size={13} className="sl-prop-icon" />
                  <span>Email</span>
                </span>
                <span className="sl-prop-value sl-link-val">
                  {lead.email || 'nikhil.j@gmail.com'}
                </span>
              </div>

              {/* Field: City */}
              <div className="sl-prop-row">
                <span className="sl-prop-label">
                  <Building2 size={13} className="sl-prop-icon" />
                  <span>City</span>
                </span>
                <span className="sl-prop-value">{lead.city}</span>
              </div>

              {/* Field: State */}
              <div className="sl-prop-row">
                <span className="sl-prop-label">
                  <span>State</span>
                </span>
                <span className="sl-prop-value">Maharashtra / Karnataka</span>
              </div>

              {/* Field: Channel */}
              <div className="sl-prop-row">
                <span className="sl-prop-label">
                  <span>Channel</span>
                </span>
                <span className="sl-prop-channel-badge">
                  <Globe size={12} className="sl-prop-channel-icon" />
                  <span>{lead.lead_source || 'Website In-Clinic Booking'}</span>
                </span>
              </div>

              {/* Collapsible Section: Opportunities (Matching Image 2) */}
              <div className="sl-prop-collapsible-section">
                <div 
                  className="sl-collapsible-header"
                  onClick={() => setOpportunitiesOpen(!opportunitiesOpen)}
                >
                  <ChevronDown size={14} className={`sl-chevron-rot ${opportunitiesOpen ? 'is-open' : ''}`} />
                  <span className="sl-collapsible-title">Opportunities</span>
                </div>

                {opportunitiesOpen && (
                  <div className="sl-collapsible-body">
                    <div className="sl-sub-prop-row">
                      <span className="sl-sub-prop-label">Opportunity Link</span>
                      <button 
                        type="button" 
                        className="sl-sub-prop-link"
                        onClick={() => alert(`Opportunity Details for ${lead.patient_name}\nTarget Clinic: ${lead.clinic_name}\nAssigned Specialist: ${lead.assigned_doctor || 'Dr. Kavitha Menon'}`)}
                      >
                        Click to view
                      </button>
                    </div>

                    <div className="sl-sub-prop-row">
                      <span className="sl-sub-prop-label">Clinical Protocol</span>
                      <span className="sl-sub-prop-link">Self-Cycle IVF + ICSI</span>
                    </div>

                    <div className="sl-sub-prop-row">
                      <span className="sl-sub-prop-label">Treatment Category</span>
                      <span className="sl-badge-house">Advanced IVF</span>
                    </div>

                    <div className="sl-sub-prop-row">
                      <span className="sl-sub-prop-label">Preferred Language</span>
                      <span className="sl-sub-prop-val">{lead.preferred_language || 'Marathi, Hindi, English'}</span>
                    </div>

                    <div className="sl-sub-prop-row">
                      <span className="sl-sub-prop-label">Preferred Location</span>
                      <span className="sl-badge-loc">{lead.city}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="sl-props-actions-box">
                <button 
                  type="button" 
                  className="sl-btn-props-book"
                  onClick={() => onOpenBookConsultation(lead)}
                >
                  <Stethoscope size={14} />
                  <span>Book Consultation</span>
                </button>
                <div className="sl-props-secondary-actions">
                  <button 
                    type="button" 
                    className="sl-btn-props-wa"
                    onClick={() => onQuickWhatsApp(lead)}
                  >
                    <MessageSquare size={13} />
                    <span>WhatsApp</span>
                  </button>
                  <button 
                    type="button" 
                    className="sl-btn-props-call"
                    onClick={() => onQuickCall(lead)}
                  >
                    <Phone size={13} />
                    <span>Call via Exotel</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
