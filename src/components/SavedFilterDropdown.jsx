import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  X, 
  Pin, 
  Edit2, 
  Check, 
  Trash2, 
  Bookmark,
  ChevronDown
} from 'lucide-react';

export function SavedFilterDropdown({
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

  // Find default views and other views
  const defaultViews = savedViews.filter(v => v.isDefault);
  const nonDefaultViews = savedViews.filter(v => !v.isDefault);

  // Filtered lists by search query
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
    <div className="sl-saved-filter-wrapper" ref={dropdownRef}>
      {/* Trigger Button (Matching Screenshot 1: Saved Filter ▾ or Save Filter area) */}
      <button 
        type="button" 
        className={`sl-saved-filter-trigger-btn ${isOpen ? 'is-active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="View & manage saved filters (pin default view)"
      >
        <Bookmark size={13} className="sl-saved-filter-icon" />
        <span>Saved Filters</span>
        {activeView && (
          <span className="sl-active-filter-tag">{activeView.name}</span>
        )}
        <ChevronDown size={13} className={`sl-chevron-down ${isOpen ? 'is-rotated' : ''}`} />
      </button>

      {/* Popover Dropdown (Pixel-matching Screenshot 3: Saved Filter) */}
      {isOpen && (
        <div className="sl-saved-filter-popover" id="sl-saved-filter-popover-menu">
          {/* Header */}
          <div className="sl-saved-filter-pop-header">
            <h4>Saved Filter</h4>
            <button 
              type="button" 
              className="sl-pop-close-btn"
              onClick={() => setIsOpen(false)}
            >
              <X size={15} />
            </button>
          </div>

          {/* Search Box */}
          <div className="sl-saved-filter-search-row">
            <Search size={14} className="sl-search-pop-icon" />
            <input 
              type="text" 
              placeholder="Type to search" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="sl-search-pop-input"
              autoFocus
            />
          </div>

          <div className="sl-saved-filter-scroll-list">
            {/* 1. Default Filter Section */}
            <div className="sl-saved-filter-section">
              <span className="sl-filter-section-title">Default Filter</span>
              
              {filteredDefault.length > 0 ? (
                filteredDefault.map((view) => (
                  <div 
                    key={view.id}
                    className={`sl-saved-filter-item is-default-card ${view.id === activeViewId ? 'is-active-view' : ''}`}
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
                        <span className="sl-saved-filter-name">{view.name}</span>
                        <div className="sl-saved-filter-actions">
                          <button 
                            type="button" 
                            className="sl-icon-action-btn"
                            onClick={(e) => handleStartEdit(view, e)}
                            title="Rename filter"
                          >
                            <Edit2 size={12} />
                          </button>
                          <button 
                            type="button" 
                            className="sl-icon-action-btn is-pinned"
                            onClick={(e) => {
                              e.stopPropagation();
                              onTogglePinDefault(view.id);
                            }}
                            title="Pinned as default filter (click to unpin)"
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
                  No default filter pinned. Pin one below to make it your default view!
                </div>
              )}
            </div>

            {/* 2. Other Saved Filters Section */}
            <div className="sl-saved-filter-section">
              <span className="sl-filter-section-title">Saved Views</span>

              {filteredNonDefault.map((view) => (
                <div 
                  key={view.id}
                  className={`sl-saved-filter-item ${view.id === activeViewId ? 'is-active-view' : ''}`}
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
                      <span className="sl-saved-filter-name">{view.name}</span>
                      <div className="sl-saved-filter-actions">
                        <button 
                          type="button" 
                          className="sl-icon-action-btn"
                          onClick={(e) => handleStartEdit(view, e)}
                          title="Rename view"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button 
                          type="button" 
                          className="sl-icon-action-btn"
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
                            className="sl-icon-action-btn sl-btn-delete-view"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm(`Delete saved filter "${view.name}"?`)) {
                                onDeleteView(view.id);
                              }
                            }}
                            title="Delete saved view"
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
                  No saved filters found matching "{searchQuery}"
                </div>
              )}
            </div>
          </div>

          {/* Footer with "Save Current Filters as New View" */}
          {onOpenSaveModal && (
            <div className="sl-saved-filter-pop-footer">
              <button 
                type="button"
                className="sl-pop-save-current-btn"
                onClick={() => {
                  setIsOpen(false);
                  onOpenSaveModal();
                }}
              >
                <span>+ Save current filters as new view</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
