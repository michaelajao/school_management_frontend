# School Management Frontend

A feature-rich, role-based school management system front-end built with Next.js, React, and Tailwind CSS. Supports multi-step onboarding for superadmins, admins, teachers, parents, and students, integrated payment and pricing flows, and a reusable UI component library built with Shadcn UI. The application is designed to be responsive across various screen sizes.

---

## Table of Contents

- [School Management Frontend](#school-management-frontend)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
  - [Folder Structure](#folder-structure)
  - [Key Flows](#key-flows)
    - [Onboarding](#onboarding)
    - [Payment & Pricing](#payment--pricing)
  - [UI Component Library & Styling](#ui-component-library--styling)
  - [State Management & Context](#state-management--context)
  - [Custom Hooks](#custom-hooks)
  - [Responsiveness](#responsiveness)
  - [Testing](#testing)
  - [Contributing](#contributing)
  - [License](#license)

---

## Features

- Multi-role onboarding (Superadmin, Admin, Teacher, Parent, Student) with dedicated forms.
- Mock payment and subscription pricing flows using Zustand for state persistence.
- Dynamic forms featuring a reusable validation hook (`useFormValidation`) for clear error handling.
- Country and region selectors (`react-country-region-selector`) integrated with form styling.
- Consistent and accessible design system powered by Shadcn UI (Radix UI primitives + Tailwind CSS).
- Light/Dark theme support via `next-themes`.
- Responsive layout adapting to mobile, tablet, and desktop views.
- Simulated authentication flow using React Context and `localStorage`.
- Toast notifications for user feedback via Sonner.

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI:** React 19, Tailwind CSS, Shadcn UI (Radix UI + CVA)
- **State:** React Context (Auth), Zustand (Pricing)
- **Validation:** Custom `useFormValidation` hook
- **Notifications:** Sonner (toast)
- **Country/Region:** `react-country-region-selector`
- **Theming:** `next-themes`
- **Testing:** Jest, React Testing Library
- **Icons:** Lucide React
- **Linting/Formatting:** ESLint, Prettier (configured via `eslint.config.mjs`, `postcss.config.mjs`)

---

## Prerequisites

- Node.js >= 18
- npm, yarn, or pnpm

---

## Getting Started

1. **Clone the repo**

   ```bash
   git clone https://github.com/your-org/school_management_frontend.git
   cd school_management_frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Folder Structure

```
/app                 # Next.js App Router (routes, layouts, pages)
/components          # Reusable UI components & feature-specific views
  /auth              # Authentication related components
  /Home              # Components for the main landing page
  /modal             # Modal dialog components
  /onboarding        # Onboarding flow components (registration, role-specific forms)
  /PricingView       # Pricing page components
  /ui                # Base Shadcn UI components (Button, Card, Input, etc.)
  theme-provider.tsx # Provider for next-themes
  theme-switcher.tsx # Component to toggle theme
/contexts            # React context providers (AuthContext)
/hooks               # Custom React hooks (useFormValidation, useMobile)
/lib                 # Utility functions (e.g., cn for class merging)
/store               # Zustand state management stores (usePricingStore)
/_tests_             # Unit and integration tests using Jest & RTL
/public              # Static assets (images, icons, fonts)
# Configuration files (next.config.ts, tailwind.config.ts, tsconfig.json, etc.)
```

## Routes (and corresponding folder structure)

```
   /users/admin      # Admin home dashboard
   /users/admin/communications  # See and manage comms for admin
   /users/admin/manage/academics # Admin manage academics view
   /users/admin/manage/academics # Admin manage academics view

```

---

## Key Flows

### Onboarding

1. **Registration** (`/app/onboarding/page.tsx`): Collects basic user info (`RegistrationForm`) and redirects based on selected role.

2. **Role Forms**:
   - **Superadmin/Admin**: `/app/onboarding/admin/page.tsx` uses `components/onboarding/SuperadminAndSchoolpage.tsx` for detailed profile and school setup (name, address, logo, brand color, etc.).
   - **Teacher/Parent/Student**: Simpler profile forms located under `/app/onboarding/[role]/page.tsx`.

3. **Validation**: The `useFormValidation` hook manages required fields and displays inline error messages for a smooth user experience.

### Payment & Pricing

- **Pricing Page** (`/app/paymentGateway/page.tsx` using `components/PricingView/pricingView.tsx`): Displays subscription plans. Superadmins select a plan, enter mock payment details, and are redirected to onboarding upon "successful" payment.
- **Mock Payment** (`/app/mockPayment/page.tsx`): A standalone page for demonstrating the payment form UI.
- **Success Modal** (`components/modal/Successfulmodal.tsx`): Shown after mock payment, includes a countdown before redirecting.

---

## UI Component Library & Styling

- **Shadcn UI**: The core component library, located in `components/ui`. These are unstyled primitives built on Radix UI, styled with Tailwind CSS. See `components.json` for configuration.
- **Tailwind CSS**: Used for all styling, configured in `tailwind.config.ts` and `app/globals.css`. Utility classes provide rapid development and consistency.
- **Class Variance Authority (CVA)**: Used within Shadcn components (like `Button`) for managing component variants.
- **`cn` Utility**: (`lib/utils.ts`) Merges Tailwind classes, essential for conditional styling in components.

---

## State Management & Context

- **AuthContext** (`contexts/auth-context.tsx`): Manages simulated user authentication state (user object, loading status). Persists user info in `localStorage` for session persistence across refreshes. Provides context to protect routes and display user-specific UI.
- **PricingStore** (`store/usePricingStore.ts`): A Zustand store for managing global state related to the pricing flow, such as the selected plan and user email. Zustand provides a simple and powerful way to handle state outside of the React component tree, with persistence middleware included.

---

## Custom Hooks

- **`useFormValidation`** (`hooks/useFormValidation.ts`): A generic hook to handle form validation logic. Takes form data and a list of required fields, returning an `errors` object, a `validate` function, and a `clearError` function.
- **`useMobile`** (`hooks/use-mobile.ts`): Detects if the current device screen width corresponds to mobile or tablet breakpoints, returning boolean flags (`isMobile`, `isTablet`). Useful for conditional rendering based on device type.

---

## Responsiveness

- The application utilizes Tailwind CSS's responsive design features (e.g., `sm:`, `md:`, `lg:` prefixes) to ensure layouts adapt gracefully to different screen sizes.
- Key components like forms, cards, and navigation are designed with responsiveness in mind.
- The `useMobile` hook can be used for more complex JavaScript-based responsive logic if needed.

---

## Testing

- **Jest**: The primary testing framework, configured in `jest.config.js` and `jest.setup.ts`.
- **React Testing Library (RTL)**: Used for writing tests that interact with components similarly to how a user would. Encourages accessible and maintainable tests.
- Sample tests are located in the `_tests_` directory (e.g., `Home.test.tsx`, `Onboarding.test.tsx`). Run tests using `npm test` or `yarn test`.

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/your-feature`)
3. Commit your changes (`git commit -m "feat: add ..."`)
4. Push to branch (`git push origin feat/your-feature`)
5. Open a Pull Request

Please follow existing code conventions and run `npm run lint` before pushing.

---

## License

This project is licensed under the [MIT License](LICENSE).
