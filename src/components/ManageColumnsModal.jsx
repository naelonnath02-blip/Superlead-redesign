import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Check, 
  ArrowUp, 
  ArrowDown, 
  RotateCcw, 
  SlidersHorizontal,
  Info,
  Layers,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { ALL_COLUMNS, ROLE_PRESETS } from '../data/columnsDefinition';

export function ManageColumnsModal({
  visibleColumns,
  onSaveColumns,
  onClose,
  currentRole,
  onApplyPreset
}) {
  const [selectedColumnIds, setSelectedColumnIds] = useState([...visibleColumns]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Categories list
  const categories = ['All', 'Essential', 'Clinical', 'Contact', 'Operational', 'System', 'Financial', 'Telephony'];

  // Toggle single column
  const toggleColumn = (colId) => {
    const col = ALL_COLUMNS.find(c => c.id === colId);
    if (col?.alwaysVisible) return; // Prevent hiding patient name or quick actions

    if (selectedColumnIds.includes(colId)) {
      setSelectedColumnIds(prev => prev.filter(id => id !== colId));
    } else {
      setSelectedColumnIds(prev => [...prev, colId]);
    }
  };

  // Move column up in order
  const moveUp = (index) => {
    if (index === 0) return;
    const newCols = [...selectedColumnIds];
    const temp = newCols[index];
    newCols[index] = newCols[index - 1];
    newCols[index - 1] = temp;
    setSelectedColumnIds(newCols);
  };

  // Move column down in order
  const moveDown = (index) => {
    if (index === selectedColumnIds.length - 1) return;
    const newCols = [...selectedColumnIds];
    const temp = newCols[index];
    newCols[index] = newCols[index + 1];
    newCols[index + 1] = temp;
    setSelectedColumnIds(newCols);
  };

  // Apply a role preset
  const handleApplyPreset = (presetKey) => {
    const preset = ROLE_PRESETS[presetKey];
    if (preset) {
      setSelectedColumnIds([...preset.columns]);
      if (onApplyPreset) onApplyPreset(presetKey);
    }
  };

  // Filter columns by search and category
  const filteredColumns = ALL_COLUMNS.filter(col => {
    const matchesSearch = col.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          col.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || col.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSave = () => {
    onSaveColumns(selectedColumnIds);
    onClose();
  };

  return (
    <div className="sl-modal-backdrop" onClick={onClose}>
      <div className="sl-modal-dialog sl-modal-lg" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="sl-modal-header">
          <div className="sl-modal-title-group">
            <SlidersHorizontal size={20} className="sl-modal-icon" />
            <div>
              <h3>Manage Visible Table Columns</h3>
              <p className="sl-modal-subtitle">
                Customize column visibility and ordering. Solves Nova's 40-column information overload.
              </p>
            </div>
          </div>
          <button className="sl-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Role Presets Quick-Select Bar */}
        <div className="sl-role-presets-box">
          <div className="sl-presets-header">
            <Sparkles size={14} className="sl-sparkle-icon" />
            <span>Recommended Role Presets (1-Click Switch):</span>
          </div>
          <div className="sl-presets-grid">
            {Object.entries(ROLE_PRESETS).map(([key, preset]) => {
              const isSelected = selectedColumnIds.length === preset.columns.length &&
                                 preset.columns.every(c => selectedColumnIds.includes(c));
              const isLegacy = key === 'zoho_legacy';

              return (
                <button
                  key={key}
                  type="button"
                  className={`sl-preset-card ${isSelected ? 'is-selected' : ''} ${isLegacy ? 'is-legacy' : ''}`}
                  onClick={() => handleApplyPreset(key)}
                >
                  <div className="sl-preset-card-top">
                    <span className="sl-preset-name">{preset.name}</span>
                    {isLegacy ? (
                      <span className="sl-legacy-tag">Zoho Overload</span>
                    ) : (
                      <span className="sl-count-tag">{preset.columns.length} cols</span>
                    )}
                  </div>
                  <p className="sl-preset-desc">{preset.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Column Manager Body: Dual Column (Available / Order) */}
        <div className="sl-columns-manager-body">
          {/* Left Panel: Available Columns with Search & Categories */}
          <div className="sl-columns-catalog-panel">
            <div className="sl-panel-header">
              <span className="sl-panel-title">All Available Fields ({ALL_COLUMNS.length})</span>
              <div className="sl-search-mini">
                <Search size={14} />
                <input 
                  type="text" 
                  placeholder="Search fields..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Category Pills */}
            <div className="sl-category-pills">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`sl-cat-pill ${selectedCategory === cat ? 'is-active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Column Checkboxes List */}
            <div className="sl-checkbox-list">
              {filteredColumns.map(col => {
                const isChecked = selectedColumnIds.includes(col.id);
                return (
                  <label 
                    key={col.id} 
                    className={`sl-checkbox-row ${isChecked ? 'is-checked' : ''} ${col.alwaysVisible ? 'is-locked' : ''}`}
                  >
                    <input 
                      type="checkbox"
                      checked={isChecked}
                      disabled={col.alwaysVisible}
                      onChange={() => toggleColumn(col.id)}
                    />
                    <div className="sl-checkbox-meta">
                      <span className="sl-checkbox-label">{col.label}</span>
                      <span className="sl-checkbox-cat">{col.category}</span>
                    </div>
                    {col.alwaysVisible && (
                      <span className="sl-locked-badge">Required</span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Active Columns & Display Order */}
          <div className="sl-columns-order-panel">
            <div className="sl-panel-header">
              <span className="sl-panel-title">
                Active Display Order ({selectedColumnIds.length} columns)
              </span>
              <span className="sl-hint-sub">Use arrows to reorder table</span>
            </div>

            <div className="sl-active-order-list">
              {selectedColumnIds.map((colId, index) => {
                const col = ALL_COLUMNS.find(c => c.id === colId);
                if (!col) return null;

                return (
                  <div key={col.id} className="sl-order-item">
                    <span className="sl-order-num">{index + 1}</span>
                    <div className="sl-order-info">
                      <span className="sl-order-label">{col.label}</span>
                      <span className="sl-order-cat">{col.category}</span>
                    </div>

                    <div className="sl-order-actions">
                      <button 
                        type="button" 
                        disabled={index === 0} 
                        onClick={() => moveUp(index)}
                        title="Move column left/earlier"
                        className="sl-arrow-btn"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button 
                        type="button" 
                        disabled={index === selectedColumnIds.length - 1} 
                        onClick={() => moveDown(index)}
                        title="Move column right/later"
                        className="sl-arrow-btn"
                      >
                        <ArrowDown size={14} />
                      </button>
                      {!col.alwaysVisible && (
                        <button 
                          type="button" 
                          onClick={() => toggleColumn(col.id)}
                          title="Remove column from table"
                          className="sl-remove-col-btn"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sl-modal-footer">
          <div className="sl-footer-meta">
            {selectedColumnIds.length > 20 ? (
              <span className="sl-warning-text">
                <ShieldAlert size={14} />
                Notice: Displaying {selectedColumnIds.length} columns may cause horizontal scrolling on smaller screens.
              </span>
            ) : (
              <span className="sl-success-text">
                <Check size={14} />
                Optimized view: {selectedColumnIds.length} columns fit cleanly on frontline screens.
              </span>
            )}
          </div>

          <div className="sl-footer-buttons">
            <button 
              type="button" 
              className="sl-btn sl-btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="sl-btn sl-btn-primary"
              onClick={handleSave}
            >
              <Check size={16} />
              <span>Apply Visible Columns ({selectedColumnIds.length})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
