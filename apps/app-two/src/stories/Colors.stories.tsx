import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

const meta = {
  title: "Bloom / Colors",
  tags: ["ai-generated"],
  parameters: {
    docs: {
      description: {
        component:
          "Bloom Studio design token palette — **violet / purple** theme. Swatches read directly from CSS variables.",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function Swatch({
  bg,
  fg,
  label,
  variable,
}: {
  bg: string
  fg?: string
  label: string
  variable: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-20 w-full rounded-xl border shadow-xs flex items-center justify-center text-sm font-semibold select-none"
        style={{
          background: `var(${bg})`,
          color: fg ? `var(${fg})` : "transparent",
          borderColor: "var(--border)",
        }}
      >
        {fg ? "Aa" : ""}
      </div>
      <div className="space-y-0.5">
        <p className="text-xs font-medium leading-none">{label}</p>
        <p className="text-[10px] font-mono text-muted-foreground leading-none">{variable}</p>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground border-b pb-2">
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {children}
      </div>
    </div>
  )
}

function RadiusSwatch({ label, variable }: { label: string; variable: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-16 w-full border-2 border-primary bg-primary/10"
        style={{ borderRadius: `var(${variable})` }}
      />
      <div className="space-y-0.5">
        <p className="text-xs font-medium leading-none">{label}</p>
        <p className="text-[10px] font-mono text-muted-foreground leading-none">{variable}</p>
      </div>
    </div>
  )
}

export const Palette: Story = {
  render: () => (
    <div className="space-y-10 p-2">
      <Section title="Brand — Violet / Purple">
        <Swatch bg="--primary" fg="--primary-foreground" label="Primary" variable="--primary" />
        <Swatch bg="--secondary" fg="--secondary-foreground" label="Secondary" variable="--secondary" />
        <Swatch bg="--accent" fg="--accent-foreground" label="Accent" variable="--accent" />
      </Section>

      <Section title="Semantic">
        <Swatch bg="--destructive" fg="--primary-foreground" label="Destructive" variable="--destructive" />
        <Swatch bg="--muted" fg="--muted-foreground" label="Muted" variable="--muted" />
        <Swatch bg="--ring" label="Ring" variable="--ring" />
        <Swatch bg="--border" label="Border" variable="--border" />
        <Swatch bg="--input" label="Input" variable="--input" />
      </Section>

      <Section title="Surfaces">
        <Swatch bg="--background" fg="--foreground" label="Background" variable="--background" />
        <Swatch bg="--foreground" fg="--background" label="Foreground" variable="--foreground" />
        <Swatch bg="--card" fg="--card-foreground" label="Card" variable="--card" />
        <Swatch bg="--popover" fg="--popover-foreground" label="Popover" variable="--popover" />
      </Section>

      <Section title="Chart">
        <Swatch bg="--chart-1" label="Chart 1" variable="--chart-1" />
        <Swatch bg="--chart-2" label="Chart 2" variable="--chart-2" />
        <Swatch bg="--chart-3" label="Chart 3" variable="--chart-3" />
        <Swatch bg="--chart-4" label="Chart 4" variable="--chart-4" />
        <Swatch bg="--chart-5" label="Chart 5" variable="--chart-5" />
      </Section>

      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground border-b pb-2">
          Radius — 1.5rem base (pill)
        </h3>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
          <RadiusSwatch label="sm" variable="--radius-sm" />
          <RadiusSwatch label="md" variable="--radius-md" />
          <RadiusSwatch label="lg" variable="--radius-lg" />
          <RadiusSwatch label="xl" variable="--radius-xl" />
          <RadiusSwatch label="2xl" variable="--radius-2xl" />
          <RadiusSwatch label="3xl" variable="--radius-3xl" />
        </div>
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    const headings = canvas.getAllByRole("heading", { level: 3 })
    await expect(headings.length).toBeGreaterThan(0)
    await expect(headings[0]).toBeVisible()
  },
}

export const BrandColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {[
        { bg: "--primary", fg: "--primary-foreground", label: "Primary · Violet-600" },
        { bg: "--secondary", fg: "--secondary-foreground", label: "Secondary" },
        { bg: "--accent", fg: "--accent-foreground", label: "Accent" },
        { bg: "--destructive", fg: "--primary-foreground", label: "Destructive" },
      ].map((c) => (
        <div
          key={c.bg}
          className="flex h-24 w-44 flex-col items-center justify-center rounded-2xl border shadow-xs gap-1"
          style={{ background: `var(${c.bg})`, color: `var(${c.fg})` }}
        >
          <span className="text-lg font-bold">Aa</span>
          <span className="text-xs opacity-80">{c.label}</span>
        </div>
      ))}
    </div>
  ),
}

export const SurfaceStack: Story = {
  name: "Surface Stack",
  render: () => (
    <div
      className="relative w-full max-w-sm rounded-2xl p-6 border"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <p className="text-xs text-muted-foreground mb-4 font-medium uppercase tracking-widest">
        Background
      </p>
      <div
        className="rounded-xl p-5 border"
        style={{ background: "var(--card)", color: "var(--card-foreground)" }}
      >
        <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-widest">
          Card
        </p>
        <div
          className="rounded-lg p-4 border"
          style={{ background: "var(--popover)", color: "var(--popover-foreground)" }}
        >
          <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-widest">
            Popover
          </p>
          <p className="text-sm">Bloom violet surface depth</p>
        </div>
      </div>
    </div>
  ),
}
