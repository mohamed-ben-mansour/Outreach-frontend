import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import SectionCard from "@/components/SectionCard";
import Tabs from "@/components/Tabs";
import FormInput from "@/components/FormInput";
import FormTextarea from "@/components/FormTextarea";
import AISuggestButton from "@/components/AISuggestButton";

const baseTemplates = [
  { value: "soft_sell", label: "Soft Sell", desc: "Build relationship first" },
  { value: "value_based", label: "Value Based", desc: "Lead with benefits" },
  { value: "spin_selling", label: "SPIN Selling", desc: "Question-based approach" },
  { value: "direct", label: "Direct/Bold", desc: "Straight to the point" },
  { value: "consultative", label: "Consultative", desc: "Expert advisor tone" },
  { value: "custom", label: "Custom", desc: "Write from scratch" },
];

const personalityTraits = [
  "Direct & Blunt", "Witty/Sarcastic", "Data-driven", "Storyteller", "Humble", "Confident/Bold",
];

const hookTypes = [
  { label: "Their recent LinkedIn post", defaultChecked: true },
  { label: "Their recent tweet", defaultChecked: true },
  { label: "Common background", defaultChecked: false },
  { label: "Shared thesis", defaultChecked: false },
  { label: "Mutual connection", defaultChecked: false },
  { label: "Their company's recent news", defaultChecked: false },
];

const stageInstructions = [
  { title: "Connect Message (First Touch)", placeholder: "Be casual, reference their recent post, don't pitch yet..." },
  { title: "Follow-up 1", placeholder: "Add value, share a relevant resource, soft intro to the problem..." },
  { title: "Follow-up 2", placeholder: "Introduce solution, mention proof point, include soft CTA..." },
  { title: "Re-engagement (Breakup Email)", placeholder: "Permission-based close, 'removing you from my list', create FOMO..." },
  { title: "Response Handling", placeholder: "Match their tone, answer objections from FAQs, push toward booking..." },
];

const DescriptionField = () => {
  const [description, setDescription] = useState(() => {
    try {
      return localStorage.getItem("user_offering") || "";
    } catch {
      return "";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("user_offering", description);
    } catch {
      // ignore storage errors
    }
  }, [description]);

  return (
    <div>
      <FormTextarea
        label="Description"
        placeholder="We help B2B companies automate their outbound sales with AI..."
        value={description}
        onChange={setDescription}
      />
      <AISuggestButton />
    </div>
  );
};

const CompanyTab = () => (
  <div className="space-y-6">
    <SectionCard className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Company Information</h3>
        <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
          <input type="checkbox" className="rounded border-border bg-surface-2 text-primary" />
          <span>AI Auto-fill</span>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormInput label="Company Name" placeholder="Acme Inc" />
        <FormInput label="Company Website" type="url" placeholder="https://acme.com" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormInput label="LinkedIn Profile" type="url" placeholder="https://linkedin.com/company/acme" />
        <FormInput label="Twitter/X Handle" placeholder="@acme" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormInput label="Industry" placeholder="SaaS, Marketing Automation" />
        <FormInput label="Location" placeholder="San Francisco, CA" />
      </div>

      <DescriptionField />
      <div>
        <FormTextarea label="Mission Statement" rows={2} placeholder="Scale outbound without scaling the team" />
        <AISuggestButton />
      </div>
      <div>
        <FormTextarea label="Founder/Team Bio" optional rows={3} placeholder="Ex-Salesforce engineers who built enterprise SDR tools for 10+ years..." />
        <AISuggestButton />
      </div>
      <div>
        <FormTextarea label="FAQs & Objection Handling" rows={4} mono placeholder={`Q: How is this different from other tools?\nA: We're AI-first, not automation-first.\n\nQ: What's your pricing?\nA: Starts at $99/mo for 1000 contacts.`} />
        <AISuggestButton label="AI Suggest Common FAQs" />
      </div>
      <div>
        <FormTextarea
          label="Personality Sample"
          mono
          rows={3}
          placeholder="Hey Sarah — loved your post about AI replacing SDRs. I actually built the thing you're describing."
          hint="AI will analyze tone, structure, and style to mimic your voice"
        />
      </div>
    </SectionCard>

    <button className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-xl hover:bg-primary/90 transition-all">
      Save Company Details
    </button>
  </div>
);

