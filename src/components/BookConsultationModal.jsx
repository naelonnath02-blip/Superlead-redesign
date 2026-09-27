import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Building2, 
  UserCheck, 
  Video, 
  MapPin, 
  Check, 
  Sparkles, 
  Send, 
  Phone, 
  MessageSquare,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { CLINIC_LOCATIONS, SPECIALIST_DOCTORS } from '../data/mockLeads';

export function BookConsultationModal({
  lead,
  onClose,
  onConfirmBooking
}) {
  const [selectedClinicId, setSelectedClinicId] = useState(lead?.clinic_id || 'blr_koramangala');
  const [selectedDoctorId, setSelectedDoctorId] = useState(() => {
    const doc = SPECIALIST_DOCTORS.find(d => d.name === lead?.assigned_doctor);
    return doc?.id || 'dr_kavitha';
  });
  const [selectedDate, setSelectedDate] = useState('2026-09-28');
  const [selectedSlot, setSelectedSlot] = useState('11:00 AM');
  const [consultType, setConsultType] = useState('in_clinic');
  const [sendWhatsApp, setSendWhatsApp] = useState(true);
  const [sendSms, setSendSms] = useState(true);
  const [syncHis, setSyncHis] = useState(true);
  const [clinicalNotes, setClinicalNotes] = useState(
    `Initial IVF consultation scheduled. Primary concern: ${lead?.primary_concern || 'Fertility evaluation'}.`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const availableSlots = [
    '09:30 AM', '10:15 AM', '11:00 AM', '11:45 AM',
    '02:30 PM', '03:15 PM', '04:00 PM', '04:45 PM', '05:30 PM'
  ];

  const currentClinic = CLINIC_LOCATIONS.find(c => c.id === selectedClinicId) || CLINIC_LOCATIONS[0];
  const currentDoctor = SPECIALIST_DOCTORS.find(d => d.id === selectedDoctorId) || SPECIALIST_DOCTORS[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      const bookingDetails = {
        clinic: currentClinic.name,
        doctor: currentDoctor.name,
        date: selectedDate,
        slot: selectedSlot,
        type: consultType === 'in_clinic' ? 'In-Clinic Consultation' : 'Video Teleconsultation',
        notes: clinicalNotes
      };

      setTimeout(() => {
        onConfirmBooking(lead.id, bookingDetails);
      }, 900);
    }, 600);
  };

  return (
    <div className="sl-modal-backdrop" onClick={onClose}>
      <div className="sl-modal-dialog sl-modal-booking" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sl-modal-header sl-booking-header">
          <div className="sl-modal-title-group">
            <div className="sl-booking-avatar">
              <Calendar size={22} className="sl-text-primary" />
            </div>
            <div>
              <h3>Book Specialist Consultation</h3>
              <p className="sl-modal-subtitle">
                Scheduling for <strong>{lead.patient_name}</strong> (MRN: {lead.id}) • {lead.city}
              </p>
            </div>
          </div>
          <button className="sl-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {isSuccess ? (
          <div className="sl-booking-success-state">
            <div className="sl-success-icon-ring">
              <Check size={36} />
            </div>
            <h4>Consultation Confirmed!</h4>
            <p>
              Successfully booked with <strong>{currentDoctor.name}</strong> at <strong>{currentClinic.name}</strong> on <strong>{selectedDate} at {selectedSlot}</strong>.
            </p>
            <div className="sl-success-triggers">
              <span className="sl-trigger-pill">
                <Check size={13} /> WhatsApp Confirmation Dispatched
              </span>
              <span className="sl-trigger-pill">
                <Check size={13} /> Exotel SMS Scheduled
              </span>
              <span className="sl-trigger-pill">
                <Check size={13} /> HIS Calendar Slot Reserved
              </span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="sl-booking-form">
            <div className="sl-booking-body">
              {/* Doctor & Clinic Selection Grid */}
              <div className="sl-form-grid-2">
                {/* Clinic Selector */}
                <div className="sl-form-field">
                  <label>
                    <Building2 size={14} /> Clinic Branch (140 Clinics)
                  </label>
                  <select 
                    value={selectedClinicId} 
                    onChange={(e) => setSelectedClinicId(e.target.value)}
                    className="sl-select"
                  >
                    {CLINIC_LOCATIONS.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.city})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Specialist Doctor Selector */}
                <div className="sl-form-field">
                  <label>
                    <UserCheck size={14} /> Fertility Specialist / Doctor
                  </label>
                  <select 
                    value={selectedDoctorId} 
                    onChange={(e) => setSelectedDoctorId(e.target.value)}
                    className="sl-select"
                  >
                    {SPECIALIST_DOCTORS.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.name} — {d.title} ({d.experience})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Consultation Type Selector */}
              <div className="sl-form-field">
                <label>Consultation Mode</label>
                <div className="sl-consult-type-cards">
                  <div 
                    className={`sl-consult-card ${consultType === 'in_clinic' ? 'is-selected' : ''}`}
                    onClick={() => setConsultType('in_clinic')}
                  >
                    <MapPin size={18} className="sl-consult-icon" />
                    <div className="sl-consult-info">
                      <span className="sl-consult-title">In-Clinic Consultation</span>
                      <span className="sl-consult-desc">Physical examination at {currentClinic.name}</span>
                    </div>
                  </div>

                  <div 
                    className={`sl-consult-card ${consultType === 'video' ? 'is-selected' : ''}`}
                    onClick={() => setConsultType('video')}
                  >
                    <Video size={18} className="sl-consult-icon" />
                    <div className="sl-consult-info">
                      <span className="sl-consult-title">HD Video Teleconsultation</span>
                      <span className="sl-consult-desc">Superleap integrated secure video call</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Date & Slot Picker */}
              <div className="sl-form-grid-2">
                <div className="sl-form-field">
                  <label>
                    <Calendar size={14} /> Select Date
                  </label>
                  <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="sl-input"
                    min="2026-09-27"
                  />
                </div>

                <div className="sl-form-field">
                  <label>
                    <Clock size={14} /> Available Time Slot
                  </label>
                  <div className="sl-slots-grid">
                    {availableSlots.map(slot => (
                      <button
                        key={slot}
                        type="button"
                        className={`sl-slot-pill ${selectedSlot === slot ? 'is-selected' : ''}`}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Clinical Notes & Triage */}
              <div className="sl-form-field">
                <label>Clinical Notes for Doctor</label>
                <textarea 
                  rows={2}
                  value={clinicalNotes}
                  onChange={(e) => setClinicalNotes(e.target.value)}
                  className="sl-textarea"
                />
              </div>

              {/* Automated Patient Triggers & HIS Sync */}
              <div className="sl-automated-triggers-box">
                <span className="sl-triggers-title">
                  <Sparkles size={14} className="sl-sparkle-icon" />
                  Instant Automated Frontline Actions:
                </span>

                <div className="sl-triggers-checkboxes">
                  <label className="sl-trigger-checkbox">
                    <input 
                      type="checkbox" 
                      checked={sendWhatsApp}
                      onChange={(e) => setSendWhatsApp(e.target.checked)}
                    />
                    <span>WhatsApp confirmation + Clinic Google Map link to {lead.whatsapp}</span>
                  </label>

                  <label className="sl-trigger-checkbox">
                    <input 
                      type="checkbox" 
                      checked={sendSms}
                      onChange={(e) => setSendSms(e.target.checked)}
                    />
                    <span>Exotel SMS reminder 2 hrs prior to appointment</span>
                  </label>

                  <label className="sl-trigger-checkbox">
                    <input 
                      type="checkbox" 
                      checked={syncHis}
                      onChange={(e) => setSyncHis(e.target.checked)}
                    />
                    <span>Reserve slot on Hospital Information System (HIS) calendar</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sl-modal-footer">
              <button 
                type="button" 
                className="sl-btn sl-btn-secondary"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="sl-btn sl-btn-primary sl-btn-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Reserving Slot & Notifying...</span>
                ) : (
                  <>
                    <Calendar size={16} />
                    <span>Confirm & Book Consultation</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
