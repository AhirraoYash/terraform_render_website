import User from "../model/User.js";

// Utility to hide password
function toPublicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email
  };
}

// Signup controller
export async function signupUser(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide name, email, and password." });
    }

    // Check if user already exists
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create new user
    const user = await User.create({ name, email, password });

    return res.status(201).json({
      message: "User created successfully!",
      user: toPublicUser(user)
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ message: "Something went wrong on the server." });
  }
}

// Login controller
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password." });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Login success
    return res.status(200).json({
      message: "Login successful!",
      user: toPublicUser(user)
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Something went wrong on the server." });
  }
}
