/*
 * Eventora Phase 1 Authentication
 *
 * This is a frontend-only authentication simulation
 * for an internship project.
 *
 * Credentials are stored in localStorage and are NOT secure.
 * A production application must use a backend authentication
 * service with properly hashed passwords and secure sessions.
 */

export const AUTH_KEYS = {
  USERS: 'eventora_users',
  CURRENT_USER: 'eventora_current_user',
  REGISTRATIONS: 'eventora_registrations',
  SAVED_EVENTS: 'eventora_saved_events'
};

// Initial default demo user if storage is empty
const INITIAL_DEMO_USERS = [
  {
    id: "USR-001",
    name: "Prashant Kumar",
    email: "prashant@example.com",
    password: "password123"
  }
];

/**
 * Escape HTML to prevent XSS injection.
 */
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Initialize users storage with demo account if empty.
 */
export function initAuthStorage() {
  try {
    const raw = localStorage.getItem(AUTH_KEYS.USERS);
    if (!raw) {
      localStorage.setItem(AUTH_KEYS.USERS, JSON.stringify(INITIAL_DEMO_USERS));
    } else {
      // Validate JSON structure
      try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) {
          localStorage.setItem(AUTH_KEYS.USERS, JSON.stringify(INITIAL_DEMO_USERS));
        }
      } catch {
        localStorage.setItem(AUTH_KEYS.USERS, JSON.stringify(INITIAL_DEMO_USERS));
      }
    }
  } catch (e) {
    console.warn('LocalStorage error during initAuthStorage:', e);
  }
}

/**
 * Get all registered users.
 */
export function getUsers() {
  try {
    const raw = localStorage.getItem(AUTH_KEYS.USERS);
    if (!raw) return [...INITIAL_DEMO_USERS];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to get users:', e);
    return [];
  }
}

/**
 * Save users list to localStorage.
 */
export function saveUsers(users) {
  try {
    localStorage.setItem(AUTH_KEYS.USERS, JSON.stringify(users));
    return true;
  } catch (e) {
    console.error('Failed to save users:', e);
    return false;
  }
}

/**
 * Get the currently authenticated user object or null.
 */
export function getCurrentUser() {
  try {
    const currentId = localStorage.getItem(AUTH_KEYS.CURRENT_USER);
    if (!currentId) return null;
    const users = getUsers();
    const user = users.find(u => u.id === currentId);
    if (!user) {
      // Clean up orphaned session
      localStorage.removeItem(AUTH_KEYS.CURRENT_USER);
      return null;
    }
    return user;
  } catch (e) {
    console.error('Error in getCurrentUser:', e);
    return null;
  }
}

/**
 * Check if a session is currently active.
 */
export function isAuthenticated() {
  return getCurrentUser() !== null;
}

/**
 * Generate unique user ID formatted like USR-7F4A21.
 */
export function generateUserId() {
  const chars = '0123456789ABCDEF';
  let randomHex = '';
  for (let i = 0; i < 6; i++) {
    randomHex += chars[Math.floor(Math.random() * chars.length)];
  }
  return `USR-${randomHex}`;
}

/**
 * Register a new user account.
 */
