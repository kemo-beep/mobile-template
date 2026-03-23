import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const webRoot = path.resolve(__dirname)

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: webRoot,
  },
  webpack: (config) => {
    config.resolve ??= {}
    config.resolve.roots = [webRoot]
    const webNodeModules = path.join(webRoot, "node_modules")
    config.resolve.modules = [
      webNodeModules,
      ...(Array.isArray(config.resolve.modules) ? config.resolve.modules : ["node_modules"]),
    ]
    return config
  },
}

export default nextConfig
