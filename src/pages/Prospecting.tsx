import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import SectionCard from "@/components/SectionCard";
import FormInput from "@/components/FormInput";
import FormTextarea from "@/components/FormTextarea";
import { Trash2, Plus } from "lucide-react";

const recentSignalsOptions = [
  "Just raised funding",
  "Recently hired for X role",
  "Posted job listings",
  "Mentioned keywords on social",
];

const seniorityOptions = ["C-level", "VP", "Director", "Manager", "Individual Contributor"];
const departmentOptions = ["Sales", "Marketing", "Engineering", "Operations", "Finance"];
const fundingOptions = ["Bootstrapped", "Pre-seed", "Seed", "Series A", "Series B+"];

interface TargetCity {
  city: string;
  country: string;
  continent: string;
}

interface ProspectingForm {
  industry: string;
  companySizeMin: string;
  companySizeMax: string;
  countries: string[];
  continents: string[];
  fundingStages: string[];
  techStack: string;
  recentSignals: string[];
  jobTitles: string;
  seniority: string[];
  departments: string[];
  revenueMin: string;
  revenueMax: string;
  targetCities: TargetCity[];
  excludeIndustries: string;
  excludeKeywords: string;
  excludeSizeMin: string;
  excludeSizeMax: string;
}

const defaultForm: ProspectingForm = {
  industry: "",
  companySizeMin: "",
  companySizeMax: "",
  countries: [],
  continents: [],
  fundingStages: [],
  techStack: "",
  recentSignals: [],
  jobTitles: "",
  seniority: [],
  departments: [],
  revenueMin: "",
  revenueMax: "",
  targetCities: [],
  excludeIndustries: "",
  excludeKeywords: "",
  excludeSizeMin: "",
  excludeSizeMax: "",
};

const toggleValue = (value: string, list: string[]) =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

const formatNumber = (n: string) => {
  const num = Number(n);
  if (!n || Number.isNaN(num)) return n;
  return num.toString();
};

const buildIcpDescription = (form: ProspectingForm, userOffering: string) => {
  const lines: string[] = [];

  if (userOffering.trim()) {
    lines.push(`We sell: ${userOffering.trim()}`);
  }

  if (form.industry.trim()) {
    lines.push(`Industries: ${form.industry}`);
  }

  if (form.companySizeMin || form.companySizeMax) {
    const min = form.companySizeMin || "0";
    const max = form.companySizeMax || "unlimited";
    lines.push(`Company size: ${min} - ${max} employees`);
  }

  if (form.countries.length > 0) {
    lines.push(`Target countries: ${form.countries.join(", ")}`);
  }

  if (form.continents.length > 0) {
    lines.push(`Target continents: ${form.continents.join(", ")}`);
  }

  if (form.jobTitles.trim()) {
    lines.push(`Target roles: ${form.jobTitles}`);
  }

  if (form.techStack.trim()) {
    lines.push(`Technologies used: ${form.techStack}`);
  }

  if (form.fundingStages.length > 0) {
    lines.push(`Funding stage: ${form.fundingStages.join(", ")}`);
  }

  if (form.revenueMin || form.revenueMax) {
    const min = form.revenueMin ? formatNumber(form.revenueMin) : "0";
    const max = form.revenueMax ? formatNumber(form.revenueMax) : "unlimited";
    lines.push(`Annual revenue / ARR: ${min} - ${max}`);
  }

  if (form.targetCities.length > 0) {
    const cityText = form.targetCities
      .map((c) => {
        const base = `${c.city} (${c.country})`;
        return c.continent ? `${base}, ${c.continent}` : base;
      })
      .join("; ");
    lines.push(`Target cities: ${cityText}`);
  }

  const excludeParts: string[] = [];
  if (form.excludeIndustries.trim()) {
    excludeParts.push(`industries: ${form.excludeIndustries}`);
  }
  if (form.excludeKeywords.trim()) {
    excludeParts.push(`keywords: ${form.excludeKeywords}`);
  }
  if (form.excludeSizeMin || form.excludeSizeMax) {
    const min = form.excludeSizeMin || "0";
    const max = form.excludeSizeMax || "unlimited";
    excludeParts.push(`company size: ${min} - ${max} employees`);
  }
  if (excludeParts.length > 0) {
    lines.push(`Exclude ${excludeParts.join("; ")}`);
  }

  return lines.join("\n");
};

