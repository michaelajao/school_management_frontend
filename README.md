This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!


# Contribution Guidelines

![Git Branching Strategies Explained](https://img.youtube.com/vi/U_IFGpJDbeU/0.jpg)
[Watch: Git Branching Strategies Explained](https://www.youtube.com/watch?v=U_IFGpJDbeU)


## Branching Strategy

1. **Create a Development Branch:** The main development branch is `development`. All new work, whether it's a feature or bug fix, should branch off from `development`.
   
2. **Feature Branches:** For each new feature or task, create a new branch using the naming convention:
   - `feature/<feature-name>`
   For example: `feature/add-login-form` or `feature/fix-dashboard-bug`.

3. **Bug Fixes:** If you’re working on a bug fix, create a branch from `development` with the name `bugfix/<bug-name>`.

## Code Review Process

1. **Create a Feature Branch:** Start by branching off from `development` using the appropriate feature or bugfix naming convention (`feature/<feature-name>` or `bugfix/<bug-name>`).

2. **Push and Open a Pull Request:** Once your changes are ready, push them to your branch and create a pull request (PR) to merge it into the `development` branch.

3. **Code Review Request:** Request a code review from **Adeleye Remi-Alarape**. Ensure that all changes are reviewed and any necessary updates are made before proceeding.

4. **Make Necessary Changes:** After the review, make any required changes based on the feedback. Push the changes to the feature branch for re-review if necessary.

5. **Merge into Development:** Once the review is complete and all feedback has been addressed, the PR can be merged into the `development` branch.

6. **Merging to Main:** After significant progress is made on the `development` branch, a pull request will be created to merge it into `main` in batches, allowing for easier review and testing.

## Pull Request Template

Please ensure your pull request includes:
- A clear description of the changes made.
- Any relevant issue numbers or references.
- A checklist for the following:
  - [ ] Code review requested from **Adeleye Remi-Alarape**.
  - [ ] Unit tests are written and passing (if applicable).
  - [ ] Documentation has been updated (if applicable).

## Merging Process

Once a pull request is reviewed and approved, it will be merged into `development`. Merges to `main` will be done periodically to ensure stability and minimize conflicts.



