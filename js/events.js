/**
 * Eventora - Explore Events Script
 * Handles real-time search, filters, sorting, category selection, and URL query params.
 */
import { EVENTS_DATA } from './data.js';
import { renderEventCard } from './app.js';

let currentCategory = 'All';
let currentSearch = '';
let currentLocation = 'Anywhere';
let currentDate = 'Any date';
let currentPrice = 'Any price';
let currentSort = 'recommended';

const elements = {
  grid: document.getElementById('eventsGrid'),
  resultCount: document.getElementById('resultCount'),
  emptyState: document.getElementById('emptyState'),
  searchInput: document.getElementById('searchInput'),
  searchBtn: document.getElementById('searchBtn'),
  locationSelect: document.getElementById('locationSelect'),
  dateSelect: document.getElementById('dateSelect'),
  priceSelect: document.getElementById('priceSelect'),
  sortSelect: document.getElementById('sortSelect'),
  categoryPills: document.getElementById('categoryPills'),
  activeFiltersBar: document.getElementById('activeFiltersBar'),
  activeFiltersText: document.getElementById('activeFiltersText'),
  clearFiltersBtn: document.getElementById('clearFiltersBtn'),
  emptyClearBtn: document.getElementById('emptyClearBtn'),
};

// Initialize from URL parameters
export function initExplore() {
  const params = new URLSearchParams(window.location.search);
  if (params.has('cat')) {
    currentCategory = params.get('cat') || 'All';
  }
  if (params.has('search')) {
    currentSearch = params.get('search') || '';
    if (elements.searchInput) elements.searchInput.value = currentSearch;
  }
  if (params.has('city')) {
    currentLocation = params.get('city') || 'Anywhere';
    if (elements.locationSelect) elements.locationSelect.value = currentLocation;
  }

  setupEventListeners();
  updateCategoryPillsUI();
  applyFilters();
}

function setupEventListeners() {
  // Search input and button
  if (elements.searchInput) {
    elements.searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim();
      applyFilters();
    });
    elements.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        currentSearch = e.target.value.trim();
        applyFilters();
      }
    });
  }

  if (elements.searchBtn) {
    elements.searchBtn.addEventListener('click', () => {
      if (elements.searchInput) {
        currentSearch = elements.searchInput.value.trim();
      }
      applyFilters();
    });
  }

  // Dropdowns
  if (elements.locationSelect) {
    elements.locationSelect.addEventListener('change', (e) => {
      currentLocation = e.target.value;
      applyFilters();
    });
  }

  if (elements.dateSelect) {
    elements.dateSelect.addEventListener('change', (e) => {
      currentDate = e.target.value;
      applyFilters();
    });
  }

  if (elements.priceSelect) {
    elements.priceSelect.addEventListener('change', (e) => {
      currentPrice = e.target.value;
      applyFilters();
    });
  }

  if (elements.sortSelect) {
    elements.sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      applyFilters();
    });
  }

  // Category pills delegation
  if (elements.categoryPills) {
    elements.categoryPills.addEventListener('click', (e) => {
      const pill = e.target.closest('button[data-category]');
      if (!pill) return;
      currentCategory = pill.getAttribute('data-category');
      updateCategoryPillsUI();
      applyFilters();
    });
  }

  // Clear filters buttons
  if (elements.clearFiltersBtn) {
    elements.clearFiltersBtn.addEventListener('click', resetAllFilters);
  }
  if (elements.emptyClearBtn) {
    elements.emptyClearBtn.addEventListener('click', resetAllFilters);
  }
}

function updateCategoryPillsUI() {
  if (!elements.categoryPills) return;
  const buttons = elements.categoryPills.querySelectorAll('button[data-category]');
  buttons.forEach((btn) => {
    const cat = btn.getAttribute('data-category');
    if (cat.toLowerCase() === currentCategory.toLowerCase()) {
      btn.className = 'category-pill active px-4 py-2 rounded-full text-sm font-semibold transition-all border border-[#202020] bg-[#202020] text-white shadow-xs';
    } else {
      btn.className = 'category-pill px-4 py-2 rounded-full text-sm font-medium transition-all border border-[#E8E5DF] bg-white text-[#6F6D68] hover:border-[#6F6D68] hover:text-[#202020]';
    }
  });
}

