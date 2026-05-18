import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"
import { Switch, Checkbox, RadioGroup, RadioGroupItem, Label, Badge } from "@repo/ui"

const meta = {
  title: "Acme / Controls",
  tags: ["ai-generated"],
  parameters: {
    docs: {
      description: {
        component:
          "Toggle controls in the **blue / indigo** Acme Dashboard theme.",
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
            { label: "Real-time alerts", checked: true, id: "acme-s1" },
            { label: "Automated reports", checked: true, id: "acme-s2" },
            { label: "Maintenance mode", checked: false, id: "acme-s3" },
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
          Sizes & States
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

export const Checkboxes: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <p className="text-sm font-medium">Dashboard features</p>
      <div className="space-y-2.5">
        {[
          { id: "acme-c1", label: "Show live metrics", checked: true },
          { id: "acme-c2", label: "Enable error tracking", checked: true },
          { id: "acme-c3", label: "Weekly digest email", checked: false },
          { id: "acme-c4", label: "Beta features (coming soon)", checked: false, disabled: true },
        ].map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <Checkbox id={item.id} defaultChecked={item.checked} disabled={item.disabled} />
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
        <p className="text-sm font-medium mb-3">Deploy region</p>
        <RadioGroup defaultValue="us-east">
          {[
            { value: "us-east", label: "US East", sub: "Virginia · Low latency" },
            { value: "eu-west", label: "EU West", sub: "Ireland · GDPR compliant" },
            { value: "ap-south", label: "Asia Pacific", sub: "Singapore" },
          ].map((item) => (
            <label
              key={item.value}
              htmlFor={`region-${item.value}`}
              className="flex items-start gap-3 rounded-lg border p-3 cursor-pointer has-[[data-checked]]:border-primary has-[[data-checked]]:bg-primary/5"
            >
              <RadioGroupItem value={item.value} id={`region-${item.value}`} className="mt-0.5" />
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
    await expect(radios.length).toBe(3)
    await expect(radios[0]).toHaveAttribute("aria-checked", "true")
  },
}

export const ToggleInteraction: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="acme-toggle" />
      <Label htmlFor="acme-toggle">Enable dark mode</Label>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("switch")
    await expect(toggle).toHaveAttribute("aria-checked", "false")
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute("aria-checked", "true")
  },
}
