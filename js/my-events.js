/**
 * Eventora - My Events Page Logic
 * Manages Upcoming, Past, and Saved tabs, rendering from LocalStorage.
 */
import {
  getRegistrations,
  getSavedEventIds,
  toggleSaveEvent,
  formatRupees,
  showToast,
  escapeHtml,
  renderEventCard,
  isEventDatePast,
  requireAuth
} from './app.js';
import { EVENTS_DATA } from './data.js';

let activeTab = 'upcoming'; // 'upcoming' | 'past' | 'saved'

export function initMyEvents() {
  // Protect route: require authenticated session
  const user = requireAuth('my-events');
  if (!user) return; // Redirected to signin.html?redirect=my-events

  const params = new URLSearchParams(window.location.search);
  if (params.has('tab')) {
    const requestedTab = params.get('tab');
    if (['upcoming', 'past', 'saved'].includes(requestedTab)) {
      activeTab = requestedTab;
    }
  }

  setupTabListeners();
  updateTabsUI();
  renderCurrentTab();
}

function setupTabListeners() {
  const tabButtons = document.querySelectorAll('button[data-tab]');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      activeTab = btn.getAttribute('data-tab');
      updateTabsUI();
      renderCurrentTab();
      // Sync URL without page reload
      const newUrl = `${window.location.pathname}?tab=${activeTab}`;
      window.history.replaceState({}, '', newUrl);
    });
  });
}

function updateTabsUI() {
  const tabButtons = document.querySelectorAll('button[data-tab]');
  tabButtons.forEach(btn => {
    const tabName = btn.getAttribute('data-tab');
    if (tabName === activeTab) {
      btn.className = 'tab-btn px-5 py-2.5 rounded-full text-sm font-bold border border-[#202020] bg-[#202020] text-white shadow-xs flex items-center gap-2 transition-all';
    } else {
      btn.className = 'tab-btn px-5 py-2.5 rounded-full text-sm font-semibold border border-[#E8E5DF] bg-white text-[#6F6D68] hover:border-[#6F6D68] hover:text-[#202020] flex items-center gap-2 transition-all';
    }
  });

  // Calculate counts based on real local storage data
  const registrations = getRegistrations();
  const upcomingRegs = registrations.filter(r => !isEventDatePast(r.date) && r.status !== 'Completed');
  const pastRegs = registrations.filter(r => isEventDatePast(r.date) || r.status === 'Completed');
  const savedIds = getSavedEventIds();
  const savedEvents = EVENTS_DATA.filter(e => savedIds.includes(e.id));

  const countUpcoming = document.getElementById('countUpcoming');
  if (countUpcoming) countUpcoming.textContent = upcomingRegs.length;

  const countPast = document.getElementById('countPast');
  if (countPast) countPast.textContent = pastRegs.length;

  const countSaved = document.getElementById('countSaved');
  if (countSaved) countSaved.textContent = savedEvents.length;
}

function renderCurrentTab() {
  const container = document.getElementById('eventsListContainer');
  const emptyState = document.getElementById('myEventsEmptyState');
  if (!container || !emptyState) return;

  if (activeTab === 'upcoming') {
    renderUpcoming(container, emptyState);
  } else if (activeTab === 'past') {
    renderPast(container, emptyState);
  } else if (activeTab === 'saved') {
    renderSaved(container, emptyState);
  }
}

