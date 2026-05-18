import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"
import { Input } from "./input"
import { Label } from "./label"

const meta = {
  component: Input,
  title: "Library / Forms / Input",
  tags: ["ai-generated"],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { placeholder: "Enter text..." },
  play: async ({ canvas }) => {
    const input = canvas.getByRole("textbox")
    await expect(input).toBeVisible()
    await expect(input).toHaveAttribute("placeholder", "Enter text...")
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="email">Email address</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
}

export const Password: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="password">Password</Label>
      <Input id="password" type="password" placeholder="••••••••" />
    </div>
  ),
}

export const Disabled: Story = {
  args: { placeholder: "Not editable", disabled: true },
  play: async ({ canvas }) => {
    const input = canvas.getByRole("textbox")
    await expect(input).toBeDisabled()
  },
}

export const Invalid: Story = {
  args: {
    placeholder: "Invalid value",
    "aria-invalid": true,
    defaultValue: "bad@",
  },
  play: async ({ canvas }) => {
    const input = canvas.getByRole("textbox")
    await expect(input).toHaveAttribute("aria-invalid", "true")
  },
}

export const WithTyping: Story = {
  args: { placeholder: "Type here..." },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("textbox")
    await userEvent.type(input, "Hello world")
    await expect(input).toHaveValue("Hello world")
  },
}

export const FullForm: Story = {
  render: () => (
    <div className="grid gap-4 p-4 max-w-sm">
      <div className="grid gap-2">
        <Label htmlFor="full-name">Full name</Label>
        <Input id="full-name" placeholder="John Doe" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email-full">Email</Label>
        <Input id="email-full" type="email" placeholder="john@example.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
      </div>
    </div>
  ),
}
