/**
 * Eventora - Event Registration Script
 * Handles dynamic calculation, validation, form submission, and local persistence.
 */
import { EVENTS_DATA } from './data.js';
import { saveRegistration, formatRupees, requireAuth, getCurrentUser } from './app.js';

let currentEvent = null;
let currentTier = 'standard';
let ticketQuantity = 1;
const MAX_TICKETS = 5;
const MIN_TICKETS = 1;

export function initRegistration() {
  const params = new URLSearchParams(window.location.search);
  const eventId = params.get('id') || 'future-tech-summit-2026';
  currentTier = params.get('tier') === 'vip' ? 'vip' : 'standard';

  // Protect route: require authenticated user
  const currentUser = requireAuth('register', eventId, currentTier);
  if (!currentUser) {
    return; // Redirected to signin.html with return parameters
  }

  currentEvent = EVENTS_DATA.find(e => e.id === eventId) || EVENTS_DATA[0];

  renderEventContext(currentEvent);
  setupFormHandlers(currentEvent);
  updateCalculations();

  // Prefill authenticated user details
  const nameInput = document.getElementById('fullName');
  if (nameInput && !nameInput.value && currentUser.name) {
    nameInput.value = currentUser.name;
  }
  const emailInput = document.getElementById('email');
  if (emailInput && !emailInput.value && currentUser.email) {
    emailInput.value = currentUser.email;
  }
}

function renderEventContext(evt) {
  // Page Title
  document.title = `Register for ${evt.title} — Eventora`;

  // Back link
  const backLink = document.getElementById('backLink');
  if (backLink) {
    backLink.href = `event.html?id=${evt.id}`;
    backLink.innerHTML = `← Back to ${evt.title}`;
  }

  // Event Card in Form
  const regEventImage = document.getElementById('regEventImage');
  if (regEventImage) {
    regEventImage.src = evt.image || '/images/events/eventora-fallback.webp';
    regEventImage.onerror = () => {
      regEventImage.onerror = null;
      regEventImage.src = '/images/events/eventora-fallback.webp';
    };
  }

  const regEventTitle = document.getElementById('regEventTitle');
  if (regEventTitle) regEventTitle.textContent = evt.title;

  const regCategoryBadge = document.getElementById('regCategoryBadge');
  if (regCategoryBadge) {
    regCategoryBadge.textContent = evt.category;
    regCategoryBadge.style.backgroundColor = evt.categoryColor?.bg || '#FAF9F6';
    regCategoryBadge.style.color = evt.categoryColor?.badgeText || '#6F6D68';
  }

  const regEventDate = document.getElementById('regEventDate');
  if (regEventDate) regEventDate.textContent = `${evt.date} • ${evt.time.split('IST')[0].trim()}`;

  const regEventVenue = document.getElementById('regEventVenue');
  if (regEventVenue) regEventVenue.textContent = evt.location;

  // Sidebar details
  const summaryEventTitle = document.getElementById('summaryEventTitle');
  if (summaryEventTitle) summaryEventTitle.textContent = evt.title;

  const summaryEventDate = document.getElementById('summaryEventDate');
  if (summaryEventDate) summaryEventDate.textContent = evt.date;

  const summaryEventVenue = document.getElementById('summaryEventVenue');
  if (summaryEventVenue) summaryEventVenue.textContent = evt.location;

  const summaryTierBadge = document.getElementById('summaryTierBadge');
  if (summaryTierBadge) {
    summaryTierBadge.textContent = currentTier === 'vip' ? 'VIP Access Pass' : 'Standard Admission Pass';
  }
}

function updateCalculations() {
  if (!currentEvent) return;

  const unitPrice = currentTier === 'vip' ? currentEvent.tierVipPrice : currentEvent.tierStandardPrice;
  const totalPrice = unitPrice * ticketQuantity;

  // Quantity display in counter
  const ticketCountDisplay = document.getElementById('ticketCountDisplay');
  if (ticketCountDisplay) ticketCountDisplay.textContent = ticketQuantity;

  // Sidebar breakdown
  const summaryTicketCount = document.getElementById('summaryTicketCount');
  if (summaryTicketCount) summaryTicketCount.textContent = `${ticketQuantity} × ${formatRupees(unitPrice)}`;

  const summaryTicketsSubtotal = document.getElementById('summaryTicketsSubtotal');
  if (summaryTicketsSubtotal) summaryTicketsSubtotal.textContent = formatRupees(totalPrice);

  const summaryTotalPrice = document.getElementById('summaryTotalPrice');
  if (summaryTotalPrice) summaryTotalPrice.textContent = formatRupees(totalPrice);

  // Minus / Plus button styling & disability
  const minusBtn = document.getElementById('minusTicketBtn');
  const plusBtn = document.getElementById('plusTicketBtn');
  if (minusBtn) {
    minusBtn.disabled = ticketQuantity <= MIN_TICKETS;
    minusBtn.classList.toggle('opacity-40', ticketQuantity <= MIN_TICKETS);
    minusBtn.classList.toggle('cursor-not-allowed', ticketQuantity <= MIN_TICKETS);
  }
  if (plusBtn) {
    plusBtn.disabled = ticketQuantity >= MAX_TICKETS;
    plusBtn.classList.toggle('opacity-40', ticketQuantity >= MAX_TICKETS);
    plusBtn.classList.toggle('cursor-not-allowed', ticketQuantity >= MAX_TICKETS);
  }
}

