import React, { useState } from 'react';
import { 
  Home, 
  Percent,
  GitBranch, 
  FileText, 
  Briefcase, 
  MessageSquare, 
  ChevronDown,
  X
} from 'lucide-react';

export function SidebarNav({
  activeScreen,
  onScreenChange,
  currentRole,
  onRoleChange,
  onSelectQuickSmartboard,
  activeSmartboardFilter,
  onOpenCopilot,
  totalLeadsCount = 140,
  isMobileOpen = false,
  onCloseMobile
}) {
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  const handleNavClick = (screenId, smartboardType) => {
    onScreenChange(screenId);
    if (smartboardType && onSelectQuickSmartboard) {
      onSelectQuickSmartboard(smartboardType);
    }
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <aside className={`sl-sidebar-container ${isMobileOpen ? 'is-mobile-open' : ''}`}>
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

        {/* Mobile Close Button */}
        {onCloseMobile && (
          <button 
            type="button" 
            className="sl-sidebar-mobile-close"
            onClick={onCloseMobile}
            title="Close navigation"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* 2. Unified Main Navigation (No colored icons, clean monochrome outlines) */}
      <nav className="sl-sidebar-top-nav">
        {/* Home (SuperAgent AI) */}
        <button 
          type="button"
          className={`sl-nav-item ${activeScreen === 'home' || activeScreen === 'overview' ? 'is-active' : ''}`}
          onClick={() => handleNavClick('home')}
          title="Home - SuperAgent AI"
        >
          <Home size={17} className="sl-nav-icon" />
          <span className="sl-nav-label">Home</span>
        </button>

        {/* Leads (Right below Home, monochrome standard icon) */}
        <button 
          type="button"
          className={`sl-nav-item ${activeScreen === 'leads' ? 'is-active' : ''}`}
          onClick={() => handleNavClick('leads', 'all')}
          title="Leads / Deals Pipeline"
        >
          <Percent size={17} className="sl-nav-icon" strokeWidth={2.2} />
          <span className="sl-nav-label">Leads</span>
        </button>

        {/* Pipelines / Patient Journey */}
        <button 
          type="button"
          className={`sl-nav-item ${activeScreen === 'pipeline' ? 'is-active' : ''}`}
          onClick={() => handleNavClick('pipeline')}
          title="Clinical Pipeline (Kanban)"
        >
          <GitBranch size={17} className="sl-nav-icon" />
          <span className="sl-nav-label">Pipeline</span>
        </button>

        {/* Clinic Day */}
        <button 
          type="button"
          className={`sl-nav-item ${activeScreen === 'clinic_day' ? 'is-active' : ''}`}
          onClick={() => handleNavClick('clinic_day')}
          title="Today's Clinic Actions"
        >
          <FileText size={17} className="sl-nav-icon" />
          <span className="sl-nav-label">Clinic Day</span>
        </button>

        {/* Reports & Analytics */}
        <button 
          type="button" 
          className={`sl-nav-item ${activeScreen === 'reports_dashboard' ? 'is-active' : ''}`}
          onClick={() => handleNavClick('reports_dashboard')}
          title="Reports & Analytics Dashboard"
        >
          <Briefcase size={17} className="sl-nav-icon" />
          <span className="sl-nav-label">Reports & Analytics</span>
        </button>

        {/* Chat / Engage */}
        <button 
          type="button" 
          className={`sl-nav-item ${activeScreen === 'chat' ? 'is-active' : ''}`}
          onClick={() => handleNavClick('chat')}
          title="Omnichannel Chat & WhatsApp"
        >
          <MessageSquare size={17} className="sl-nav-icon" />
          <span className="sl-nav-label">Chat</span>
        </button>
      </nav>

      {/* 3. Bottom Pinned Admin Profile Chip */}
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
              </div>
              <button 
                type="button"
                className={`sl-role-menu-item ${currentRole === 'agent' ? 'is-selected' : ''}`}
                onClick={() => {
                  onRoleChange('agent');
                  setShowAdminMenu(false);
                }}
              >
                <span>Call Agent</span>
              </button>
              <button 
                type="button"
                className={`sl-role-menu-item ${currentRole === 'counsellor' ? 'is-selected' : ''}`}
                onClick={() => {
                  onRoleChange('counsellor');
                  setShowAdminMenu(false);
                }}
              >
                <span>Clinic Counsellor</span>
              </button>
              <button 
                type="button"
                className={`sl-role-menu-item ${currentRole === 'manager' ? 'is-selected' : ''}`}
                onClick={() => {
                  onRoleChange('manager');
                  setShowAdminMenu(false);
                }}
              >
                <span>Clinic Manager</span>
              </button>
              <button 
                type="button"
                className={`sl-role-menu-item ${currentRole === 'zoho_legacy' ? 'is-selected' : ''}`}
                onClick={() => {
                  onRoleChange('zoho_legacy');
                  setShowAdminMenu(false);
                }}
              >
                <span>Zoho Legacy View</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
