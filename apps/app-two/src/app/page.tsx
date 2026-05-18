"use client"

import { useState } from "react"
import {
  Button,
  Badge,
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
  RadioGroup,
  RadioGroupItem,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui"
import { SparklesIcon, BellIcon, ShieldIcon, PaletteIcon, UserIcon, SaveIcon, BookOpenIcon } from "lucide-react"

function Section({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border bg-card shadow-xs overflow-hidden">
      <div className="flex items-start gap-3 px-6 py-5 border-b bg-muted/30">
        <div className="mt-0.5 size-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="px-6 py-5 space-y-5">{children}</div>
    </div>
  )
}

function SettingRow({
  label,
  description,
  children,
}: {
  label: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-8">
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    digest: true,
  })
  const [theme, setTheme] = useState("system")
  const [language, setLanguage] = useState("en")
  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    showActivity: false,
    dataSharing: false,
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-xl bg-primary flex items-center justify-center">
            <SparklesIcon className="size-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg">Bloom Studio</span>
          <Badge className="ml-1">Pro</Badge>
        </div>
        <div className="flex items-center gap-2">
          <a href="/storybook/index.html" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              <BookOpenIcon />
              Storybook
            </Button>
          </a>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <BellIcon />
          </Button>
          <div className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
            BL
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
        {/* Page title */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage your account preferences and privacy.
            </p>
          </div>
          <Button size="sm">
            <SaveIcon />
            Save changes
          </Button>
        </div>

        {/* Profile */}
        <Section
          icon={<UserIcon className="size-4" />}
          title="Profile"
          description="Update your personal information."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="display-name">Display name</Label>
              <Input id="display-name" defaultValue="Bloom User" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="handle">Handle</Label>
              <Input id="handle" defaultValue="@bloom" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              rows={3}
              defaultValue="Creative studio founder. Building things with pixels and code."
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lang">Language</Label>
            <Select value={language} onValueChange={(v) => v && setLanguage(v)}>
              <SelectTrigger id="lang" className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Section>

        {/* Appearance */}
        <Section
          icon={<PaletteIcon className="size-4" />}
          title="Appearance"
          description="Choose how Bloom looks for you."
        >
          <div className="space-y-1">
            <Label>Theme</Label>
            <RadioGroup
              value={theme}
              onValueChange={setTheme}
              className="mt-2 flex gap-6 w-auto"
            >
              {["light", "dark", "system"].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <RadioGroupItem value={t} id={`theme-${t}`} />
                  <Label htmlFor={`theme-${t}`} className="capitalize font-normal cursor-pointer">
                    {t}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <SettingRow label="Compact mode" description="Use less spacing throughout the UI">
            <Switch />
          </SettingRow>
          <SettingRow label="Reduce animations" description="Minimize motion for accessibility">
            <Switch />
          </SettingRow>
        </Section>

        {/* Notifications */}
        <Section
          icon={<BellIcon className="size-4" />}
          title="Notifications"
          description="Decide which updates you want to receive."
        >
          <SettingRow
            label="Email notifications"
            description="Receive updates to your inbox"
          >
            <Switch
              checked={notifications.email}
              onCheckedChange={(v) => setNotifications((n) => ({ ...n, email: v }))}
            />
          </SettingRow>
          <SettingRow label="Push notifications" description="Browser and mobile push alerts">
            <Switch
              checked={notifications.push}
              onCheckedChange={(v) => setNotifications((n) => ({ ...n, push: v }))}
            />
          </SettingRow>
          <SettingRow label="SMS notifications" description="Text messages for critical events">
            <Switch
              checked={notifications.sms}
              onCheckedChange={(v) => setNotifications((n) => ({ ...n, sms: v }))}
            />
          </SettingRow>
          <div className="border-t pt-4 space-y-3">
            <p className="text-sm font-medium">Email digest frequency</p>
            <div className="space-y-2">
              {["instantly", "daily", "weekly", "never"].map((freq) => (
                <div key={freq} className="flex items-center gap-2">
                  <Checkbox id={`freq-${freq}`} defaultChecked={freq === "daily"} />
                  <Label htmlFor={`freq-${freq}`} className="capitalize font-normal cursor-pointer">
                    {freq}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Privacy & Security */}
        <Section
          icon={<ShieldIcon className="size-4" />}
          title="Privacy & Security"
          description="Control who sees your data and activity."
        >
          <SettingRow label="Public profile" description="Anyone can view your profile">
            <Switch
              checked={privacy.publicProfile}
              onCheckedChange={(v) => setPrivacy((p) => ({ ...p, publicProfile: v }))}
            />
          </SettingRow>
          <SettingRow label="Show activity" description="Let others see when you were last active">
            <Switch
              checked={privacy.showActivity}
              onCheckedChange={(v) => setPrivacy((p) => ({ ...p, showActivity: v }))}
            />
          </SettingRow>
          <SettingRow
            label="Anonymized analytics"
            description="Share usage data to help improve Bloom"
          >
            <Switch
              checked={privacy.dataSharing}
              onCheckedChange={(v) => setPrivacy((p) => ({ ...p, dataSharing: v }))}
            />
          </SettingRow>
          <div className="border-t pt-4 flex gap-2">
            <Dialog>
              <DialogTrigger render={<Button variant="outline" size="sm">Change password</Button>} />
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change password</DialogTitle>
                  <DialogDescription>
                    Enter your current password and choose a new one.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-2">
                  <div className="grid gap-2">
                    <Label htmlFor="current-pw">Current password</Label>
                    <Input id="current-pw" type="password" placeholder="••••••••" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-pw">New password</Label>
                    <Input id="new-pw" type="password" placeholder="••••••••" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-pw">Confirm password</Label>
                    <Input id="confirm-pw" type="password" placeholder="••••••••" />
                  </div>
                </div>
                <DialogFooter showCloseButton>
                  <Button>Update password</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger
                render={<Button variant="destructive" size="sm">Delete account</Button>}
              />
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete account</DialogTitle>
                  <DialogDescription>
                    This will permanently remove your account and all data. This cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter showCloseButton>
                  <Button variant="destructive">Yes, delete my account</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </Section>
      </div>
    </div>
  )
}
