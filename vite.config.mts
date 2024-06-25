import { defineConfig } from "vitest/config"
// import("vitest/config")
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [tsconfigPaths()]
})