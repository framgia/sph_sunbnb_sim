# Setting up the Environment for Laravel

This guide will walk you through the process of setting up the development environment, including installing dependencies and configuring the project.

## Prerequisites

-   [PHP >=8.1](https://www.php.net/downloads.php)
-   [Composer](https://getcomposer.org/download)
-   [Git](https://git-scm.com/downloads) installed in your machine
-   [Visual Studio Code](https://code.visualstudio.com/) (optional but recommended)

## Getting Started

1. Navigate to the project directory and run the following command to install the required dependencies using Composer:

```
composer install
```

2. To execute `Laravel Pint` on save, Go to the `Extensions` in vscode and install [Laravel Pint by Open Southerners](https://marketplace.visualstudio.com/items?itemName=open-southeners.laravel-pint). Then, create a `.vscode` folder in the root of backend folder and add the following files:
    - `extensions.json`
    - `settings.json`

In the `extension.json`, add this:

```
{
"recommendations": ["open-southeners.laravel-pint"],
"unwantedRecommendations": []
}
```

In the `settings.json`, add this:

```
{
	"laravel-pint.enable": true,
	"[php]": {
		"editor.defaultFormatter": "open-southeners.laravel-pint",
		"editor.formatOnSave": true
	}
}
```

3. Create a `.env` and add the necessary configuration, including database connection details, application key, and any other environment-specific settings. You can generate the application key using the following Artisan command:

```
php artisan key:generate
```

4. Run the following command to publish all our schema to the database.

```
php artisan migrate
```

4. To start the server, execute the command:

```
php artisan serve
```
