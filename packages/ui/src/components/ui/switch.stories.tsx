import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"
import { Switch } from "./switch"
import { Label } from "./label"

const meta = {
  component: Switch,
  title: "Library / Controls / Switch",
  tags: ["ai-generated"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
    },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    const toggle = canvas.getByRole("switch")
    await expect(toggle).toBeVisible()
    await expect(toggle).toHaveAttribute("aria-checked", "false")
  },
}

export const Checked: Story = {
  args: { defaultChecked: true },
  play: async ({ canvas }) => {
    const toggle = canvas.getByRole("switch")
    await expect(toggle).toHaveAttribute("aria-checked", "true")
  },
}

export const Small: Story = {
  args: { size: "sm" },
}

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    const toggle = canvas.getByRole("switch")
    // base-ui renders custom elements with aria-disabled rather than the HTML disabled attribute
    await expect(toggle).toHaveAttribute("aria-disabled", "true")
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane mode</Label>
    </div>
  ),
}

export const ToggleInteraction: Story = {
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("switch")
    await expect(toggle).toHaveAttribute("aria-checked", "false")
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute("aria-checked", "true")
  },
}

export const SettingsPanel: Story = {
  render: () => (
    <div className="space-y-4 p-4 max-w-sm">
      <p className="text-sm font-medium">Privacy settings</p>
      <div className="flex items-center justify-between">
        <Label htmlFor="profile-public">Public profile</Label>
        <Switch id="profile-public" defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="analytics">Usage analytics</Label>
        <Switch id="analytics" />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="marketing">Marketing emails</Label>
        <Switch id="marketing" defaultChecked />
      </div>
    </div>
  ),
}
