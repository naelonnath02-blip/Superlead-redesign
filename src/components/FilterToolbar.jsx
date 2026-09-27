import React from 'react';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  Columns3, 
  Building2, 
  Activity, 
  Megaphone, 
  Flame, 
  Dna,
  Calendar,
  X
} from 'lucide-react';
import { PATIENT_STAGES, CLINIC_LOCATIONS } from '../data/mockLeads';

export function FilterToolbar({
  filters,
  onUpdateFilter,
  onResetFilters,
  onOpenColumnManager,
  activeColumnsCount,
  totalColumnsCount,
  matchedCount,
  totalCount
}) {
  const isAnyFilterActive = 
    filters.search || 
    filters.stage !== 'all' || 
    filters.clinic !== 'all' || 
    filters.source !== 'all' || 
    filters.minScore > 0 || 
    filters.hisSync !== 'all' ||
    filters.onlyToday;

  return (
    <div className="sl-filter-toolbar">
      <div className="sl-filter-toolbar-row">
        {/* Search Input */}
        <div className="sl-filter-search-group">
          <Search size={15} className="sl-input-icon" />
          <input 
            type="text"
            placeholder="Search patient, phone, MRN, city..."
            value={filters.search}
            onChange={(e) => onUpdateFilter('search', e.target.value)}
            className="sl-filter-input"
          />
          {filters.search && (
            <button 
              className="sl-input-clear"
              onClick={() => onUpdateFilter('search', '')}
              title="Clear search"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Stage Filter */}
        <div className="sl-filter-select-group">
          <Activity size={14} className="sl-filter-field-icon" />
          <select 
            value={filters.stage} 
            onChange={(e) => onUpdateFilter('stage', e.target.value)}
            className="sl-filter-select"
          >
            <option value="all">All Journey Stages</option>
            {Object.values(PATIENT_STAGES).map((st) => (
              <option key={st.id} value={st.id}>
                {st.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clinic Filter */}
        <div className="sl-filter-select-group">
          <Building2 size={14} className="sl-filter-field-icon" />
          <select 
            value={filters.clinic} 
            onChange={(e) => onUpdateFilter('clinic', e.target.value)}
            className="sl-filter-select"
          >
            <option value="all">All Clinics (140 Branches)</option>
            {CLINIC_LOCATIONS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Lead Source Filter */}
        <div className="sl-filter-select-group">
          <Megaphone size={14} className="sl-filter-field-icon" />
          <select 
            value={filters.source} 
            onChange={(e) => onUpdateFilter('source', e.target.value)}
            className="sl-filter-select"
          >
            <option value="all">All Sources</option>
            <option value="Meta Ads">Meta Ads (FB/Insta)</option>
            <option value="Google Ads">Google Search</option>
            <option value="WhatsApp">WhatsApp Inbound</option>
            <option value="Doctor Referral">Doctor Referral</option>
            <option value="Website Form">Website Direct</option>
          </select>
        </div>

        {/* Intent Score Filter */}
        <div className="sl-filter-select-group">
          <Flame size={14} className="sl-filter-field-icon" />
          <select 
            value={filters.minScore} 
            onChange={(e) => onUpdateFilter('minScore', Number(e.target.value))}
            className="sl-filter-select"
          >
            <option value={0}>All Intent Scores</option>
            <option value={90}>Urgent / Hot (90+)</option>
            <option value={80}>High Intent (80+)</option>
            <option value={70}>Warm (70+)</option>
          </select>
        </div>

        {/* HIS Sync Filter */}
        <div className="sl-filter-select-group">
          <Dna size={14} className="sl-filter-field-icon" />
          <select 
            value={filters.hisSync} 
            onChange={(e) => onUpdateFilter('hisSync', e.target.value)}
            className="sl-filter-select"
          >
            <option value="all">All HIS Statuses</option>
            <option value="cycle_active">🧬 IVF Cycle Active</option>
            <option value="synced">Synced with Hospital</option>
            <option value="pending">Pending Registration</option>
          </select>
        </div>

        {/* Today Only Quick Toggle */}
        <button 
          className={`sl-filter-toggle-btn ${filters.onlyToday ? 'is-active' : ''}`}
          onClick={() => onUpdateFilter('onlyToday', !filters.onlyToday)}
          title="Toggle today's scheduled appointments and urgent followups"
        >
          <Calendar size={14} />
          <span>Today Only</span>
        </button>

        {/* Reset Filters Button */}
        {isAnyFilterActive && (
          <button 
            className="sl-filter-reset-btn"
            onClick={onResetFilters}
            title="Reset all filters to default"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>
        )}

        <div className="sl-filter-spacer"></div>

        {/* Right side: Lead Counter & Manage Columns Button */}
        <div className="sl-filter-tools-right">
          <span className="sl-results-counter">
            Showing <strong>{matchedCount}</strong> of {totalCount} leads
          </span>

          {/* Manage Columns CTA */}
          <button 
            className="sl-btn sl-btn-manage-columns"
            onClick={onOpenColumnManager}
            id="manage-columns-btn"
            title="Manage visible columns and role presets"
          >
            <Columns3 size={15} />
            <span>Manage Columns</span>
            <span className="sl-columns-badge">{activeColumnsCount}/{totalColumnsCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
