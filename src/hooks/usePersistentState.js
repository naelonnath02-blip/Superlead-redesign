import { useState, useEffect, useCallback, useTransition } from 'react';
import { ROLE_PRESETS } from '../data/columnsDefinition';

const STORAGE_KEY_FILTERS = 'superleap_nova_active_filters';
const STORAGE_KEY_COLUMNS = 'superleap_nova_visible_columns';
const STORAGE_KEY_SAVED_VIEWS = 'superleap_nova_saved_views';
const STORAGE_KEY_ACTIVE_VIEW = 'superleap_nova_active_view_id';
const STORAGE_KEY_ROLE = 'superleap_nova_active_role';

const DEFAULT_FILTERS = {
  search: '',
  stage: 'all',
  clinic: 'all',
  source: 'all',
  minScore: 0,
  hisSync: 'all',
  dateRange: 'all',
  onlyToday: false
};

const DEFAULT_SAVED_VIEWS = [
  {
    id: 'view_all',
    name: 'All Patient Journeys',
    icon: 'Users',
    isDefault: true,
    filters: { ...DEFAULT_FILTERS }
  },
  {
    id: 'view_high_intent',
    name: 'High Intent IVF Candidates',
    icon: 'Flame',
    isDefault: false,
    filters: { ...DEFAULT_FILTERS, minScore: 90 }
  },
  {
    id: 'view_pending_consults',
    name: 'Pending Consultations',
    icon: 'CalendarClock',
    isDefault: false,
    filters: { ...DEFAULT_FILTERS, stage: 'first_consultation' }
  },
  {
    id: 'view_his_active',
    name: 'HIS Cycle Starts',
    icon: 'Dna',
    isDefault: false,
    filters: { ...DEFAULT_FILTERS, hisSync: 'cycle_active' }
  },
  {
    id: 'view_today_urgent',
    name: "Today's Clinic Actions",
    icon: 'Clock',
    isDefault: false,
    filters: { ...DEFAULT_FILTERS, onlyToday: true }
  }
];

