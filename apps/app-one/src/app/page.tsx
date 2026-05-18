"use client"

import { useState } from "react"
import {
  Button,
  Badge,
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
  Textarea,
} from "@repo/ui"
import {
  LayoutDashboardIcon,
  UsersIcon,
  TrendingUpIcon,
  BellIcon,
  SearchIcon,
  PlusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  SettingsIcon,
  BookOpenIcon,
} from "lucide-react"

const stats = [
  { label: "Total Revenue", value: "$48,295", change: "+12.5%", up: true },
  { label: "Active Users", value: "2,841", change: "+4.3%", up: true },
  { label: "New Orders", value: "384", change: "-2.1%", up: false },
  { label: "Conversion Rate", value: "3.6%", change: "+0.8%", up: true },
]

const recentActivity = [
  { user: "Alice Martin", action: "Created a new project", time: "2m ago", badge: "New" },
  { user: "Bob Chen", action: "Submitted invoice #1048", time: "14m ago", badge: "Pending" },
  { user: "Clara Diaz", action: "Closed support ticket", time: "1h ago", badge: "Done" },
  { user: "David Park", action: "Upgraded to Pro plan", time: "3h ago", badge: "New" },
  { user: "Eva Müller", action: "Exported monthly report", time: "5h ago", badge: null },
]

export default function DashboardPage() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  const filtered = recentActivity.filter(
    (item) =>
      (filter === "all" || item.badge?.toLowerCase() === filter) &&
      item.user.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav */}
      <header className="border-b bg-card px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
            <LayoutDashboardIcon className="size-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg tracking-tight">Acme Dashboard</span>
          <Badge variant="secondary" className="ml-1">Beta</Badge>
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
          <Button variant="ghost" size="icon" aria-label="Settings">
            <SettingsIcon />
          </Button>
          <div className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
            AM
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Overview</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Welcome back, Alice. Here&apos;s what&apos;s happening.
            </p>
          </div>
          <Dialog>
            <DialogTrigger render={<Button><PlusIcon /> New Project</Button>} />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create new project</DialogTitle>
                <DialogDescription>
                  Fill in the details below to create a new project.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-2">
                <div className="grid gap-2">
                  <Label htmlFor="project-name">Project name</Label>
                  <Input id="project-name" placeholder="e.g. Q3 Campaign" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project-team">Team</Label>
                  <Select>
                    <SelectTrigger id="project-team" className="w-full">
                      <SelectValue placeholder="Select team" />
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
                  <Label htmlFor="project-desc">Description</Label>
                  <Textarea id="project-desc" placeholder="Describe the project..." rows={3} />
                </div>
              </div>
              <DialogFooter showCloseButton>
                <Button>Create project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border bg-card p-4 space-y-1 shadow-xs"
            >
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                {stat.label}
              </p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  stat.up ? "text-emerald-600" : "text-destructive"
                }`}
              >
                {stat.up ? <ArrowUpIcon className="size-3" /> : <ArrowDownIcon className="size-3" />}
                {stat.change} vs last month
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border bg-card shadow-xs">
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <div className="flex items-center gap-2">
              <TrendingUpIcon className="size-4 text-muted-foreground" />
              <h2 className="font-semibold text-sm">Recent Activity</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                <Input
                  className="pl-7 h-7 w-40 text-xs"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={filter} onValueChange={(v) => v && setFilter(v)}>
                <SelectTrigger size="sm" className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="divide-y">
            {filtered.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-muted-foreground">
                No activity found.
              </p>
            ) : (
              filtered.map((item) => (
                <div key={item.user} className="flex items-center justify-between px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="size-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                      {item.user[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.user}</p>
                      <p className="text-xs text-muted-foreground">{item.action}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <Badge
                        variant={
                          item.badge === "New"
                            ? "default"
                            : item.badge === "Pending"
                              ? "outline"
                              : "secondary"
                        }
                      >
                        {item.badge}
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="rounded-xl border bg-card shadow-xs px-5 py-4">
          <div className="flex items-center gap-2 mb-4">
            <UsersIcon className="size-4 text-muted-foreground" />
            <h2 className="font-semibold text-sm">Quick Actions</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm">Invite team member</Button>
            <Button size="sm" variant="outline">Export report</Button>
            <Button size="sm" variant="outline">View analytics</Button>
            <Button size="sm" variant="ghost">API settings</Button>
            <Button size="sm" variant="destructive">Clear cache</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
