import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Phone, 
  MessageSquare, 
  Clock, 
  Dna, 
  CheckCircle2, 
  Building2, 
  UserCheck, 
  Sparkles, 
  ChevronRight, 
  FileText, 
  Activity, 
  Microscope,
  Stethoscope,
  Send,
  Play,
  Share2,
  ExternalLink
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
  const [activeTab, setActiveTab] = useState('clinical'); // 'clinical' | 'timeline' | 'calls' | 'notes'
  const [newNote, setNewNote] = useState('');
  const [notesList, setNotesList] = useState([
    {
      id: 1,
      author: lead.assigned_counsellor || 'Priya Nair',
      role: 'Lead Counsellor',
      date: 'Today, 02:15 PM',
      text: lead.notes_summary || 'Initial patient counseling completed.'
    },
    {
      id: 2,
      author: 'Superleap AI Ingestion',
      role: 'Agentic Pipeline',
      date: '2026-09-25 10:04 AM',
      text: `Lead ingested from ${lead.lead_source}. Scored ${lead.intent_score}/100 intent based on 3 prior failed IUIs and urgent second-opinion inquiry.`
    }
  ]);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setNotesList(prev => [
      {
        id: Date.now(),
        author: 'Current User (Counsellor)',
        role: 'Nova Fertility',
        date: 'Just now',
        text: newNote.trim()
      },
      ...prev
    ]);
    setNewNote('');
  };

  if (!lead) return null;

  const currentStageIndex = Object.keys(PATIENT_STAGES).indexOf(lead.stage);

  return (
    <div className="sl-drawer-backdrop" onClick={onClose}>
      <aside className="sl-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="sl-drawer-header">
          <div className="sl-drawer-patient-meta">
            <div className="sl-drawer-avatar">
              {lead.patient_name.charAt(0)}
            </div>
            <div>
              <div className="sl-drawer-name-row">
                <h2>{lead.patient_name}</h2>
                {lead.migration_clean_status?.includes('Restored') && (
                  <span className="sl-restored-tag" title="Corrupted Zoho ???? name was restored via UTF-8 cleansing">
                    Zoho UTF-8 Restored
                  </span>
                )}
              </div>
              <p className="sl-drawer-sub">
                MRN: <strong>{lead.id}</strong> • {lead.age} yrs • {lead.city} ({lead.clinic_name})
              </p>
            </div>
          </div>

          <div className="sl-drawer-header-actions">
            {/* The Hero Action Button */}
            <button 
              className="sl-btn sl-btn-primary sl-btn-lg sl-pulse-focus"
              onClick={() => onOpenBookConsultation(lead)}
              id="drawer-book-consult-btn"
              title="Schedule consultation for this patient"
            >
              <Calendar size={16} />
              <span>Book Consultation</span>
            </button>

            <button className="sl-drawer-close" onClick={onClose} title="Close drawer (ESC)">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Patient Journey Progression Stepper */}
        <div className="sl-journey-stepper-box">
          <div className="sl-stepper-header">
            <span className="sl-stepper-title">Patient Journey Milestones</span>
            <span className="sl-stepper-current">
              Current: <strong>{PATIENT_STAGES[lead.stage]?.label}</strong>
            </span>
          </div>

          <div className="sl-stepper-bar">
            {Object.entries(PATIENT_STAGES).map(([stageKey, stageDef], idx) => {
              const isCompleted = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;

              return (
                <div 
                  key={stageKey}
                  className={`sl-step-node ${isCompleted ? 'is-completed' : ''} ${isCurrent ? 'is-current' : ''}`}
                  title={`Stage ${idx + 1}: ${stageDef.label}`}
                  onClick={() => onAdvanceStage && onAdvanceStage(lead.id, stageKey)}
                >
                  <div className="sl-step-dot">
                    {isCompleted ? <CheckCircle2 size={12} /> : <span>{idx + 1}</span>}
                  </div>
                  <span className="sl-step-label">{stageDef.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Communication Strip */}
        <div className="sl-comm-bar">
          <div className="sl-comm-item">
            <span className="sl-comm-label">Mobile Phone</span>
            <div className="sl-comm-val-group">
              <strong>{lead.phone}</strong>
              <button 
                className="sl-quick-icon-btn is-call"
                onClick={() => onQuickCall(lead)}
                title="Dial via Exotel CTI"
              >
                <Phone size={14} />
                <span>Call (Exotel)</span>
              </button>
            </div>
          </div>

          <div className="sl-comm-item">
            <span className="sl-comm-label">WhatsApp Channel</span>
            <div className="sl-comm-val-group">
              <strong>{lead.whatsapp}</strong>
              <button 
                className="sl-quick-icon-btn is-wa"
                onClick={() => onQuickWhatsApp(lead)}
                title="Send WhatsApp message"
              >
                <MessageSquare size={14} />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

          <div className="sl-comm-item">
            <span className="sl-comm-label">Assigned Specialist</span>
            <div className="sl-comm-val-group">
              <strong>{lead.assigned_doctor || 'Not Yet Assigned'}</strong>
            </div>
          </div>
        </div>

        {/* Superleap AI Clinical Copilot Summary */}
        <div className="sl-ai-summary-card">
          <div className="sl-ai-summary-head">
            <Sparkles size={16} className="sl-sparkle-icon" />
            <span>Superleap AI Triage Summary</span>
            <span className="sl-ai-confidence">Confidence: 94%</span>
          </div>
          <p className="sl-ai-summary-body">
            Patient exhibits high clinical intent ({lead.intent_score}/100). Primary diagnostic indicator: <strong>{lead.primary_concern}</strong> (AMH: {lead.amh_level}). 
            {lead.previous_attempts ? ` Reports ${lead.previous_attempts}.` : ' First-time IVF candidate.'} 
            Recommended next clinical action: Prioritize in-clinic follicular ultrasound scan and semen analysis review with {lead.assigned_doctor || 'senior specialist'}.
          </p>
        </div>

        {/* Clinical Tabs */}
        <div className="sl-drawer-tabs">
          <button 
            className={`sl-drawer-tab ${activeTab === 'clinical' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('clinical')}
          >
            Clinical Overview
          </button>
          <button 
            className={`sl-drawer-tab ${activeTab === 'timeline' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('timeline')}
          >
            HIS & Lab Sync
          </button>
          <button 
            className={`sl-drawer-tab ${activeTab === 'calls' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('calls')}
          >
            Exotel Calls & WhatsApp
          </button>
          <button 
            className={`sl-drawer-tab ${activeTab === 'notes' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            Frontline Notes ({notesList.length})
          </button>
        </div>

        {/* Tab Body */}
        <div className="sl-drawer-tab-content">
          {activeTab === 'clinical' && (
            <div className="sl-clinical-overview-grid">
              <div className="sl-info-card">
                <h4>Patient Demographics</h4>
                <div className="sl-info-row">
                  <span>Full Name:</span>
                  <strong>{lead.patient_name}</strong>
                </div>
                <div className="sl-info-row">
                  <span>Age / Partner Age:</span>
                  <strong>{lead.age} yrs / {lead.partner_age} yrs</strong>
                </div>
                <div className="sl-info-row">
                  <span>Partner Name:</span>
                  <strong>{lead.partner_name || 'N/A'}</strong>
                </div>
                <div className="sl-info-row">
                  <span>Preferred Language:</span>
                  <strong>{lead.preferred_language}</strong>
                </div>
                <div className="sl-info-row">
                  <span>City / Pincode:</span>
                  <strong>{lead.city} ({lead.pincode})</strong>
                </div>
              </div>

              <div className="sl-info-card">
                <h4>Clinical & Fertility Profile</h4>
                <div className="sl-info-row">
                  <span>Primary Diagnosis:</span>
                  <strong className="sl-text-highlight">{lead.primary_concern}</strong>
                </div>
                <div className="sl-info-row">
                  <span>AMH Level:</span>
                  <strong>{lead.amh_level || 'Pending'}</strong>
                </div>
                <div className="sl-info-row">
                  <span>Prior Infertility History:</span>
                  <strong>{lead.previous_attempts || 'None'}</strong>
                </div>
                <div className="sl-info-row">
                  <span>Diagnostics Status:</span>
                  <strong>{lead.diagnostics_status}</strong>
                </div>
                <div className="sl-info-row">
                  <span>Referring Doctor:</span>
                  <strong>{lead.referred_by_dr || 'Direct Marketing'}</strong>
                </div>
              </div>

              <div className="sl-info-card">
                <h4>Operational & Commercial</h4>
                <div className="sl-info-row">
                  <span>Clinic Branch:</span>
                  <strong>{lead.clinic_name}</strong>
                </div>
                <div className="sl-info-row">
                  <span>Lead Counsellor:</span>
                  <strong>{lead.assigned_counsellor}</strong>
                </div>
                <div className="sl-info-row">
                  <span>Acquisition Channel:</span>
                  <strong>{lead.lead_source} ({lead.campaign_name})</strong>
                </div>
                <div className="sl-info-row">
                  <span>Estimated Package Value:</span>
                  <strong>₹{Number(lead.cycle_value || 0).toLocaleString('en-IN')}</strong>
                </div>
                <div className="sl-info-row">
                  <span>Next Scheduled Action:</span>
                  <strong className="sl-text-primary">{lead.next_followup || 'None'}</strong>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="sl-his-timeline-box">
              <div className="sl-his-banner">
                <Dna size={18} className="sl-text-teal" />
                <div>
                  <h4>Hospital Information System (HIS) Integration Status</h4>
                  <p>
                    {lead.his_sync === 'cycle_active' 
                      ? 'IVF Clinical Cycle in progress. Asynchronous event webhook verified from Hospital Core.'
                      : 'Real-time two-way synchronization active. Milestone webhooks listening for cycle starts.'}
                  </p>
                </div>
              </div>

              <div className="sl-timeline-events">
                {lead.his_cycle_start && (
                  <div className="sl-timeline-event is-teal">
                    <span className="sl-event-dot"></span>
                    <div className="sl-event-meta">
                      <span className="sl-event-time">{lead.his_cycle_start}</span>
                      <h5>HIS Event: IVF Clinical Cycle Commenced</h5>
                      <p>Ovarian stimulation protocol initiated. Webhook payload delivered to Superleap.</p>
                    </div>
                  </div>
                )}

                <div className="sl-timeline-event is-blue">
                  <span className="sl-event-dot"></span>
                  <div className="sl-event-meta">
                    <span className="sl-event-time">{lead.created_at}</span>
                    <h5>Patient Record Cleansed & Linked</h5>
                    <p>Zoho migration record sanitized and assigned Superleap MRN {lead.id}.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'calls' && (
            <div className="sl-calls-box">
              <div className="sl-call-item">
                <div className="sl-call-icon">
                  <Phone size={16} />
                </div>
                <div className="sl-call-details">
                  <div className="sl-call-top">
                    <strong>Exotel Outbound Consultation Call</strong>
                    <span className="sl-call-duration">Duration: {lead.call_duration || '3m 45s'}</span>
                  </div>
                  <p className="sl-call-agent">Agent: {lead.assigned_counsellor} • Status: Connected</p>
                  <div className="sl-audio-simulator">
                    <button className="sl-audio-play-btn" onClick={() => alert("Simulating call recording playback from Exotel telephony cloud.")}>
                      <Play size={12} /> Play Call Recording
                    </button>
                    <span className="sl-audio-track">●●●●●●●●●●●●●●●●●●●●</span>
                    <span className="sl-audio-time">03:45</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="sl-notes-section">
              <form onSubmit={handleAddNote} className="sl-new-note-form">
                <textarea 
                  placeholder="Type clinical follow-up note, doctor recommendation, or patient feedback..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="sl-textarea"
                  rows={2}
                />
                <button type="submit" className="sl-btn sl-btn-primary" disabled={!newNote.trim()}>
                  <Send size={14} />
                  <span>Post Clinical Note</span>
                </button>
              </form>

              <div className="sl-notes-feed">
                {notesList.map((n) => (
                  <div key={n.id} className="sl-note-bubble">
                    <div className="sl-note-header">
                      <strong>{n.author}</strong>
                      <span className="sl-note-badge">{n.role}</span>
                      <span className="sl-note-time">{n.date}</span>
                    </div>
                    <p className="sl-note-text">{n.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Sticky Bottom Action Bar */}
        <div className="sl-drawer-footer">
          <div className="sl-drawer-footer-left">
            <span className="sl-stage-indicator">
              Stage: <strong>{PATIENT_STAGES[lead.stage]?.label}</strong>
            </span>
          </div>
          <div className="sl-drawer-footer-right">
            <button 
              className="sl-btn sl-btn-secondary"
              onClick={() => onQuickWhatsApp(lead)}
            >
              <MessageSquare size={14} />
              <span>WhatsApp</span>
            </button>
            <button 
              className="sl-btn sl-btn-primary sl-btn-lg"
              onClick={() => onOpenBookConsultation(lead)}
            >
              <Calendar size={16} />
              <span>Book Consultation</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
