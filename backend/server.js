import express from 'express';
import cors from 'cors';
import 'dotenv/config'; // Loads environment variables from .env file
import {connectDB} from './src/config/db.js';
import userRoutes from './src/route/userRoute.js'

// --- Initialization ---
const app = express();
const PORT = process.env.PORT || 5000;

// --- Database Connection ---
// We call the connectDB function we created earlier to establish a connection.
connectDB();

// --- Middleware ---
// Middleware are functions that run for every incoming request.

// cors(): Enables Cross-Origin Resource Sharing.
// This is a security feature that allows our frontend (on a different address)
// to make requests to our backend.
app.use(cors());

// express.json(): Parses incoming requests with JSON payloads.
// This lets us read the data from the request body (req.body).
app.use(express.json());

// --- API Routes ---
// This tells our server to use the routes defined in userRoutes.js
// for any request that starts with '/api/users'.
// So, a request to '/api/users/signup' will be handled by our user router.
app.use('/api/users', userRoutes);

// A simple test route to make sure the server is alive.
app.get('/', (req, res) => {
  res.send('API is running...');
});

// --- Server Startup ---
// This starts the server and makes it listen for incoming requests on the specified port.
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
