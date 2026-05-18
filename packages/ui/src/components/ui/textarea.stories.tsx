import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"
import { Textarea } from "./textarea"
import { Label } from "./label"

const meta = {
  component: Textarea,
  title: "Library / Forms / Textarea",
  tags: ["ai-generated"],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { placeholder: "Write something..." },
  play: async ({ canvas }) => {
    const textarea = canvas.getByRole("textbox")
    await expect(textarea).toBeVisible()
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid gap-2 max-w-sm">
      <Label htmlFor="bio">Bio</Label>
      <Textarea id="bio" placeholder="Tell us a bit about yourself..." rows={4} />
    </div>
  ),
}

export const Disabled: Story = {
  args: { placeholder: "Read only", disabled: true, defaultValue: "Cannot edit this." },
  play: async ({ canvas }) => {
    const textarea = canvas.getByRole("textbox")
    await expect(textarea).toBeDisabled()
  },
}

export const WithTyping: Story = {
  args: { placeholder: "Start typing..." },
  play: async ({ canvas, userEvent }) => {
    const textarea = canvas.getByRole("textbox")
    await userEvent.type(textarea, "This is a multiline\ncomment.")
    await expect(textarea).toHaveValue("This is a multiline\ncomment.")
  },
}
