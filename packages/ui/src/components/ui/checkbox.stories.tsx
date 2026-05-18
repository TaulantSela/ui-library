import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"
import { Checkbox } from "./checkbox"
import { Label } from "./label"

const meta = {
  component: Checkbox,
  title: "Library / Controls / Checkbox",
  tags: ["ai-generated"],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    const checkbox = canvas.getByRole("checkbox")
    await expect(checkbox).toBeVisible()
    await expect(checkbox).not.toBeChecked()
  },
}

export const Checked: Story = {
  args: { defaultChecked: true },
  play: async ({ canvas }) => {
    const checkbox = canvas.getByRole("checkbox")
    await expect(checkbox).toBeChecked()
  },
}

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    const checkbox = canvas.getByRole("checkbox")
    // base-ui renders custom elements with aria-disabled rather than the HTML disabled attribute
    await expect(checkbox).toHaveAttribute("aria-disabled", "true")
  },
}

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">I agree to the terms and conditions</Label>
    </div>
  ),
}

export const ToggleInteraction: Story = {
  play: async ({ canvas, userEvent }) => {
    const checkbox = canvas.getByRole("checkbox")
    await expect(checkbox).not.toBeChecked()
    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()
    await userEvent.click(checkbox)
    await expect(checkbox).not.toBeChecked()
  },
}

export const FormGroup: Story = {
  render: () => (
    <div className="space-y-3 p-4">
      <p className="text-sm font-medium">Notifications</p>
      <div className="flex items-center gap-2">
        <Checkbox id="email-notif" defaultChecked />
        <Label htmlFor="email-notif">Email notifications</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="sms-notif" />
        <Label htmlFor="sms-notif">SMS notifications</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="push-notif" defaultChecked />
        <Label htmlFor="push-notif">Push notifications</Label>
      </div>
    </div>
  ),
}
