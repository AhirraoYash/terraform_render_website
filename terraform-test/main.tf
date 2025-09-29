# This tells Terraform we are using the "local" provider,
# which is a special provider for managing files on your own computer.
# It is built-in and requires no download.
provider "local" {}

# This is a "resource" block. It tells Terraform to create something.
# In this case, it's a local file.
resource "local_file" "hello" {
  # This is the content that will be inside the file.
  content  = "Terraform is working!"

  # This is the path where the file will be created.
  # It will be created in the same folder where you run the command.
  filename = "${path.module}/hello.txt"
} 