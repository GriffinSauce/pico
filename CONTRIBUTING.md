# Contributing to pico.link

👍🎉 Heya! Thanks for taking the time to contribute! 🎉👍

The following is a set of guidelines for contributing to pico.link. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## How Can I Contribute?

### Reporting Bugs

- **Perform a [cursory search](https://github.com/GriffinSauce/pico.link/issues?utf8=%E2%9C%93&q=is%3Aissue+is:open)** to see if the problem has already been reported. If it has, add a comment to the existing issue instead of opening a new one.
- Open an issue and clearly describe the issue and how to reproduce it

### Suggesting Enhancements

- Open an issue and clearly describe the desired change. If you are able to, [develop](contributing-code) it!

### Contributing code

To contribute code:

- Develop your fix/feature
- Make a pull request
- Adhere to the styleguides

#### Running a local version

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.
2. Install yarn: `npm install -g yarn`
3. Install the dependencies: `yarn`
4. Run `yarn dev` to build and watch for code changes
5. View your local version of pico.link at http://localhost:3000

#### Pull Requests

Please follow these steps:

1. Clearly describe the reason for the changes (or link to an issue)
2. Follow the [styleguides](#styleguides)
3. After you submit your pull request, verify that all status checks are passing. Leave a comment if you think there is an issue wih the checks themselves.

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Reference issues and pull requests

### JavaScript Styleguide

All JavaScript must be formatted by [Prettier](https://prettier.io/) and conform to the [AirBnB styleguide](https://github.com/airbnb/javascript). Both are enforced by ESLint.
