import React, { useState, useRef } from 'react';
import { 
  X, 
  Search, 
  Check, 
  GripVertical, 
  RotateCcw, 
  SlidersHorizontal,
  Info,
  Layers,
  ShieldAlert
} from 'lucide-react';
import { ALL_COLUMNS } from '../data/columnsDefinition';

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
  
  // Ref-based drag tracking ensures synchronous persistence across React renders
  const dragSourceIndexRef = useRef(null);
  const dragOverTargetIndexRef = useRef(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

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

  // Robust Drag and Drop handlers
  const handleDragStart = (e, index) => {
    dragSourceIndexRef.current = index;
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    try {
      e.dataTransfer.setData('text/plain', String(index));
    } catch (_) {}
  };

  const handleDragEnter = (e, index) => {
    e.preventDefault();
    dragOverTargetIndexRef.current = index;
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    dragOverTargetIndexRef.current = index;
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    e.stopPropagation();

    // Source index from ref, dataTransfer, or fallback state
    let sourceIdx = dragSourceIndexRef.current;
    if (sourceIdx === null || sourceIdx === undefined) {
      try {
        const raw = e.dataTransfer.getData('text/plain');
        if (raw !== '') sourceIdx = parseInt(raw, 10);
      } catch (_) {}
    }
    if (sourceIdx === null || sourceIdx === undefined) {
      sourceIdx = draggedIndex;
    }

    const destIdx = (targetIndex !== undefined && targetIndex !== null) ? targetIndex : dragOverTargetIndexRef.current;

    if (
      sourceIdx !== null && 
      sourceIdx !== undefined && 
      !isNaN(sourceIdx) && 
      destIdx !== null && 
      destIdx !== undefined && 
      !isNaN(destIdx) && 
      sourceIdx !== destIdx
    ) {
      setSelectedColumnIds(prevCols => {
        const updated = [...prevCols];
        const [movedItem] = updated.splice(sourceIdx, 1);
        updated.splice(destIdx, 0, movedItem);
        return updated;
      });
    }

    dragSourceIndexRef.current = null;
    dragOverTargetIndexRef.current = null;
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    dragSourceIndexRef.current = null;
    dragOverTargetIndexRef.current = null;
    setDraggedIndex(null);
    setDragOverIndex(null);
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
              <span className="sl-hint-sub">Drag and drop to reorder</span>
            </div>

            <div className="sl-active-order-list">
              {selectedColumnIds.map((colId, index) => {
                const col = ALL_COLUMNS.find(c => c.id === colId);
                if (!col) return null;

                return (
                  <div 
                    key={col.id} 
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnter={(e) => handleDragEnter(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`sl-order-item is-draggable ${draggedIndex === index ? 'is-dragging' : ''} ${dragOverIndex === index ? 'is-drag-over' : ''}`}
                  >
                    <div className="sl-drag-handle">
                      <GripVertical size={16} />
                    </div>
                    <span className="sl-order-num">{index + 1}</span>
                    <div className="sl-order-info">
                      <span className="sl-order-label">{col.label}</span>
                      <span className="sl-order-cat">{col.category}</span>
                    </div>

                    <div className="sl-order-actions">
                      {!col.alwaysVisible && (
                        <button 
                          type="button" 
                          onClick={(e) => { e.stopPropagation(); toggleColumn(col.id); }}
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
