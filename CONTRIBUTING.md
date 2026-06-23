# Contributing to Second Brain OS

First off, thank you for taking the time to contribute! 🎉

This guide provides a set of guidelines and instructions for contributing to Second Brain OS. Following these guidelines helps ensure a smooth and efficient review process for everyone.

---

## 🛠️ Local Development Setup

To set up Second Brain OS locally, follow these steps:

1. **Fork and Clone the Repository**
   Fork the repository on GitHub and clone your fork locally:
   ```bash
   git clone https://github.com/your-username/second-brain-os.git
   cd second-brain-os
   ```

2. **Add Upstream Remote**
   Keep your fork up-to-date by linking it to the original repository:
   ```bash
   git remote add upstream https://github.com/iammsp-star/second-brain-os.git
   ```

3. **Install Dependencies**
   Use `npm` to install project dependencies:
   ```bash
   npm install
   ```

4. **Environment Variables Configuration**
   Create a copy of `.env.local` at the root directory of the project and populate it with your Supabase keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
   *Note: Never commit `.env` or `.env.local` files containing real API keys or database passwords.*

5. **Start the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🌿 Branching Strategy

We use a standard branching strategy for development. Always create a new branch from `main` before starting any work:

*   **Features:** `feat/your-feature-name` (e.g. `feat/notes-persistence`)
*   **Bugfixes:** `fix/bug-description` (e.g. `fix/auth-callback-redirect`)
*   **Documentation:** `docs/update-description` (e.g. `docs/improve-readme`)
*   **Refactoring:** `refactor/change-description` (e.g. `refactor/clean-sidebar-code`)

---

## ✍️ Coding Standards

To maintain code quality and consistency:

1.  **TypeScript:** All new files should be written in TypeScript (`.ts` or `.tsx`). Avoid using `any` type declarations.
2.  **Linting & Formatting:** Ensure code adheres to ESLint rules. Run linting before committing:
    ```bash
    npm run lint
    ```
3.  **Aesthetics & Styles:** Use the Dark Cyber design system tokens defined in `src/app/globals.css`. Ensure layouts are responsive and visual components match the premium dark theme.

---

## 💾 Commit Messages

Commit messages should be clean and descriptive. We suggest following the [Conventional Commits](https://www.conventionalcommits.org/) format:

```text
type(scope): description

[optional body]
```

**Common Types:**
*   `feat`: A new user-facing feature.
*   `fix`: A bug fix.
*   `docs`: Documentation changes only.
*   `style`: Code style changes (formatting, missing semicolons, etc.).
*   `refactor`: Code changes that neither fix bugs nor add features.
*   `test`: Adding missing tests or correcting existing tests.

**Examples:**
*   `feat(auth): add email verification page and redirect handlers`
*   `fix(sidebar): fix layout overflow in mobile views`

---

## 🚀 Submitting a Pull Request (PR)

1.  Sync your fork with the upstream repository:
    ```bash
    git checkout main
    git pull upstream main
    ```
2.  Merge `main` into your feature branch and resolve any conflicts:
    ```bash
    git checkout feat/your-feature-name
    git merge main
    ```
3.  Verify that the project builds and passes lint checks:
    ```bash
    npm run lint
    npm run build
    ```
4.  Push your branch to your GitHub fork:
    ```bash
    git push origin feat/your-feature-name
    ```
5.  Open a Pull Request on the main repository and fill out the PR template.
