// Comprehensive column schema mapping Nova Fertility's 40 Zoho CRM fields
// into Superleap's role-based presets.

export const ALL_COLUMNS = [
  // 1-6: Essential FRONT-LINE Columns (Call Centre Agent View)
  { id: 'patient', label: 'Patient Name & ID', category: 'Essential', width: 230, alwaysVisible: true },
  { id: 'contact', label: 'Phone & WhatsApp', category: 'Contact', width: 170 },
  { id: 'clinic', label: 'Clinic & City', category: 'Operational', width: 180 },
  { id: 'stage', label: 'Patient Journey Stage', category: 'Clinical', width: 190 },
  { id: 'intent_score', label: 'AI Intent Score', category: 'Essential', width: 140 },
  { id: 'actions', label: 'Quick Action', category: 'Essential', width: 190, alwaysVisible: true },

  // 7-8: Clinic Counsellor Additions
  { id: 'assigned_doctor', label: 'Assigned Specialist', category: 'Clinical', width: 180 },
  { id: 'next_followup', label: 'Consultation / Slot', category: 'Operational', width: 170 },

  // 9-10: Clinic Manager Additions
  { id: 'lead_source', label: 'Acquisition Source', category: 'Operational', width: 150 },
  { id: 'his_sync', label: 'HIS Sync Status', category: 'System', width: 160 },

  // 11-40: Additional Fields migrated from Zoho CRM (The 40-column wall)
  { id: 'age', label: 'Patient Age', category: 'Clinical', width: 110 },
  { id: 'partner_name', label: 'Partner Name', category: 'Contact', width: 160 },
  { id: 'partner_age', label: 'Partner Age', category: 'Clinical', width: 110 },
  { id: 'counsellor', label: 'Assigned Counsellor', category: 'Operational', width: 160 },
  { id: 'language', label: 'Preferred Language', category: 'Contact', width: 140 },
  { id: 'primary_concern', label: 'Primary Concern', category: 'Clinical', width: 190 },
  { id: 'amh_level', label: 'AMH Level (ng/mL)', category: 'Clinical', width: 140 },
  { id: 'previous_attempts', label: 'Prior IVF Attempts', category: 'Clinical', width: 140 },
  { id: 'consultation_mode', label: 'Consultation Mode', category: 'Operational', width: 150 },
  { id: 'cycle_value', label: 'Est. Package (INR)', category: 'Financial', width: 150 },
  { id: 'created_at', label: 'Enquiry Date', category: 'System', width: 140 },
  { id: 'last_contact', label: 'Last Contacted', category: 'Operational', width: 140 },
  { id: 'call_duration', label: 'Last Call Duration', category: 'Telephony', width: 140 },
  { id: 'exotel_call_id', label: 'Exotel Call ID', category: 'Telephony', width: 140 },
  { id: 'campaign_name', label: 'Marketing Campaign', category: 'Operational', width: 180 },
  { id: 'ad_set', label: 'Meta Ad Set ID', category: 'Operational', width: 150 },
  { id: 'his_patient_id', label: 'HIS MRN (Hospital ID)', category: 'System', width: 160 },
  { id: 'his_cycle_start', label: 'HIS Cycle Start Date', category: 'System', width: 160 },
  { id: 'diagnostics_status', label: 'Lab Reports Status', category: 'Clinical', width: 160 },
  { id: 'semen_analysis', label: 'Semen Analysis', category: 'Clinical', width: 150 },
  { id: 'ultrasound_date', label: 'Pelvic USG Date', category: 'Clinical', width: 140 },
  { id: 'referred_by_dr', label: 'Referring Doctor', category: 'Clinical', width: 160 },
  { id: 'city_tier', label: 'City Tier', category: 'Operational', width: 110 },
  { id: 'pincode', label: 'Pincode', category: 'Contact', width: 110 },
  { id: 'lead_score_reason', label: 'AI Score Justification', category: 'Essential', width: 220 },
  { id: 'whatsapp_optin', label: 'WhatsApp Opt-In', category: 'Contact', width: 130 },
  { id: 'migration_clean_status', label: 'Zoho Data Status', category: 'System', width: 160 },
  { id: 'clinic_manager', label: 'Clinic Branch Lead', category: 'Operational', width: 160 },
  { id: 'followup_count', label: 'Total Follow-ups', category: 'Operational', width: 130 },
  { id: 'notes_summary', label: 'Frontline Clinical Notes', category: 'Essential', width: 260 },
];

export const ROLE_PRESETS = {
  agent: {
    id: 'agent',
    name: 'Call-Centre Agent (6 cols)',
    description: 'Streamlined for 500 agents. Eliminates 34 noisy columns for sub-second lead triage.',
    columns: ['patient', 'contact', 'clinic', 'stage', 'intent_score', 'actions']
  },
  counsellor: {
    id: 'counsellor',
    name: 'Clinic Counsellor (8 cols)',
    description: 'Tailored for 850 counsellors. Focused on patient rapport, doctors, and consult scheduling.',
    columns: ['patient', 'contact', 'clinic', 'stage', 'assigned_doctor', 'next_followup', 'intent_score', 'actions']
  },
  manager: {
    id: 'manager',
    name: 'Clinic Manager (10 cols)',
    description: 'Built for 140 clinic heads. Tracks acquisition channels, HIS synchronization, and cycle conversion.',
    columns: ['patient', 'contact', 'clinic', 'stage', 'assigned_doctor', 'next_followup', 'lead_source', 'his_sync', 'cycle_value', 'actions']
  },
  zoho_legacy: {
    id: 'zoho_legacy',
    name: 'Zoho Legacy View (All 40 cols)',
    description: 'The bloated 40-column wall that caused agent fatigue in Zoho CRM.',
    columns: ALL_COLUMNS.map(c => c.id)
  }
};