export function signUp({ name, email, password }) {
  const trimmedName = (name || '').trim();
  const trimmedEmail = (email || '').trim().toLowerCase();
  const cleanPassword = password || '';

  if (!trimmedName) {
    return { success: false, error: 'Please enter your name.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
    return { success: false, error: 'Enter a valid email address.' };
  }

  if (cleanPassword.length < 8) {
    return { success: false, error: 'Password must be at least 8 characters.' };
  }

  const users = getUsers();
  // Case-insensitive duplicate email check
  const duplicate = users.find(u => (u.email || '').toLowerCase() === trimmedEmail);
  if (duplicate) {
    return {
      success: false,
      error: 'An account with this email already exists. Try signing in instead.'
    };
  }

  const newUser = {
    id: generateUserId(),
    name: trimmedName,
    email: trimmedEmail,
    password: cleanPassword
  };

  users.push(newUser);
  saveUsers(users);

  // Set session
  localStorage.setItem(AUTH_KEYS.CURRENT_USER, newUser.id);
  window.dispatchEvent(new CustomEvent('eventora:auth-change', { detail: { user: newUser } }));

  return { success: true, user: newUser };
}

/**
 * Authenticate with email & password.
 */
export function signIn(email, password) {
  const trimmedEmail = (email || '').trim().toLowerCase();
  const cleanPassword = password || '';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
    return { success: false, error: 'Enter a valid email address.' };
  }

  if (!cleanPassword) {
    return { success: false, error: 'Enter your password.' };
  }

  const users = getUsers();
  const matched = users.find(
    u => (u.email || '').toLowerCase() === trimmedEmail && u.password === cleanPassword
  );

  if (!matched) {
    return { success: false, error: 'Email or password is incorrect.' };
  }

  // Set session
  localStorage.setItem(AUTH_KEYS.CURRENT_USER, matched.id);
  window.dispatchEvent(new CustomEvent('eventora:auth-change', { detail: { user: matched } }));

  return { success: true, user: matched };
}

/**
 * Terminate current session and redirect to Home.
 */
export function signOut() {
  try {
    localStorage.removeItem(AUTH_KEYS.CURRENT_USER);
  } catch (e) {
    console.error('Error during signOut:', e);
  }
  window.dispatchEvent(new CustomEvent('eventora:auth-change', { detail: { user: null } }));
  window.location.href = 'index.html';
}

/**
 * Route guard: Redirect to signin if unauthenticated, preserving destination parameters.
 */
export function requireAuth(redirectParam = '', eventId = '', tier = '') {
  const user = getCurrentUser();
  if (!user) {
    let target = 'signin.html';
    const params = new URLSearchParams();
    if (redirectParam) params.set('redirect', redirectParam);
    if (eventId) params.set('id', eventId);
    if (tier) params.set('tier', tier);

    const query = params.toString();
    if (query) target += `?${query}`;

    window.location.replace(target);
    return null;
  }
  return user;
}

/**
 * Update user's profile information (name).
 */
export function updateUserName(newName) {
  const user = getCurrentUser();
  if (!user) return { success: false, error: 'User not authenticated.' };

  const trimmed = (newName || '').trim();
  if (!trimmed) return { success: false, error: 'Please enter your name.' };

  const users = getUsers();
  const idx = users.findIndex(u => u.id === user.id);
  if (idx === -1) return { success: false, error: 'User not found.' };

  users[idx].name = trimmed;
  saveUsers(users);

  window.dispatchEvent(new CustomEvent('eventora:auth-change', { detail: { user: users[idx] } }));
  return { success: true, user: users[idx] };
}

/**
 * Initialize navbar across pages to reflect authenticated state and dropdown menu.
 */
