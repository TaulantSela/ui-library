import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Badge,
} from "@repo/ui"
import { PlusIcon, AlertTriangleIcon } from "lucide-react"

const meta = {
  title: "Acme / Dialogs",
  tags: ["ai-generated"],
  parameters: {
    docs: {
      description: {
        component: "Modal dialogs in the **blue/indigo** Acme Dashboard theme.",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const CreateProject: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button><PlusIcon /> New project</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create project</DialogTitle>
          <DialogDescription>Add a new project to your workspace.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="dp-name">Name</Label>
            <Input id="dp-name" placeholder="e.g. Q3 Campaign" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dp-team">Team</Label>
            <Select>
              <SelectTrigger id="dp-team" className="w-full">
                <SelectValue placeholder="Select a team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eng">Engineering</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter showCloseButton>
          <Button>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole("button", { name: /new project/i })
    await expect(trigger).toBeVisible()
  },
}

export const OpenedDialog: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogTrigger render={<Button variant="outline">Open dialog</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Invite team member{" "}
            <Badge variant="secondary" className="ml-1 align-middle">
              Pro
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Enter the email address of the person you&apos;d like to invite.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-2">
          <Label htmlFor="invite-email">Email address</Label>
          <Input id="invite-email" type="email" placeholder="colleague@company.com" />
        </div>
        <DialogFooter showCloseButton>
          <Button>Send invite</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body)
    const dialog = await body.findByRole("dialog")
    await expect(dialog).toHaveAttribute("data-open", "")
    await expect(body.getByText(/invite team member/i)).toBeInTheDocument()
  },
}

export const DangerConfirm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="destructive">Delete workspace</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangleIcon className="size-4 text-destructive" />
            Delete workspace
          </DialogTitle>
          <DialogDescription>
            This will permanently delete the workspace, all projects, and all data associated with
            it. <strong className="text-foreground">This action cannot be undone.</strong>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton>
          <Button variant="destructive">Yes, delete everything</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
