import React, { useState } from 'react';
import { X } from 'lucide-react';

export function AddFilterModal({
  isOpen,
  onClose,
  onSave
}) {
  const [filterName, setFilterName] = useState('');
  const [setAsDefault, setSetAsDefault] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!filterName.trim()) return;
    onSave(filterName.trim(), setAsDefault);
    setFilterName('');
    setSetAsDefault(false);
    onClose();
  };

  return (
    <div className="sl-filter-modal-backdrop" onClick={onClose}>
      <div className="sl-filter-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="sl-filter-modal-header">
          <h4>Add Filter Name</h4>
          <button 
            type="button" 
            className="sl-modal-close-icon"
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="sl-filter-modal-form">
          <div className="sl-filter-input-group">
            <label className="sl-filter-input-label">
              Add Filter Name <span className="sl-asterisk">*</span>
            </label>
            <input 
              type="text" 
              placeholder="Enter filter name"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className="sl-filter-name-input"
              autoFocus
              required
            />
          </div>

          <div className="sl-filter-default-check-group">
            <label className="sl-filter-checkbox-label">
              <input 
                type="checkbox"
                checked={setAsDefault}
                onChange={(e) => setSetAsDefault(e.target.checked)}
                className="sl-filter-checkbox"
              />
              <span>Set as default (max 10 filters)</span>
            </label>
            <p className="sl-filter-checkbox-hint">
              Maximum of 10 filters can be config and applied as default filter
            </p>
          </div>

          {/* Modal Actions */}
          <div className="sl-filter-modal-actions">
            <button 
              type="button" 
              className="sl-filter-btn-cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="sl-filter-btn-save"
              disabled={!filterName.trim()}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
