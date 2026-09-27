# Superleap AI CRM — Nova Fertility Enterprise Deployment

> **Prototype for Product Manager Role (Deploy Excellence) at Superleap**  
> Tailored for **Nova Fertility** (140 IVF clinics across 28 Indian cities, 1,500+ frontline users, 2.2 Lakh monthly enquiries).

---

## 🚀 Live Prototype Highlights

This prototype addresses the core deployment blockers raised by Nova Fertility’s Head of Operations (Meera) and CEO (Dr. Kavitha), aligning with the official design language of [Superleap.com](https://www.superleap.com/):

### 1. Column Management (6 Columns vs 40-Column Wall)
- **Role-Based Presets (1-Click Switch)**:
  - **Call-Centre Agent View (6 cols)**: Stripped down to essential triage fields (*Patient Name & ID, Contact/WhatsApp, Clinic & City, Patient Journey Stage, AI Intent Score, Quick Action*), eliminating 34 noisy fields for 500 agents.
  - **Clinic Counsellor View (8 cols)**: Adds *Assigned Specialist Doctor* and *Consultation Slot*.
  - **Clinic Manager View (10 cols)**: Adds *Acquisition Source, HIS Sync Status,* and *Est. Cycle Value*.
  - **Zoho Legacy View (All 40 cols)**: Preserved as a comparative audit view.
- **Granular Customization**: Filter across 7 categories (*Essential, Clinical, Contact, Operational, System, Financial, Telephony*), reorder display positions with up/down controls, and toggle visibility with localStorage persistence.

### 2. Tri-Layer Persistent Filter Engine (Zero Filter Resets)
- **URL Synchronization**: Any filter applied (Search query, Stage, Clinic branch, Lead source, Intent score, or Today toggle) serializes to the URL query string (`?q=Koramangala&stage=first_consultation`).
- **LocalStorage Caching**: Active view definitions and custom filter sets survive page reloads and tab navigation.
- **Non-Destructive Slide-Over Drawer (Side Sheet)**: Opening a patient record slides in an overlay without unmounting the list—**guaranteeing 0% loss of scroll position, pagination, or active filters**.
- **Saved Views System**: Pre-configured tabs (*All Patient Journeys, High Intent IVF Candidates, Pending Consultations, HIS Cycle Starts, Today's Clinic Actions*) with a pulsing amber `● Modified Filters` badge and 1-click update/save-as-new controls.

### 3. 1-Click "Book Consultation" Accessible Everywhere
- **Table Row Action**: Dedicated high-contrast primary CTA on every patient row (≤ 1 click reachable).
- **Slide-Over Drawer Header**: High-contrast button in the drawer header and sticky bottom bar.
- **Mobile Sticky Action Bar**: Bottom-anchored bar with a 48px touch target ensuring counsellors on mobile never struggle to find the booking action.
- **Interactive Booking Flow Modal**:
  - Auto-selects clinic branch across Nova's 140 branches.
  - Doctor allocation (*Dr. Kavitha Menon, Dr. Rajesh Rao, Dr. Ananya Sharma, Dr. Sneha Kulkarni, Dr. Vikramaditya Reddy*).
  - Date & available time slot selection.
  - Mode: *In-Clinic Consultation* vs *HD Video Teleconsultation*.
  - Automated patient triggers: Instant WhatsApp confirmation with Google Maps clinic direction, Exotel SMS reminders, and instant stage progression.

### 4. Additional Solved Pain Points for Nova Fertility
- **Clinic Day at a Glance**: Built specifically for Meera’s 140 clinic managers, displaying today’s scheduled appointments timeline, doctor OPD room allocations, and live queue statuses.
- **The 1,140 vs 1,310 Discrepancy Reconciliation**: Integrated audit modal explaining that Zoho recorded 1,140 in-clinic visits while missing 170 remote teleconsultations trapped in HIS logs. Superleap reconciles both into an exact 1,310 count (0.0% variance).
- **HIS Webhook Simulator**: Button on the top bar simulating an incoming clinical webhook when an IVF cycle starts in the hospital, instantly updating the counsellor's view.
- **UTF-8 Name Cleansing**: Highlights records restored from Zoho’s `????` corruption with audit badges.
- **SuperAgent AI Copilot**: Intelligent side copilot capable of drafting WhatsApp follow-ups in regional languages and summarizing clinical triage notes.

---

## 🛠️ Technology Stack & Architecture

- **Core**: React 18 SPA + Vite
- **Styling**: Vanilla CSS Design System with CSS Custom Properties, faithful to `superleap.com` dark teal (`#071A1D`) and Superleap Mint (`#4BB793`).
- **Icons**: Lucide React
- **State & Persistence**: Custom `usePersistentState` hook managing URLSearchParams + LocalStorage.
- **No external UI bloated libraries**: Sub-300ms lightning-fast production build.

---

## 💻 Getting Started Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build production bundle
npm run build
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

---

## 📁 Repository Structure

```
├── src/
│   ├── components/
│   │   ├── HeaderNav.jsx              # Official Superleap header & role switcher
│   │   ├── SavedViewsTabs.jsx         # Persistent view tabs with unsaved indicators
│   │   ├── FilterToolbar.jsx          # Search, stage, clinic, source, score filters
│   │   ├── LeadTable.jsx              # Responsive table with 1-click book consultation
│   │   ├── ManageColumnsModal.jsx     # Role presets (6 vs 40 cols) & reordering
│   │   ├── BookConsultationModal.jsx  # Multi-step specialist scheduling flow
│   │   ├── LeadDetailDrawer.jsx       # Non-destructive side sheet (0 filter loss)
│   │   ├── ClinicDayOverview.jsx      # Clinic manager day at glance & reconciliation
│   │   ├── PatientJourneyKanban.jsx   # Visual pipeline with distinct stage badges
│   │   ├── DeploymentAuditScreen.jsx  # 5 Pillars of Excellence & tiered migration
│   │   ├── SuperAgentCopilotDrawer.jsx# AI assistant for triage & WhatsApp outreach
│   │   ├── MobileBottomActionBar.jsx  # 48px thumb-friendly mobile action bar
│   │   └── NotificationToast.jsx      # Realtime HIS webhook & booking alerts
│   ├── data/
│   │   ├── columnsDefinition.js       # 40 columns schema & role presets
│   │   └── mockLeads.js               # Nova Fertility clinical mock database
│   ├── hooks/
│   │   └── usePersistentState.js      # URL query sync & localStorage engine
│   ├── App.jsx                        # Main workspace layout
│   ├── App.css                        # Superleap design system stylesheet
│   ├── index.css                      # Global design tokens & CSS reset
│   └── main.jsx
├── docs/
│   ├── crm_analysis_and_strategy.md   # Competitive analysis of Salesforce, Zoho, etc.
│   └── superleap_prototype_walkthrough.md # Feature walkthrough & 5-min Loom script
├── package.json
└── vite.config.js
```

---

## 📜 Documentation

- **[Competitive CRM Analysis](docs/crm_analysis_and_strategy.md)**: Deep dive into Salesforce Health Cloud, Zoho CRM, HubSpot, LeadSquared, and Attio.
- **[Loom Presentation Script](docs/superleap_prototype_walkthrough.md)**: 5-minute video presentation guide structured for Dr. Kavitha and Meera.
