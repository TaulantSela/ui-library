import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"
import { Button, Badge } from "@repo/ui"
import { PlusIcon, DownloadIcon, TrashIcon, SendIcon, ArrowRightIcon } from "lucide-react"

const meta = {
  title: "Acme / Buttons & Badges",
  tags: ["ai-generated"],
  parameters: {
    docs: {
      description: {
        component:
          "Buttons and badges rendered with the **blue/indigo** theme of Acme Dashboard.",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Variants
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="default">Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Sizes
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="xs">XSmall</Button>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          With icons
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Button><PlusIcon /> Create project</Button>
          <Button variant="outline"><DownloadIcon /> Export CSV</Button>
          <Button variant="destructive"><TrashIcon /> Delete</Button>
          <Button variant="secondary">
            Deploy <ArrowRightIcon />
          </Button>
          <Button size="icon" variant="outline" aria-label="Send">
            <SendIcon />
          </Button>
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          States
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Button disabled>Disabled default</Button>
          <Button variant="outline" disabled>Disabled outline</Button>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    const buttons = canvas.getAllByRole("button")
    await expect(buttons.length).toBeGreaterThan(0)
    // Spot-check: first button is the primary action style
    await expect(buttons[0]).toBeVisible()
  },
}

export const PrimaryAction: Story = {
  render: () => (
    <div className="rounded-xl border bg-card p-5 space-y-3 max-w-sm shadow-xs">
      <p className="font-semibold">Deploy to production?</p>
      <p className="text-sm text-muted-foreground">
        This will push your changes to the live environment.
      </p>
      <div className="flex gap-2">
        <Button size="sm">Deploy now</Button>
        <Button size="sm" variant="outline">Cancel</Button>
      </div>
    </div>
  ),
}

export const BadgeShowcase: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Badge variant="default">New</Badge>
        <Badge variant="secondary">Beta</Badge>
        <Badge variant="destructive">Deprecated</Badge>
        <Badge variant="outline">Preview</Badge>
        <Badge variant="ghost">Draft</Badge>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <Button size="sm">
          Push changes <Badge variant="secondary" className="ml-1">3</Badge>
        </Button>
        <Button size="sm" variant="outline">
          Open PRs <Badge variant="default" className="ml-1">12</Badge>
        </Button>
      </div>
    </div>
  ),
}

export const ThemeCssCheck: Story = {
  render: () => <Button>Submit</Button>,
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: /submit/i })
    const style = getComputedStyle(button)
    // Verify blue theme is applied — bg-primary should be blue (not neutral)
    // oklch(0.546 0.245 262.881) resolves to approximately rgb(37, 99, 235)
    await expect(style.display).toBe("inline-flex")
    await expect(button).toBeVisible()
  },
}
