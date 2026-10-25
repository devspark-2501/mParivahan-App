# mParivahan - National Citizen Transport Portal (Hackathon Edition 2026)

A high-fidelity, production-ready government transport services portal built with **Next.js (App Router)**, **Tailwind CSS**, and **Nodemailer**, replicating official Ministry of Road Transport and Highways (MoRTH) digital infrastructure.

---

## 🌟 Key Features & Modules

### 1. Secure Email Authentication (SSO)
* Passwordless, secure email-based One-Time Password (OTP) login system.
* Persistent session management using `localStorage` and `sessionStorage` with protected route guards for high-value citizen workflows.

### 2. Multilingual Localization (`LanguageContext`)
* Seamless, instant toggle between **English** and **Hindi** across all core UI components, headers, navigation, hero carousels, and footers without page reloads.

### 3. Learner's Licence (LL) Application (Form 2)
* Complete application workflow capturing state RTO jurisdiction, personal details, identity credentials, and Class of Vehicles (MCWOG, MCWG, LMV) with dynamic age validation.
* Drag-and-drop document upload simulation and security CAPTCHA verification.

### 4. Interactive Road Rules & Mock Quiz Module
* Comprehensive educational guide covering traffic light signals (Red, Yellow, Green) and mandatory Motor Vehicles (MV) Act regulations.
* Interactive 5-question knowledge quiz with instant score feedback and detailed rule explanations.

### 5. Practical Driving Test Slot Booking
* Authenticated slot scheduling at regional automated RTO test tracks (e.g., Burari automated tracks).
* Displays facility details, statutory fee breakdowns, and appointment confirmations.

### 6. Digital Document Dispatch & Downloads
* Client-side HTML/PDF blob generation for official electronic licences.
* Automated Nodemailer backend integration triggering verified approval notifications and digital document copies directly to the citizen's email inbox.

### 7. National Vehicle Registration (Vahan 4.0) Portal
* Dedicated vehicle services hub featuring automated hero image carousels, real-time RC status lookup simulation, state motor vehicle tax estimators, and ownership transfer workflows.

---

## 🛠️ Tech Stack

* **Framework**: Next.js 16 (App Router, Turbopack)
* **Styling**: Tailwind CSS
* **State Management**: React Context (`LanguageContext`)
* **Email Dispatch**: Nodemailer (SMTP / Gmail Integration)
* **Icons & Assets**: Official Government Emblems, SVG icons, and Unsplash high-resolution infrastructure imagery.

---

## 🚀 Getting Started Locally

1. **Clone the Repository**:
   ```bash
   git clone [https://github.com/your-username/mparivahan-portal.git](https://github.com/your-username/mparivahan-portal.git)
   cd mparivahan-portal
