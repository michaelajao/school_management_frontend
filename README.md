# School Management Frontend

A feature-rich, role-based school management system front-end built with Next.js, React, and Tailwind CSS. Supports multi-step onboarding for superadmins, admins, teachers, parents, and students, integrated payment and pricing flows, and a reusable UI component library built with Shadcn UI. The application is designed to be responsive across various screen sizes.

---

## Table of Contents

- [School Management Frontend](#school-management-frontend)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
    - [Core Functionality](#core-functionality)
    - [Administrative Features](#administrative-features)
    - [UI/UX Features](#uiux-features)
  - [Tech Stack](#tech-stack)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
  - [Folder Structure](#folder-structure)
  - [Routes Structure](#routes-structure)
  - [Key Flows](#key-flows)
    - [Onboarding](#onboarding)
    - [Payment \& Pricing](#payment--pricing)
  - [UI Component Library \& Styling](#ui-component-library--styling)
  - [State Management \& Context](#state-management--context)
  - [Custom Hooks](#custom-hooks)
  - [Responsiveness](#responsiveness)
  - [Testing](#testing)
  - [Available Scripts](#available-scripts)
  - [Role-Based Features](#role-based-features)
    - [Superadmin](#superadmin)
    - [Admin](#admin)
    - [Teacher](#teacher)
    - [Parent](#parent)
    - [Student](#student)
  - [Environment Variables](#environment-variables)
  - [API Routes](#api-routes)
    - [User Management](#user-management)
    - [Class Management](#class-management)
  - [Deployment](#deployment)
    - [Vercel (Recommended)](#vercel-recommended)
    - [Manual Deployment](#manual-deployment)
    - [Docker Deployment](#docker-deployment)
  - [Performance Considerations](#performance-considerations)
  - [Security Features](#security-features)
  - [Troubleshooting](#troubleshooting)
    - [Common Issues](#common-issues)
    - [Getting Help](#getting-help)
  - [Future Enhancements](#future-enhancements)
  - [Contributing](#contributing)
  - [License](#license)

---

## Features

### Core Functionality
- Multi-role onboarding (Superadmin, Admin, Teacher, Parent, Student) with dedicated forms
- Role-based dashboards with tailored functionality for each user type
- Mock payment and subscription pricing flows using Zustand for state persistence
- Simulated authentication flow using React Context and `localStorage`
- Dynamic forms featuring a reusable validation hook (`useFormValidation`) for clear error handling

### Administrative Features
- **School Management**: Complete school setup and configuration
- **User Management**: Add, edit, delete users across all roles
- **Class Management**: Create and manage classes, assignments, and timetables
- **Communication**: Announcements and messaging system
- **Academic Management**: Course management, grading, and performance tracking
- **Attendance Management**: Track and manage student attendance
- **Staff Management**: Comprehensive staff information and role management
- **Data Import/Export**: Bulk data operations for efficient management

### UI/UX Features
- Consistent and accessible design system powered by Shadcn UI (Radix UI primitives + Tailwind CSS)
- Light/Dark theme support via `next-themes`
- Responsive layout adapting to mobile, tablet, and desktop views
- Country and region selectors (`react-country-region-selector`) integrated with form styling
- Toast notifications for user feedback via Sonner
- Advanced data visualization with charts and analytics
- Modal dialogs for streamlined workflows
- Search and filtering capabilities

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
/app                     # Next.js App Router (routes, layouts, pages)
  /(users)/             # Protected user routes
    /admin/             # Admin-specific routes
    /superadmin/        # Superadmin-specific routes
  /api/                 # API route handlers
    /classes/           # Class management endpoints
    /users/             # User management endpoints
  /auth/                # Authentication pages
    /signin/            # Sign-in page
    /signup/            # Sign-up page
  /dashboard/           # Dashboard routes
    /superadmin/        # Superadmin analytics dashboard
  /mockPayment/         # Mock payment processing page
  /onboarding/          # Onboarding flow pages
    /admin/             # Admin onboarding
    /parent/            # Parent onboarding
    /student/           # Student onboarding
    /teacher/           # Teacher onboarding
  /paymentGateway/      # Pricing and subscription page
  /register/            # Registration flows
    /school/            # School registration

/components              # Reusable UI components & feature-specific views
  /admin/               # Admin-specific components
    *.tsx               # Various admin management components
    /annoucement/       # Admin announcement components
    /parents/           # Parent management components
    /students/          # Student management components
  /auth/                # Authentication related components
  /dashboard/           # Dashboard components
  /Home/                # Landing page components
  /layout/              # Layout components (Header, Sidebar, etc.)
    /sidebar/           # Sidebar navigation components
  /modal/               # Modal dialog components
  /onboarding/          # Onboarding flow components
  /PricingView/         # Pricing page components
  /shared/              # Shared/common components
  /StaffDashboard/      # Staff management components
  /superadmin/          # Superadmin-specific components
  /ui/                  # Base Shadcn UI components (Button, Card, Input, etc.)
  theme-provider.tsx    # Provider for next-themes
  theme-switcher.tsx    # Component to toggle theme

/contexts               # React context providers
  auth-context.tsx      # Authentication context

/hooks                  # Custom React hooks
  use-mobile.ts         # Mobile/responsive detection hook
  useFormValidation.ts  # Form validation hook

/lib                    # Utility functions and configurations
  fakeData.ts          # Mock data for development
  utils.ts             # Utility functions (cn class merger, etc.)
  validatePassword.ts   # Password validation utilities

/store                  # Zustand state management stores
  parentStore.ts        # Parent-specific state management
  usePricingStore.ts    # Pricing flow state management

/_tests_                # Unit and integration tests using Jest & RTL
  Home.test.tsx         # Home page tests
  Onboarding.test.tsx   # Onboarding flow tests

/public                 # Static assets (images, icons, fonts)
  /icons/               # Icon assets
  *.jpg, *.svg          # Various static images and assets

# Configuration files
components.json         # Shadcn UI configuration
eslint.config.mjs      # ESLint configuration
jest.config.js         # Jest testing configuration
jest.setup.ts          # Jest setup file
next.config.ts         # Next.js configuration
package.json           # Dependencies and scripts
postcss.config.mjs     # PostCSS configuration
tailwind.config.ts     # Tailwind CSS configuration
tsconfig.json          # TypeScript configuration
```

## Routes Structure

```
/                           # Landing page
/auth/signin               # User sign-in page
/auth/signup               # User registration page
/onboarding                # Initial user registration flow
/onboarding/admin          # Admin/Superadmin onboarding
/onboarding/teacher        # Teacher onboarding
/onboarding/parent         # Parent onboarding
/onboarding/student        # Student onboarding
/paymentGateway           # Subscription pricing plans
/mockPayment              # Mock payment processing
/register/school          # School registration

# Protected User Routes
/(users)/admin            # Admin dashboard home
/(users)/superadmin       # Superadmin dashboard home
/dashboard/superadmin     # Superadmin analytics dashboard

# API Routes
/api/users                # User management endpoints
/api/classes              # Class management endpoints
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

## Available Scripts

In the project directory, you can run:

- **`npm run dev`** - Runs the app in development mode with Turbopack
- **`npm run build`** - Builds the app for production
- **`npm start`** - Runs the built app in production mode
- **`npm run lint`** - Runs ESLint to check code quality
- **`npm test`** - Launches the test runner in watch mode

---

## Role-Based Features

### Superadmin
- Complete system overview and analytics
- School configuration and branding
- Subscription and payment management
- Global system settings
- Multi-school management capabilities

### Admin
- School-specific dashboard and analytics
- User management (teachers, parents, students)
- Class and academic management
- Communication and announcements
- Attendance oversight
- Performance monitoring

### Teacher
- Class management and assignments
- Student attendance tracking
- Grade management
- Parent-teacher communication
- Timetable management

### Parent
- Child's academic progress monitoring
- Attendance tracking
- Communication with teachers
- Fee payment status
- School announcements

### Student
- Personal dashboard
- Assignment submissions
- Grade viewing
- Attendance history
- School announcements

---

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="School Management System"

# Theme
NEXT_PUBLIC_DEFAULT_THEME=light

# Mock API (for development)
NEXT_PUBLIC_MOCK_API=true
```

---

## API Routes

The application includes mock API routes for development:

### User Management
- `GET /api/users` - Fetch all users
- `POST /api/users` - Create new user
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user

### Class Management
- `GET /api/classes` - Fetch all classes
- `POST /api/classes` - Create new class
- `PUT /api/classes/[id]` - Update class
- `DELETE /api/classes/[id]` - Delete class

---

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

---

## Performance Considerations

- **Image Optimization**: Uses Next.js Image component for automatic optimization
- **Code Splitting**: Automatic route-based code splitting with Next.js
- **Bundle Analysis**: Run `npm run build` to see bundle size analysis
- **Lazy Loading**: Components are lazy-loaded where appropriate
- **Caching**: Leverages Next.js caching strategies for optimal performance

---

## Security Features

- **Authentication**: Simulated auth with secure localStorage persistence
- **Role-Based Access**: Route protection based on user roles
- **Form Validation**: Client-side validation with error handling
- **XSS Protection**: React's built-in XSS protection
- **CSRF Protection**: Next.js built-in CSRF protection

---

## Troubleshooting

### Common Issues

1. **Development server won't start**
   ```bash
   # Clear cache and reinstall dependencies
   rm -rf .next node_modules package-lock.json
   npm install
   npm run dev
   ```

2. **Build errors**
   ```bash
   # Check TypeScript errors
   npm run lint
   # Fix any TypeScript issues before building
   ```

3. **Styling issues**
   ```bash
   # Regenerate Tailwind classes
   npm run build
   ```

### Getting Help

- Check the [Next.js Documentation](https://nextjs.org/docs)
- Review [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- Consult [Shadcn UI Documentation](https://ui.shadcn.com)

---

## Future Enhancements

- Real-time notifications with WebSockets
- File upload and document management
- Advanced reporting and analytics
- Mobile app integration
- Multi-language support
- Real payment gateway integration
- Calendar and scheduling system
- Video conferencing integration

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
