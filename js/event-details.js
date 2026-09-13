/**
 * Eventora - Event Details Page Logic
 * Dynamically loads event by ID from URL params, handles pass tiers, saving, sharing, and related events.
 */
import { EVENTS_DATA } from './data.js';
import { isEventSaved, toggleSaveEvent, showToast, formatRupees, renderEventCard, isAuthenticated } from './app.js';

let currentEvent = null;
let selectedTier = 'standard'; // 'standard' | 'vip'

export function initEventDetails() {
  const params = new URLSearchParams(window.location.search);
  const eventId = params.get('id') || 'future-tech-summit-2026';
  
  currentEvent = EVENTS_DATA.find(e => e.id === eventId) || EVENTS_DATA[0];

  renderEventDetails(currentEvent);
  renderRelatedEvents(currentEvent);
  setupInteractions(currentEvent);
}

function renderEventDetails(evt) {
  // Page title
  document.title = `${evt.title} — Eventora`;

  // Breadcrumbs
  const breadcrumbCat = document.getElementById('breadcrumbCategory');
  const breadcrumbTitle = document.getElementById('breadcrumbTitle');
  if (breadcrumbCat) {
    breadcrumbCat.textContent = evt.category;
    breadcrumbCat.href = `events.html?cat=${encodeURIComponent(evt.category)}`;
  }
  if (breadcrumbTitle) breadcrumbTitle.textContent = evt.title;

  // Hero section
  const heroImage = document.getElementById('heroImage');
  if (heroImage) {
    heroImage.src = evt.image || '/images/events/eventora-fallback.webp';
    heroImage.alt = evt.title;
    heroImage.onerror = () => {
      heroImage.onerror = null;
      heroImage.src = '/images/events/eventora-fallback.webp';
    };
  }

  const categoryBadge = document.getElementById('categoryBadge');
  if (categoryBadge) {
    categoryBadge.textContent = evt.category;
    categoryBadge.style.backgroundColor = evt.categoryColor.bg;
    categoryBadge.style.color = evt.categoryColor.badgeText;
  }

  const eventTitle = document.getElementById('eventTitle');
  if (eventTitle) eventTitle.textContent = evt.title;

  const eventTagline = document.getElementById('eventTagline');
  if (eventTagline) eventTagline.textContent = evt.tagline;

  const metaDate = document.getElementById('metaDate');
  if (metaDate) metaDate.textContent = evt.date;

  const metaTime = document.getElementById('metaTime');
  if (metaTime) metaTime.textContent = evt.time;

  const metaLocation = document.getElementById('metaLocation');
  if (metaLocation) metaLocation.textContent = evt.location;

  const metaPrice = document.getElementById('metaPrice');
  if (metaPrice) metaPrice.textContent = evt.priceFormatted;

  const seatsIndicator = document.getElementById('seatsIndicator');
  if (seatsIndicator) seatsIndicator.textContent = evt.seatsText;

  // Quick strip
  const stripDate = document.getElementById('stripDate');
  if (stripDate) stripDate.textContent = evt.dateShort + ', 2026';

  const stripTime = document.getElementById('stripTime');
  if (stripTime) stripTime.textContent = evt.time.split('IST')[0].trim();

  const stripLocation = document.getElementById('stripLocation');
  if (stripLocation) stripLocation.textContent = evt.city;

  const stripPrice = document.getElementById('stripPrice');
  if (stripPrice) stripPrice.textContent = evt.priceFormatted;

  // About paragraphs
  const aboutContainer = document.getElementById('aboutContainer');
  if (aboutContainer) {
    aboutContainer.innerHTML = evt.about.map(p => `
      <p class="text-base text-[#6F6D68] leading-relaxed mb-4">${p}</p>
    `).join('');
  }

  // What to expect
  const expectationsContainer = document.getElementById('expectationsContainer');
  if (expectationsContainer && evt.whatToExpect) {
    expectationsContainer.innerHTML = evt.whatToExpect.map(item => `
      <div class="bg-white rounded-2xl border border-[#E8E5DF] p-5 shadow-xs flex items-start gap-4">
        <span class="text-xs font-bold px-2 py-1 rounded bg-[#FAF9F6] border border-[#E8E5DF] text-[#6F6D68]">${item.id}</span>
        <p class="text-sm font-medium text-[#202020] leading-snug">${item.text}</p>
      </div>
    `).join('');
  }

  // Schedule
  const scheduleContainer = document.getElementById('scheduleContainer');
  if (scheduleContainer && evt.schedule) {
    scheduleContainer.innerHTML = evt.schedule.map((item, idx) => `
      <div class="flex items-start gap-4 sm:gap-6 relative group">
        <!-- Dot & vertical line -->
        <div class="flex flex-col items-center flex-shrink-0 pt-1">
          <div class="w-3 h-3 rounded-full border-2 border-white shadow-xs ${idx === 0 ? 'bg-[#D85A38]' : 'bg-[#202020]'}"></div>
          ${idx !== evt.schedule.length - 1 ? '<div class="w-0.5 h-16 bg-[#E8E5DF] mt-1"></div>' : ''}
        </div>
        <!-- Content -->
        <div class="pb-6 flex-1">
          <div class="text-xs font-bold text-[#6F6D68] uppercase tracking-wider mb-0.5">${item.time}</div>
          <h4 class="text-base font-bold text-[#202020] mb-1">${item.title}</h4>
          <p class="text-sm text-[#6F6D68] leading-relaxed">${item.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // Speakers
  const speakersContainer = document.getElementById('speakersContainer');
  if (speakersContainer && evt.speakers) {
    speakersContainer.innerHTML = evt.speakers.map(sp => `
      <div class="bg-white rounded-2xl border border-[#E8E5DF] p-4 flex items-center gap-4 shadow-xs">
        <img src="${sp.image || '/images/events/eventora-fallback.webp'}" alt="${sp.name}" class="w-14 h-14 rounded-full object-cover border border-[#E8E5DF] flex-shrink-0" onerror="this.onerror=null;this.src='/images/events/eventora-fallback.webp';" />
        <div>
          <h4 class="font-bold text-[#202020] text-sm">${sp.name}</h4>
          <p class="text-xs text-[#6F6D68]">${sp.role}</p>
          <p class="text-xs font-semibold text-[#202020] mt-0.5">${sp.company}</p>
        </div>
      </div>
    `).join('');
  }

  // Venue details
  const venueTitle = document.getElementById('venueTitle');
  if (venueTitle) venueTitle.textContent = evt.venue.split(',')[0];
  const venueAddress = document.getElementById('venueAddress');
  if (venueAddress) venueAddress.textContent = evt.venue;

  // Sidebar pass pricing
  const standardPassPrice = document.getElementById('standardPassPrice');
  if (standardPassPrice) standardPassPrice.textContent = formatRupees(evt.tierStandardPrice);

  const vipPassPrice = document.getElementById('vipPassPrice');
  if (vipPassPrice) vipPassPrice.textContent = formatRupees(evt.tierVipPrice);

  updateRegistrationLinks(evt);
  updateSaveButtonUI(evt.id);
}

function updateRegistrationLinks(evt) {
  const isAuth = isAuthenticated();
  const registerUrl = isAuth
    ? `register.html?id=${encodeURIComponent(evt.id)}&tier=${selectedTier}`
    : `signin.html?redirect=register&id=${encodeURIComponent(evt.id)}&tier=${selectedTier}`;
  
  const heroRegisterBtn = document.getElementById('heroRegisterBtn');
  if (heroRegisterBtn) heroRegisterBtn.href = registerUrl;

  const sidebarRegisterBtn = document.getElementById('sidebarRegisterBtn');
  if (sidebarRegisterBtn) sidebarRegisterBtn.href = registerUrl;

  const mobileRegisterBtn = document.getElementById('mobileRegisterBtn');
  if (mobileRegisterBtn) mobileRegisterBtn.href = registerUrl;

  const mobilePrice = document.getElementById('mobilePrice');
  if (mobilePrice) {
    const currentPrice = selectedTier === 'standard' ? evt.tierStandardPrice : evt.tierVipPrice;
    mobilePrice.textContent = formatRupees(currentPrice);
  }
}

function setupInteractions(evt) {
  // Pass tier selector
  const standardTierOption = document.getElementById('tierOptionStandard');
  const vipTierOption = document.getElementById('tierOptionVip');

  if (standardTierOption && vipTierOption) {
    standardTierOption.addEventListener('click', () => {
      selectedTier = 'standard';
      standardTierOption.classList.add('border-[#202020]', 'bg-[#FAF9F6]');
      standardTierOption.classList.remove('border-[#E8E5DF]', 'bg-white');
      vipTierOption.classList.remove('border-[#202020]', 'bg-[#FAF9F6]');
      vipTierOption.classList.add('border-[#E8E5DF]', 'bg-white');
      
      const radioStd = standardTierOption.querySelector('input[type="radio"]');
      if (radioStd) radioStd.checked = true;
      updateRegistrationLinks(evt);
    });

    vipTierOption.addEventListener('click', () => {
      selectedTier = 'vip';
      vipTierOption.classList.add('border-[#202020]', 'bg-[#FAF9F6]');
      vipTierOption.classList.remove('border-[#E8E5DF]', 'bg-white');
      standardTierOption.classList.remove('border-[#202020]', 'bg-[#FAF9F6]');
      standardTierOption.classList.add('border-[#E8E5DF]', 'bg-white');

      const radioVip = vipTierOption.querySelector('input[type="radio"]');
      if (radioVip) radioVip.checked = true;
      updateRegistrationLinks(evt);
    });
  }

  // Save buttons
  const heroSaveBtn = document.getElementById('heroSaveBtn');
  const sidebarSaveBtn = document.getElementById('sidebarSaveBtn');

  const handleSaveToggle = () => {
    const isSaved = toggleSaveEvent(evt.id);
    updateSaveButtonUI(evt.id);
    showToast(isSaved ? 'Saved to your bookmarked experiences' : 'Removed from saved experiences');
  };

  if (heroSaveBtn) heroSaveBtn.addEventListener('click', handleSaveToggle);
  if (sidebarSaveBtn) sidebarSaveBtn.addEventListener('click', handleSaveToggle);

  // Share buttons
  const shareButtons = document.querySelectorAll('.share-btn');
  shareButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(() => {
          showToast('Event link copied to clipboard!');
        }).catch(() => {
          showToast('Share link ready: ' + window.location.href);
        });
      } else {
        showToast('Share link: ' + window.location.href);
      }
    });
  });
}

function updateSaveButtonUI(eventId) {
  const saved = isEventSaved(eventId);
  const heroSaveBtn = document.getElementById('heroSaveBtn');
  const sidebarSaveBtn = document.getElementById('sidebarSaveBtn');

  const text = saved ? 'Saved' : 'Save';
  const iconFilled = `
    <svg class="w-4 h-4 fill-current text-[#D85A38]" viewBox="0 0 24 24">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
    </svg>
  `;
  const iconOutline = `
    <svg class="w-4 h-4 text-[#6F6D68]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
    </svg>
  `;

  if (heroSaveBtn) {
    heroSaveBtn.innerHTML = `${saved ? iconFilled : iconOutline} <span>${text}</span>`;
  }
  if (sidebarSaveBtn) {
    sidebarSaveBtn.innerHTML = `${saved ? iconFilled : iconOutline} <span>${text} for later</span>`;
  }
}

function renderRelatedEvents(currentEvt) {
  const container = document.getElementById('relatedEventsGrid');
  if (!container) return;

  const others = EVENTS_DATA.filter(e => e.id !== currentEvt.id).slice(0, 3);
  container.innerHTML = others.map(evt => renderEventCard(evt)).join('');
}

document.addEventListener('DOMContentLoaded', initEventDetails);
