
# Environment Variables

This project uses environment variables for configuration. Follow these steps to set up your local environment:

1. Create a `.env` file in the project root
2. Add the following variables to your `.env` file:

```
VITE_API_URL=http://localhost:3000/api
VITE_AUTH_SECRET=your-dev-secret-here
VITE_ENABLE_ANALYTICS=false
```

**Important:** The `.env` file is excluded from git by default. Never commit sensitive information to the repository.

## Available Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | The base URL for API requests | `http://localhost:3000/api` |
| `VITE_AUTH_SECRET` | Secret key for authentication | `fallback-dev-secret-do-not-use-in-production` |
| `VITE_ENABLE_ANALYTICS` | Enable/disable analytics tracking | `false` |

To add new environment variables, update the `env.ts` file in this directory.
