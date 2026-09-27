import React, { useState, useMemo, useCallback } from 'react';
import { SidebarNav } from './components/SidebarNav';
import { MainTopBar } from './components/MainTopBar';
import { FilterToolbar } from './components/FilterToolbar';
import { LeadTable } from './components/LeadTable';
import { ReportsDashboardView } from './components/ReportsDashboardView';
import { ManageColumnsModal } from './components/ManageColumnsModal';
import { BookConsultationModal } from './components/BookConsultationModal';
import { LeadDetailDrawer } from './components/LeadDetailDrawer';
import { ClinicDayOverview } from './components/ClinicDayOverview';
import { PatientJourneyKanban } from './components/PatientJourneyKanban';
import { DeploymentAuditScreen } from './components/DeploymentAuditScreen';
import { SuperAgentCopilotDrawer } from './components/SuperAgentCopilotDrawer';
import { MobileBottomActionBar } from './components/MobileBottomActionBar';
import { NotificationToast } from './components/NotificationToast';

import { usePersistentState } from './hooks/usePersistentState';
import { INITIAL_LEADS } from './data/mockLeads';
import { ALL_COLUMNS, ROLE_PRESETS } from './data/columnsDefinition';
import './App.css';

export function App() {
  // 1. Persistent State Hook (Columns, Filters, Saved Views, Role)
  const {
    currentRole,
    handleRoleChange,
    visibleColumns,
    updateColumns,
    applyPreset,
    filters,
    updateFilter,
    resetFilters,
    savedViews,
    activeViewId,
    selectView,
    saveAsNewView,
    updateCurrentView,
    deleteSavedView,
    isFilterModified
  } = usePersistentState();

  // 2. Leads Data State
  const [leads, setLeads] = useState(INITIAL_LEADS);

  // 3. UI Navigation State
  const [activeScreen, setActiveScreen] = useState('leads'); // 'leads' | 'reports_dashboard' | 'clinic_day' | 'pipeline' | 'audit'
  const [activeSmartboardFilter, setActiveSmartboardFilter] = useState('all');

  // 4. Modals & Drawers State
  const [showColumnManager, setShowColumnManager] = useState(false);
  const [bookingLead, setBookingLead] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [toast, setToast] = useState({
    title: 'Superleap CRM Initialized',
    message: 'Loaded authentic left nav and clean deals population. 0% filter loss active.',
    type: 'success'
  });
  const [hisSyncActive, setHisSyncActive] = useState(true);

  // Auto-dismiss toast
  const showToast = useCallback((title, message, type = 'info') => {
    setToast({ title, message, type });
    setTimeout(() => {
      setToast(null);
    }, 5500);
  }, []);

  // Quick Smartboard Filter Handler
  const handleSmartboardClick = useCallback((filterType) => {
    setActiveSmartboardFilter(filterType);
    if (filterType === 'high_intent') {
      updateFilter('minScore', 85);
      showToast('Smartboard: High Intent IVF', 'Filtered to patients with score ≥ 85%', 'info');
    } else if (filterType === 'omnichannel') {
      updateFilter('source', 'Facebook Ads');
      showToast('Smartboard: Omnichannel Leads', 'Filtered to active digital & chat inbound inquiries', 'info');
    } else if (filterType === 'his_synced') {
      updateFilter('hisSync', 'cycle_active');
      showToast('Smartboard: HIS Cycle Starts', 'Filtered to patients actively undergoing stimulation in hospital', 'his');
    } else {
      resetFilters();
      setActiveSmartboardFilter('all');
    }
  }, [updateFilter, resetFilters, showToast]);

  // 5. Filter Leads Computation
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Search
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const matches = 
          lead.patient_name.toLowerCase().includes(q) ||
          lead.id.toLowerCase().includes(q) ||
          lead.phone.toLowerCase().includes(q) ||
          (lead.email && lead.email.toLowerCase().includes(q)) ||
          lead.city.toLowerCase().includes(q) ||
          lead.clinic_name.toLowerCase().includes(q) ||
          (lead.assigned_doctor && lead.assigned_doctor.toLowerCase().includes(q)) ||
          (lead.primary_concern && lead.primary_concern.toLowerCase().includes(q));
        if (!matches) return false;
      }

      // Stage
      if (filters.stage !== 'all' && lead.stage !== filters.stage) {
        return false;
      }

      // Clinic
      if (filters.clinic !== 'all' && lead.clinic_id !== filters.clinic) {
        return false;
      }

      // Source
      if (filters.source !== 'all' && lead.lead_source !== filters.source) {
        return false;
      }

      // Min Intent Score
      if (filters.minScore > 0 && lead.intent_score < filters.minScore) {
        return false;
      }

      // HIS Sync Status
      if (filters.hisSync !== 'all' && lead.his_sync !== filters.hisSync) {
        return false;
      }

      // Today Only
      if (filters.onlyToday && !lead.is_today) {
        return false;
      }

      return true;
    });
  }, [leads, filters]);

  // 6. Action Handlers
  // A. Trigger HIS Webhook Simulation (IVF cycle start sync)
  const handleTriggerHisSimulation = useCallback(() => {
    const targetLeadId = selectedLead ? selectedLead.id : 'NF-10306';
    const targetName = selectedLead ? selectedLead.patient_name : 'Neha Verma';

    setLeads(prev => prev.map(l => {
      if (l.id === targetLeadId) {
        return {
          ...l,
          stage: 'ivf_cycle',
          his_sync: 'cycle_active',
          his_cycle_start: '2026-09-27 (Today)',
          notes_summary: `[HIS LIVE WEBHOOK EVENT]: IVF Ovarian Stimulation Cycle started in Hospital Core system. Real-time reverse-sync received.`,
          next_followup: 'Follicular Scan Day 6'
        };
      }
      return l;
    }));

    if (selectedLead && selectedLead.id === targetLeadId) {
      setSelectedLead(prev => ({
        ...prev,
        stage: 'ivf_cycle',
        his_sync: 'cycle_active',
        his_cycle_start: '2026-09-27 (Today)',
        next_followup: 'Follicular Scan Day 6'
      }));
    }

    showToast(
      '🧬 HIS Webhook Received: IVF Cycle Commenced!',
      `Live reverse-sync received for ${targetName} (${targetLeadId}). Stage automatically updated to "IVF Cycle" in Superleap.`,
      'his'
    );
  }, [selectedLead, showToast]);

  // B. Confirm Consultation Booking
  const handleConfirmBooking = useCallback((leadId, bookingDetails) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        return {
          ...l,
          stage: 'first_consultation',
          assigned_doctor: bookingDetails.doctor,
          clinic_name: bookingDetails.clinic,
          consultation_mode: bookingDetails.type,
          next_followup: `${bookingDetails.date} at ${bookingDetails.slot}`,
          next_followup_date: `${bookingDetails.date} ${bookingDetails.slot}`,
          notes_summary: `[Consultation Booked]: Scheduled with ${bookingDetails.doctor} (${bookingDetails.type}). Automated WhatsApp & Exotel SMS reminders dispatched.`,
          is_today: bookingDetails.date === '2026-09-27'
        };
      }
      return l;
    }));

    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(prev => ({
        ...prev,
        stage: 'first_consultation',
        assigned_doctor: bookingDetails.doctor,
        clinic_name: bookingDetails.clinic,
        consultation_mode: bookingDetails.type,
        next_followup: `${bookingDetails.date} at ${bookingDetails.slot}`
      }));
    }

    setBookingLead(null);
    showToast(
      '🩺 Consultation Successfully Booked!',
      `Scheduled with ${bookingDetails.doctor} on ${bookingDetails.date} at ${bookingDetails.slot}. WhatsApp confirmation sent.`,
      'booking'
    );
  }, [selectedLead, showToast]);

  // C. Quick Call (Exotel)
  const handleQuickCall = useCallback((lead) => {
    showToast(
      '📞 Exotel CTI Dialing...',
      `Connecting call to ${lead.patient_name} (${lead.phone}) via Nova Cloud Telephony trunk.`,
      'info'
    );
  }, [showToast]);

  // D. Quick WhatsApp
  const handleQuickWhatsApp = useCallback((lead) => {
    const waUrl = `https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
      `Hello ${lead.patient_name}, this is Nova Fertility regarding your fertility consultation inquiry. How may we assist you today?`
    )}`;
    window.open(waUrl, '_blank');
    showToast(
      '💬 WhatsApp Business API Triggered',
      `Opened conversation with ${lead.patient_name}. Template delivery logged.`,
      'success'
    );
  }, [showToast]);

  // E. Advance Stage
  const handleAdvanceStage = useCallback((leadId, newStage) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        return { ...l, stage: newStage };
      }
      return l;
    }));
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(prev => ({ ...prev, stage: newStage }));
    }
    showToast('Patient Journey Stage Updated', `Moved to ${newStage.replace('_', ' ')}`, 'success');
  }, [selectedLead, showToast]);

  // Active lead for mobile sticky bar
  const mobileActiveLead = selectedLead || filteredLeads[0] || leads[0];

  return (
    <div className="sl-app-shell">
      {/* 1. Authentic Superleap Left Navigation Sidebar */}
      <SidebarNav 
        activeScreen={activeScreen}
        onScreenChange={setActiveScreen}
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        onSelectQuickSmartboard={handleSmartboardClick}
        activeSmartboardFilter={activeSmartboardFilter}
        onOpenCopilot={() => setIsCopilotOpen(true)}
        totalLeadsCount={leads.length}
      />

      {/* 2. Main Content Canvas (Framed inside rounded white card) */}
      <div className="sl-main-canvas-wrapper">
        <div className="sl-nested-canvas-card">
          {/* Canvas Top Bar: Breadcrumbs, Search, Columns, App Switcher, SuperAgent */}
          <MainTopBar 
            savedViews={savedViews}
            activeViewId={activeViewId}
            onSelectView={selectView}
            searchQuery={filters.search}
            onSearchChange={(val) => updateFilter('search', val)}
            onOpenColumnManager={() => setShowColumnManager(true)}
            activeColumnsCount={visibleColumns.length}
            totalColumnsCount={ALL_COLUMNS.length}
            onOpenCopilot={() => setIsCopilotOpen(true)}
            hisSyncActive={hisSyncActive}
            onTriggerHisSimulation={handleTriggerHisSimulation}
            activeScreen={activeScreen}
            onScreenChange={setActiveScreen}
          />

          {/* Canvas Dynamic Body */}
          <div className="sl-canvas-viewport">
            {activeScreen === 'leads' && (
              <div className="sl-screen-leads-view">
                {/* Superleap Signature Filter Toolbar */}
                <FilterToolbar 
                  filters={filters}
                  onUpdateFilter={updateFilter}
                  onResetFilters={resetFilters}
                  onOpenColumnManager={() => setShowColumnManager(true)}
                  activeColumnsCount={visibleColumns.length}
                  totalColumnsCount={ALL_COLUMNS.length}
                  matchedCount={filteredLeads.length}
                  totalCount={leads.length}
                  onSaveCurrentView={(name) => saveAsNewView(name)}
                />

                {/* Clean Population of the Deals Table (Matching Image 1) */}
                <LeadTable 
                  leads={filteredLeads}
                  visibleColumnIds={visibleColumns}
                  onSelectLead={(lead) => setSelectedLead(lead)}
                  onOpenBookConsultation={(lead) => setBookingLead(lead)}
                  onQuickCall={handleQuickCall}
                  onQuickWhatsApp={handleQuickWhatsApp}
                />
              </div>
            )}

            {/* Reports & Analytics Dashboard (Matching Image 3) */}
            {activeScreen === 'reports_dashboard' && (
              <ReportsDashboardView onNavigateToLeads={() => setActiveScreen('leads')} />
            )}

            {/* Clinic Day Overview */}
            {activeScreen === 'clinic_day' && (
              <ClinicDayOverview 
                leads={leads}
                onOpenBookConsultation={(lead) => setBookingLead(lead || leads[0])}
                onSelectLead={(lead) => setSelectedLead(lead)}
              />
            )}

            {/* Pipeline Kanban View */}
            {activeScreen === 'pipeline' && (
              <PatientJourneyKanban 
                leads={filteredLeads}
                onSelectLead={(lead) => setSelectedLead(lead)}
                onOpenBookConsultation={(lead) => setBookingLead(lead)}
              />
            )}

            {/* Deployment Audit Screen */}
            {activeScreen === 'audit' && (
              <DeploymentAuditScreen 
                onTriggerHisSimulation={handleTriggerHisSimulation}
              />
            )}
          </div>
        </div>
      </div>

      {/* 3. Column Manager Modal (Requirement 1: 6 cols vs 40 cols) */}
      {showColumnManager && (
        <ManageColumnsModal 
          visibleColumns={visibleColumns}
          onSaveColumns={updateColumns}
          onClose={() => setShowColumnManager(false)}
          currentRole={currentRole}
          onApplyPreset={applyPreset}
        />
      )}

      {/* 4. Book Consultation Modal (Requirement 3: Prominent 1-click booking) */}
      {bookingLead && (
        <BookConsultationModal 
          lead={bookingLead}
          onClose={() => setBookingLead(null)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      {/* 5. Lead Record Detail Drawer (Matching Image 2) */}
      {selectedLead && (
        <LeadDetailDrawer 
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onOpenBookConsultation={(lead) => setBookingLead(lead)}
          onQuickWhatsApp={handleQuickWhatsApp}
          onQuickCall={handleQuickCall}
          onAdvanceStage={handleAdvanceStage}
        />
      )}

      {/* 6. SuperAgent AI Copilot Drawer */}
      <SuperAgentCopilotDrawer 
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        activeLead={selectedLead || filteredLeads[0]}
        onOpenBookConsultation={(lead) => setBookingLead(lead)}
        onQuickWhatsApp={handleQuickWhatsApp}
      />

      {/* 7. Mobile Sticky Bottom Action Bar */}
      <MobileBottomActionBar 
        activeLead={mobileActiveLead}
        onOpenBookConsultation={(lead) => setBookingLead(lead)}
        onQuickCall={handleQuickCall}
        onQuickWhatsApp={handleQuickWhatsApp}
        onOpenColumnManager={() => setShowColumnManager(true)}
      />

      {/* 8. Live Notification Toast */}
      {toast && (
        <NotificationToast 
          toast={toast}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
