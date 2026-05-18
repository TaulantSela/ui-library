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
  title: "Bloom / Forms",
  tags: ["ai-generated"],
  parameters: {
    docs: {
      description: {
        component: "Form inputs in the **violet / purple** Bloom Studio theme.",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const AccountForm: Story = {
  render: () => (
    <div className="max-w-sm space-y-4 rounded-2xl border bg-card p-6 shadow-xs">
      <div>
        <h2 className="font-semibold">Create account</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Join Bloom Studio and start creating.
        </p>
      </div>
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="bl-name">Display name</Label>
          <Input id="bl-name" placeholder="e.g. Bloom Creative" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="bl-email">Email</Label>
          <Input id="bl-email" type="email" placeholder="you@bloom.io" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="bl-plan">Plan</Label>
          <Select>
            <SelectTrigger id="bl-plan" className="w-full">
              <SelectValue placeholder="Choose plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="free">Free — 3 projects</SelectItem>
              <SelectItem value="pro">Pro — Unlimited</SelectItem>
              <SelectItem value="team">Team — 5 seats</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="bl-bio">About your studio</Label>
          <Textarea id="bl-bio" placeholder="Tell us about your creative work..." rows={3} />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="bl-terms" />
          <Label htmlFor="bl-terms" className="font-normal cursor-pointer">
            I agree to the terms of service
          </Label>
        </div>
      </div>
      <div className="flex gap-2 pt-1">
        <Button className="flex-1">Create account</Button>
        <Button variant="outline">Sign in</Button>
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    const nameInput = canvas.getByRole("textbox", { name: /display name/i })
    await expect(nameInput).toBeVisible()
    await expect(canvas.getByRole("combobox")).toBeVisible()
  },
}

export const SearchAndFilter: Story = {
  render: () => (
    <div className="flex gap-2 items-center rounded-2xl border bg-card p-3 shadow-xs max-w-lg">
      <Input placeholder="Search your projects..." className="flex-1" />
      <Select>
        <SelectTrigger size="sm" className="w-32 shrink-0">
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="design">Design</SelectItem>
          <SelectItem value="code">Code</SelectItem>
          <SelectItem value="archived">Archived</SelectItem>
        </SelectContent>
      </Select>
      <Button size="sm" className="shrink-0">Search</Button>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("textbox")
    await userEvent.type(input, "brand")
    await expect(input).toHaveValue("brand")
  },
}

export const InlineValidation: Story = {
  render: () => (
    <div className="max-w-xs space-y-4">
      <div className="grid gap-1.5">
        <Label htmlFor="bl-inv-email">Email</Label>
        <Input
          id="bl-inv-email"
          type="email"
          placeholder="you@bloom.io"
          defaultValue="not@@valid"
          aria-invalid
        />
        <p className="text-xs text-destructive">Please enter a valid email address.</p>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="bl-inv-pw">Password</Label>
        <Input id="bl-inv-pw" type="password" defaultValue="secure-password-123" />
        <p className="text-xs text-muted-foreground">Minimum 8 characters.</p>
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    const invalidInput = canvas.getByLabelText(/email/i)
    await expect(invalidInput).toHaveAttribute("aria-invalid", "true")
  },
}
