import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  ChevronDown, 
  Search, 
  Check, 
  Minus, 
  X, 
  RotateCcw, 
  SlidersHorizontal,
  Lock,
  Layers
} from 'lucide-react';
import { ALL_COLUMNS, ROLE_PRESETS } from '../data/columnsDefinition';

export function ManageColumnsDropdown({
  visibleColumns = [],
  onUpdateColumns,
  onOpenAdvancedModal
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
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

  // Filter columns based on search
  const filteredColumns = useMemo(() => {
    if (!searchQuery.trim()) return ALL_COLUMNS;
    const q = searchQuery.toLowerCase().trim();
    return ALL_COLUMNS.filter(col => 
      col.label.toLowerCase().includes(q) || 
      col.id.toLowerCase().includes(q) ||
      (col.category && col.category.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  // Check states
  const totalCount = ALL_COLUMNS.length;
  const selectedCount = visibleColumns.length;
  const isAllSelected = selectedCount === totalCount;
  const isPartiallySelected = selectedCount > 0 && selectedCount < totalCount;

  // Toggle single column
  const handleToggleColumn = (colId) => {
    const colDef = ALL_COLUMNS.find(c => c.id === colId);
    if (colDef?.alwaysVisible) return; // Prevent toggling patient name or essential action

    let newCols;
    if (visibleColumns.includes(colId)) {
      newCols = visibleColumns.filter(id => id !== colId);
    } else {
      // Preserve order based on ALL_COLUMNS schema
      newCols = ALL_COLUMNS.filter(c => visibleColumns.includes(c.id) || c.id === colId).map(c => c.id);
    }
    onUpdateColumns(newCols);
  };

  // Toggle Select All
  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      // Reset back to clean 7 frontline deals view
      const default7 = ROLE_PRESETS.counsellor.columns;
      onUpdateColumns(default7);
    } else {
      // Select all 40 columns
      onUpdateColumns(ALL_COLUMNS.map(c => c.id));
    }
  };

  // Reset to clean 7 deals view
  const handleResetToCleanDeals = () => {
    onUpdateColumns(ROLE_PRESETS.counsellor.columns);
    setSearchQuery('');
  };

  return (
    <div className="sl-manage-columns-wrap" ref={dropdownRef}>
      {/* Explicit Manage Columns Trigger Button (Matching user screenshot) */}
      <button 
        type="button" 
        className={`sl-manage-columns-btn ${isOpen ? 'is-active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Manage visible table columns (customize 7 to 40 columns)"
        id="sl-manage-columns-trigger-btn"
      >
        <Layers size={13} className="sl-manage-cols-icon" />
        <span className="sl-manage-cols-text">Manage Columns</span>
        <span className="sl-manage-cols-badge">{selectedCount}</span>
        <ChevronDown size={14} className={`sl-manage-cols-chevron ${isOpen ? 'is-rotated' : ''}`} />
      </button>

      {/* Explicit Popover Dropdown (Pixel-matching Leadrat / Superleap reference) */}
      {isOpen && (
        <div className="sl-columns-popover-menu" id="sl-columns-popover-dropdown">
          {/* 1. Quick Search Filter */}
          <div className="sl-col-popover-search">
            <Search size={13} className="sl-col-search-icon" />
            <input 
              type="text" 
              placeholder="Search 40 columns..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="sl-col-search-input"
              autoFocus
            />
            {searchQuery && (
              <button 
                type="button" 
                className="sl-col-search-clear"
                onClick={() => setSearchQuery('')}
              >
                <X size={11} />
              </button>
            )}
          </div>

          {/* 2. Top 'Select All' Row */}
          <div 
            className="sl-col-select-all-row"
            onClick={handleToggleSelectAll}
          >
            <div className={`sl-col-custom-checkbox ${isAllSelected ? 'is-checked' : isPartiallySelected ? 'is-indeterminate' : ''}`}>
              {isAllSelected && <Check size={12} strokeWidth={3} />}
              {isPartiallySelected && <Minus size={12} strokeWidth={3} />}
            </div>
            <span className="sl-col-select-all-label">Select All</span>
            <span className="sl-col-select-all-count">({selectedCount}/{totalCount})</span>
          </div>

          {/* Quick Presets Bar */}
          <div className="sl-col-quick-presets">
            <button 
              type="button" 
              className={`sl-preset-chip ${selectedCount === 7 ? 'is-active' : ''}`}
              onClick={handleResetToCleanDeals}
              title="Clean Deals View (7 columns: Lead, Phone, Email, City, Channel, Stage, Action)"
            >
              Clean Deals (7)
            </button>
            <button 
              type="button" 
              className={`sl-preset-chip ${selectedCount === 6 ? 'is-active' : ''}`}
              onClick={() => onUpdateColumns(ROLE_PRESETS.counsellor_fast.columns)}
              title="Counsellor Fast Triage (6 columns)"
            >
              Counsellor (6)
            </button>
            <button 
              type="button" 
              className={`sl-preset-chip ${isAllSelected ? 'is-active' : ''}`}
              onClick={() => onUpdateColumns(ALL_COLUMNS.map(c => c.id))}
              title="Show all 40 Zoho CRM fields"
            >
              All (40)
            </button>
          </div>

          <div className="sl-col-divider" />

          {/* 3. Scrollable List of Checkbox Items */}
          <div className="sl-columns-checkbox-list">
            {filteredColumns.map((col) => {
              const isChecked = visibleColumns.includes(col.id);
              const isRequired = col.alwaysVisible;

              return (
                <div 
                  key={col.id}
                  className={`sl-col-checkbox-item ${isChecked ? 'is-selected' : ''} ${isRequired ? 'is-required' : ''}`}
                  onClick={() => handleToggleColumn(col.id)}
                  title={isRequired ? `${col.label} is required and always visible` : `Toggle ${col.label}`}
                >
                  <div className={`sl-col-custom-checkbox ${isChecked ? 'is-checked' : ''} ${isRequired ? 'is-locked' : ''}`}>
                    {isChecked && <Check size={12} strokeWidth={3} />}
                  </div>

                  <span className="sl-col-item-label">{col.label}</span>

                  {isRequired && (
                    <span className="sl-col-lock-badge" title="Always visible">
                      <Lock size={10} />
                    </span>
                  )}

                  {!isRequired && col.category && (
                    <span className={`sl-col-category-tag cat-${col.category.toLowerCase()}`}>
                      {col.category}
                    </span>
                  )}
                </div>
              );
            })}

            {filteredColumns.length === 0 && (
              <div className="sl-col-empty-search">
                No column matching "{searchQuery}"
              </div>
            )}
          </div>

          <div className="sl-col-divider" />

          {/* 4. Footer Actions */}
          <div className="sl-col-popover-footer">
            <button 
              type="button"
              className="sl-col-footer-reset-btn"
              onClick={handleResetToCleanDeals}
            >
              <RotateCcw size={11} />
              <span>Reset to Clean 7</span>
            </button>

            {onOpenAdvancedModal && (
              <button 
                type="button"
                className="sl-col-footer-modal-btn"
                onClick={() => {
                  setIsOpen(false);
                  onOpenAdvancedModal();
                }}
              >
                <SlidersHorizontal size={11} />
                <span>Reorder / Drag...</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
