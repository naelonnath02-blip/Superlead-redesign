import React from 'react';
import { 
  Sparkles, 
  Search, 
  UserCheck, 
  ChevronDown, 
  Calendar,
  Layers,
  Activity,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export function HeaderNav({ 
  currentRole, 
  onRoleChange, 
  activeScreen, 
  onScreenChange, 
  onOpenCopilot,
  hisSyncActive,
  onTriggerHisSimulation,
  totalLeadsCount,
  activeColumnsCount
}) {
  return (
    <header className="sl-header">
      {/* Main Top Bar */}
      <div className="sl-header-top">
        {/* Superleap Authentic Brand Identity */}
        <div className="sl-brand-group">
          <div className="sl-logo" title="Superleap: The AI CRM for Enterprise Teams">
            {/* Authentic Superleap SVG Mark from superleap.com */}
            <svg 
              viewBox="0 0 32 32" 
              fill="none" 
              className="sl-official-logo-mark"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="32" height="32" rx="6" fill="#072225" />
              <path d="M12.5 7H16.5L20.5 9V11H12.5V7Z" fill="#4BB793" />
              <path d="M20.5 19H12.5L4.5 13V11H12.5L20.5 17V19Z" fill="#4BB793" />
              <path d="M12.5 23H8.5L4.5 21V19H12.5V23Z" fill="#4BB793" />
            </svg>
            
            <div className="sl-logo-text">
              <span className="sl-brand-name">superleap</span>
              <span className="sl-brand-sub">ai crm</span>
            </div>
          </div>

          <div className="sl-brand-divider"></div>

          {/* Client Domain Header: Nova Fertility */}
          <div className="sl-client-chip" title="Active Enterprise Tenant: Nova Fertility (140 Clinics)">
            <span className="sl-client-avatar">NF</span>
            <div className="sl-client-info">
              <span className="sl-client-name">Nova Fertility</span>
              <span className="sl-client-meta">140 Clinics • 28 Cities</span>
            </div>
          </div>
        </div>

        {/* Global Instant Search (Uncluttered, Compact) */}
        <div className="sl-search-box">
          <Search size={14} className="sl-search-icon" />
          <input 
            type="text" 
            placeholder="Search patient records, MRN, mobile, doctor... (⌘K)" 
            className="sl-search-input"
            readOnly
            onClick={() => alert("Quick Search (⌘K): Search across all 18 Lakh active & archived patient records.")}
          />
          <kbd className="sl-kbd">⌘K</kbd>
        </div>

        {/* Right Tools & Frontline Controls */}
        <div className="sl-header-actions">
          {/* HIS Webhook Live Sync Pill */}
          <button 
            type="button"
            className={`sl-his-pill ${hisSyncActive ? 'is-live' : ''}`}
            title="Hospital Information System (HIS) Webhook listener. Click to simulate IVF Cycle Start event."
            onClick={onTriggerHisSimulation}
          >
            <span className="sl-pulse-dot"></span>
            <span className="sl-his-pill-text">HIS Webhook: Live</span>
            <span className="sl-his-pill-btn">Test</span>
          </button>

          {/* SuperAgent AI Button (Superleap Signature) */}
          <button 
            type="button"
            className="sl-btn-superagent"
            onClick={onOpenCopilot}
            title="Open SuperAgent AI Copilot for clinical triage & WhatsApp templates"
          >
            <Sparkles size={14} className="sl-sparkle-mint" />
            <span>SuperAgent AI</span>
          </button>

          {/* Role Switcher (Low Cognitive Load Preview) */}
          <div className="sl-role-badge-wrap">
            <span className="sl-role-caption">Role:</span>
            <div className="sl-select-wrapper">
              <select 
                value={currentRole} 
                onChange={(e) => onRoleChange(e.target.value)}
                className="sl-role-select"
                title="Switch role view to test agent experience vs 40-col legacy"
              >
                <option value="agent">Call Agent (6 cols)</option>
                <option value="counsellor">Clinic Counsellor (8 cols)</option>
                <option value="manager">Clinic Manager (10 cols)</option>
                <option value="zoho_legacy">Zoho Legacy (40 cols)</option>
              </select>
              <ChevronDown size={12} className="sl-select-arrow" />
            </div>
          </div>

          {/* Frontline Profile Avatar */}
          <div className="sl-avatar-chip" title="Logged in as Priya Nair (Lead Clinic Counsellor, Bangalore)">
            <span className="sl-avatar-initials">
              {currentRole === 'manager' ? 'SV' : currentRole === 'counsellor' ? 'PN' : 'AG'}
            </span>
          </div>
        </div>
      </div>

      {/* Screen Navigation Tabs (Modeled directly after superleap.com subnav) */}
      <nav className="sl-nav-subbar">
        <div className="sl-nav-pills">
          <button 
            className={`sl-nav-pill ${activeScreen === 'leads' ? 'is-active' : ''}`}
            onClick={() => onScreenChange('leads')}
          >
            <Layers size={14} />
            <span>Patient Journeys</span>
            <span className="sl-pill-count">{totalLeadsCount}</span>
          </button>

          <button 
            className={`sl-nav-pill ${activeScreen === 'clinic_day' ? 'is-active' : ''}`}
            onClick={() => onScreenChange('clinic_day')}
          >
            <Calendar size={14} />
            <span>Clinic Day at Glance</span>
            <span className="sl-pill-highlight">Manager</span>
          </button>

          <button 
            className={`sl-nav-pill ${activeScreen === 'pipeline' ? 'is-active' : ''}`}
            onClick={() => onScreenChange('pipeline')}
          >
            <Activity size={14} />
            <span>Pipeline (Stages)</span>
          </button>

          <button 
            className={`sl-nav-pill ${activeScreen === 'audit' ? 'is-active' : ''}`}
            onClick={() => onScreenChange('audit')}
          >
            <ShieldCheck size={14} />
            <span>Deployment Health</span>
            <span className="sl-pill-check">100% Trust</span>
          </button>
        </div>

        {/* Lightweight Deployment Assurance Status (Zero Clutter) */}
        <div className="sl-nav-assurance">
          <span className="sl-assurance-item">
            <CheckCircle2 size={12} className="sl-text-mint" />
            <span><strong>{activeColumnsCount}</strong> cols active (Role optimized)</span>
          </span>
          <span className="sl-assurance-item">
            <CheckCircle2 size={12} className="sl-text-mint" />
            <span><strong>0%</strong> Filter Reset</span>
          </span>
          <span className="sl-assurance-item">
            <CheckCircle2 size={12} className="sl-text-mint" />
            <span><strong>1,842</strong> Zoho Names Sanitized</span>
          </span>
        </div>
      </nav>
    </header>
  );
}
