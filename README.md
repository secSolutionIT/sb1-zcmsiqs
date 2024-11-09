# Node.js Starter Project

A minimal Node.js starter template with Express.js.

## Features

- Express.js web server
- Security middleware (helmet)
- CORS support
- Request logging
- Environment variables
- Error handling
- Health check endpoint

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. For production:
   ```bash
   npm start
   ```

The server will be running at http://localhost:3000

## API Endpoints

- `GET /`: Welcome message
- `GET /health`: Health check endpoint

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
```