const OffersTab = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Your Offers</h3>
        <p className="text-sm text-muted-foreground">Define products/services to sell</p>
      </div>
      <button className="bg-primary text-primary-foreground text-sm px-4 py-2 rounded-lg hover:bg-primary/90 transition-all">
        + Add Offer
      </button>
    </div>

    <SectionCard className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-md font-semibold text-foreground">Offer #1</h4>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full border border-success/30">Default</span>
          <button className="text-muted-foreground hover:text-destructive text-sm">Delete</button>
        </div>
      </div>

      <FormInput label="Offer Name" placeholder="AI Email Warmup" />
      <div>
        <FormTextarea label="Description" rows={2} placeholder="Automatically warm up your email domain to ensure inbox delivery..." />
        <AISuggestButton />
      </div>
      <div>
        <FormTextarea label="Pain Points" rows={2} placeholder="Emails going to spam, low deliverability rates..." />
        <AISuggestButton label="AI Suggest Pain Points" />
      </div>
      <div>
        <FormTextarea label="Value Proposition" rows={2} placeholder="Get 95%+ inbox rate in 14 days with zero manual work" />
        <AISuggestButton />
      </div>
      <div>
        <FormTextarea label="Proof Points / Case Studies" rows={3} placeholder="Acme Corp increased reply rate from 4% to 23% in 2 weeks." />
        <AISuggestButton label="AI Suggest from Website" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormInput label="Call to Action" placeholder="Book a 15-min demo" />
        <FormInput label="Booking Link" type="url" placeholder="https://calendly.com/you" />
      </div>
    </SectionCard>

    <button className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-xl hover:bg-primary/90 transition-all">
      Save Offers
    </button>
  </div>
);

