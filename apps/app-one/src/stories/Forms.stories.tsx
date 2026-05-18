import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"
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
  Checkbox,
} from "@repo/ui"

const meta = {
  title: "Acme / Forms",
  tags: ["ai-generated"],
  parameters: {
    docs: {
      description: {
        component: "Form inputs in the **blue/indigo** Acme Dashboard theme.",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const NewProjectForm: Story = {
  render: () => (
    <div className="max-w-sm space-y-4 rounded-xl border bg-card p-6 shadow-xs">
      <div>
        <h2 className="font-semibold">New Project</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Create a workspace for your team.
        </p>
      </div>
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="pname">Project name</Label>
          <Input id="pname" placeholder="e.g. Acme Rebrand" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="pslug">URL slug</Label>
          <div className="flex items-center gap-0">
            <span className="inline-flex h-8 items-center rounded-l-lg border border-r-0 bg-muted px-2.5 text-sm text-muted-foreground">
              acme.app/
            </span>
            <Input id="pslug" placeholder="rebrand-2026" className="rounded-l-none" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="pteam">Assign team</Label>
          <Select>
            <SelectTrigger id="pteam" className="w-full">
              <SelectValue placeholder="Choose team" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eng">Engineering</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="pdesc">Description</Label>
          <Textarea id="pdesc" placeholder="Describe the goal of this project..." rows={3} />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="pnotify" />
          <Label htmlFor="pnotify" className="font-normal cursor-pointer">
            Notify team members by email
          </Label>
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        <Button className="flex-1">Create project</Button>
        <Button variant="outline">Cancel</Button>
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    const nameInput = canvas.getByRole("textbox", { name: /project name/i })
    await expect(nameInput).toBeVisible()
    await expect(canvas.getByRole("textbox", { name: /url slug/i })).toBeVisible()
    await expect(canvas.getByRole("combobox")).toBeVisible()
  },
}

export const SearchAndFilter: Story = {
  render: () => (
    <div className="flex gap-2 items-center rounded-lg border bg-card p-3 shadow-xs max-w-lg">
      <Input placeholder="Search projects..." className="flex-1" />
      <Select>
        <SelectTrigger size="sm" className="w-32 shrink-0">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="archived">Archived</SelectItem>
          <SelectItem value="draft">Draft</SelectItem>
        </SelectContent>
      </Select>
      <Button size="sm" className="shrink-0">Search</Button>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("textbox")
    await userEvent.type(input, "rebrand")
    await expect(input).toHaveValue("rebrand")
    await expect(canvas.getByRole("button", { name: /search/i })).toBeVisible()
  },
}

export const InlineValidation: Story = {
  render: () => (
    <div className="max-w-xs space-y-4">
      <div className="grid gap-1.5">
        <Label htmlFor="email-valid">Email</Label>
        <Input
          id="email-valid"
          type="email"
          placeholder="you@company.com"
          defaultValue="not-an-email"
          aria-invalid
        />
        <p className="text-xs text-destructive">Please enter a valid email address.</p>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="pw-ok">Password</Label>
        <Input id="pw-ok" type="password" defaultValue="correct-horse-battery" />
        <p className="text-xs text-muted-foreground">At least 8 characters.</p>
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    const invalidInput = canvas.getByLabelText(/email/i)
    await expect(invalidInput).toHaveAttribute("aria-invalid", "true")
  },
}