export function usePersistentState() {
  const [, startTransition] = useTransition();

  // 1. Role State
  const [currentRole, setCurrentRole] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ROLE);
      return saved || 'counsellor';
    } catch {
      return 'counsellor';
    }
  });

  // 2. Visible Columns State (Initialized from role preset or localStorage)
  const [visibleColumns, setVisibleColumns] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COLUMNS);
      if (saved) return JSON.parse(saved);
      return ROLE_PRESETS.counsellor.columns;
    } catch {
      return ROLE_PRESETS.counsellor.columns;
    }
  });

  // 3. Saved Views State
  const [savedViews, setSavedViews] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SAVED_VIEWS);
      if (saved) return JSON.parse(saved);
      return DEFAULT_SAVED_VIEWS;
    } catch {
      return DEFAULT_SAVED_VIEWS;
    }
  });

  // 4. Active View ID State
  const [activeViewId, setActiveViewId] = useState(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlView = urlParams.get('view');
      if (urlView) return urlView;
      const saved = localStorage.getItem(STORAGE_KEY_ACTIVE_VIEW);
      return saved || 'view_all';
    } catch {
      return 'view_all';
    }
  });

  // 5. Active Filters State (Hydrated from URL query params, then localStorage)
  const [filters, setFilters] = useState(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlStage = urlParams.get('stage');
      const urlClinic = urlParams.get('clinic');
      const urlSource = urlParams.get('source');
      const urlSearch = urlParams.get('q');
      const urlHis = urlParams.get('his');
      const urlMinScore = urlParams.get('minScore');
      const urlToday = urlParams.get('today');

      if (urlStage || urlClinic || urlSource || urlSearch || urlHis || urlMinScore || urlToday) {
        return {
          ...DEFAULT_FILTERS,
          stage: urlStage || 'all',
          clinic: urlClinic || 'all',
          source: urlSource || 'all',
          search: urlSearch || '',
          hisSync: urlHis || 'all',
          minScore: urlMinScore ? Number(urlMinScore) : 0,
          onlyToday: urlToday === 'true'
        };
      }

      const saved = localStorage.getItem(STORAGE_KEY_FILTERS);
      if (saved) return JSON.parse(saved);
      return { ...DEFAULT_FILTERS };
    } catch {
      return { ...DEFAULT_FILTERS };
    }
  });

  // Check if current filters differ from active saved view
  const currentView = savedViews.find(v => v.id === activeViewId) || savedViews[0];
  const isFilterModified = JSON.stringify(filters) !== JSON.stringify(currentView?.filters || DEFAULT_FILTERS);

  // Sync role changes to column presets
  const handleRoleChange = useCallback((newRole) => {
    setCurrentRole(newRole);
    localStorage.setItem(STORAGE_KEY_ROLE, newRole);
    const preset = ROLE_PRESETS[newRole] || ROLE_PRESETS.counsellor;
    setVisibleColumns(preset.columns);
    localStorage.setItem(STORAGE_KEY_COLUMNS, JSON.stringify(preset.columns));
  }, []);

  // Update visible columns
  const updateColumns = useCallback((cols) => {
    setVisibleColumns(cols);
    localStorage.setItem(STORAGE_KEY_COLUMNS, JSON.stringify(cols));
  }, []);

  // Apply a role preset directly
  const applyPreset = useCallback((presetId) => {
    const preset = ROLE_PRESETS[presetId];
    if (preset) {
      updateColumns(preset.columns);
    }
  }, [updateColumns]);

  // Update a single filter field and sync URL + LocalStorage
  const updateFilter = useCallback((key, value) => {
    setFilters(prev => {
      const next = { ...prev, [key]: value };
      
      // Update LocalStorage
      try {
        localStorage.setItem(STORAGE_KEY_FILTERS, JSON.stringify(next));
      } catch (err) {
        console.error('LocalStorage error:', err);
      }

      // Update URL search parameters without triggering a full page reload
      try {
        const url = new URL(window.location.href);
        if (value && value !== 'all' && value !== 0 && value !== false) {
          url.searchParams.set(key === 'search' ? 'q' : key, value);
        } else {
          url.searchParams.delete(key === 'search' ? 'q' : key);
        }
        window.history.replaceState({}, '', url.toString());
      } catch (err) {
        console.error('URL replaceState error:', err);
      }

      return next;
    });
  }, []);

  // Reset all filters to default
  const resetFilters = useCallback(() => {
    setFilters({ ...DEFAULT_FILTERS });
    try {
      localStorage.setItem(STORAGE_KEY_FILTERS, JSON.stringify(DEFAULT_FILTERS));
      const url = new URL(window.location.href);
      ['stage', 'clinic', 'source', 'q', 'his', 'minScore', 'today'].forEach(p => url.searchParams.delete(p));
      window.history.replaceState({}, '', url.toString());
    } catch (err) {
      console.error(err);
    }
  }, []);

  // Select a Saved View
  const selectView = useCallback((viewId) => {
    const target = savedViews.find(v => v.id === viewId);
    if (!target) return;

    setActiveViewId(viewId);
    localStorage.setItem(STORAGE_KEY_ACTIVE_VIEW, viewId);

    const newFilters = { ...target.filters };
    setFilters(newFilters);
    localStorage.setItem(STORAGE_KEY_FILTERS, JSON.stringify(newFilters));

    // Update URL
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('view', viewId);
      ['stage', 'clinic', 'source', 'q', 'his', 'minScore', 'today'].forEach(p => url.searchParams.delete(p));
      
      // Add non-default params from view
      Object.entries(newFilters).forEach(([k, v]) => {
        if (v && v !== 'all' && v !== 0 && v !== false) {
          url.searchParams.set(k === 'search' ? 'q' : k, v);
        }
      });
      window.history.replaceState({}, '', url.toString());
    } catch (err) {
      console.error(err);
    }
  }, [savedViews]);

  // Save current filter state as a new view
  const saveAsNewView = useCallback((name) => {
    const newId = `view_${Date.now()}`;
    const newView = {
      id: newId,
      name,
      icon: 'Bookmark',
      isDefault: false,
      filters: { ...filters }
    };
    const updated = [...savedViews, newView];
    setSavedViews(updated);
    setActiveViewId(newId);
    localStorage.setItem(STORAGE_KEY_SAVED_VIEWS, JSON.stringify(updated));
    localStorage.setItem(STORAGE_KEY_ACTIVE_VIEW, newId);
  }, [filters, savedViews]);

  // Update existing active view with current filters
  const updateCurrentView = useCallback(() => {
    const updated = savedViews.map(v => {
      if (v.id === activeViewId) {
        return { ...v, filters: { ...filters } };
      }
      return v;
    });
    setSavedViews(updated);
    localStorage.setItem(STORAGE_KEY_SAVED_VIEWS, JSON.stringify(updated));
  }, [activeViewId, filters, savedViews]);

  // Delete a custom saved view
  const deleteSavedView = useCallback((viewId) => {
    const updated = savedViews.filter(v => v.id !== viewId);
    setSavedViews(updated);
    localStorage.setItem(STORAGE_KEY_SAVED_VIEWS, JSON.stringify(updated));
    if (activeViewId === viewId) {
      selectView('view_all');
    }
  }, [activeViewId, savedViews, selectView]);

  return {
    currentRole,
    handleRoleChange,
    visibleColumns,
    updateColumns,
    applyPreset,
    filters,
    updateFilter,
    resetFilters,
    savedViews,
    activeViewId,
    selectView,
    saveAsNewView,
    updateCurrentView,
    deleteSavedView,
    isFilterModified
  };
}
