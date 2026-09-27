import React, { useState } from 'react';
import { 
  Home, 
  GitBranch, 
  FileText, 
  Briefcase, 
  LayoutGrid, 
  ChevronDown, 
  ChevronRight, 
  Percent, 
  GraduationCap, 
  Users, 
  Sparkles,
  BarChart2,
  Settings,
  HelpCircle,
  Activity,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

export function SidebarNav({
  activeScreen,
  onScreenChange,
  currentRole,
  onRoleChange,
  onSelectQuickSmartboard,
  activeSmartboardFilter,
  onOpenCopilot,
  totalLeadsCount = 140
}) {
  const [smartboardsOpen, setSmartboardsOpen] = useState(true);
  const [workspaceOpen, setWorkspaceOpen] = useState(true);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  return (
    <aside className="sl-sidebar-container">
      {/* 1. Superleap Brand Header */}
      <div className="sl-sidebar-header">
        <div className="sl-brand-logo-wrap">
          {/* Authentic Superleap green-emerald rounded mark */}
          <div className="sl-brand-icon-box">
            <svg viewBox="0 0 28 28" fill="none" className="sl-brand-svg">
              <rect width="28" height="28" rx="6" fill="#072225" />
              <path d="M7 8.5C7 7.67 7.67 7 8.5 7H18C19.65 7 21 8.34 21 10C21 11.65 19.65 13 18 13H11C9.34 13 8 14.34 8 16C8 17.65 9.34 19 11 19H19.5C20.33 19 21 19.67 21 20.5C21 21.33 20.33 22 19.5 22H10C8.34 22 7 20.65 7 19C7 17.34 8.34 16 10 16H17C18.65 16 20 14.65 20 13C20 11.34 18.65 10 17 10H8.5C7.67 10 7 9.33 7 8.5Z" fill="#4BB793"/>
            </svg>
          </div>
          <span className="sl-brand-title">Superleap</span>
        </div>
      </div>

      {/* 2. Top Group Navigation Icons */}
      <nav className="sl-sidebar-top-nav">
        {/* Home */}
        <button 
          type="button"
          className={`sl-nav-item ${activeScreen === 'overview' ? 'is-active' : ''}`}
          onClick={() => onScreenChange('leads')}
          title="Home Dashboard"
        >
          <Home size={17} className="sl-nav-icon" />
          <span className="sl-nav-label">Home</span>
        </button>

        {/* Pipelines / Patient Journey */}
        <button 
          type="button"
          className={`sl-nav-item ${activeScreen === 'pipeline' ? 'is-active' : ''}`}
          onClick={() => onScreenChange('pipeline')}
          title="Clinical Pipeline (Kanban)"
        >
          <GitBranch size={17} className="sl-nav-icon" />
          <span className="sl-nav-label">Pipeline</span>
        </button>

        {/* Document / Records */}
        <button 
          type="button"
          className={`sl-nav-item ${activeScreen === 'clinic_day' ? 'is-active' : ''}`}
          onClick={() => onScreenChange('clinic_day')}
          title="Today's Clinic Actions"
        >
          <FileText size={17} className="sl-nav-icon" />
          <span className="sl-nav-label">Clinic Day</span>
        </button>

        {/* Reports & Analytics (Expandable matching Image 3) */}
        <div className="sl-nav-expandable-group">
          <button 
            type="button"
            className={`sl-nav-item ${activeScreen === 'reports_dashboard' ? 'is-active' : ''}`}
            onClick={() => {
              setReportsOpen(!reportsOpen);
              if (activeScreen !== 'reports_dashboard') {
                onScreenChange('reports_dashboard');
              }
            }}
            title="Reports & Analytics"
          >
            <Briefcase size={17} className="sl-nav-icon" />
            <span className="sl-nav-label">Reports & Analytics</span>
            <ChevronDown size={14} className={`sl-chevron-rotatable ${reportsOpen ? 'is-open' : ''}`} />
          </button>

          {reportsOpen && (
            <div className="sl-nav-sub-items">
              <button 
                type="button" 
                className={`sl-sub-nav-item ${activeScreen === 'reports_dashboard' ? 'is-sub-active' : ''}`}
                onClick={() => onScreenChange('reports_dashboard')}
              >
                <BarChart2 size={14} className="sl-sub-icon" />
                <span>Dashboard</span>
              </button>
              <button 
                type="button" 
                className="sl-sub-nav-item"
                onClick={() => onScreenChange('audit')}
              >
                <ShieldCheck size={14} className="sl-sub-icon" />
                <span>Deployment Audit</span>
              </button>
            </div>
          )}
        </div>

        {/* Modules / Grid */}
        <button 
          type="button"
          className="sl-nav-item"
          onClick={() => onOpenCopilot && onOpenCopilot()}
          title="SuperAgent Copilot"
        >
          <LayoutGrid size={17} className="sl-nav-icon" />
          <span className="sl-nav-label">Modules</span>
        </button>
      </nav>

      {/* 3. Section: SMARTBOARDS (Collapsible) */}
      <div className="sl-sidebar-section">
        <button 
          type="button"
          className="sl-section-header-btn"
          onClick={() => setSmartboardsOpen(!smartboardsOpen)}
        >
          {smartboardsOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          <span>SMARTBOARDS</span>
        </button>

        {smartboardsOpen && (
          <div className="sl-section-items">
            {/* Pink User Dot: High Intent IVF */}
            <button 
              type="button"
              className={`sl-smartboard-item ${activeSmartboardFilter === 'high_intent' ? 'is-smartboard-active' : ''}`}
              onClick={() => {
                onScreenChange('leads');
                onSelectQuickSmartboard('high_intent');
              }}
              title="Filter to 85+ High Intent IVF Candidates"
            >
              <span className="sl-smart-circle sl-circle-pink">
                <span className="sl-dot-inner"></span>
              </span>
              <span className="sl-smartboard-label">High Intent IVF (85+)</span>
            </button>

            {/* Green WhatsApp/Chat Dot: Omnichannel Chat */}
            <button 
              type="button"
              className={`sl-smartboard-item ${activeSmartboardFilter === 'omnichannel' ? 'is-smartboard-active' : ''}`}
              onClick={() => {
                onScreenChange('leads');
                onSelectQuickSmartboard('omnichannel');
              }}
              title="Filter to WhatsApp & Omnichannel Chat Inquiries"
            >
              <span className="sl-smart-circle sl-circle-green">
                <span className="sl-dot-inner"></span>
              </span>
              <span className="sl-smartboard-label">Omnichannel Chat</span>
            </button>

            {/* Cyan / Blue Database Dot: HIS EHR Reverse-Sync */}
            <button 
              type="button"
              className={`sl-smartboard-item ${activeSmartboardFilter === 'his_synced' ? 'is-smartboard-active' : ''}`}
              onClick={() => {
                onScreenChange('leads');
                onSelectQuickSmartboard('his_synced');
              }}
              title="Filter to HIS Cycle Start & Hospital Synced Patients"
            >
              <span className="sl-smart-circle sl-circle-cyan">
                <span className="sl-dot-inner"></span>
              </span>
              <span className="sl-smartboard-label">HIS EHR Sync</span>
            </button>
          </div>
        )}
      </div>

      {/* 4. Section: WORKSPACE (Collapsible) */}
      <div className="sl-sidebar-section">
        <button 
          type="button"
          className="sl-section-header-btn"
          onClick={() => setWorkspaceOpen(!workspaceOpen)}
        >
          {workspaceOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          <span>WORKSPACE</span>
        </button>

        {workspaceOpen && (
          <div className="sl-section-items">
            {/* Active Card: % Leads (Matching Image 1 & 2) */}
            <button 
              type="button"
              className={`sl-workspace-card-item ${activeScreen === 'leads' ? 'is-workspace-active' : ''}`}
              onClick={() => {
                onScreenChange('leads');
                onSelectQuickSmartboard('all');
              }}
              title="Deals / Patient Inquiries List"
            >
              <span className="sl-percent-badge">
                <Percent size={12} strokeWidth={2.5} />
              </span>
              <span className="sl-workspace-card-text">Leads</span>
              <span className="sl-workspace-count">{totalLeadsCount}</span>
            </button>

            {/* Orange Cap: Knowledge Hub */}
            <button 
              type="button"
              className="sl-workspace-item"
              onClick={() => {
                alert("Superleap Clinical Protocols & FAQ Hub: Instant counseling guidelines for 140 clinics.");
              }}
              title="Protocols & Clinical FAQs"
            >
              <span className="sl-smart-circle sl-circle-orange">
                <GraduationCap size={12} />
              </span>
              <span className="sl-smartboard-label">Knowledge Hub</span>
            </button>

            {/* Green Team: Clinic Counsellors */}
            <button 
              type="button"
              className="sl-workspace-item"
              onClick={() => onScreenChange('clinic_day')}
              title="140 Clinic Frontline Roster"
            >
              <span className="sl-smart-circle sl-circle-emerald">
                <Users size={12} />
              </span>
              <span className="sl-smartboard-label">Clinic Counsellors</span>
            </button>
          </div>
        )}
      </div>

      {/* 5. Bottom Pinned Admin Profile Chip (Matching Image 1, 2, 3) */}
      <div className="sl-sidebar-footer">
        <div className="sl-admin-chip-wrap">
          <button 
            type="button"
            className="sl-admin-chip"
            onClick={() => setShowAdminMenu(!showAdminMenu)}
            title="Superleap Admin & Frontline Role Switcher"
          >
            <span className="sl-admin-avatar">A</span>
            <div className="sl-admin-details">
              <span className="sl-admin-name">Admin</span>
              <span className="sl-admin-role-sub">{currentRole.replace('_', ' ')}</span>
            </div>
            <ChevronDown size={14} className="sl-admin-chevron" />
          </button>

          {showAdminMenu && (
            <div className="sl-admin-dropdown">
              <div className="sl-admin-dropdown-header">
                <span>Frontline Role Preview</span>
                <small>Test 6 cols vs 40 cols</small>
              </div>
              <button 
                type="button"
                className={`sl-role-menu-item ${currentRole === 'agent' ? 'is-selected' : ''}`}
                onClick={() => {
                  onRoleChange('agent');
                  setShowAdminMenu(false);
                }}
              >
                <strong>Call Agent</strong> (6 columns)
              </button>
              <button 
                type="button"
                className={`sl-role-menu-item ${currentRole === 'counsellor' ? 'is-selected' : ''}`}
                onClick={() => {
                  onRoleChange('counsellor');
                  setShowAdminMenu(false);
                }}
              >
                <strong>Clinic Counsellor</strong> (Clean Image 1)
              </button>
              <button 
                type="button"
                className={`sl-role-menu-item ${currentRole === 'manager' ? 'is-selected' : ''}`}
                onClick={() => {
                  onRoleChange('manager');
                  setShowAdminMenu(false);
                }}
              >
                <strong>Clinic Manager</strong> (10 columns)
              </button>
              <button 
                type="button"
                className={`sl-role-menu-item ${currentRole === 'zoho_legacy' ? 'is-selected' : ''}`}
                onClick={() => {
                  onRoleChange('zoho_legacy');
                  setShowAdminMenu(false);
                }}
              >
                <strong>Zoho Legacy View</strong> (All 40 columns)
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
