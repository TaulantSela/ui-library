import type { Preview } from "@storybook/nextjs-vite"
// Import app-one's globals.css — this applies the blue/indigo theme to all stories
import "../src/app/globals.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { test: "todo" },
    backgrounds: { disable: true },
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-background min-h-screen text-foreground">
        <Story />
      </div>
    ),
  ],
}

export default preview
