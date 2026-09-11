/**
 * Eventora - Shared Application Logic & LocalStorage Management
 * Single source of truth for storage, formatting, sanitization, and card rendering.
 */

/**
 * Eventora - Shared Application Logic & LocalStorage Management
 * Single source of truth for storage, formatting, sanitization, authentication, and card rendering.
 */
import {
  AUTH_KEYS,
  initAuthStorage,
  getUsers,
  saveUsers,
  getCurrentUser,
  isAuthenticated,
  generateUserId,
  signUp,
  signIn,
  signOut,
  requireAuth,
  updateUserName,
  initNavbar
} from './auth.js';

// Re-export auth utilities for seamless access across components
export {
  AUTH_KEYS,
  getUsers,
  saveUsers,
  getCurrentUser,
  isAuthenticated,
  generateUserId,
  signUp,
  signIn,
  signOut,
  requireAuth,
  updateUserName,
  initNavbar
};

// LocalStorage Keys
export const STORAGE_KEYS = {
  REGISTRATIONS: AUTH_KEYS.REGISTRATIONS,
  SAVED_EVENTS: AUTH_KEYS.SAVED_EVENTS,
  USERS: AUTH_KEYS.USERS,
  CURRENT_USER: AUTH_KEYS.CURRENT_USER
};

/**
 * Safely escape text for HTML output to prevent XSS.
 */
export function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Initialize storage with clean data structures.
 */
export function initStorage() {
  try {
    initAuthStorage();

    const existingRegs = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
    if (!existingRegs) {
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify([]));
    }

    const existingSaved = localStorage.getItem(STORAGE_KEYS.SAVED_EVENTS);
    if (!existingSaved) {
      localStorage.setItem(STORAGE_KEYS.SAVED_EVENTS, JSON.stringify({}));
    } else {
      // Migrate legacy array format if detected
      try {
        const parsed = JSON.parse(existingSaved);
        if (Array.isArray(parsed)) {
          const migrated = {};
          const currentUser = getCurrentUser();
          if (currentUser) {
            migrated[currentUser.id] = parsed;
          }
          localStorage.setItem(STORAGE_KEYS.SAVED_EVENTS, JSON.stringify(migrated));
        }
      } catch {
        localStorage.setItem(STORAGE_KEYS.SAVED_EVENTS, JSON.stringify({}));
      }
    }
  } catch (e) {
    console.warn('LocalStorage unavailable or restricted:', e);
  }
}

/**
 * Get all raw registrations from localStorage.
 */
export function getAllRegistrationsRaw() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Error parsing registrations from localStorage:', e);
    return [];
  }
}

/**
 * Get registrations for the current user.
 * If userOnly is true (default), strictly filters by currentUser.id.
 */
export function getRegistrations(userOnly = true) {
  const all = getAllRegistrationsRaw();
  if (!userOnly) return all;

  const currentUser = getCurrentUser();
  if (!currentUser) return [];

  return all.filter(r => r.userId === currentUser.id);
}

/**
 * Save a new registration object belonging to the current user.
 */
export function saveRegistration(registration) {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    console.error('saveRegistration: Cannot register without an authenticated user');
    return false;
  }

  try {
    const list = getAllRegistrationsRaw();
    // Enforce authenticated userId to prevent spoofing
    const userRegistration = {
      ...registration,
      userId: currentUser.id
    };
    list.unshift(userRegistration);
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(list));
    return true;
  } catch (e) {
    console.error('Failed to save registration:', e);
    return false;
  }
}

/**
 * Get the saved events dictionary mapping userId -> eventId[].
 */
export function getSavedEventsMap() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_EVENTS);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed;
    }
    return {};
  } catch (e) {
    console.error('Error reading saved events map:', e);
    return {};
  }
}

/**
 * Get saved event IDs belonging to the currently logged in user.
 */
export function getSavedEventIds() {
  const currentUser = getCurrentUser();
  if (!currentUser) return [];

  const map = getSavedEventsMap();
  const list = map[currentUser.id];
  return Array.isArray(list) ? list : [];
}

/**
 * Toggle saving an event for the currently logged in user.
 * If unauthenticated, prompts to sign in and redirects with event context.
 */
export function toggleSaveEvent(eventId) {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    showToast('Please sign in to save events', 'info');
    setTimeout(() => {
      window.location.href = `signin.html?redirect=event&id=${encodeURIComponent(eventId)}`;
    }, 450);
    return false;
  }

  try {
    const map = getSavedEventsMap();
    const userSaved = Array.isArray(map[currentUser.id]) ? [...map[currentUser.id]] : [];
    const index = userSaved.indexOf(eventId);
    let isNowSaved = false;

    if (index > -1) {
      userSaved.splice(index, 1);
      isNowSaved = false;
    } else {
      userSaved.unshift(eventId);
      isNowSaved = true;
    }

    map[currentUser.id] = userSaved;
    localStorage.setItem(STORAGE_KEYS.SAVED_EVENTS, JSON.stringify(map));
    return isNowSaved;
  } catch (e) {
    console.error('Failed to toggle save event:', e);
    return false;
  }
}

