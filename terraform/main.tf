 # This is the blueprint for our backend web service,
# using the stable syntax for provider version 1.5.0.
resource "render_web_service" "backend" {
  name = "mern-app-backend-yash-2025"

  # The git repository for your project.
  repo = "https://github.com/AhirraoYash/terraform_render_website.git"

  # --- Build and Start Configuration ---
  runtime       = "node"
  branch        = "main"
  build_command = "cd backend && npm install"
  start_command = "cd backend && node server.js"

  # --- Environment Variables ---
  env_vars = {
    MONGODB_URI = var.mongodb_uri
  }
}

