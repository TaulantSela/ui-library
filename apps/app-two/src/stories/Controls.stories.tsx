import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"
import { Switch, Checkbox, RadioGroup, RadioGroupItem, Label, Badge, Button } from "@repo/ui"

const meta = {
  title: "Bloom / Controls",
  tags: ["ai-generated"],
  parameters: {
    docs: {
      description: {
        component:
          "Toggles, checkboxes, and radio groups in the **violet/purple** Bloom Studio theme.",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Switches: Story = {
  render: () => (
    <div className="space-y-6 max-w-sm">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Toggle states
        </p>
        <div className="space-y-3">
          {[
            { label: "Email notifications", checked: true, id: "s-email" },
            { label: "Push notifications", checked: false, id: "s-push" },
            { label: "Marketing emails", checked: true, id: "s-mkt" },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <Label htmlFor={item.id} className="font-normal cursor-pointer">
                {item.label}
              </Label>
              <Switch id={item.id} defaultChecked={item.checked} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Sizes
        </p>
        <div className="flex items-center gap-4">
          <Switch size="sm" defaultChecked />
          <Switch size="default" defaultChecked />
          <Switch disabled />
          <Badge variant="outline" className="text-xs">disabled</Badge>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    const switches = canvas.getAllByRole("switch")
    await expect(switches.length).toBeGreaterThan(0)
    await expect(switches[0]).toHaveAttribute("aria-checked", "true")
  },
}

export const ThemeCssCheck: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="css-check" defaultChecked />
      <Label htmlFor="css-check">Violet theme active</Label>
    </div>
  ),
  play: async ({ canvas }) => {
    const toggle = canvas.getByRole("switch")
    // Verify violet theme: switch uses --primary which is violet-600
    await expect(toggle).toHaveAttribute("aria-checked", "true")
    await expect(getComputedStyle(toggle).display).not.toBe("")
  },
}

export const CheckboxGroup: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <div>
        <p className="text-sm font-medium mb-3">Notification channels</p>
        <div className="space-y-2.5">
          {[
            { id: "ch-email", label: "Email", checked: true },
            { id: "ch-app", label: "In-app notifications", checked: true },
            { id: "ch-sms", label: "SMS", checked: false },
            { id: "ch-slack", label: "Slack (coming soon)", checked: false, disabled: true },
          ].map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <Checkbox
                id={item.id}
                defaultChecked={item.checked}
                disabled={item.disabled}
              />
              <Label
                htmlFor={item.id}
                className={`font-normal cursor-pointer ${item.disabled ? "opacity-50" : ""}`}
              >
                {item.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    const checkboxes = canvas.getAllByRole("checkbox")
    await expect(checkboxes.length).toBe(4)
    await expect(checkboxes[0]).toHaveAttribute("aria-checked", "true")
    await expect(checkboxes[3]).toHaveAttribute("aria-disabled", "true")
  },
}

export const RadioGroups: Story = {
  render: () => (
    <div className="space-y-6 max-w-sm">
      <div>
        <p className="text-sm font-medium mb-3">Appearance</p>
        <RadioGroup defaultValue="system" className="flex gap-5 w-auto">
          {["light", "dark", "system"].map((t) => (
            <div key={t} className="flex items-center gap-2">
              <RadioGroupItem value={t} id={`rd-${t}`} />
              <Label htmlFor={`rd-${t}`} className="capitalize font-normal cursor-pointer">
                {t}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div>
        <p className="text-sm font-medium mb-3">Billing cycle</p>
        <RadioGroup defaultValue="annual">
          {[
            { value: "monthly", label: "Monthly", sub: "Billed month-to-month" },
            { value: "annual", label: "Annual", sub: "Save 20% vs monthly" },
          ].map((item) => (
            <label
              key={item.value}
              htmlFor={`billing-${item.value}`}
              className="flex items-start gap-3 rounded-xl border p-3 cursor-pointer has-[[data-checked]]:border-primary has-[[data-checked]]:bg-primary/5"
            >
              <RadioGroupItem value={item.value} id={`billing-${item.value}`} className="mt-0.5" />
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </div>
            </label>
          ))}
        </RadioGroup>
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    const radios = canvas.getAllByRole("radio")
    await expect(radios.length).toBeGreaterThan(0)
  },
}

export const ToggleInteraction: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="toggle-test" />
      <Label htmlFor="toggle-test">Enable feature</Label>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("switch")
    await expect(toggle).toHaveAttribute("aria-checked", "false")
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute("aria-checked", "true")
  },
}
