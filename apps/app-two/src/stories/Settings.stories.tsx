import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import {
  Button,
  Input,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Badge,
} from "@repo/ui"
import { ShieldIcon, UserIcon, SparklesIcon } from "lucide-react"

const meta = {
  title: "Bloom / Dialogs",
  tags: ["ai-generated"],
  parameters: {
    docs: {
      description: {
        component:
          "Settings panel compositions in the **violet/purple** Bloom Studio theme.",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const ProfilePanel: Story = {
  render: () => (
    <div className="rounded-2xl border bg-card overflow-hidden max-w-lg shadow-xs">
      <div className="flex items-center gap-3 px-6 py-5 border-b bg-muted/30">
        <div className="size-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <UserIcon className="size-4" />
        </div>
        <div>
          <p className="font-semibold text-sm">Profile</p>
          <p className="text-xs text-muted-foreground">Your public information</p>
        </div>
      </div>
      <div className="px-6 py-5 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="pf-fn">First name</Label>
            <Input id="pf-fn" defaultValue="Bloom" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pf-ln">Last name</Label>
            <Input id="pf-ln" defaultValue="User" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="pf-email">Email</Label>
          <Input id="pf-email" type="email" defaultValue="bloom@studio.io" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="pf-bio">Bio</Label>
          <Textarea id="pf-bio" rows={3} defaultValue="Creative studio. Pixels and code." />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="pf-lang">Language</Label>
          <Select defaultValue="en">
            <SelectTrigger id="pf-lang" className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="de">Deutsch</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 pt-1">
          <Button size="sm">Save changes</Button>
          <Button size="sm" variant="outline">Discard</Button>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByDisplayValue("Bloom")).toBeVisible()
    await expect(canvas.getByDisplayValue("bloom@studio.io")).toBeVisible()
  },
}

export const PrivacyPanel: Story = {
  render: () => (
    <div className="rounded-2xl border bg-card overflow-hidden max-w-lg shadow-xs">
      <div className="flex items-center gap-3 px-6 py-5 border-b bg-muted/30">
        <div className="size-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <ShieldIcon className="size-4" />
        </div>
        <div>
          <p className="font-semibold text-sm">Privacy & Security</p>
          <p className="text-xs text-muted-foreground">Manage your data and visibility</p>
        </div>
      </div>
      <div className="px-6 py-5 space-y-5">
        {[
          {
            id: "pr-profile",
            label: "Public profile",
            desc: "Anyone can view your profile",
            checked: true,
          },
          {
            id: "pr-activity",
            label: "Show activity",
            desc: "Show when you were last active",
            checked: false,
          },
          {
            id: "pr-analytics",
            label: "Anonymized analytics",
            desc: "Help improve Bloom with usage data",
            checked: true,
          },
        ].map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-6">
            <div>
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
            <Switch id={item.id} defaultChecked={item.checked} />
          </div>
        ))}
        <div className="border-t pt-4">
          <p className="text-sm font-medium mb-3">Data preferences</p>
          <div className="space-y-2">
            {[
              { id: "pr-cookies", label: "Functional cookies", checked: true },
              { id: "pr-perf", label: "Performance cookies", checked: false },
              { id: "pr-ads", label: "Advertising cookies", checked: false },
            ].map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <Checkbox id={item.id} defaultChecked={item.checked} />
                <Label htmlFor={item.id} className="font-normal cursor-pointer text-sm">
                  {item.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    const switches = canvas.getAllByRole("switch")
    await expect(switches.length).toBe(3)
    await expect(switches[0]).toHaveAttribute("aria-checked", "true")
    await expect(switches[1]).toHaveAttribute("aria-checked", "false")
  },
}

export const UpgradeDialog: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogTrigger render={<Button><SparklesIcon /> Upgrade to Pro</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <SparklesIcon className="size-4 text-primary" />
            Upgrade to Bloom Pro
          </DialogTitle>
          <DialogDescription>
            Unlock unlimited projects, priority support, and advanced analytics.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 py-2">
          {[
            "Unlimited projects & collaborators",
            "Advanced analytics dashboard",
            "Custom domain support",
            "Priority email & chat support",
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-sm">
              <div className="size-4 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
                ✓
              </div>
              {feature}
            </div>
          ))}
        </div>
        <DialogFooter showCloseButton>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Badge variant="secondary" className="text-xs">$12/mo</Badge>
            <Button>Upgrade now</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body)
    const dialog = await body.findByRole("dialog")
    await expect(dialog).toHaveAttribute("data-open", "")
    await expect(body.getByText(/upgrade to bloom pro/i)).toBeInTheDocument()
  },
}