function renderUpcoming(container, emptyState) {
  const registrations = getRegistrations();
  const upcomingRegs = registrations.filter(r => !isEventDatePast(r.date) && r.status !== 'Completed');

  if (upcomingRegs.length === 0) {
    container.innerHTML = '';
    showEmptyState(
      emptyState,
      'Nothing planned yet.',
      'Discover an event and make it yours. Bookmark panels, concerts, and workshops for quick access.',
      'Explore events',
      'events.html'
    );
    return;
  }

  emptyState.classList.add('hidden');
  container.innerHTML = `
    <div class="space-y-6">
      ${upcomingRegs.map(reg => {
        const matchingEvt = EVENTS_DATA.find(e => e.id === reg.eventId);
        const image = reg.image || (matchingEvt ? matchingEvt.image : 'https://lh3.googleusercontent.com/aida/AEtjO1UMLToh1N3tdDkMkjpQJyiKgdV1NJdzDJtzjpXlzxC6hYnwLKYoh6uXFYYS0InW_Wl7NeXN9SVJDg1JZVgbZPUCHwCj4y-PAVQlTPXP6HkH6l9O_qI0rqqVVhqVzLhGH2ZBNnUNhBR-S2jk5QIt3hFM88Y66cQCOlwacnPFgsj6dDmNGC0-oPKiyt13t13ILPHADoEeIAXdN1fvvfYxR3_lBHsI93nNyoYrw5mHiQT42bxJ9st8DBGNOg');
        const category = reg.category || (matchingEvt ? matchingEvt.category : 'General');
        
        return `
          <article class="bg-white rounded-3xl border border-[#E8E5DF] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all">
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              
              <!-- Left: Image & Main Info -->
              <div class="flex flex-col sm:flex-row items-start sm:items-center gap-5 flex-1">
                <img src="${image}" alt="${escapeHtml(reg.title)}" class="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border border-[#E8E5DF] flex-shrink-0 bg-[#F4F3F0]" />
                
                <div>
                  <div class="flex items-center gap-2 mb-2">
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DCE9DF] text-[#1D4427]">
                      <span class="w-1.5 h-1.5 rounded-full bg-[#4D7C5D]"></span>
                      ${escapeHtml(reg.status || 'Confirmed')}
                    </span>
                    <span class="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#E8E5DF] text-[#6F6D68]">
                      ${escapeHtml(category)}
                    </span>
                  </div>

                  <h3 class="text-xl font-bold text-[#202020] mb-1.5">
                    ${escapeHtml(reg.title)}
                  </h3>

                  <div class="space-y-1 text-xs sm:text-sm text-[#6F6D68]">
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-[#999791] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span>${escapeHtml(reg.date)} • ${escapeHtml(reg.time ? reg.time.split('IST')[0].trim() : '9:00 AM')}</span>
                    </div>

                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-[#999791] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <span>${escapeHtml(reg.location)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right: Pass ID & Actions -->
              <div class="w-full md:w-auto md:text-right border-t md:border-t-0 border-[#F0EEE8] pt-4 md:pt-0 flex flex-row md:flex-col items-center md:items-end justify-between gap-3">
                <div>
                  <span class="text-xs text-[#999791] font-mono block">Pass ID: ${escapeHtml(reg.registrationId)}</span>
                  <span class="text-sm font-bold text-[#202020] block">
                    ${reg.tickets} ${reg.tickets > 1 ? 'Passes' : 'Pass'} • ${formatRupees(reg.totalAmount)}
                  </span>
                </div>

                <div class="flex items-center gap-2">
                  <a href="success.html?regId=${encodeURIComponent(reg.registrationId)}" class="px-4 py-2 bg-[#202020] text-white rounded-xl text-xs font-bold hover:bg-black transition-colors shadow-2xs">
                    View Digital Pass →
                  </a>
                </div>
              </div>

            </div>
          </article>
        `;
      }).join('')}
    </div>
  `;
}

function renderPast(container, emptyState) {
  const registrations = getRegistrations();
  const pastRegs = registrations.filter(r => isEventDatePast(r.date) || r.status === 'Completed');

  if (pastRegs.length === 0) {
    container.innerHTML = '';
    showEmptyState(
      emptyState,
      'No past events yet.',
      'Your attended experiences and completed sessions will appear here after the event concludes.',
      'Explore events',
      'events.html'
    );
    return;
  }

  emptyState.classList.add('hidden');
  container.innerHTML = `
    <div class="space-y-6">
      ${pastRegs.map(past => {
        const matchingEvt = EVENTS_DATA.find(e => e.id === past.eventId);
        const image = past.image || (matchingEvt ? matchingEvt.image : 'https://lh3.googleusercontent.com/aida/AEtjO1UMLToh1N3tdDkMkjpQJyiKgdV1NJdzDJtzjpXlzxC6hYnwLKYoh6uXFYYS0InW_Wl7NeXN9SVJDg1JZVgbZPUCHwCj4y-PAVQlTPXP6HkH6l9O_qI0rqqVVhqVzLhGH2ZBNnUNhBR-S2jk5QIt3hFM88Y66cQCOlwacnPFgsj6dDmNGC0-oPKiyt13t13ILPHADoEeIAXdN1fvvfYxR3_lBHsI93nNyoYrw5mHiQT42bxJ9st8DBGNOg');
        const category = past.category || (matchingEvt ? matchingEvt.category : 'Cultural');

        return `
          <article class="bg-white rounded-3xl border border-[#E8E5DF] p-6 sm:p-7 shadow-xs opacity-90">
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              
              <div class="flex flex-col sm:flex-row items-start sm:items-center gap-5 flex-1">
                <img src="${image}" alt="${escapeHtml(past.title)}" class="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border border-[#E8E5DF] grayscale flex-shrink-0" />
                <div>
                  <div class="flex items-center gap-2 mb-2">
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FAF9F6] border border-[#E8E5DF] text-[#6F6D68]">
                      Completed
                    </span>
                    <span class="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#E8E5DF] text-[#6F6D68]">
                      ${escapeHtml(category)}
                    </span>
                  </div>

                  <h3 class="text-xl font-bold text-[#202020] mb-1.5">${escapeHtml(past.title)}</h3>
                  <p class="text-xs sm:text-sm text-[#6F6D68]">${escapeHtml(past.date)}</p>
                  <p class="text-xs text-[#999791] mt-0.5">${escapeHtml(past.location)}</p>
                </div>
              </div>

              <div class="w-full md:w-auto md:text-right border-t md:border-t-0 border-[#F0EEE8] pt-4 md:pt-0 flex flex-row md:flex-col items-center md:items-end justify-between gap-3">
                <div>
                  <span class="text-xs text-[#999791] font-mono block">Pass ID: ${escapeHtml(past.registrationId)}</span>
                  <span class="text-sm font-semibold text-[#6F6D68] block">Attended • ${formatRupees(past.totalAmount)}</span>
                </div>
                <button type="button" data-receipt-id="${escapeHtml(past.registrationId)}" class="past-receipt-btn px-4 py-2 bg-[#FAF9F6] text-[#202020] border border-[#E8E5DF] rounded-xl text-xs font-semibold hover:border-[#202020] transition-colors">
                  Receipt Summary ↓
                </button>
              </div>

            </div>
          </article>
        `;
      }).join('')}
    </div>
  `;

  // Attach receipt button toasts
  container.querySelectorAll('button[data-receipt-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-receipt-id');
      showToast(`Digital receipt ready for pass ${id}`);
    });
  });
}

