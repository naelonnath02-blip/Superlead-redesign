import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Building2, 
  UserCheck, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  FileSpreadsheet, 
  Download, 
  Phone, 
  MessageSquare,
  ShieldCheck,
  Video,
  MapPin,
  ChevronRight,
  Plus
} from 'lucide-react';
import { CLINIC_LOCATIONS, SPECIALIST_DOCTORS } from '../data/mockLeads';

export function ClinicDayOverview({
  leads,
  onOpenBookConsultation,
  onSelectLead
}) {
  const [selectedClinicId, setSelectedClinicId] = useState('blr_koramangala');
  const [showReconciliationModal, setShowReconciliationModal] = useState(false);

  const currentClinic = CLINIC_LOCATIONS.find(c => c.id === selectedClinicId) || CLINIC_LOCATIONS[0];

  // Appointments today
  const todaysAppointments = [
    {
      time: '09:30 AM',
      patient: 'Sushmita Banerjee',
      id: 'NF-10306',
      doctor: 'Dr. Kavitha Menon',
      room: 'OPD Suite 1',
      mode: 'In-Clinic',
      status: 'Completed',
      notes: 'Initial ultrasound completed. PCOS protocol advised.'
    },
    {
      time: '11:30 AM',
      patient: 'Lakshmi Narayanan',
      id: 'NF-10304',
      doctor: 'Dr. Vikramaditya Reddy',
      room: 'OPD Suite 2',
      mode: 'In-Clinic',
      status: 'Completed',
      notes: 'Medication counseling completed.'
    },
    {
      time: '02:00 PM',
      patient: 'Ananya Reddy',
      id: 'NF-10298',
      doctor: 'Dr. Sneha Kulkarni',
      room: 'Consultation Room 3',
      mode: 'In-Clinic',
      status: 'In Progress',
      notes: 'Reviewed stimulation protocol.'
    },
    {
      time: '03:30 PM',
      patient: 'Tanvi Joshi',
      id: 'NF-10303',
      doctor: 'Dr. Rajesh Rao',
      room: 'OPD Suite 1',
      mode: 'In-Clinic',
      status: 'Arrived / Waiting',
      notes: 'Spouse present for semen analysis review.'
    },
    {
      time: '04:30 PM',
      patient: 'Priyanka Sharma',
      id: 'NF-10294',
      doctor: 'Dr. Kavitha Menon',
      room: 'OPD Suite 1',
      mode: 'In-Clinic',
      status: 'Confirmed',
      notes: 'High intent: 3 failed IUIs. Seeking second opinion.'
    },
    {
      time: '05:15 PM',
      patient: 'Shweta Mukherjee',
      id: 'NF-10300',
      doctor: 'Dr. Ananya Sharma',
      room: 'Virtual Clinic 1',
      mode: 'HD Teleconsult',
      status: 'Confirmed',
      notes: 'Elective egg freezing consultation.'
    },
    {
      time: '06:00 PM',
      patient: 'Neha Kapoor',
      id: 'NF-10296',
      doctor: 'Sunita Verma (Counsellor)',
      room: 'Telephony Desk',
      mode: 'Exotel Call',
      status: 'Scheduled',
      notes: 'Outbound triage call for package pricing.'
    }
  ];

  return (
    <div className="sl-clinic-day-view">
      {/* Clinic Header Bar */}
      <div className="sl-day-header-card">
        <div className="sl-day-header-left">
          <div className="sl-day-icon-wrap">
            <Building2 size={24} />
          </div>
          <div>
            <div className="sl-clinic-selector-row">
              <h2>Clinic Day at a Glance:</h2>
              <select 
                value={selectedClinicId}
                onChange={(e) => setSelectedClinicId(e.target.value)}
                className="sl-clinic-dropdown-hero"
              >
                {CLINIC_LOCATIONS.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.state})
                  </option>
                ))}
              </select>
            </div>
            <p className="sl-day-subtitle">
              Clinic Branch Lead: <strong>{currentClinic.manager}</strong> • Date: <strong>Today, 27 September 2026</strong>
            </p>
          </div>
        </div>

        <div className="sl-day-header-right">
          {/* Dr. Kavitha Reconciliation Trigger */}
          <button 
            className="sl-btn sl-btn-reconciliation"
            onClick={() => setShowReconciliationModal(true)}
            title="Inspect 1,140 vs 1,310 consultation discrepancy resolution"
          >
            <ShieldCheck size={16} />
            <span>Consultation Reconciliation (1,310 Match)</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="sl-day-metrics-grid">
        <div className="sl-day-metric-card">
          <span className="sl-metric-label">Scheduled Consults Today</span>
          <div className="sl-metric-val-row">
            <span className="sl-metric-value">14</span>
            <span className="sl-metric-badge is-primary">100% capacity</span>
          </div>
          <span className="sl-metric-sub">8 In-Clinic • 4 Video • 2 Phone</span>
        </div>

        <div className="sl-day-metric-card">
          <span className="sl-metric-label">Completed Consults</span>
          <div className="sl-metric-val-row">
            <span className="sl-metric-value is-green">8</span>
            <span className="sl-metric-badge is-green">On Schedule</span>
          </div>
          <span className="sl-metric-sub">Average consult time: 34 mins</span>
        </div>

        <div className="sl-day-metric-card">
          <span className="sl-metric-label">IVF Cycle Starts in HIS</span>
          <div className="sl-metric-val-row">
            <span className="sl-metric-value is-teal">6</span>
            <span className="sl-metric-badge is-teal">Webhook Synced</span>
          </div>
          <span className="sl-metric-sub">3 Oocyte Retrievals • 3 Transfers</span>
        </div>

        <div className="sl-day-metric-card">
          <span className="sl-metric-label">Pending Callback Queue</span>
          <div className="sl-metric-val-row">
            <span className="sl-metric-value is-amber">3</span>
            <span className="sl-metric-badge is-amber">High Urgency</span>
          </div>
          <span className="sl-metric-sub">Exotel CTI auto-dialer active</span>
        </div>
      </div>

      {/* Main Grid: Schedule vs Doctors on Duty */}
      <div className="sl-day-content-grid">
        {/* Left Column: Hourly Appointment Schedule */}
        <div className="sl-schedule-panel">
          <div className="sl-panel-head">
            <div className="sl-panel-title-group">
              <Clock size={18} className="sl-text-primary" />
              <h3>Today's Patient Schedule ({todaysAppointments.length})</h3>
            </div>
            <button 
              className="sl-btn sl-btn-secondary sl-btn-sm"
              onClick={() => onOpenBookConsultation(leads[0])}
            >
              <Plus size={14} />
              <span>Book Walk-In</span>
            </button>
          </div>

          <div className="sl-schedule-timeline">
            {todaysAppointments.map((apt, index) => {
              const isCompleted = apt.status === 'Completed';
              const isInProgress = apt.status === 'In Progress';
              const isWaiting = apt.status.includes('Waiting');

              return (
                <div 
                  key={index}
                  className={`sl-schedule-row ${isInProgress ? 'is-in-progress' : ''} ${isCompleted ? 'is-completed' : ''}`}
                >
                  <div className="sl-apt-time">
                    <strong>{apt.time}</strong>
                    <span className="sl-apt-mode">
                      {apt.mode === 'In-Clinic' ? <MapPin size={11} /> : <Video size={11} />}
                      {apt.mode}
                    </span>
                  </div>

                  <div className="sl-apt-patient-card">
                    <div className="sl-apt-patient-header">
                      <div>
                        <span className="sl-apt-name">{apt.patient}</span>
                        <span className="sl-apt-mrn">({apt.id})</span>
                      </div>
                      <span className={`sl-apt-status-pill ${
                        isCompleted ? 'is-done' : isInProgress ? 'is-live' : isWaiting ? 'is-wait' : 'is-upcoming'
                      }`}>
                        {apt.status}
                      </span>
                    </div>

                    <div className="sl-apt-meta-row">
                      <span className="sl-apt-doctor">
                        <UserCheck size={13} /> {apt.doctor}
                      </span>
                      <span className="sl-apt-room">{apt.room}</span>
                    </div>

                    <p className="sl-apt-notes">{apt.notes}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Specialist Doctor OPD Roster */}
        <div className="sl-doctors-panel">
          <div className="sl-panel-head">
            <div className="sl-panel-title-group">
              <UserCheck size={18} className="sl-text-primary" />
              <h3>Doctor OPD Roster Today</h3>
            </div>
          </div>

          <div className="sl-doctors-roster-list">
            <div className="sl-roster-card">
              <div className="sl-roster-avatar">KM</div>
              <div className="sl-roster-info">
                <h4>Dr. Kavitha Menon</h4>
                <p>Chief Fertility Specialist</p>
                <div className="sl-roster-tags">
                  <span className="sl-tag">OPD Suite 1</span>
                  <span className="sl-tag">09:00 AM - 05:30 PM</span>
                  <span className="sl-tag is-busy">6 Consults Booked</span>
                </div>
              </div>
            </div>

            <div className="sl-roster-card">
              <div className="sl-roster-avatar">RR</div>
              <div className="sl-roster-info">
                <h4>Dr. Rajesh Rao</h4>
                <p>Lead Embryologist & Clinical Director</p>
                <div className="sl-roster-tags">
                  <span className="sl-tag">IVF Lab & OPD 2</span>
                  <span className="sl-tag">10:00 AM - 04:00 PM</span>
                  <span className="sl-tag is-busy">3 Procedures + 2 Consults</span>
                </div>
              </div>
            </div>

            <div className="sl-roster-card">
              <div className="sl-roster-avatar">SK</div>
              <div className="sl-roster-info">
                <h4>Dr. Sneha Kulkarni</h4>
                <p>Consultant IVF & Laparoscopy</p>
                <div className="sl-roster-tags">
                  <span className="sl-tag">Suite 3</span>
                  <span className="sl-tag">01:00 PM - 07:00 PM</span>
                  <span className="sl-tag is-avail">4 Slots Open</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Frontline Announcement */}
          <div className="sl-ops-notice-box">
            <h4>Clinic Operations Notice</h4>
            <p>
              Embryology lab air quality inspection passed at 08:30 AM. All cryopreservation tanks verified. Exotel SMS reminders have 99.4% delivery rate across Bangalore today.
            </p>
          </div>
        </div>
      </div>

      {/* Reconciliation Modal */}
      {showReconciliationModal && (
        <div className="sl-modal-backdrop" onClick={() => setShowReconciliationModal(false)}>
          <div className="sl-modal-dialog sl-modal-reconciliation" onClick={(e) => e.stopPropagation()}>
            <div className="sl-modal-header">
              <div className="sl-modal-title-group">
                <ShieldCheck size={22} className="sl-text-success" />
                <div>
                  <h3>Consultation Metric Audit & Reconciliation</h3>
                  <p className="sl-modal-subtitle">
                    Resolution of Dr. Kavitha & Meera's Concern: "Dashboard says 1,140 vs Excel says 1,310"
                  </p>
                </div>
              </div>
              <button className="sl-modal-close" onClick={() => setShowReconciliationModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="sl-modal-body">
              <div className="sl-reconcile-audit-summary">
                <div className="sl-audit-scorecard">
                  <span className="sl-scorecard-label">Zoho CRM Reported Count</span>
                  <span className="sl-scorecard-num is-red">1,140</span>
                  <span className="sl-scorecard-sub">Under-reported (-170 consults)</span>
                </div>

                <div className="sl-audit-plus">+</div>

                <div className="sl-audit-scorecard">
                  <span className="sl-scorecard-label">HIS Unsynced Teleconsults</span>
                  <span className="sl-scorecard-num is-teal">170</span>
                  <span className="sl-scorecard-sub">Trapped in legacy HIS logs</span>
                </div>

                <div className="sl-audit-equals">=</div>

                <div className="sl-audit-scorecard is-highlight">
                  <span className="sl-scorecard-label">Superleap Reconciled Truth</span>
                  <span className="sl-scorecard-num is-green">1,310</span>
                  <span className="sl-scorecard-sub">100% Matches Nova's Excel</span>
                </div>
              </div>

              <div className="sl-reconcile-explanation">
                <h4>Why Did This Discrepancy Occur in Zoho CRM?</h4>
                <p>
                  Zoho CRM only tracked <em>in-clinic consultations</em> that were manually recorded by clinic reception desks (1,140). It completely missed <strong>170 video teleconsultations and second opinions</strong> that were scheduled directly through the hospital's internal HIS. Because Zoho lacked event-driven webhooks, these 170 consultations never reflected on the dashboard, forcing Meera to reconcile them manually via Excel spreadsheets.
                </p>

                <h4>How Superleap Prevents This:</h4>
                <ul>
                  <li>
                    <strong>Unified Omnichannel Ingestion:</strong> In-clinic visits, video teleconsults, and HIS booking events flow into the same immutable ledger.
                  </li>
                  <li>
                    <strong>Zero Shadow Tracking:</strong> Frontline staff no longer need fallback Excel sheets; all 140 clinics report to a single unified data pipeline.
                  </li>
                  <li>
                    <strong>Deterministic Verification:</strong> 0% variance between CRM operational counts and Hospital billing reports.
                  </li>
                </ul>
              </div>
            </div>

            <div className="sl-modal-footer">
              <button 
                type="button" 
                className="sl-btn sl-btn-secondary"
                onClick={() => alert("Downloading signed Reconciliation Audit Certificate (PDF) for Dr. Kavitha.")}
              >
                <Download size={15} />
                <span>Export Audit Certificate (PDF)</span>
              </button>
              <button 
                type="button" 
                className="sl-btn sl-btn-primary"
                onClick={() => setShowReconciliationModal(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
