# mobilapplic

The project is split into two applications:

- `backend/` is the Express API and MongoDB data layer.
- `mobile/` is the Expo/React Native contact app.

The original Vite implementation remains in `mobilapplic/` as a preserved copy. Use the projects above for new development.

## Start the API

1. Install Node.js 18 or newer and start MongoDB locally, or provide a MongoDB Atlas URI.
2. In `backend/`, copy `.env.example` to `.env` and set `MONGODB_URI` to your database connection string.
3. Run:

   ```sh
   cd backend
   npm install
   npm run dev
   ```

The API listens on port 5000 and is bound to all network interfaces so a physical phone on the same network can reach it. It provides `GET /api/health` and `POST /api/contacts`.

## Start the mobile app

1. In `mobile/`, install dependencies and copy `.env.example` to `.env`.
2. Set `EXPO_PUBLIC_API_URL` to the API's reachable base URL:
   - iOS Simulator: `http://localhost:5000`
   - Android Emulator: `http://10.0.2.2:5000`
   - Physical device: `http://<your-computer-lan-ip>:5000` (both devices must be on the same network)
3. Run:

   ```sh
   cd mobile
   npm install
   npx expo start
   ```

Scan the QR code with Expo Go, or use the Expo CLI to launch an emulator.
