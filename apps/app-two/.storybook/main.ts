import type { StorybookConfig } from "@storybook/nextjs-vite"
import path from "path"
import { fileURLToPath } from "url"

const dirname = path.dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: "@storybook/nextjs-vite",
  viteFinal(config) {
    config.resolve = config.resolve ?? {}
    config.resolve.alias = {
      ...config.resolve.alias,
      // @/* must resolve to packages/ui/src so internal component imports (e.g. @/lib/utils) work
      "@": path.resolve(dirname, "../../../packages/ui/src"),
    }
    return config
  },
}

export default config