function renderSaved(container, emptyState) {
  const savedIds = getSavedEventIds();
  const savedEvents = EVENTS_DATA.filter(e => savedIds.includes(e.id));

  if (savedEvents.length === 0) {
    container.innerHTML = '';
    showEmptyState(
      emptyState,
      'Nothing planned yet.',
      'Discover an event and make it yours. Bookmark panels, concerts, and workshops for quick access.',
      'Explore events',
      'events.html'
    );
    return;
  }

  emptyState.classList.add('hidden');
  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${savedEvents.map(evt => renderEventCard(evt, { showRemove: true })).join('')}
    </div>
  `;

  // Attach remove handlers
  container.querySelectorAll('button[data-remove-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-remove-id');
      toggleSaveEvent(id);
      showToast('Removed from saved experiences');
      updateTabsUI();
      renderSaved(container, emptyState);
    });
  });
}

function showEmptyState(el, title, desc, btnText, btnLink) {
  el.classList.remove('hidden');
  const h3 = el.querySelector('h3');
  const p = el.querySelector('p');
  const a = el.querySelector('a');
  if (h3) h3.textContent = title;
  if (p) p.textContent = desc;
  if (a) {
    a.innerHTML = `<span>${escapeHtml(btnText)}</span> <span>→</span>`;
    a.href = btnLink;
  }
}

document.addEventListener('DOMContentLoaded', initMyEvents);