const ICPSection = () => {
  const [form, setForm] = useState<ProspectingForm>(defaultForm);
  const [icpDescription, setIcpDescription] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [newCity, setNewCity] = useState<TargetCity>({ city: "", country: "", continent: "" });
  const [newCountry, setNewCountry] = useState("");
  const [newContinent, setNewContinent] = useState("");

  const userOffering = (() => {
    try {
      return localStorage.getItem("user_offering") || "";
    } catch {
      return "";
    }
  })();

  const updateField = <K extends keyof ProspectingForm>(field: K, value: ProspectingForm[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    const text = buildIcpDescription(form, userOffering);
    setIcpDescription(text);
    setShowPreview(true);
  };

  const handleApprove = () => {
    // TODO: send icpDescription to the qualifier agent
    alert("ICP description approved and ready to send to the qualifier agent.");
  };

  const addCity = () => {
    if (!newCity.city.trim() || !newCity.country.trim()) return;
    setForm((prev) => ({ ...prev, targetCities: [...prev.targetCities, newCity] }));
    setNewCity({ city: "", country: "", continent: "" });
  };

  const removeCity = (index: number) => {
    setForm((prev) => ({ ...prev, targetCities: prev.targetCities.filter((_, i) => i !== index) }));
  };

  const addCountry = () => {
    const value = newCountry.trim();
    if (!value) return;
    setForm((prev) => ({ ...prev, countries: [...prev.countries, value] }));
    setNewCountry("");
  };

  const removeCountry = (index: number) => {
    setForm((prev) => ({ ...prev, countries: prev.countries.filter((_, i) => i !== index) }));
  };

  const addContinent = () => {
    const value = newContinent.trim();
    if (!value) return;
    setForm((prev) => ({ ...prev, continents: [...prev.continents, value] }));
    setNewContinent("");
  };

  const removeContinent = (index: number) => {
    setForm((prev) => ({ ...prev, continents: prev.continents.filter((_, i) => i !== index) }));
  };

  return (
    <div className="space-y-6">
      <SectionCard className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Company Criteria</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Industry"
            placeholder="SaaS, FinTech, E-commerce"
            value={form.industry}
            onChange={(value) => updateField("industry", value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Company Size Min"
              type="number"
              placeholder="e.g. 11"
              value={form.companySizeMin}
              onChange={(value) => updateField("companySizeMin", value)}
            />
            <FormInput
              label="Company Size Max"
              type="number"
              placeholder="e.g. 200"
              value={form.companySizeMax}
              onChange={(value) => updateField("companySizeMax", value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-foreground mb-1.5">Funding Stage</label>
          <select
            multiple
            value={form.fundingStages}
            onChange={(e) => {
              const options = Array.from(e.target.selectedOptions).map((o) => o.value);
              updateField("fundingStages", options);
            }}
            className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-foreground text-sm focus:ring-2 focus:ring-primary h-24"
          >
            {fundingOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <FormInput
          label="Technologies Used"
          placeholder="Salesforce, HubSpot, Stripe"
          value={form.techStack}
          onChange={(value) => updateField("techStack", value)}
        />
        <div>
          <label className="block text-sm font-medium text-secondary-foreground mb-2">Recent Signals</label>
          <div className="grid grid-cols-2 gap-2">
            {recentSignalsOptions.map((s) => (
              <label
                key={s}
                className="flex items-center gap-2 px-3 py-2 bg-surface-2 border border-border rounded-lg cursor-pointer hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-primary/10"
              >
                <input
                  type="checkbox"
                  className="rounded border-border bg-surface-2 text-primary"
                  checked={form.recentSignals.includes(s)}
                  onChange={() => updateField("recentSignals", toggleValue(s, form.recentSignals))}
                />
                <span className="text-sm text-secondary-foreground">{s}</span>
              </label>
            ))}
          </div>
        </div>
      </SectionCard>

      <SectionCard className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Location / Geography</h3>
        <div>
          <label className="block text-sm font-medium text-secondary-foreground mb-1.5">
            Countries <span className="text-destructive">*</span>
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="e.g. United States"
              className="flex-1 px-3 py-2 bg-surface-2 border border-border rounded-lg text-foreground text-sm focus:ring-2 focus:ring-primary placeholder-muted-foreground"
              value={newCountry}
              onChange={(e) => setNewCountry(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCountry();
                }
              }}
            />
            <button
              type="button"
              onClick={addCountry}
              className="inline-flex items-center justify-center gap-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 text-sm"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
          {form.countries.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {form.countries.map((c, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary border border-primary/30 rounded-lg text-sm"
                >
                  {c}
                  <button
                    type="button"
                    onClick={() => removeCountry(idx)}
                    className="hover:text-destructive"
                    aria-label="Remove country"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-foreground mb-1.5">Continents (optional)</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="e.g. Europe"
              className="flex-1 px-3 py-2 bg-surface-2 border border-border rounded-lg text-foreground text-sm focus:ring-2 focus:ring-primary placeholder-muted-foreground"
              value={newContinent}
              onChange={(e) => setNewContinent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addContinent();
                }
              }}
            />
            <button
              type="button"
              onClick={addContinent}
              className="inline-flex items-center justify-center gap-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 text-sm"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
          {form.continents.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {form.continents.map((c, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary border border-primary/30 rounded-lg text-sm"
                >
                  {c}
                  <button
                    type="button"
                    onClick={() => removeContinent(idx)}
                    className="hover:text-destructive"
                    aria-label="Remove continent"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-foreground mb-2">Target Cities (optional)</label>
          <div className="flex flex-col md:flex-row gap-2 mb-3">
            <input
              type="text"
              placeholder="City"
              className="flex-1 px-3 py-2 bg-surface-2 border border-border rounded-lg text-foreground text-sm focus:ring-2 focus:ring-primary placeholder-muted-foreground"
              value={newCity.city}
              onChange={(e) => setNewCity((prev) => ({ ...prev, city: e.target.value }))}
            />
            <input
              type="text"
              placeholder="Country"
              className="flex-1 px-3 py-2 bg-surface-2 border border-border rounded-lg text-foreground text-sm focus:ring-2 focus:ring-primary placeholder-muted-foreground"
              value={newCity.country}
              onChange={(e) => setNewCity((prev) => ({ ...prev, country: e.target.value }))}
            />
            <input
              type="text"
              placeholder="Continent (optional)"
              className="flex-1 px-3 py-2 bg-surface-2 border border-border rounded-lg text-foreground text-sm focus:ring-2 focus:ring-primary placeholder-muted-foreground"
              value={newCity.continent}
              onChange={(e) => setNewCity((prev) => ({ ...prev, continent: e.target.value }))}
            />
            <button
              type="button"
              onClick={addCity}
              className="inline-flex items-center justify-center gap-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 text-sm"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
          {form.targetCities.length > 0 && (
            <div className="space-y-2">
              {form.targetCities.map((c, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-3 py-2 bg-surface-2 border border-border rounded-lg"
                >
                  <span className="text-sm text-secondary-foreground">
                    {c.city}, {c.country}
                    {c.continent ? ` (${c.continent})` : ""}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeCity(idx)}
                    className="text-destructive hover:text-destructive/80"
                    aria-label="Remove city"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Nice-to-Have Signals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Revenue / ARR Min ($)"
            type="number"
            placeholder="e.g. 1000000"
            value={form.revenueMin}
            onChange={(value) => updateField("revenueMin", value)}
          />
          <FormInput
            label="Revenue / ARR Max ($)"
            type="number"
            placeholder="e.g. 50000000"
            value={form.revenueMax}
            onChange={(value) => updateField("revenueMax", value)}
          />
        </div>
      </SectionCard>

      <SectionCard className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Person Criteria</h3>
        <FormInput
          label="Job Titles"
          placeholder="Head of Sales, VP Marketing, Director of Growth"
          value={form.jobTitles}
          onChange={(value) => updateField("jobTitles", value)}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-foreground mb-2">Seniority Level</label>
            <div className="space-y-2">
              {seniorityOptions.map((s) => (
                <label key={s} className="flex items-center gap-2 text-sm text-secondary-foreground">
                  <input
                    type="checkbox"
                    className="rounded border-border bg-surface-2 text-primary"
                    checked={form.seniority.includes(s)}
                    onChange={() => updateField("seniority", toggleValue(s, form.seniority))}
                  />
                  {s}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-foreground mb-2">Department</label>
            <div className="space-y-2">
              {departmentOptions.map((d) => (
                <label key={d} className="flex items-center gap-2 text-sm text-secondary-foreground">
                  <input
                    type="checkbox"
                    className="rounded border-border bg-surface-2 text-primary"
                    checked={form.departments.includes(d)}
                    onChange={() => updateField("departments", toggleValue(d, form.departments))}
                  />
                  {d}
                </label>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Exclusion Criteria</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Exclude Industries"
            placeholder="Gambling, Government, Tobacco"
            value={form.excludeIndustries}
            onChange={(value) => updateField("excludeIndustries", value)}
          />
          <FormInput
            label="Exclude Keywords"
            placeholder="agency, non-profit, competitor:Acme"
            value={form.excludeKeywords}
            onChange={(value) => updateField("excludeKeywords", value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Exclude Company Size Min"
            type="number"
            placeholder="e.g. 0"
            value={form.excludeSizeMin}
            onChange={(value) => updateField("excludeSizeMin", value)}
          />
          <FormInput
            label="Exclude Company Size Max"
            type="number"
            placeholder="e.g. 9"
            value={form.excludeSizeMax}
            onChange={(value) => updateField("excludeSizeMax", value)}
          />
        </div>

      </SectionCard>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleGenerate}
          className="bg-secondary text-secondary-foreground font-semibold py-3 px-6 rounded-xl hover:bg-secondary/80 transition-all"
        >
          Preview ICP Description
        </button>
      </div>

      {showPreview && (
        <SectionCard className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Review & Approve ICP Description</h3>
          <p className="text-sm text-muted-foreground">
            Review the generated description below. You can edit it before approving.
          </p>
          <FormTextarea
            label="ICP Description"
            rows={10}
            value={icpDescription}
            onChange={setIcpDescription}
          />
          <button
            type="button"
            onClick={handleApprove}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-xl hover:bg-primary/90 transition-all"
          >
            Approve & Send to Qualifier
          </button>
        </SectionCard>
      )}
    </div>
  );
};

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
            <input
              type="radio"
              name="prospect_mode"
              value="ai"
              checked={mode === "ai"}
              onChange={() => setMode("ai")}
              className="text-primary"
            />
            <div>
              <div className="text-sm font-medium text-foreground">🤖 AI Finds Contacts</div>
              <div className="text-xs text-muted-foreground">Define your ICP, AI finds matching prospects</div>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-4 border-2 border-border rounded-lg has-[:checked]:border-primary has-[:checked]:bg-primary/10">
            <input
              type="radio"
              name="prospect_mode"
              value="manual"
              checked={mode === "manual"}
              onChange={() => setMode("manual")}
              className="text-primary"
            />
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
