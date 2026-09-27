import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Filter, 
  Search, 
  X, 
  Pin, 
  Edit2, 
  Check, 
  Trash2, 
  Bookmark, 
  ChevronDown, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { PATIENT_STAGES, CLINIC_LOCATIONS } from '../data/mockLeads';

export function UnifiedFilterDropdown({
  filters = {},
  hasActiveFilters = false,
  onResetFilters,
  onUpdateFilter,
  savedViews = [],
  activeViewId,
  onSelectView,
  onTogglePinDefault,
  onRenameView,
  onDeleteView,
  onOpenSaveModal
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingViewId, setEditingViewId] = useState(null);
  const [editName, setEditName] = useState('');
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Calculate active filter count
  const activeCount = useMemo(() => {
    let count = 0;
    if (filters.stage && filters.stage !== 'all') count++;
    if (filters.clinic && filters.clinic !== 'all') count++;
    if (filters.source && filters.source !== 'all') count++;
    if (filters.minScore > 0) count++;
    if (filters.onlyToday) count++;
    return count;
  }, [filters]);

  const defaultViews = savedViews.filter(v => v.isDefault);
  const nonDefaultViews = savedViews.filter(v => !v.isDefault);

  const filteredDefault = defaultViews.filter(v => 
    v.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredNonDefault = nonDefaultViews.filter(v => 
    v.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeView = savedViews.find(v => v.id === activeViewId) || savedViews[0];

  const handleStartEdit = (view, e) => {
    e.stopPropagation();
    setEditingViewId(view.id);
    setEditName(view.name);
  };

  const handleSaveRename = (viewId, e) => {
    e.stopPropagation();
    if (editName.trim() && onRenameView) {
      onRenameView(viewId, editName.trim());
    }
    setEditingViewId(null);
  };

  return (
    <div className="sl-unified-filter-wrap" ref={dropdownRef}>
      {/* Single Unified "Filter ▾" Button (Clubbing Saved Filters, Save, and Clear) */}
      <button 
        type="button" 
        className={`sl-btn-unified-filter ${isOpen ? 'is-open' : ''} ${hasActiveFilters ? 'has-active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Filter options, saved views, and view presets"
        id="sl-unified-filter-btn"
      >
        <Filter size={13} className="sl-unified-filter-icon" />
        <span className="sl-unified-filter-title">Filter</span>
        
        {/* Only show view pill if on a custom/named saved view, keeping default view ultra-compact */}
        {activeView && activeView.id !== 'all' && (
          <span className="sl-unified-view-pill" title={activeView.name}>
            {activeView.name}
          </span>
        )}

        {/* Count Badge if active criteria are applied */}
        {activeCount > 0 && (
          <span className="sl-unified-count-badge" title={`${activeCount} active filter criteria`}>
            {activeCount}
          </span>
        )}

        <ChevronDown size={13} className={`sl-unified-chevron ${isOpen ? 'is-rotated' : ''}`} />
      </button>

      {/* Unified Popover Menu */}
      {isOpen && (
        <div className="sl-unified-filter-popover" id="sl-unified-filter-popover-menu">
          {/* Popover Header */}
          <div className="sl-unified-pop-header">
            <div className="sl-unified-header-title">
              <Filter size={13} />
              <span>Filters & Views</span>
            </div>

            <div className="sl-unified-header-actions">
              {hasActiveFilters && (
                <button 
                  type="button" 
                  className="sl-pop-clear-btn"
                  onClick={() => {
                    onResetFilters();
                  }}
                  title="Clear all active criteria"
                >
                  <RotateCcw size={11} />
                  <span>Clear all</span>
                </button>
              )}
              <button 
                type="button" 
                className="sl-pop-close-x"
                onClick={() => setIsOpen(false)}
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Active Filter Criteria Quick Chips (inside the dropdown) */}
          {hasActiveFilters && onUpdateFilter && (
            <div className="sl-unified-active-chips-box">
              <div className="sl-active-chips-title">Active Criteria ({activeCount})</div>
              <div className="sl-active-chips-list">
                {filters.stage && filters.stage !== 'all' && (
                  <span className="sl-active-chip">
                    Stage: {PATIENT_STAGES[filters.stage]?.label || filters.stage}
                    <button 
                      type="button" 
                      onClick={() => onUpdateFilter('stage', 'all')}
                      title="Remove stage filter"
                    >
                      <X size={10} />
                    </button>
                  </span>
                )}
                {filters.clinic && filters.clinic !== 'all' && (
                  <span className="sl-active-chip">
                    Clinic: {CLINIC_LOCATIONS.find(c => c.id === filters.clinic)?.name || filters.clinic}
                    <button 
                      type="button" 
                      onClick={() => onUpdateFilter('clinic', 'all')}
                      title="Remove clinic filter"
                    >
                      <X size={10} />
                    </button>
                  </span>
                )}
                {filters.source && filters.source !== 'all' && (
                  <span className="sl-active-chip">
                    Channel: {filters.source}
                    <button 
                      type="button" 
                      onClick={() => onUpdateFilter('source', 'all')}
                      title="Remove channel filter"
                    >
                      <X size={10} />
                    </button>
                  </span>
                )}
                {filters.minScore > 0 && (
                  <span className="sl-active-chip">
                    Intent: ≥{filters.minScore}%
                    <button 
                      type="button" 
                      onClick={() => onUpdateFilter('minScore', 0)}
                      title="Remove score filter"
                    >
                      <X size={10} />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Quick Action: Save Current Filters */}
          <div className="sl-unified-save-banner">
            <button 
              type="button" 
              className="sl-unified-save-btn"
              onClick={() => {
                setIsOpen(false);
                onOpenSaveModal();
              }}
            >
              <Bookmark size={13} />
              <span>Save current filters as view...</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="sl-unified-search-row">
            <Search size={13} className="sl-unified-search-icon" />
            <input 
              type="text" 
              placeholder="Type to search saved views..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="sl-unified-search-input"
            />
            {searchQuery && (
              <button 
                type="button" 
                className="sl-unified-search-clear"
                onClick={() => setSearchQuery('')}
              >
                <X size={11} />
              </button>
            )}
          </div>

          <div className="sl-unified-views-scroll">
            {/* 1. Default Filter Section (Matching Screenshot 3) */}
            <div className="sl-unified-section">
              <span className="sl-unified-section-label">Default Filter</span>

              {filteredDefault.length > 0 ? (
                filteredDefault.map((view) => (
                  <div 
                    key={view.id}
                    className={`sl-view-row is-default ${view.id === activeViewId ? 'is-active-row' : ''}`}
                    onClick={() => {
                      onSelectView(view.id);
                      setIsOpen(false);
                    }}
                  >
                    {editingViewId === view.id ? (
                      <div className="sl-inline-edit-wrap" onClick={(e) => e.stopPropagation()}>
                        <input 
                          type="text" 
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="sl-inline-edit-input"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveRename(view.id, e);
                            if (e.key === 'Escape') setEditingViewId(null);
                          }}
                        />
                        <button 
                          type="button" 
                          className="sl-inline-edit-save"
                          onClick={(e) => handleSaveRename(view.id, e)}
                        >
                          <Check size={12} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="sl-view-row-left">
                          {view.id === activeViewId && <Check size={12} className="sl-active-check" />}
                          <span className="sl-view-row-name">{view.name}</span>
                        </div>
                        <div className="sl-view-row-tools">
                          <button 
                            type="button" 
                            className="sl-tool-icon-btn"
                            onClick={(e) => handleStartEdit(view, e)}
                            title="Rename view"
                          >
                            <Edit2 size={12} />
                          </button>
                          <button 
                            type="button" 
                            className="sl-tool-icon-btn is-pinned"
                            onClick={(e) => {
                              e.stopPropagation();
                              onTogglePinDefault(view.id);
                            }}
                            title="Pinned as default (click to unpin)"
                          >
                            <Pin size={13} className="sl-pin-active" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <div className="sl-no-default-notice">
                  No default filter pinned. Pin one below to set your default landing view!
                </div>
              )}
            </div>

            {/* 2. All Saved Views Section */}
            <div className="sl-unified-section">
              <span className="sl-unified-section-label">Saved Views</span>

              {filteredNonDefault.map((view) => (
                <div 
                  key={view.id}
                  className={`sl-view-row ${view.id === activeViewId ? 'is-active-row' : ''}`}
                  onClick={() => {
                    onSelectView(view.id);
                    setIsOpen(false);
                  }}
                >
                  {editingViewId === view.id ? (
                    <div className="sl-inline-edit-wrap" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="text" 
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="sl-inline-edit-input"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveRename(view.id, e);
                          if (e.key === 'Escape') setEditingViewId(null);
                        }}
                      />
                      <button 
                        type="button" 
                        className="sl-inline-edit-save"
                        onClick={(e) => handleSaveRename(view.id, e)}
                      >
                        <Check size={12} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="sl-view-row-left">
                        {view.id === activeViewId && <Check size={12} className="sl-active-check" />}
                        <span className="sl-view-row-name">{view.name}</span>
                      </div>
                      <div className="sl-view-row-tools">
                        <button 
                          type="button" 
                          className="sl-tool-icon-btn"
                          onClick={(e) => handleStartEdit(view, e)}
                          title="Rename view"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button 
                          type="button" 
                          className="sl-tool-icon-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            onTogglePinDefault(view.id);
                          }}
                          title="Pin as default view"
                        >
                          <Pin size={13} />
                        </button>
                        {!view.isDefault && (
                          <button 
                            type="button" 
                            className="sl-tool-icon-btn is-delete"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm(`Delete saved filter "${view.name}"?`)) {
                                onDeleteView(view.id);
                              }
                            }}
                            title="Delete view"
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}

              {filteredNonDefault.length === 0 && filteredDefault.length === 0 && (
                <div className="sl-no-saved-notice">
                  No views found matching "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