function setupFormHandlers(evt) {
  // Quantity buttons
  const minusBtn = document.getElementById('minusTicketBtn');
  const plusBtn = document.getElementById('plusTicketBtn');

  if (minusBtn) {
    minusBtn.addEventListener('click', () => {
      if (ticketQuantity > MIN_TICKETS) {
        ticketQuantity--;
        updateCalculations();
      }
    });
  }

  if (plusBtn) {
    plusBtn.addEventListener('click', () => {
      if (ticketQuantity < MAX_TICKETS) {
        ticketQuantity++;
        updateCalculations();
      }
    });
  }

  // Tier change radio buttons inside registration
  const tierRadios = document.querySelectorAll('input[name="registrationTier"]');
  tierRadios.forEach(radio => {
    if (radio.value === currentTier) radio.checked = true;
    radio.addEventListener('change', (e) => {
      currentTier = e.target.value;
      const summaryTierBadge = document.getElementById('summaryTierBadge');
      if (summaryTierBadge) {
        summaryTierBadge.textContent = currentTier === 'vip' ? 'VIP Access Pass' : 'Standard Admission Pass';
      }
      updateCalculations();
    });
  });

  // Real-time input listeners to clear errors on the fly
  const nameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('emailAddress');
  const phoneInput = document.getElementById('phoneNumber');
  const termsCheckbox = document.getElementById('termsAgreed');

  if (nameInput) {
    nameInput.addEventListener('input', () => {
      if (nameInput.value.trim().length >= 2) {
        clearFieldError('fullNameError', nameInput);
      }
    });
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(emailInput.value.trim())) {
        clearFieldError('emailError', emailInput);
      }
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      // Handle pasted prefixes like 91 or 0
      if (val.length > 10) {
        if (val.startsWith('91')) val = val.slice(2);
        else if (val.startsWith('0')) val = val.slice(1);
      }
      if (val.length > 10) {
        val = val.slice(0, 10);
      }
      e.target.value = val;

      if (/^[6-9]\d{9}$/.test(val)) {
        clearFieldError('phoneError', phoneInput);
      }
    });
  }

  if (termsCheckbox) {
    termsCheckbox.addEventListener('change', () => {
      if (termsCheckbox.checked) {
        const termsError = document.getElementById('termsError');
        if (termsError) termsError.classList.add('hidden');
      }
    });
  }

  // Form submission
  const form = document.getElementById('registrationForm');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  const nameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('emailAddress');
  const phoneInput = document.getElementById('phoneNumber');
  const collegeInput = document.getElementById('collegeOrg');
  const cityInput = document.getElementById('userCity');
  const notesInput = document.getElementById('specialRequirements');
  const termsCheckbox = document.getElementById('termsAgreed');

  let isValid = true;
  let firstInvalidElement = null;

  // Clear previous errors
  document.querySelectorAll('.error-msg').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.input-field').forEach(el => el.classList.remove('border-rose-500', 'bg-rose-50/20'));

  // Validate Name
  const fullNameVal = nameInput ? nameInput.value.trim() : '';
  if (!fullNameVal) {
    showFieldError('fullNameError', nameInput, 'Please enter your full name');
    isValid = false;
    if (!firstInvalidElement) firstInvalidElement = nameInput;
  } else if (fullNameVal.length < 2) {
    showFieldError('fullNameError', nameInput, 'Please enter at least 2 characters for your name');
    isValid = false;
    if (!firstInvalidElement) firstInvalidElement = nameInput;
  }

  // Validate Email
  const emailVal = emailInput ? emailInput.value.trim() : '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailVal) {
    showFieldError('emailError', emailInput, 'Please enter your email address');
    isValid = false;
    if (!firstInvalidElement) firstInvalidElement = emailInput;
  } else if (!emailRegex.test(emailVal)) {
    showFieldError('emailError', emailInput, 'Please enter a valid email address (e.g., name@example.com)');
    isValid = false;
    if (!firstInvalidElement) firstInvalidElement = emailInput;
  }

  // Validate 10-Digit Indian Phone Number
  const rawPhone = phoneInput ? phoneInput.value.trim() : '';
  const digitsOnly = rawPhone.replace(/\D/g, '');
  let tenDigits = digitsOnly;
  if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
    tenDigits = digitsOnly.slice(2);
  } else if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) {
    tenDigits = digitsOnly.slice(1);
  }

  if (!tenDigits) {
    showFieldError('phoneError', phoneInput, 'Please provide your mobile number');
    isValid = false;
    if (!firstInvalidElement) firstInvalidElement = phoneInput;
  } else if (tenDigits.length !== 10) {
    showFieldError('phoneError', phoneInput, 'Phone number must be exactly 10 digits');
    isValid = false;
    if (!firstInvalidElement) firstInvalidElement = phoneInput;
  } else if (!/^[6-9]/.test(tenDigits)) {
    showFieldError('phoneError', phoneInput, 'Indian mobile numbers must start with 6, 7, 8, or 9');
    isValid = false;
    if (!firstInvalidElement) firstInvalidElement = phoneInput;
  } else if (!/^[6-9]\d{9}$/.test(tenDigits)) {
    showFieldError('phoneError', phoneInput, 'Please enter a valid 10-digit mobile number');
    isValid = false;
    if (!firstInvalidElement) firstInvalidElement = phoneInput;
  }

  // Validate Terms
  if (termsCheckbox && !termsCheckbox.checked) {
    const termsError = document.getElementById('termsError');
    if (termsError) termsError.classList.remove('hidden');
    isValid = false;
    if (!firstInvalidElement) firstInvalidElement = termsCheckbox;
  }

  if (!isValid) {
    if (firstInvalidElement && typeof firstInvalidElement.focus === 'function') {
      firstInvalidElement.focus();
    }
    return;
  }

  // Disable submit button & show spinner
  const submitBtn = document.getElementById('submitRegBtn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Confirming place...</span>
    `;
  }

  // Generate unique ID: EVT- + 6 random alphanumeric characters
  const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
  const registrationId = `EVT-${randomHex}`;

  const unitPrice = currentTier === 'vip' ? currentEvent.tierVipPrice : currentEvent.tierStandardPrice;
  const totalAmount = unitPrice * ticketQuantity;

  const currentUser = getCurrentUser();
  if (!currentUser) {
    window.location.href = `signin.html?redirect=register&id=${encodeURIComponent(currentEvent.id)}&tier=${currentTier}`;
    return;
  }

  const registrationRecord = {
    registrationId,
    userId: currentUser.id,
    eventId: currentEvent.id,
    title: currentEvent.title,
    date: currentEvent.date,
    time: currentEvent.time,
    location: currentEvent.location,
    image: currentEvent.image,
    category: currentEvent.category,
    fullName: fullNameVal,
    email: emailVal,
    phone: tenDigits,
    college: collegeInput ? collegeInput.value.trim() : '',
    city: cityInput ? cityInput.value.trim() : '',
    tickets: ticketQuantity,
    specialRequirements: notesInput ? notesInput.value.trim() : '',
    passType: currentTier === 'vip' ? 'VIP Access Pass' : 'Standard Admission Pass',
    tier: currentTier,
    totalAmount,
    status: 'Confirmed',
    registeredAt: new Date().toISOString()
  };

  // Save to localStorage and redirect to confirmation
  setTimeout(() => {
    saveRegistration(registrationRecord);
    window.location.href = `success.html?regId=${registrationId}&id=${currentEvent.id}`;
  }, 400);
}

function showFieldError(errorElementId, inputElement, message) {
  const errorEl = document.getElementById(errorElementId);
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
  }
  if (inputElement) {
    inputElement.classList.add('border-rose-500', 'bg-rose-50/20');
  }
}

function clearFieldError(errorElementId, inputElement) {
  const errorEl = document.getElementById(errorElementId);
  if (errorEl) {
    errorEl.classList.add('hidden');
    errorEl.textContent = '';
  }
  if (inputElement) {
    inputElement.classList.remove('border-rose-500', 'bg-rose-50/20');
  }
}

document.addEventListener('DOMContentLoaded', initRegistration);
