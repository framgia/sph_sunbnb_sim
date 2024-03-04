# Setting up the Environment for NextJs

This guide will walk you through the process of setting up the development environment, including installing dependencies and configuring the project.

## Prerequisites

-   [Node.js](https://nodejs.org/en/download)
-   [Git](https://git-scm.com/downloads) installed in your machine
-   [Visual Studio Code](https://code.visualstudio.com/) (optional but recommended)

## Getting Started

1. Use either `npm` or `yarn` to install the project dependencies.
   Run this on the terminal:

    ```
    npm ci
    ```

2. Go to the `settings.json` in your VS Code. Configure Visual Studio Code Settings:

-   If you are using Visual Studio Code, press `ctrl + shift + p` and then search for `Preferences: Open User Settings(JSON)`.
    Add this code to the `settings.json`:
    ```
    {
    	"editor.formatOnSave": true,
    	"editor.defaultFormatter": "esbenp.prettier-vscode",
    	"editor.codeActionsOnSave": {
    	"source.fixAll": "explicit",
    	"source.fixAll.eslint": "explicit"
    	}
    }
    ```
