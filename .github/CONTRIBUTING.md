# Contributing to Angular Contact Manager

First off, thank you for considering a contribution! It's people like you that make this project such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps which reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots and animated GIFs if possible**
* **Include your environment details** (OS, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and expected behavior**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Follow the TypeScript / Angular styleguide
* End all files with a newline
* Avoid platform-dependent code
* Ensure tests pass locally

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Follow conventional commits format:
  * `feat:` for new features
  * `fix:` for bug fixes
  * `docs:` for documentation
  * `style:` for formatting
  * `refactor:` for code refactoring
  * `test:` for adding tests
  * `chore:` for maintenance

### TypeScript / Angular Styleguide

* Use 2 spaces for indentation (not tabs)
* Use camelCase for variables and functions
* Use PascalCase for classes and interfaces
* Always use `const` or `let`, avoid `var`
* Add JSDoc comments for public methods
* Use Angular standalone components
* Use Angular signals for reactive state
* Keep components under 150 lines
* Extract business logic to services

### Component Structure

```typescript
// Imports
import { Component, input, output } from '@angular/core';

// Component decorator
@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-component.html',
  styleUrls: ['./my-component.css'],
})

// Component class
export class MyComponent {
  // Inputs
  data = input<string>();

  // Outputs
  action = output<void>();

  // Lifecycle
  ngOnInit() {}
}
```

## Development Setup

1. Clone the repo
2. Install dependencies: `npm install`
3. Create a branch: `git checkout -b feature/my-feature`
4. Make your changes
5. Test: `npm run build && npm test`
6. Commit: `git commit -m "feat: add my feature"`
7. Push: `git push -u origin feature/my-feature`
8. Create a Pull Request

## Running Tests

```bash
npm test
npm run build
```

All tests must pass before submitting a PR.

## Additional Notes

### Issue and Pull Request Labels

* `bug` — Something isn't working
* `enhancement` — New feature or request
* `documentation` — Improvements or additions to documentation
* `good first issue` — Good for newcomers
* `help wanted` — Extra attention is needed
* `question` — Further information is requested

## Recognition

Contributors will be recognized in the README and commit history.

Thank you for your contributions!
