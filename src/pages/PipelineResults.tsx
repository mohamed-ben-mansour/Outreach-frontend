import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import SectionCard from "@/components/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Filter, Download, RefreshCw, Building2, Users, MapPin, TrendingUp } from "lucide-react";

interface RankedPersona {
  name: string;
  title: string;
  score: number;
}

interface RankedCompany {
  id: string;
  rank: number;
  name: string;
  domain: string;
  industry: string;
  size: number;
  location: string;
  score: number;
  status: "qualified" | "nurture" | "rejected";
  personas: RankedPersona[];
  signals: string[];
}

const mockCompanies: RankedCompany[] = [
  {
    id: "1",
    rank: 1,
    name: "Acme SaaS",
    domain: "acme-saas.com",
    industry: "SaaS",
    size: 120,
    location: "San Francisco, CA",
    score: 94.5,
    status: "qualified",
    personas: [
      { name: "Alice Johnson", title: "VP Sales", score: 92.0 },
      { name: "Bob Smith", title: "Sales Director", score: 88.5 },
    ],
    signals: ["Hiring SDRs", "Raised Series B"],
  },
  {
    id: "2",
    rank: 2,
    name: "BetaFin",
    domain: "betafin.io",
    industry: "FinTech",
    size: 85,
    location: "New York, NY",
    score: 87.2,
    status: "qualified",
    personas: [{ name: "Carol White", title: "Head of Growth", score: 85.0 }],
    signals: ["New CTO", "Posted 5 sales roles"],
  },
  {
    id: "3",
    rank: 3,
    name: "Gamma Commerce",
    domain: "gammacommerce.co",
    industry: "E-commerce",
    size: 250,
    location: "London, UK",
    score: 71.8,
    status: "nurture",
    personas: [{ name: "David Brown", title: "CMO", score: 74.0 }],
    signals: ["Website relaunch"],
  },
  {
    id: "4",
    rank: 4,
    name: "Delta Ops",
    domain: "deltaops.net",
    industry: "Operations",
    size: 45,
    location: "Berlin, DE",
    score: 42.3,
    status: "rejected",
    personas: [],
    signals: [],
  },
  {
    id: "5",
    rank: 5,
    name: "Epsilon Labs",
    domain: "epsilonlab.ai",
    industry: "AI / ML",
    size: 60,
    location: "Toronto, CA",
    score: 68.9,
    status: "nurture",
    personas: [{ name: "Emma Davis", title: "VP Sales", score: 70.5 }],
    signals: ["Seed funding"],
  },
];

const statusConfig = {
  qualified: { label: "Qualified", variant: "default" as const, className: "bg-success/10 text-success border-success/30" },
  nurture: { label: "Nurture", variant: "secondary" as const, className: "bg-warning/10 text-warning border-warning/30" },
  rejected: { label: "Rejected", variant: "outline" as const, className: "bg-muted/50 text-muted-foreground border-border" },
};