export function initNavbar() {
  const userArea = document.getElementById('navbarUserArea');
  if (!userArea) return;

  const currentUser = getCurrentUser();

  if (currentUser) {
    // Authenticated state
    const firstName = currentUser.name.split(' ')[0] || currentUser.name;
    const initial = (currentUser.name[0] || 'U').toUpperCase();

    userArea.innerHTML = `
      <!-- My Events Link (visible when logged in) -->
      <a href="my-events.html" class="inline-flex items-center gap-1.5 text-[#6F6D68] hover:text-[#202020] transition-colors font-medium whitespace-nowrap shrink-0">
        <span class="whitespace-nowrap inline-block">My Events</span>
      </a>

      <!-- Compact User Menu Pill -->
      <div class="relative" id="userMenuWrapper">
        <button 
          id="userMenuBtn" 
          type="button" 
          class="flex items-center gap-2 py-1.5 px-3 rounded-full bg-white border border-[#E8E5DF] hover:border-[#202020] text-sm font-semibold text-[#202020] transition-all focus:outline-none shadow-xs cursor-pointer"
          aria-expanded="false" 
          aria-haspopup="true"
        >
          <span class="w-6 h-6 rounded-full bg-[#E9E2F8] text-[#795DA8] text-xs font-bold flex items-center justify-center flex-shrink-0">
            ${escapeHtml(initial)}
          </span>
          <span class="max-w-[120px] truncate text-[14px]">${escapeHtml(firstName)}</span>
          <svg id="menuChevron" class="w-3.5 h-3.5 text-[#6F6D68] transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>

        <!-- Dropdown Card -->
        <div 
          id="userDropdown" 
          class="hidden absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-[#E8E5DF] shadow-lg py-2.5 z-50 text-left transition-all"
          role="menu"
        >
          <!-- User Info Header -->
          <div class="px-4 py-2 border-b border-[#F0EEE8]">
            <p class="font-bold text-sm text-[#202020] truncate">${escapeHtml(currentUser.name)}</p>
            <p class="text-xs text-[#6F6D68] truncate mt-0.5">${escapeHtml(currentUser.email)}</p>
          </div>

          <!-- Links -->
          <div class="py-1">
            <a href="my-events.html?tab=upcoming" class="flex items-center gap-2.5 px-4 py-2 text-sm text-[#202020] hover:bg-[#FAF9F6] transition-colors font-medium">
              <svg class="w-4 h-4 text-[#6F6D68]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>My Events</span>
            </a>
            <a href="my-events.html?tab=saved" class="flex items-center gap-2.5 px-4 py-2 text-sm text-[#202020] hover:bg-[#FAF9F6] transition-colors font-medium">
              <svg class="w-4 h-4 text-[#6F6D68]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
              </svg>
              <span>Saved Events</span>
            </a>
            <a href="account.html" class="flex items-center gap-2.5 px-4 py-2 text-sm text-[#202020] hover:bg-[#FAF9F6] transition-colors font-medium">
              <svg class="w-4 h-4 text-[#6F6D68]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span>Account</span>
            </a>
          </div>

          <!-- Sign Out Action -->
          <div class="border-t border-[#F0EEE8] pt-1 mt-1">
            <button 
              type="button" 
              id="navSignOutBtn" 
              class="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-[#D85A38] hover:bg-[#FAF9F6] transition-colors font-medium text-left cursor-pointer"
            >
              <svg class="w-4 h-4 text-[#D85A38]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    `;

    // Dropdown listeners
    const menuWrapper = document.getElementById('userMenuWrapper');
    const menuBtn = document.getElementById('userMenuBtn');
    const dropdown = document.getElementById('userDropdown');
    const chevron = document.getElementById('menuChevron');
    const signOutBtn = document.getElementById('navSignOutBtn');

    if (menuBtn && dropdown) {
      menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = !dropdown.classList.contains('hidden');
        if (isOpen) {
          dropdown.classList.add('hidden');
          menuBtn.setAttribute('aria-expanded', 'false');
          if (chevron) chevron.classList.remove('rotate-180');
        } else {
          dropdown.classList.remove('hidden');
          menuBtn.setAttribute('aria-expanded', 'true');
          if (chevron) chevron.classList.add('rotate-180');
        }
      });

      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (menuWrapper && !menuWrapper.contains(e.target)) {
          dropdown.classList.add('hidden');
          menuBtn.setAttribute('aria-expanded', 'false');
          if (chevron) chevron.classList.remove('rotate-180');
        }
      });

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !dropdown.classList.contains('hidden')) {
          dropdown.classList.add('hidden');
          menuBtn.setAttribute('aria-expanded', 'false');
          if (chevron) chevron.classList.remove('rotate-180');
          menuBtn.focus();
        }
      });
    }

    if (signOutBtn) {
      signOutBtn.addEventListener('click', () => {
        signOut();
      });
    }
  } else {
    // Logged-out state: show Sign In button linking to signin.html
    userArea.innerHTML = `
      <a href="signin.html" class="bg-[#202020] text-white px-5 py-2.5 rounded-full font-medium hover:bg-black transition-all shadow-sm text-center inline-block whitespace-nowrap shrink-0">
        <span class="whitespace-nowrap inline-block">Sign In</span>
      </a>
    `;
  }
}

// Automatically ensure auth storage is ready on load
initAuthStorage();
