import React, { useState } from 'react';
import { 
  Users, 
  Flame, 
  CalendarClock, 
  Dna, 
  Clock, 
  Bookmark, 
  Plus, 
  Save, 
  RotateCcw, 
  Check, 
  Trash2,
  X
} from 'lucide-react';

const ICON_MAP = {
  Users,
  Flame,
  CalendarClock,
  Dna,
  Clock,
  Bookmark
};

export function SavedViewsTabs({
  savedViews,
  activeViewId,
  onSelectView,
  onSaveAsNewView,
  onUpdateCurrentView,
  onDeleteView,
  isFilterModified,
  onResetFilters
}) {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [newViewName, setNewViewName] = useState('');

  const handleSaveSubmit = (e) => {
    e.preventDefault();
    if (!newViewName.trim()) return;
    onSaveAsNewView(newViewName.trim());
    setNewViewName('');
    setShowSaveModal(false);
  };

  return (
    <div className="sl-saved-views-container">
      <div className="sl-views-tabs-row">
        {/* View Tabs */}
        <div className="sl-views-tabs-list" role="tablist">
          {savedViews.map((view) => {
            const IconComponent = ICON_MAP[view.icon] || Bookmark;
            const isActive = view.id === activeViewId;

            return (
              <div 
                key={view.id} 
                className={`sl-view-tab-pill ${isActive ? 'is-active' : ''}`}
                onClick={() => onSelectView(view.id)}
                role="tab"
                aria-selected={isActive}
              >
                <IconComponent size={14} className="sl-tab-icon" />
                <span className="sl-tab-title">{view.name}</span>

                {/* Show indicator if current active view has modifications */}
                {isActive && isFilterModified && (
                  <span className="sl-unsaved-dot" title="Filters differ from saved definition"></span>
                )}

                {/* Allow deleting custom non-default views */}
                {!view.isDefault && (
                  <button 
                    className="sl-delete-view-btn"
                    title="Delete custom saved view"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Delete saved view "${view.name}"?`)) {
                        onDeleteView(view.id);
                      }
                    }}
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            );
          })}

          {/* Create New View Tab Button */}
          <button 
            className="sl-add-view-btn"
            onClick={() => setShowSaveModal(true)}
            title="Save current filters as a new custom view"
          >
            <Plus size={14} />
            <span>Save Current View</span>
          </button>
        </div>

        {/* Unsaved Changes Banner / Controls */}
        {isFilterModified && (
          <div className="sl-unsaved-actions-chip">
            <span className="sl-unsaved-label">
              <span className="sl-pulsing-amber-dot"></span>
              Modified Filters
            </span>

            <button 
              className="sl-chip-btn sl-chip-btn-save"
              onClick={onUpdateCurrentView}
              title="Update active view with current filters"
            >
              <Save size={12} />
              <span>Update View</span>
            </button>

            <button 
              className="sl-chip-btn sl-chip-btn-as-new"
              onClick={() => setShowSaveModal(true)}
              title="Save current filters as a new preset tab"
            >
              <Plus size={12} />
              <span>Save As New</span>
            </button>

            <button 
              className="sl-chip-btn sl-chip-btn-revert"
              onClick={onResetFilters}
              title="Revert filters back to view default"
            >
              <RotateCcw size={12} />
              <span>Revert</span>
            </button>
          </div>
        )}
      </div>

      {/* Save View Modal */}
      {showSaveModal && (
        <div className="sl-modal-backdrop" onClick={() => setShowSaveModal(false)}>
          <div className="sl-modal-dialog sl-modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="sl-modal-header">
              <div className="sl-modal-title-group">
                <Bookmark size={18} className="sl-modal-icon" />
                <h3>Save As New Filtered View</h3>
              </div>
              <button className="sl-modal-close" onClick={() => setShowSaveModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveSubmit}>
              <div className="sl-modal-body">
                <p className="sl-modal-desc">
                  Save this custom filter combination (stage, clinic, intent score, and search query) to your tabs so counsellors can access it in 1 click anytime without resets.
                </p>

                <div className="sl-form-field">
                  <label htmlFor="view-name-input">View Name</label>
                  <input 
                    id="view-name-input"
                    type="text" 
                    placeholder="e.g. Bangalore Urgent IVF Candidates"
                    value={newViewName}
                    onChange={(e) => setNewViewName(e.target.value)}
                    autoFocus
                    required
                    className="sl-input"
                  />
                </div>
              </div>

              <div className="sl-modal-footer">
                <button 
                  type="button" 
                  className="sl-btn sl-btn-secondary"
                  onClick={() => setShowSaveModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="sl-btn sl-btn-primary"
                  disabled={!newViewName.trim()}
                >
                  <Save size={15} />
                  <span>Save View Tab</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