// TODO: Replace mockCompanies with a real API call when the qualifier pipeline backend endpoint is ready.
const PipelineResults = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | RankedCompany["status"]>("all");
  const [loading, setLoading] = useState(false);

  const filtered = mockCompanies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(search.toLowerCase()) ||
      company.domain.toLowerCase().includes(search.toLowerCase()) ||
      company.industry.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || company.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const averageScore =
    filtered.length > 0 ? filtered.reduce((sum, c) => sum + c.score, 0) / filtered.length : 0;

  const handleRefresh = () => {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 1200);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Pipeline Results" subtitle="Ranked companies from the qualifier pipeline" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SectionCard className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{mockCompanies.length}</div>
            <div className="text-xs text-muted-foreground">Companies ranked</div>
          </div>
        </SectionCard>
        <SectionCard className="flex items-center gap-4">
          <div className="p-3 bg-success/10 rounded-lg">
            <TrendingUp className="w-5 h-5 text-success" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{averageScore.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground">Average score</div>
          </div>
        </SectionCard>
        <SectionCard className="flex items-center gap-4">
          <div className="p-3 bg-warning/10 rounded-lg">
            <Users className="w-5 h-5 text-warning" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">
              {mockCompanies.reduce((sum, c) => sum + c.personas.length, 0)}
            </div>
            <div className="text-xs text-muted-foreground">Matched personas</div>
          </div>
        </SectionCard>
        <SectionCard className="flex items-center gap-4">
          <div className="p-3 bg-secondary/20 rounded-lg">
            <MapPin className="w-5 h-5 text-secondary-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">
              {new Set(mockCompanies.map((c) => c.location)).size}
            </div>
            <div className="text-xs text-muted-foreground">Markets covered</div>
          </div>
        </SectionCard>
      </div>

      <SectionCard className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Ranked Companies</h3>
            <p className="text-xs text-muted-foreground">
              Showing {filtered.length} of {mockCompanies.length} companies
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search companies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 bg-surface-2 border border-border rounded-lg text-foreground text-sm w-full sm:w-64 focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                className="px-3 py-2 bg-surface-2 border border-border rounded-lg text-foreground text-sm focus:ring-2 focus:ring-primary"
              >
                <option value="all">All statuses</option>
                <option value="qualified">Qualified</option>
                <option value="nurture">Nurture</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <button
              onClick={handleRefresh}
              disabled={loading}
              title="Simulate refresh"
              className="inline-flex items-center justify-center gap-2 bg-surface-2 border border-border text-secondary-foreground text-sm px-4 py-2 rounded-lg hover:border-secondary-foreground/30 disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Simulate Refresh
            </button>
            <button
              disabled
              title="Export coming soon"
              className="inline-flex items-center justify-center gap-2 bg-primary/60 text-primary-foreground text-sm px-4 py-2 rounded-lg cursor-not-allowed transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface-2 border-b border-border">
                <tr>
                  <th className="text-left font-medium text-secondary-foreground px-4 py-3 w-16">Rank</th>
                  <th className="text-left font-medium text-secondary-foreground px-4 py-3">Company</th>
                  <th className="text-left font-medium text-secondary-foreground px-4 py-3">Score</th>
                  <th className="text-left font-medium text-secondary-foreground px-4 py-3 hidden md:table-cell">Profile</th>
                  <th className="text-left font-medium text-secondary-foreground px-4 py-3 hidden lg:table-cell">Signals</th>
                  <th className="text-left font-medium text-secondary-foreground px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                      No companies match your filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((company) => (
                    <tr
                      key={company.id}
                      className="border-b border-border last:border-b-0 hover:bg-surface-2/50 transition-colors"
                    >
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                          {company.rank}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-medium text-foreground">{company.name}</div>
                        <div className="text-xs text-muted-foreground">{company.domain}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 min-w-[100px]">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="font-medium text-foreground">{company.score.toFixed(1)}</span>
                              <span className="text-muted-foreground">/ 100</span>
                            </div>
                            <Progress value={company.score} className="h-2" />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            {company.industry}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {company.size} employees
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {company.location}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {company.signals.length > 0 ? (
                            company.signals.map((signal) => (
                              <span
                                key={signal}
                                className="px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded text-xs"
                              >
                                {signal}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-muted-foreground">No signals</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge
                          className={statusConfig[company.status].className}
                          variant={statusConfig[company.status].variant}
                        >
                          {statusConfig[company.status].label}
                        </Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </SectionCard>

      <SectionCard className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Top Matched Personas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockCompanies
            .flatMap((c) => c.personas.map((p) => ({ ...p, company: c.name })))
            .sort((a, b) => b.score - a.score)
            .slice(0, 6)
            .map((persona, idx) => (
              <div
                key={`${persona.company}-${persona.name}-${idx}`}
                className="bg-surface-2 border border-border rounded-lg p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium text-foreground">{persona.name}</div>
                  <span className="text-xs font-medium text-primary">{persona.score.toFixed(1)}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {persona.title} at <span className="text-secondary-foreground">{persona.company}</span>
                </div>
                <Progress value={persona.score} className="h-1.5" />
              </div>
            ))}
        </div>
      </SectionCard>
    </div>
  );
};

export default PipelineResults;
