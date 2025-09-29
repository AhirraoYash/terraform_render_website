# This defines the input variable for our Render API key.
variable "render_api_key" {
  description = "The secret API key for connecting to your Render account."
  type        = string # It must be a string of text.
  sensitive   = true   # This tells Terraform to hide the value in its output logs for security.
}

# We will also define our MongoDB connection string here for later.
variable "mongodb_uri" {
  description = "The secret connection string for the MongoDB Atlas database."
  type        = string
  sensitive   = true
}