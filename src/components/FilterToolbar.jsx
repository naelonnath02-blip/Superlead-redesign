import React, { useState } from 'react';
import { 
  ArrowUpDown, 
  Filter, 
  Plus, 
  X, 
  Check, 
  Save, 
  Bookmark, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { PATIENT_STAGES, CLINIC_LOCATIONS } from '../data/mockLeads';
import { ManageColumnsDropdown } from './ManageColumnsDropdown';
import { AddFilterModal } from './AddFilterModal';
import { UnifiedFilterDropdown } from './UnifiedFilterDropdown';

export function FilterToolbar({
  filters,
  onUpdateFilter,
  onResetFilters,
  onOpenColumnManager,
  visibleColumns = [],
  onUpdateColumns,
  savedViews = [],
  activeViewId,
  onSelectView,
  onTogglePinDefault,
  onRenameView,
  onDeleteView,
  onSaveCurrentView,
  activeColumnsCount,
  totalColumnsCount,
  matchedCount,
  totalCount,
  sortField,
  sortAsc,
  onToggleSort
}) {
  const [showAddFilterMenu, setShowAddFilterMenu] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [performanceFilter, setPerformanceFilter] = useState('all');

  // Check which filters are actively set
  const hasActiveFilters = 
    filters.stage !== 'all' || 
    filters.clinic !== 'all' || 
    filters.source !== 'all' || 
    filters.minScore > 0 || 
    filters.onlyToday ||
    performanceFilter !== 'all';

  return (
    <div className="sl-filter-bar-container">
      <div className="sl-filter-bar-left">
        {/* 1. Sort Button (Matching Image 1: ↑↓ Sort) */}
        <button 
          type="button" 
          className="sl-filter-sort-btn"
          onClick={() => onToggleSort ? onToggleSort() : alert("Sorted by Lead Intent & Followup Date")}
          title="Sort Leads & Deals"
        >
          <ArrowUpDown size={13} className="sl-sort-icon" />
          <span>Sort</span>
        </button>

        {/* 2. Signature Superleap Filter Pills (Matching Image 1: ▽ Current Performance level is [ Excellent ] ✕) */}
        {/* Performance Level Pill */}
        {performanceFilter && performanceFilter !== 'all' && (
          <div className="sl-pill-filter">
            <Filter size={11} className="sl-pill-filter-icon" />
            <span className="sl-pill-label">Current Performance level is</span>
            <button 
              type="button" 
              className="sl-pill-value-chip"
              onClick={() => setEditingPill(editingPill === 'perf' ? null : 'perf')}
              title="Click to change performance filter"
            >
              {performanceFilter}
            </button>
            <button 
              type="button" 
              className="sl-pill-close-btn"
              onClick={() => setPerformanceFilter('all')}
              title="Remove filter"
            >
              <X size={11} />
            </button>

            {editingPill === 'perf' && (
              <div className="sl-pill-popover">
                {['Excellent', 'High Priority', 'Standard', 'all'].map(p => (
                  <button 
                    key={p} 
                    type="button"
                    className="sl-pill-popover-item"
                    onClick={() => {
                      setPerformanceFilter(p);
                      setEditingPill(null);
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Stage Filter Pill */}
        {filters.stage !== 'all' && (
          <div className="sl-pill-filter">
            <Filter size={11} className="sl-pill-filter-icon" />
            <span className="sl-pill-label">Stage is</span>
            <button 
              type="button" 
              className="sl-pill-value-chip sl-chip-amber"
              onClick={() => setEditingPill(editingPill === 'stage' ? null : 'stage')}
            >
              {PATIENT_STAGES[filters.stage]?.label || filters.stage}
            </button>
            <button 
              type="button" 
              className="sl-pill-close-btn"
              onClick={() => onUpdateFilter('stage', 'all')}
              title="Remove filter"
            >
              <X size={11} />
            </button>

            {editingPill === 'stage' && (
              <div className="sl-pill-popover">
                <button 
                  type="button" 
                  className="sl-pill-popover-item"
                  onClick={() => { onUpdateFilter('stage', 'all'); setEditingPill(null); }}
                >
                  All Stages
                </button>
                {Object.values(PATIENT_STAGES).map(st => (
                  <button 
                    key={st.id} 
                    type="button" 
                    className="sl-pill-popover-item"
                    onClick={() => { onUpdateFilter('stage', st.id); setEditingPill(null); }}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Clinic / City Filter Pill */}
        {filters.clinic !== 'all' && (
          <div className="sl-pill-filter">
            <Filter size={11} className="sl-pill-filter-icon" />
            <span className="sl-pill-label">Clinic is</span>
            <button 
              type="button" 
              className="sl-pill-value-chip sl-chip-blue"
              onClick={() => setEditingPill(editingPill === 'clinic' ? null : 'clinic')}
            >
              {CLINIC_LOCATIONS.find(c => c.id === filters.clinic)?.name || filters.clinic}
            </button>
            <button 
              type="button" 
              className="sl-pill-close-btn"
              onClick={() => onUpdateFilter('clinic', 'all')}
              title="Remove filter"
            >
              <X size={11} />
            </button>
          </div>
        )}

        {/* Lead Source Filter Pill */}
        {filters.source !== 'all' && (
          <div className="sl-pill-filter">
            <Filter size={11} className="sl-pill-filter-icon" />
            <span className="sl-pill-label">Channel is</span>
            <button 
              type="button" 
              className="sl-pill-value-chip sl-chip-purple"
            >
              {filters.source}
            </button>
            <button 
              type="button" 
              className="sl-pill-close-btn"
              onClick={() => onUpdateFilter('source', 'all')}
              title="Remove filter"
            >
              <X size={11} />
            </button>
          </div>
        )}

        {/* High Intent Score Pill */}
        {filters.minScore > 0 && (
          <div className="sl-pill-filter">
            <Filter size={11} className="sl-pill-filter-icon" />
            <span className="sl-pill-label">Intent Score ≥</span>
            <span className="sl-pill-value-chip sl-chip-emerald">{filters.minScore}%</span>
            <button 
              type="button" 
              className="sl-pill-close-btn"
              onClick={() => onUpdateFilter('minScore', 0)}
              title="Remove filter"
            >
              <X size={11} />
            </button>
          </div>
        )}

        {/* 3. + Add Filter Button (Matching Image 1) */}
        <div className="sl-add-filter-wrap">
          <button 
            type="button" 
            className="sl-add-filter-btn"
            onClick={() => setShowAddFilterMenu(!showAddFilterMenu)}
          >
            <Plus size={13} />
            <span>Add Filter</span>
          </button>

          {showAddFilterMenu && (
            <div className="sl-add-filter-menu">
              <div className="sl-add-filter-header">Add Filter Criterion</div>
              
              <button 
                type="button"
                className="sl-filter-menu-opt"
                onClick={() => {
                  onUpdateFilter('stage', 'first_consultation');
                  setShowAddFilterMenu(false);
                }}
              >
                <span>Stage: First Consultation</span>
              </button>

              <button 
                type="button"
                className="sl-filter-menu-opt"
                onClick={() => {
                  onUpdateFilter('clinic', 'blr_koramangala');
                  setShowAddFilterMenu(false);
                }}
              >
                <span>Clinic: Bangalore Koramangala</span>
              </button>

              <button 
                type="button"
                className="sl-filter-menu-opt"
                onClick={() => {
                  onUpdateFilter('minScore', 85);
                  setShowAddFilterMenu(false);
                }}
              >
                <span>Intent Score: High (85+)</span>
              </button>

              <button 
                type="button"
                className="sl-filter-menu-opt"
                onClick={() => {
                  onUpdateFilter('source', 'Facebook Ads');
                  setShowAddFilterMenu(false);
                }}
              >
                <span>Channel: Facebook Ads</span>
              </button>

              <button 
                type="button"
                className="sl-filter-menu-opt"
                onClick={() => {
                  onUpdateFilter('source', 'Email Marketing');
                  setShowAddFilterMenu(false);
                }}
              >
                <span>Channel: Email Marketing</span>
              </button>

              <button 
                type="button"
                className="sl-filter-menu-opt"
                onClick={() => {
                  setPerformanceFilter('Excellent');
                  setShowAddFilterMenu(false);
                }}
              >
                <span>Performance: Excellent</span>
              </button>
            </div>
          )}
        </div>

        {/* Clear All Filters Button */}
        {hasActiveFilters && (
          <button 
            type="button" 
            className="sl-filter-reset-text-btn"
            onClick={() => {
              onResetFilters();
              setPerformanceFilter('all');
            }}
          >
            Clear all
          </button>
        )}
      </div>

      {/* Right Controls: Manage Columns, Save Filter & Count */}
      <div className="sl-filter-bar-right">
        {/* Requirement 1: Explicit Manage Columns Dropdown (Matching User Screenshot) */}
        {onUpdateColumns ? (
          <ManageColumnsDropdown 
            visibleColumns={visibleColumns}
            onUpdateColumns={onUpdateColumns}
            onOpenAdvancedModal={onOpenColumnManager}
          />
        ) : (
          <button 
            type="button"
            className="sl-manage-columns-btn"
            onClick={onOpenColumnManager}
            title="Manage visible table columns"
          >
            <span>Manage Columns</span>
            <ChevronDown size={14} />
          </button>
        )}

        {/* Unified Filter Dropdown (Clubbed Filter, Saved Views, Pinning, and Clear) */}
        <UnifiedFilterDropdown 
          filters={filters}
          hasActiveFilters={hasActiveFilters}
          onResetFilters={() => {
            onResetFilters();
            setPerformanceFilter('all');
          }}
          onUpdateFilter={onUpdateFilter}
          savedViews={savedViews}
          activeViewId={activeViewId}
          onSelectView={onSelectView}
          onTogglePinDefault={onTogglePinDefault}
          onRenameView={onRenameView}
          onDeleteView={onDeleteView}
          onOpenSaveModal={() => setShowSaveModal(true)}
        />

        {/* Matched Count */}
        <span className="sl-matched-count-text">
          Showing <strong>{matchedCount}</strong> of {totalCount} deals
        </span>
      </div>

      {/* Add Filter Name Modal (Matching Screenshot 2) */}
      <AddFilterModal 
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={(name, setAsDefault) => {
          if (onSaveCurrentView) {
            onSaveCurrentView(name, setAsDefault);
          }
        }}
      />
    </div>
  );
}
