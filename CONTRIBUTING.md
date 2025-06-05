# Contributing

## Current Project Status (June 2025)

🚀 **Latest Updates:**
- ✅ Complete authentication system with JWT and role-based access control
- ✅ Role-specific API endpoints implemented (students, parents, general users)
- ✅ Professional landing page with feature showcase
- ✅ Comprehensive Docker development environment
- ✅ API testing interface at `/test-endpoints`
- ✅ Updated documentation and deployment guides

**Ready for Contributions:**
- Additional user management features
- Enhanced dashboard functionality
- Mobile responsiveness improvements
- Test coverage expansion
- Performance optimizations
- Accessibility improvements

See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for testing procedures and [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for setup instructions.

---

## Table of Contents
1. [Getting Started](#getting-started)
2. [Learn More](#learn-more)
3. [Contribution Guidelines](#contribution-guidelines)
   - [Branching Strategy](#branching-strategy)
   - [Code Review Process](#code-review-process)
   - [Pull Request Template](#pull-request-template)
   - [Merging Process](#merging-process)
4. [Writing Tests for the Project](#writing-tests-for-the-project)
   - [Getting Started with Tests](#getting-started-with-tests)
   - [Writing Tests](#writing-tests)
   - [Test Coverage](#test-coverage)
   - [Best Practices for Writing Tests](#best-practices-for-writing-tests)
5. [Commit Message Naming Convention](#commit-message-naming-convention)

# Contribution Guidelines

## Some helpful videos: 
<div align="center">
  <img src="https://img.youtube.com/vi/ygqx50-JHEE/0.jpg" alt="Git Branching Basics for Beginners" />
  <br/>
  <a href="https://www.youtube.com/watch?v=ygqx50-JHEE" target="_blank">Watch: Git Branching Basics for Beginners</a>
</div>

<div align="center">
  <img src="https://img.youtube.com/vi/a2OSRBz107I/0.jpg" alt="Create a Git Branch From Another Branch" />
  <br/>
  <a href="https://www.youtube.com/watch?v=a2OSRBz107I" target="_blank">Watch: Create a Git Branch From Another Branch</a>
</div>
 

<div align="center"> <img src="https://img.youtube.com/vi/nifnpb2WyY4/0.jpg" alt="Git Branching Basics" /> <br/> <a href="https://www.youtube.com/watch?v=nifnpb2WyY4&utm_source=chatgpt.com" target="_blank">Watch: Git Branching Basics</a> </div> 

You can find more videos on youtube or feel free to reach out to other memebers of the team if you need help!
<!--
<div align="center"> <img src="https://img.youtube.com/vi/U_IFGpJDbeU/0.jpg" alt="Git Branching Strategies Explained" /> <br/> <a href="https://www.youtube.com/watch?v=U_IFGpJDbeU" target="_blank">Watch: Git Branching Strategies Explained</a> </div>
-->

## Branching Strategy

1. **Create a Development Branch**: The main development branch is `development`. All new work, whether it's a feature or bug fix, should branch off from `development`.
   
2. **Feature Branches**: For each new feature or task, create a new branch using the naming convention:
   - `feature/<feature-name>`
   For example: `feature/add-login-form` or `feature/add-dashboard-button`.

3. **Bug Fixes**: If you’re working on a bug fix, create a branch from `development` with the following nameing convention:
     - `bugfix/<bug-name>` For example: `bugfix/fix-darkmode` or `bugfix/fix-button`.

## Code Review Process

1. **Create a Feature Branch**: Start by branching off from `development` using the appropriate feature or bugfix naming convention (`feature/<feature-name>` or `bugfix/<bug-name>`).

2. **Push and Open a Pull Request**: Once your changes are ready, push them to your branch and create a pull request (PR) to merge it into the `development` branch.

3. **Code Review Request**: Request a code review from `Adeleye Remi-Alarape` or `Timi Ombe`. Ensure that all changes are reviewed and any necessary updates are made before proceeding.

4. **Make Necessary Changes**: After the review, make any required changes based on the feedback. Push the changes to the feature branch for re-review if necessary.

5. **Merge into Development**: Once the review is complete and all feedback has been addressed, the PR can be merged into the `development` branch.

6. **Merging to Main**: After significant progress is made on the `development` branch, a pull request will be created to merge it into `main` in batches, allowing for easier review and testing.

## Pull Request Template

Please ensure your pull request includes:
- A clear description of the changes made.
- Any relevant issue numbers or references.
- A checklist for the following:
  - [ ] Code review requested from **Adeleye Remi-Alarape**.
  - [ ] Unit tests are written and passing (if applicable).
  - [ ] Documentation has been updated (if applicable).


<summary><strong>📌 Example PR Template</strong></summary>


> ### This pull request adds a new "Login Form" feature to the application.
> 
> The form includes fields for the user’s email and password, and a submit button that sends the data to the backend for authentication. This feature was added in response to the need for a user login page.
>
> **What**: Created a new login form component (`LoginForm.tsx`).  
> **Why**: The login functionality is required for users to access the dashboard of the application.
>
> ---
>
> ### 🧩 Type of Change
> - [x] New feature
>
> ### 🔗 Related Issue
> Resolves #45 - Add Login Form to the Application.
>
> ---
>
> ### ✅ Checklist
> - [x] Code follows the project's style guidelines  
> - [x] Tests have been added/updated for the changes (unit tests and integration tests included)  
> - [x] Documentation has been updated accordingly (added new section on the login form)  
> - [x] All tests pass (run `npm test` to verify)  
> - [x] No breaking changes have been introduced  
> - [x] I have checked for any security vulnerabilities in my code  
> - [x] I have verified the changes work in all relevant environments (dev, staging, production)  
>
> ---
>
> ### 🖼 Screenshots (if applicable)
> ![Login Form UI](https://linktothescreenshot.com/login_form_ui.png)
>
> ---
>
> ### ℹ️ Additional Information
> - The form is styled using the existing theme of the application.
> - The backend endpoint for handling login is already set up, so no additional server changes were required.

</details>


## Merging Process

Once a pull request is reviewed and approved, it will be merged into `development`. Merges to `main` will be done periodically to ensure stability and minimize conflicts.

---

# Writing Tests for the Project

Testing is an essential part of the development process. It ensures that your code works as expected and prevents regressions in the future. Here’s how to write and run tests for this project.

## Getting Started with Tests

1. **Test Setup**: Ensure you have the required testing dependencies. If they are not already installed, you can do so with:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

2. **Directory Structure**: All tests are stored in the `__tests__` folder at the root of the project. Each component or module should have its corresponding test file.

## Writing Tests

To write tests for a component or function, follow these steps:

1. **Create a Test File**: Create a test file in the `__tests__` folder that mirrors the structure of the source code. For example, if you're testing a component located at `components/MyComponent.tsx`, create a test file at `__tests__/components/MyComponent.test.tsx`.

2. **Import Required Modules**: Import the necessary testing libraries and the component/module you want to test.

```tsx
import { render, screen } from '@testing-library/react';
import MyComponent from '../../components/MyComponent';
```

3. **Write Your Test Case**: Use `test()` to define a test case, and within it, describe the expected behavior of your component or function.

```tsx
test('renders MyComponent correctly', () => {
  render(<MyComponent />);
  const element = screen.getByText(/hello world/i);
  expect(element).toBeInTheDocument();
});
```

4. **Running Tests**: To run the tests, execute the following command:

```bash
npm test
```

This will run all the tests in your project and show the results in the terminal.

## Test Coverage

- **Unit Tests**: Unit tests are used to test individual functions or components in isolation.
- **Integration Tests**: These tests verify that different parts of the application work together as expected.
- **End-to-End (E2E) Tests**: These tests simulate user interactions with the app and ensure that the application works from start to finish.

## Best Practices for Writing Tests

- **Write Tests as You Develop**: As you write new features or make changes to existing ones, write tests alongside your code to ensure quality and prevent regressions.
- **Test Edge Cases**: Always consider edge cases, such as empty inputs, invalid data, or unexpected user actions.
- **Keep Tests Readable**: Write tests that are easy to understand for other developers. Avoid overly complex test cases.
- **Use Mocking**: For external API calls, mock the responses to avoid hitting real APIs during tests.

By following these guidelines, you can ensure that the codebase remains stable, maintainable, and easy to work with as the project grows.

---

# Commit Message Naming Convention

Follow these guidelines for writing clean and consistent commit messages:

## Format:

```
<type>: <description>
```

Example: `feat: add login form` or `bugfix: resolve dashboard issue`.

### Types:
- **feat**: A new feature.
- **fix**: A bug fix.
- **docs**: Documentation changes.
- **style**: Code style changes (e.g., formatting).
- **refactor**: Refactoring code.
- **test**: Adding or modifying tests.
- **chore**: Routine tasks (e.g., dependency updates).
- **build**: Changes related to the build process or configuration.

### Example Commit Messages:
- `feat: add login form`
- `bugfix: resolve issue with dashboard load time`
- `docs: update README with testing guidelines`

This convention will help keep the commit history clear and organized, making it easier to understand the purpose of each commit.
