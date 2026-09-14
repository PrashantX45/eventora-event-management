[README.md](https://github.com/user-attachments/files/32198278/README.md)
# Eventora — Event Management & Registration Platform

Eventora is a modern, responsive event discovery and registration website built as an internship project. It allows users to explore events, search and filter listings, view detailed event information, register for events, save events for later, and manage their registrations through a lightweight frontend account system.

## Live Demo

**Live Website:** https://eventora-event-management.vercel.app/

## Project Overview

The goal of Eventora is to provide a simple and polished digital experience for discovering and registering for events.

The project focuses on:

- Event discovery
- Search and filtering
- Event details
- Ticket/pass selection
- Registration validation
- User accounts
- Saved events
- Personal event registrations
- Persistent browser storage
- Responsive UI

## Key Features

### Event Discovery
- Browse a curated collection of events.
- Explore events by category.
- Search events by relevant information.
- Filter and sort event listings.
- Responsive event-card layout.

### Event Details
Each event provides:
- Event title and category
- Date and time
- Venue and location
- Ticket/pass pricing
- Available-seat information
- Event description
- What to expect
- Schedule
- Speakers
- Related events

### Registration
Users can:
- Select a ticket/pass tier.
- Select ticket quantity.
- View dynamic pricing.
- Enter attendee information.
- Receive validation feedback.
- Complete an event registration.

### Frontend Authentication
Eventora includes a Phase 1 frontend-only account system:
- Create an account
- Sign in
- Sign out
- Maintain a browser session
- User-specific registrations
- User-specific saved events
- Account page

> **Note:** Authentication is intentionally frontend-only for this internship project. User credentials are stored in `localStorage`, which is not secure for production authentication. A production version should use a backend authentication service with secure password hashing and session management.

### My Events
Authenticated users can manage:
- Upcoming registrations
- Past events
- Saved events
- Digital event passes

### Local Storage
The application uses browser `localStorage` to persist data between page refreshes.

Main storage keys include:

```text
eventora_users
eventora_current_user
eventora_registrations
eventora_saved_events
```

### Responsive Design
The interface is designed to work across:
- Desktop
- Tablet
- Mobile

## Design

Eventora uses a warm, contemporary visual system rather than a conventional blue-heavy event website.

Primary visual characteristics include:

- Warm ivory backgrounds
- White content surfaces
- Charcoal typography
- Lavender, peach, sage, butter and dusty-rose accents
- Clean modern typography
- Subtle borders and shadows
- Contemporary Indian-inspired decorative artwork
- Realistic event-focused imagery

The design was created first in Google Stitch and then implemented as a functional web application.

## Technology Stack

- HTML5
- CSS3
- JavaScript (ES Modules)
- Vite
- Tailwind CSS
- TypeScript tooling for project type checking
- Browser `localStorage`
- Vercel for deployment
- GitHub for source-code management

## Project Structure

```text
eventora/
│
├── index.html
├── events.html
├── event.html
├── register.html
├── success.html
├── my-events.html
├── signin.html
├── signup.html
├── account.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   ├── auth.js
│   ├── data.js
│   ├── events.js
│   ├── event-details.js
│   ├── register.js
│   └── my-events.js
│
├── src/
│   ├── index.ts
│   └── index.css
│
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .gitignore
└── README.md
```

## Running Locally

### Prerequisites

Install:

- Node.js
- npm

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd eventora-event-management
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The terminal will provide the local development URL.

### 4. Create a production build

```bash
npm run build
```

### 5. Preview the production build

```bash
npm run preview
```

## Application Flow

```text
Home
  ↓
Explore Events
  ↓
Event Details
  ↓
Register
  ↓
Sign In / Create Account (if required)
  ↓
Registration Form
  ↓
Registration Success
  ↓
My Events
```

Saved-event flow:

```text
Event Details
  ↓
Save Event
  ↓
localStorage
  ↓
My Events → Saved
```

## Data Model

### User

```javascript
{
  id,
  name,
  email,
  password
}
```

### Registration

```javascript
{
  registrationId,
  userId,
  eventId,
  fullName,
  email,
  phone,
  college,
  city,
  tickets,
  specialRequirements,
  totalAmount,
  registeredAt
}
```

### Event

Events are maintained in a centralized dataset so the Home, Explore, Details, Registration and My Events experiences can use the same event information.

## Important Project Notes

### Frontend-only Authentication

This project intentionally demonstrates authentication behavior without a backend.

It is suitable for demonstrating:
- authentication flow
- session state
- user-specific data
- localStorage
- protected pages

It should **not** be used as a production authentication implementation.

### No Real Payment Processing

The project does not process real payments. Registration is simulated entirely on the frontend.

### Browser Storage

Because registrations, users and saved events are stored locally, data is tied to the browser/device where the application is used.

Clearing browser storage will remove the locally stored application data.

## Deployment

The project is deployed using Vercel.

Every new GitHub deployment can be connected to Vercel so that changes can be built and published automatically.

**Live:** https://eventora-event-management.vercel.app/

## Internship Objectives Covered

This project demonstrates:

- Frontend web development
- Responsive UI implementation
- JavaScript DOM manipulation
- ES module organization
- Form validation
- Search and filtering
- Dynamic rendering
- Local storage
- Frontend authentication concepts
- User-specific application state
- Multi-page navigation
- Deployment using Vercel
- Source-code management with GitHub

## Future Improvements

If Eventora were developed into a production application, the next logical improvements would be:

- Secure backend authentication
- Database-backed event and registration data
- Real-time seat availability
- Secure payment processing
- Email confirmation
- Calendar integration
- Event organizer/admin dashboard
- Server-side validation
- Secure session management
- Production image/CDN management

## Project Status

**Status:** Completed internship frontend project

**Deployment:** Live on Vercel

**Architecture:** Frontend / browser-storage based

---

### Author

**Prashant Kumar**

Internship Project — Event Management & Registration
