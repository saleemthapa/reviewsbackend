
# Environment Variables Setup

This project uses environment variables for configuration. To get started:

1. **Create a `.env` file** in the project root directory
2. Add the following variables to your `.env` file:

```
VITE_API_URL=http://localhost:3000/api
VITE_AUTH_SECRET=your-dev-secret-here
VITE_ENABLE_ANALYTICS=false
```

**Note:** The `.env` file is automatically ignored by Git to prevent committing sensitive information.

## Why are environment variables important?

Environment variables allow you to:
- Keep sensitive information out of your codebase
- Configure different settings for development and production
- Customize the application without changing code

For more details about available environment variables, see `src/config/README.md`.
