# mobilapplic

A React contact form with a Node.js/Express API and MongoDB storage.

## Run locally

1. Install Node.js 18 or newer and start MongoDB locally, or create a MongoDB Atlas database.
2. Copy `.env.example` to `.env` and set `MONGODB_URI` to your MongoDB connection string. Set `MONGODB_DB` to the database name (defaults to `mobilapplic`).
3. Install dependencies and start the frontend and API:

   ```sh
   npm install
   npm run dev
   ```

4. Open the Vite URL shown in the terminal (usually http://localhost:5173).

The API listens on port 5000. The Vite development server forwards `/api` requests to it. Submitted contacts are stored in the `contacts` collection in the `mobilapplic` database.
