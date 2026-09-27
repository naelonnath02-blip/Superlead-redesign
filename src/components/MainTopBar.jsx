import React, { useState } from 'react';
import { 
  ChevronDown, 
  Search, 
  Layers, 
  Sparkles, 
  Grid, 
  Percent, 
  Activity, 
  MessageSquare, 
  PhoneCall, 
  GitFork, 
  BarChart2, 
  Sliders, 
  Check, 
  Plus,
  X
} from 'lucide-react';

export function MainTopBar({
  savedViews = [],
  activeViewId,
  onSelectView,
  searchQuery,
  onSearchChange,
  onOpenColumnManager,
  activeColumnsCount = 7,
  totalColumnsCount = 40,
  onOpenCopilot,
  hisSyncActive = true,
  onTriggerHisSimulation,
  activeScreen = 'leads',
  onScreenChange
}) {
  const [showViewsDropdown, setShowViewsDropdown] = useState(false);
  const [showAppLauncher, setShowAppLauncher] = useState(false);

  const activeView = savedViews.find(v => v.id === activeViewId) || savedViews[0] || { name: 'All Leads' };

  return (
    <header className="sl-canvas-top-bar">
      {/* 1. Dynamic Breadcrumbs (Matching Image 1: Leads ⌄ / % All Leads ⌄ and Image 3: Reports & Analytics / Dashboard) */}
      <div className="sl-breadcrumb-group">
        {activeScreen === 'reports_dashboard' ? (
          <>
            <div className="sl-breadcrumb-item">
              <span className="sl-breadcrumb-parent">Reports & Analytics</span>
            </div>
            <span className="sl-breadcrumb-sep">/</span>
            <div className="sl-breadcrumb-item">
              <span className="sl-breadcrumb-active-view-btn">Dashboard</span>
            </div>
          </>
        ) : activeScreen === 'pipeline' ? (
          <>
            <div className="sl-breadcrumb-item">
              <span className="sl-breadcrumb-parent">Pipeline</span>
            </div>
            <span className="sl-breadcrumb-sep">/</span>
            <div className="sl-breadcrumb-item">
              <span className="sl-breadcrumb-active-view-btn">Clinical Kanban</span>
            </div>
          </>
        ) : activeScreen === 'clinic_day' ? (
          <>
            <div className="sl-breadcrumb-item">
              <span className="sl-breadcrumb-parent">Clinic Day</span>
            </div>
            <span className="sl-breadcrumb-sep">/</span>
            <div className="sl-breadcrumb-item">
              <span className="sl-breadcrumb-active-view-btn">Today's Appointments</span>
            </div>
          </>
        ) : (
          <>
            <div className="sl-breadcrumb-item">
              <span className="sl-breadcrumb-parent">Leads</span>
              <ChevronDown size={14} className="sl-breadcrumb-chevron" />
            </div>
            
            <span className="sl-breadcrumb-sep">/</span>

            <div className="sl-view-dropdown-wrap">
              <button 
                type="button" 
                className="sl-breadcrumb-active-view-btn"
                onClick={() => setShowViewsDropdown(!showViewsDropdown)}
                title="Switch Saved Views (0% Filter Loss)"
              >
                <span className="sl-breadcrumb-percent-icon">
                  <Percent size={11} strokeWidth={2.8} />
                </span>
                <span className="sl-active-view-name">{activeView.name}</span>
                <ChevronDown size={14} className="sl-breadcrumb-chevron" />
              </button>

          {showViewsDropdown && (
            <div className="sl-saved-views-menu">
              <div className="sl-saved-views-menu-header">
                <span>Frontline Saved Views</span>
                <small>0% filter loss across views</small>
              </div>
              {savedViews.map((view) => (
                <button
                  key={view.id}
                  type="button"
                  className={`sl-view-menu-item ${view.id === activeViewId ? 'is-selected' : ''}`}
                  onClick={() => {
                    onSelectView(view.id);
                    setShowViewsDropdown(false);
                  }}
                >
                  <span className="sl-view-menu-name">{view.name}</span>
                  {view.id === activeViewId && <Check size={14} className="sl-check-mint" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </>
    )}
  </div>

      {/* 2. Right Side Controls */}
      <div className="sl-top-bar-tools">
        {/* Instant Search Bar */}
        <div className="sl-canvas-search-box">
          <Search size={14} className="sl-canvas-search-icon" />
          <input 
            type="text" 
            placeholder="Search...." 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="sl-canvas-search-input"
            id="sl-lead-search-input"
          />
          {searchQuery && (
            <button 
              type="button" 
              className="sl-search-clear-btn"
              onClick={() => onSearchChange('')}
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Manage Columns Icon (Stacked Layers / Boxes Icon as in Image 1) */}
        <button 
          type="button"
          className="sl-icon-tool-btn"
          onClick={onOpenColumnManager}
          title={`Manage Visible Columns (${activeColumnsCount}/${totalColumnsCount} visible)`}
        >
          <Layers size={16} />
          <span className="sl-col-count-bubble">{activeColumnsCount}</span>
        </button>

        {/* HIS Webhook Live Test Button */}
        <button 
          type="button"
          className={`sl-his-compact-pill ${hisSyncActive ? 'is-live' : ''}`}
          onClick={onTriggerHisSimulation}
          title="Hospital Information System (HIS) live webhook. Click to simulate IVF Cycle Commencement."
        >
          <span className="sl-pulse-dot"></span>
          <span className="sl-his-label">HIS Live</span>
        </button>

        {/* SuperAgent AI Button */}
        <button 
          type="button"
          className="sl-btn-superagent-mint"
          onClick={onOpenCopilot}
          title="Open SuperAgent AI Copilot for clinical triage"
        >
          <Sparkles size={14} />
          <span>SuperAgent AI</span>
        </button>

        {/* Superleap 3x3 App Launcher Overlay Button (Matching Image 1, 2, 3) */}
        <div className="sl-app-launcher-wrap">
          <button 
            type="button"
            className={`sl-app-launcher-trigger ${showAppLauncher ? 'is-open' : ''}`}
            onClick={() => setShowAppLauncher(!showAppLauncher)}
            title="Superleap App Switcher"
          >
            <Grid size={16} />
          </button>

          {showAppLauncher && (
            <div className="sl-app-launcher-popover">
              <div className="sl-launcher-grid">
                {/* 1. Pipeline */}
                <button 
                  type="button" 
                  className={`sl-launcher-tile ${activeScreen === 'pipeline' ? 'is-active-tile' : ''}`}
                  onClick={() => {
                    onScreenChange('pipeline');
                    setShowAppLauncher(false);
                  }}
                >
                  <div className="sl-launcher-icon">
                    <GitFork size={20} />
                  </div>
                  <span>Pipeline</span>
                </button>

                {/* 2. Leads (Active Dark Teal) */}
                <button 
                  type="button" 
                  className={`sl-launcher-tile ${activeScreen === 'leads' ? 'is-active-tile' : ''}`}
                  onClick={() => {
                    onScreenChange('leads');
                    setShowAppLauncher(false);
                  }}
                >
                  <div className="sl-launcher-icon">
                    <Percent size={20} strokeWidth={2.5} />
                  </div>
                  <span>Leads</span>
                </button>

                {/* 3. Engage */}
                <button 
                  type="button" 
                  className="sl-launcher-tile"
                  onClick={() => {
                    alert("Superleap Engage: Automated WhatsApp, SMS & Email journeys configured for Nova Fertility.");
                    setShowAppLauncher(false);
                  }}
                >
                  <div className="sl-launcher-icon">
                    <MessageSquare size={20} />
                  </div>
                  <span>Engage</span>
                </button>

                {/* 4. Voice AI */}
                <button 
                  type="button" 
                  className="sl-launcher-tile"
                  onClick={() => {
                    alert("Superleap Voice AI: Inbound triage and automated consultation reminder voice calls.");
                    setShowAppLauncher(false);
                  }}
                >
                  <div className="sl-launcher-icon">
                    <PhoneCall size={20} />
                  </div>
                  <span>Voice AI</span>
                </button>

                {/* 5. Workflows */}
                <button 
                  type="button" 
                  className="sl-launcher-tile"
                  onClick={() => {
                    alert("Superleap Workflows: Event-driven reverse synchronization with Hospital Core HIS.");
                    setShowAppLauncher(false);
                  }}
                >
                  <div className="sl-launcher-icon">
                    <Sliders size={20} />
                  </div>
                  <span>Workflows</span>
                </button>

                {/* 6. Reports */}
                <button 
                  type="button" 
                  className={`sl-launcher-tile ${activeScreen === 'reports_dashboard' ? 'is-active-tile' : ''}`}
                  onClick={() => {
                    onScreenChange('reports_dashboard');
                    setShowAppLauncher(false);
                  }}
                >
                  <div className="sl-launcher-icon">
                    <BarChart2 size={20} />
                  </div>
                  <span>Reports</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
