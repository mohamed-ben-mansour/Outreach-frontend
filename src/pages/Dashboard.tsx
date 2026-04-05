import PageHeader from "@/components/PageHeader";
import SectionCard from "@/components/SectionCard";

const metrics = [
  { label: "Meetings Booked", value: "47", change: "↑ 23% vs last week", positive: true },
  { label: "Prospects Contacted", value: "1,243", change: "Across 3 campaigns", positive: false },
  { label: "Response Rate", value: "18.4%", change: "↑ 3.2% vs average", positive: true },
  { label: "Active Campaigns", value: "3", change: "2 on autopilot", positive: false },
];

const channels = [
  { icon: "💼", name: "LinkedIn", value: "847", label: "Messages sent today" },
  { icon: "📧", name: "Email", value: "324", label: "Messages sent today" },
  { icon: "💬", name: "WhatsApp", value: "72", label: "Messages sent today" },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" subtitle="Real-time performance metrics" />

      <div className="grid grid-cols-4 gap-4">
        {metrics.map((m) => (
          <SectionCard key={m.label}>
            <div className="text-muted-foreground text-sm mb-1">{m.label}</div>
            <div className="text-3xl font-bold text-foreground">{m.value}</div>
            <div className={`text-xs mt-2 ${m.positive ? "text-success" : "text-muted-foreground"}`}>
              {m.change}
            </div>
          </SectionCard>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {channels.map((c) => (
          <SectionCard key={c.name}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{c.icon}</span>
              <div className="text-sm font-medium text-foreground">{c.name}</div>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{c.value}</div>
            <div className="text-xs text-muted-foreground">{c.label}</div>
          </SectionCard>
        ))}
      </div>

      <div className="flex gap-3">
        <button className="flex-1 bg-primary text-primary-foreground font-medium py-3 px-4 rounded-lg hover:bg-primary/90 transition-all">
          + New Campaign
        </button>
        <button className="bg-card border border-border text-secondary-foreground font-medium py-3 px-4 rounded-lg hover:border-secondary-foreground/30 transition-all">
          View Approvals (12)
        </button>
        <button className="bg-card border border-border text-secondary-foreground font-medium py-3 px-4 rounded-lg hover:border-secondary-foreground/30 transition-all">
          Inbox (5 new)
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