/**
 * Check if an event is currently saved by the active user.
 */
export function isEventSaved(eventId) {
  const currentUser = getCurrentUser();
  if (!currentUser) return false;
  const saved = getSavedEventIds();
  return saved.includes(eventId);
}

/**
 * Determine if an event date is in the past.
 */
export function isEventDatePast(dateStr) {
  if (!dateStr) return false;
  try {
    const match = dateStr.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(\d{1,2}),?\s+(\d{4})/i);
    if (match) {
      const parsedDate = new Date(`${match[1]} ${match[2]}, ${match[3]} 23:59:59`);
      return parsedDate.getTime() < Date.now();
    }
  } catch {
    // ignore
  }
  return false;
}

/**
 * Format currency amount into Indian Rupee presentation.
 */
export function formatRupees(amount) {
  if (amount === 0 || amount === '0') return 'Free';
  const num = typeof amount === 'number' ? amount : Number(amount);
  if (isNaN(num)) return '₹0';
  return '₹' + num.toLocaleString('en-IN');
}

/**
 * Toast notification for non-blocking UI feedback.
 */
export function showToast(message, type = 'success') {
  let toast = document.getElementById('eventora-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'eventora-toast';
    toast.className = 'fixed bottom-6 right-6 z-50 transform transition-all duration-300 translate-y-20 opacity-0 pointer-events-none';
    document.body.appendChild(toast);
  }

  const bgColor = type === 'success' ? 'bg-[#202020]' : 'bg-[#D85A38]';
  toast.innerHTML = `
    <div class="${bgColor} text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-medium border border-white/10">
      <span class="w-2 h-2 rounded-full ${type === 'success' ? 'bg-[#DCE9DF]' : 'bg-white'}"></span>
      <span>${escapeHtml(message)}</span>
    </div>
  `;

  toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
  }, 3200);
}

/**
 * Standardized reusable event card renderer matching the approved Stitch UI.
 * Used across Home, Explore Events, Related Events, and Saved Events.
 */
export function renderEventCard(evt, options = {}) {
  const { showRemove = false, customLink = null } = options;
  const link = customLink || `event.html?id=${encodeURIComponent(evt.id)}`;
  const timeFormatted = evt.timeFormatted || (evt.time ? evt.time.split('IST')[0].trim() : '');
  const priceDisplay = evt.price === 0 ? 'Free' : (evt.priceFormatted || formatRupees(evt.price));
  const badgeBg = evt.categoryColor?.bg || '#EDE8F5';
  const badgeText = evt.categoryColor?.badgeText || '#6E56CF';
  const locationDisplay = evt.locationShort || (evt.venue ? evt.venue.split(',')[0].trim() : evt.location) || evt.city || 'India';

  return `
    <article class="event-card group cursor-pointer flex flex-col transition-all duration-300 hover:-translate-y-1" onclick="window.location.href='${link}'">
      <!-- Poster Image -->
      <div class="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#F4F3F0] mb-3.5">
        <img src="${evt.image}" alt="${escapeHtml(evt.title)}" class="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500 ease-out" loading="lazy">
      </div>

      <!-- Date Badge & Price Row -->
      <div class="flex items-center justify-between mb-1.5">
        <span class="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded" style="background-color: ${badgeBg}; color: ${badgeText};">
          ${escapeHtml(evt.dateShort || '')}
        </span>
        <span class="text-sm font-bold text-[#202020]">
          ${escapeHtml(priceDisplay)}
        </span>
      </div>

      <!-- Event Title -->
      <h3 class="text-base sm:text-lg font-bold text-[#202020] group-hover:text-[#D85A38] transition-colors leading-snug mb-1">
        ${escapeHtml(evt.title)}
      </h3>

      <!-- Location & Time -->
      <p class="text-xs sm:text-[13px] text-[#6F6D68] flex items-center gap-1.5 truncate">
        <span class="truncate">${escapeHtml(locationDisplay)}</span>
        <span class="text-[#A09E97]">•</span>
        <span class="flex-shrink-0">${escapeHtml(timeFormatted)}</span>
      </p>

      ${showRemove ? `
        <div class="mt-3 pt-2.5 border-t border-[#F0EEE8] flex items-center justify-between">
          <button type="button" data-remove-id="${escapeHtml(evt.id)}" class="remove-saved-btn text-xs text-[#D85A38] font-bold hover:underline py-1" onclick="event.stopPropagation()">
            Remove from saved
          </button>
          <span class="text-xs font-semibold text-[#202020] group-hover:text-[#D85A38] flex items-center gap-1">
            View details →
          </span>
        </div>
      ` : ''}
    </article>
  `;
}

// Auto-initialize on load
initStorage();

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initNavbar();
    });
  } else {
    initNavbar();
  }

  window.addEventListener('eventora:auth-change', () => {
    initNavbar();
  });
}
