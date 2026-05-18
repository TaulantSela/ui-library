import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"
import { Button, Badge } from "@repo/ui"
import { SparklesIcon, HeartIcon, ShareIcon, BookmarkIcon } from "lucide-react"

const meta = {
  title: "Bloom / Buttons & Badges",
  tags: ["ai-generated"],
  parameters: {
    docs: {
      description: {
        component:
          "Buttons and badges rendered with the **violet/purple** theme of Bloom Studio.",
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
          With icons
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Button><SparklesIcon /> Upgrade</Button>
          <Button variant="outline"><HeartIcon /> Save</Button>
          <Button variant="secondary"><ShareIcon /> Share</Button>
          <Button size="icon" variant="ghost" aria-label="Bookmark">
            <BookmarkIcon />
          </Button>
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Badge combos
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Pro</Badge>
          <Badge variant="secondary">Beta</Badge>
          <Badge variant="outline">New</Badge>
          <Badge variant="destructive">Deprecated</Badge>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    const buttons = canvas.getAllByRole("button")
    await expect(buttons.length).toBeGreaterThan(0)
    await expect(buttons[0]).toBeVisible()
  },
}

export const CallToAction: Story = {
  render: () => (
    <div className="rounded-2xl border bg-card p-6 max-w-sm text-center space-y-4 shadow-xs">
      <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
        <SparklesIcon className="size-6 text-primary" />
      </div>
      <div>
        <p className="font-semibold">Bloom Pro</p>
        <p className="text-sm text-muted-foreground mt-1">
          Everything you need to create stunning work.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Button className="w-full">
          <SparklesIcon /> Get started for free
        </Button>
        <Button variant="ghost" className="w-full">
          Learn more
        </Button>
      </div>
    </div>
  ),
}
