terraform {
  required_providers {
    render = {
      source  = "render-oss/render"
      # We are locking the version to an older, more stable release
      # to avoid the bugs in the newer version.
      version = "1.5.0"
    }
  }
}

provider "render" {
  api_key = var.render_api_key
}