const InstructionsTab = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("value_based");
  const [touchdowns, setTouchdowns] = useState(2);
  const [urgency, setUrgency] = useState(2);
  const [selfDep, setSelfDep] = useState(1);
  const [humor, setHumor] = useState(5);

  const urgencyLabels = ["Low", "Medium", "High"];
  const selfDepLabels = ["Low", "Medium", "High"];

  return (
    <div className="space-y-6">
      <SectionCard className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Base Template</h3>
          <p className="text-sm text-muted-foreground mb-4">Choose a foundation for your AI's messaging style</p>
          <div className="grid grid-cols-3 gap-3">
            {baseTemplates.map((t) => (
              <label key={t.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="base_template"
                  value={t.value}
                  className="sr-only peer"
                  checked={selectedTemplate === t.value}
                  onChange={() => setSelectedTemplate(t.value)}
                />
                <div className="border-2 border-border rounded-lg p-4 peer-checked:border-primary peer-checked:bg-primary/10 hover:border-secondary-foreground/30 transition-all">
                  <div className="font-medium text-foreground text-sm mb-1">{t.label}</div>
                  <div className="text-xs text-muted-foreground">{t.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <hr className="border-border" />

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Personality Traits</h3>
          <div className="grid grid-cols-3 gap-2">
            {personalityTraits.map((trait) => (
              <label key={trait} className="flex items-center gap-2 px-3 py-2 bg-surface-2 border border-border rounded-lg cursor-pointer hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-primary/10">
                <input type="checkbox" className="rounded border-border bg-surface-2 text-primary" />
                <span className="text-sm text-secondary-foreground">{trait}</span>
              </label>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button className="flex items-center gap-2 text-xs text-secondary-foreground bg-surface-2 border border-border px-3 py-2 rounded-lg hover:border-primary hover:text-primary transition-all">
              <span>📥</span> Import Old Conversations
            </button>
          </div>
        </div>

        <hr className="border-border" />

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Message Rules</h3>
          <div className="space-y-3">
            <div>
              <FormTextarea label="Always Include These Phrases" rows={2} placeholder="brutally honest traction, failed before, here's a demo" hint="Comma-separated. AI will weave these in naturally." />
            </div>
            <div>
              <FormTextarea label="Never Use These Words/Phrases" rows={2} placeholder="huge fan, game-changer, revolutionary, disruptive, synergy" />
              <AISuggestButton label="AI Suggest Common Clichés to Avoid" />
            </div>
          </div>
        </div>

        <hr className="border-border" />

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Personalization Touchdowns</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-secondary-foreground mb-2">Number of Hooks per Message</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={1}
                max={5}
                value={touchdowns}
                onChange={(e) => setTouchdowns(Number(e.target.value))}
                className="flex-1 accent-primary"
              />
              <span className="text-foreground font-mono text-sm bg-surface-2 px-3 py-1 rounded-lg border border-border min-w-[2rem] text-center">
                {touchdowns}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Sweet spot: 2-3. Too many = try-hard, too few = generic.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-foreground mb-2">Hook Types (AI picks from these)</label>
            <div className="grid grid-cols-2 gap-2">
              {hookTypes.map((h) => (
                <label key={h.label} className="flex items-center gap-2 px-3 py-2 bg-surface-2 border border-border rounded-lg cursor-pointer hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-primary/10">
                  <input type="checkbox" defaultChecked={h.defaultChecked} className="rounded border-border bg-surface-2 text-primary" />
                  <span className="text-sm text-secondary-foreground">{h.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-border" />

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Tone Dials</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-secondary-foreground">Urgency Level</label>
                <span className="text-xs text-muted-foreground">{urgencyLabels[urgency - 1]}</span>
              </div>
              <input type="range" min={1} max={3} value={urgency} onChange={(e) => setUrgency(Number(e.target.value))} className="w-full accent-primary" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-secondary-foreground">Self-Deprecation</label>
                <span className="text-xs text-muted-foreground">{selfDepLabels[selfDep - 1]}</span>
              </div>
              <input type="range" min={1} max={3} value={selfDep} onChange={(e) => setSelfDep(Number(e.target.value))} className="w-full accent-primary" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-secondary-foreground">Humor/Sarcasm</label>
                <span className="text-xs text-muted-foreground">{humor}</span>
              </div>
              <input type="range" min={0} max={10} value={humor} onChange={(e) => setHumor(Number(e.target.value))} className="w-full accent-primary" />
            </div>
          </div>
        </div>

        <hr className="border-border" />

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Stage-Specific Instructions</h3>
          <p className="text-sm text-muted-foreground mb-4">Customize AI behavior per message stage</p>
          <div className="space-y-3">
            {stageInstructions.map((stage) => (
              <details key={stage.title} className="bg-surface-2 border border-border rounded-lg">
                <summary className="px-4 py-3 cursor-pointer text-sm font-medium text-foreground hover:bg-surface-3">
                  {stage.title}
                </summary>
                <div className="px-4 pb-4">
                  <textarea rows={3} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm focus:ring-2 focus:ring-primary placeholder-muted-foreground" placeholder={stage.placeholder} />
                  <AISuggestButton label="AI Suggest Instructions" />
                </div>
              </details>
            ))}
          </div>
        </div>
      </SectionCard>

      <button className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-xl hover:bg-primary/90 transition-all">
        Save AI Instructions
      </button>
    </div>
  );
};

const Studio = () => {
  const studioTabs = [
    { id: "company", label: "Company Details" },
    { id: "offers", label: "Offers" },
    { id: "instructions", label: "AI Instructions" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Studio" subtitle="Train your AI outbound agent" />
      <Tabs tabs={studioTabs}>
        {(tab) => (
          <>
            {tab === "company" && <CompanyTab />}
            {tab === "offers" && <OffersTab />}
            {tab === "instructions" && <InstructionsTab />}
          </>
        )}
      </Tabs>
    </div>
  );
};

export default Studio;
