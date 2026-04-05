import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import SectionCard from "@/components/SectionCard";
import FormInput from "@/components/FormInput";
import FormTextarea from "@/components/FormTextarea";

const signals = [
  "Just raised funding",
  "Recently hired for X role",
  "Posted job listings",
  "Mentioned keywords on social",
];

const ICPSection = () => (
  <div className="space-y-6">
    <SectionCard className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Company Criteria</h3>
      <div className="grid grid-cols-2 gap-4">
        <FormInput label="Industry" placeholder="SaaS, FinTech, E-commerce" />
        <div>
          <label className="block text-sm font-medium text-secondary-foreground mb-1.5">Company Size</label>
          <select multiple className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-foreground text-sm focus:ring-2 focus:ring-primary h-24">
            <option>1-10 employees</option>
            <option>11-50 employees</option>
            <option>51-200 employees</option>
            <option>201-500 employees</option>
            <option>500+ employees</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormInput label="Location/Geography" placeholder="United States, Europe, Remote" />
        <div>
          <label className="block text-sm font-medium text-secondary-foreground mb-1.5">Funding Stage</label>
          <select multiple className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-foreground text-sm focus:ring-2 focus:ring-primary h-24">
            <option>Bootstrapped</option>
            <option>Pre-seed</option>
            <option>Seed</option>
            <option>Series A</option>
            <option>Series B+</option>
          </select>
        </div>
      </div>
      <FormInput label="Technologies Used" placeholder="Salesforce, HubSpot, Stripe" />
      <div>
        <label className="block text-sm font-medium text-secondary-foreground mb-2">Recent Signals</label>
        <div className="grid grid-cols-2 gap-2">
          {signals.map((s) => (
            <label key={s} className="flex items-center gap-2 px-3 py-2 bg-surface-2 border border-border rounded-lg cursor-pointer hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-primary/10">
              <input type="checkbox" className="rounded border-border bg-surface-2 text-primary" />
              <span className="text-sm text-secondary-foreground">{s}</span>
            </label>
          ))}
        </div>
      </div>
      <FormTextarea label="Exclude Industries/Companies" rows={2} placeholder="Agencies, Consulting, Competitor1, Competitor2" />
    </SectionCard>

    <SectionCard className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Person Criteria</h3>
      <FormInput label="Job Titles" placeholder="Head of Sales, VP Marketing, Director of Growth" />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-secondary-foreground mb-2">Seniority Level</label>
          <div className="space-y-2">
            {["C-level", "VP", "Director", "Manager", "Individual Contributor"].map((s) => (
              <label key={s} className="flex items-center gap-2 text-sm text-secondary-foreground">
                <input type="checkbox" className="rounded border-border bg-surface-2 text-primary" />
                {s}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-foreground mb-2">Department</label>
          <div className="space-y-2">
            {["Sales", "Marketing", "Engineering", "Operations", "Finance"].map((d) => (
              <label key={d} className="flex items-center gap-2 text-sm text-secondary-foreground">
                <input type="checkbox" className="rounded border-border bg-surface-2 text-primary" />
                {d}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-secondary-foreground mb-2">Research Depth</label>
        <div className="space-y-2">
          {[
            { value: "basic", label: "Basic", desc: "LinkedIn profile + company website" },
            { value: "medium", label: "Medium", desc: "+ recent posts, job changes, company news" },
            { value: "deep", label: "Deep", desc: "+ Twitter, personal blog, GitHub, news mentions" },
          ].map((r) => (
            <label key={r.value} className="flex items-center gap-3 p-3 bg-surface-2 border border-border rounded-lg cursor-pointer hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-primary/10">
              <input type="radio" name="research_depth" value={r.value} className="text-primary" />
              <div>
                <div className="text-sm font-medium text-foreground">{r.label}</div>
                <div className="text-xs text-muted-foreground">{r.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </SectionCard>

    <button className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-xl hover:bg-primary/90 transition-all">
      Find Matching Prospects (AI will preview ~500)
    </button>
  </div>
);

const ManualSection = () => (
  <div className="space-y-6">
    <SectionCard className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">Contact Sources</h3>
      <div className="space-y-3">
        <FormInput label="LinkedIn Search URL" type="url" placeholder="https://linkedin.com/sales/search/..." />
        <p className="text-xs text-muted-foreground">Paste Sales Navigator search results</p>

        <div className="text-center text-muted-foreground text-sm">OR</div>

        <FormInput label="LinkedIn Post URL" type="url" placeholder="https://linkedin.com/posts/..." />
        <p className="text-xs text-muted-foreground">Target people who engaged with a post</p>

        <div className="text-center text-muted-foreground text-sm">OR</div>

        <FormInput label="Twitter/X List URL" type="url" placeholder="https://twitter.com/i/lists/..." />

        <div className="text-center text-muted-foreground text-sm">OR</div>

        <div>
          <label className="block text-sm font-medium text-secondary-foreground mb-1.5">Upload CSV/Excel</label>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-secondary-foreground/30 cursor-pointer">
            <div className="text-muted-foreground mb-2">📄</div>
            <div className="text-sm text-secondary-foreground">Click to upload or drag & drop</div>
            <div className="text-xs text-muted-foreground mt-1">CSV or Excel file</div>
          </div>
        </div>

        <div className="text-center text-muted-foreground text-sm">OR</div>

        <FormInput label="Google Sheet URL" type="url" placeholder="https://docs.google.com/spreadsheets/..." />
      </div>
    </SectionCard>

    <button className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-xl hover:bg-primary/90 transition-all">
      Import Contacts
    </button>
  </div>
);

const Prospecting = () => {
  const [mode, setMode] = useState<"ai" | "manual">("ai");

  return (
    <div className="space-y-6">
      <PageHeader title="Prospecting" subtitle="Define who to target and where to find them" />

      <SectionCard>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer p-4 border-2 border-border rounded-lg has-[:checked]:border-primary has-[:checked]:bg-primary/10">
            <input type="radio" name="prospect_mode" value="ai" checked={mode === "ai"} onChange={() => setMode("ai")} className="text-primary" />
            <div>
              <div className="text-sm font-medium text-foreground">🤖 AI Finds Contacts</div>
              <div className="text-xs text-muted-foreground">Define your ICP, AI finds matching prospects</div>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-4 border-2 border-border rounded-lg has-[:checked]:border-primary has-[:checked]:bg-primary/10">
            <input type="radio" name="prospect_mode" value="manual" checked={mode === "manual"} onChange={() => setMode("manual")} className="text-primary" />
            <div>
              <div className="text-sm font-medium text-foreground">📂 I'll Provide Contacts</div>
              <div className="text-xs text-muted-foreground">Upload CSV or paste LinkedIn URLs</div>
            </div>
          </label>
        </div>
      </SectionCard>

      {mode === "ai" ? <ICPSection /> : <ManualSection />}
    </div>
  );
};

export default Prospecting;