function resetAllFilters() {
  currentCategory = 'All';
  currentSearch = '';
  currentLocation = 'Anywhere';
  currentDate = 'Any date';
  currentPrice = 'Any price';
  currentSort = 'recommended';

  if (elements.searchInput) elements.searchInput.value = '';
  if (elements.locationSelect) elements.locationSelect.value = 'Anywhere';
  if (elements.dateSelect) elements.dateSelect.value = 'Any date';
  if (elements.priceSelect) elements.priceSelect.value = 'Any price';
  if (elements.sortSelect) elements.sortSelect.value = 'recommended';

  // Update URL
  window.history.replaceState({}, '', window.location.pathname);

  updateCategoryPillsUI();
  applyFilters();
}

function applyFilters() {
  let filtered = [...EVENTS_DATA];

  // Category filter
  if (currentCategory && currentCategory !== 'All') {
    filtered = filtered.filter(evt => evt.category.toLowerCase() === currentCategory.toLowerCase());
  }

  // Search filter
  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    filtered = filtered.filter(evt =>
      evt.title.toLowerCase().includes(q) ||
      evt.location.toLowerCase().includes(q) ||
      evt.venue.toLowerCase().includes(q) ||
      evt.category.toLowerCase().includes(q) ||
      evt.tagline.toLowerCase().includes(q)
    );
  }

  // Location filter
  if (currentLocation && currentLocation !== 'Anywhere') {
    filtered = filtered.filter(evt => {
      if (currentLocation === 'Delhi / NCR') {
        return evt.city === 'Delhi' || evt.location.toLowerCase().includes('delhi');
      }
      return evt.city === currentLocation || evt.location.toLowerCase().includes(currentLocation.toLowerCase());
    });
  }

  // Date filter
  if (currentDate && currentDate !== 'Any date') {
    if (currentDate === 'September 2026') {
      filtered = filtered.filter(evt => evt.month === 'September' || evt.date.includes('Sep'));
    } else if (currentDate === 'October 2026') {
      filtered = filtered.filter(evt => evt.month === 'October' || evt.date.includes('Oct'));
    } else if (currentDate === 'Today') {
      filtered = filtered.filter(evt => evt.date.includes('Sep 25'));
    } else if (currentDate === 'This weekend') {
      filtered = filtered.filter(evt => evt.date.includes('Sep 25') || evt.date.includes('Sep 27'));
    }
  }

  // Price filter
  if (currentPrice && currentPrice !== 'Any price') {
    if (currentPrice === 'Free') {
      filtered = filtered.filter(evt => evt.price === 0);
    } else if (currentPrice === 'Under ₹500') {
      filtered = filtered.filter(evt => evt.price > 0 && evt.price < 500);
    } else if (currentPrice === '₹500 & Above') {
      filtered = filtered.filter(evt => evt.price >= 500);
    }
  }

  // Sorting
  if (currentSort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'newest') {
    filtered.sort((a, b) => b.id.localeCompare(a.id));
  } else if (currentSort === 'date') {
    // Keep chronological sequence
  }

  renderResults(filtered);
  updateActiveFiltersUI();
}

function updateActiveFiltersUI() {
  const activeTokens = [];
  if (currentCategory !== 'All') activeTokens.push(`Category: ${currentCategory}`);
  if (currentSearch) activeTokens.push(`"${currentSearch}"`);
  if (currentLocation !== 'Anywhere') activeTokens.push(currentLocation);
  if (currentDate !== 'Any date') activeTokens.push(currentDate);
  if (currentPrice !== 'Any price') activeTokens.push(currentPrice);

  if (elements.activeFiltersBar && elements.activeFiltersText) {
    if (activeTokens.length > 0) {
      elements.activeFiltersBar.classList.remove('hidden');
      elements.activeFiltersText.textContent = activeTokens.join(' • ');
    } else {
      elements.activeFiltersBar.classList.add('hidden');
    }
  }
}

function renderResults(events) {
  if (elements.resultCount) {
    elements.resultCount.textContent = `${events.length} event${events.length === 1 ? '' : 's'} found`;
  }

  if (events.length === 0) {
    if (elements.grid) elements.grid.innerHTML = '';
    if (elements.emptyState) elements.emptyState.classList.remove('hidden');
    return;
  }

  if (elements.emptyState) elements.emptyState.classList.add('hidden');
  if (!elements.grid) return;

  elements.grid.innerHTML = events.map(evt => renderEventCard(evt)).join('');
}

// Kick off when DOM is ready
document.addEventListener('DOMContentLoaded', initExplore);
