import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"
import { Button } from "./button"
import { PlusIcon, TrashIcon, ArrowRightIcon } from "lucide-react"

const meta = {
  component: Button,
  title: "Library / Buttons & Badges / Button",
  tags: ["ai-generated"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "secondary", "ghost", "destructive", "link"],
    },
    size: {
      control: "select",
      options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: "Click me" },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: /click me/i })
    await expect(button).toBeVisible()
    await expect(button).not.toBeDisabled()
  },
}

export const CssCheck: Story = {
  args: { children: "Submit", variant: "default" },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: /submit/i })
    const style = getComputedStyle(button)
    // bg-primary is applied — confirms Tailwind/global CSS loaded
    await expect(style.display).toBe("inline-flex")
  },
}

export const Outline: Story = {
  args: { children: "Outline", variant: "outline" },
}

export const Secondary: Story = {
  args: { children: "Secondary", variant: "secondary" },
}

export const Ghost: Story = {
  args: { children: "Ghost", variant: "ghost" },
}

export const Destructive: Story = {
  args: { children: "Delete", variant: "destructive" },
}

export const Link: Story = {
  args: { children: "Learn more", variant: "link" },
}

export const Small: Story = {
  args: { children: "Small", size: "sm" },
}

export const Large: Story = {
  args: { children: "Large", size: "lg" },
}

export const WithLeadingIcon: Story = {
  args: {
    children: (
      <>
        <PlusIcon />
        Add item
      </>
    ),
  },
}

export const WithTrailingIcon: Story = {
  args: {
    children: (
      <>
        Continue
        <ArrowRightIcon />
      </>
    ),
  },
}

export const IconOnly: Story = {
  args: {
    children: <TrashIcon />,
    size: "icon",
    "aria-label": "Delete",
  },
}

export const Disabled: Story = {
  args: { children: "Disabled", disabled: true },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: /disabled/i })
    await expect(button).toBeDisabled()
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 p-4">
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2 p-4">
      <Button size="xs">XSmall</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}
