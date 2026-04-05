import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import SectionCard from "@/components/SectionCard";
import StatusBadge from "@/components/StatusBadge";
import FormInput from "@/components/FormInput";
import AISuggestButton from "@/components/AISuggestButton";
import ToggleSwitch from "@/components/ToggleSwitch";

const campaignsData = [
  {
    name: "Q1 SaaS Outreach",
    status: "Active" as const,
    autopilot: true,
    statusColor: "green" as const,
    prospects: 847,
    contacted: 623,
    replyRate: "18.4%",
    meetings: 23,
    channels: ["💼", "📧", "💬"],
    pulsing: true,
  },
  {
    name: "FinTech Series A",
    status: "Paused" as const,
    autopilot: false,
    statusColor: "yellow" as const,
    prospects: 312,
    contacted: 156,
    replyRate: "12.1%",
    meetings: 8,
    channels: ["💼"],
    pulsing: false,
  },
];

const channels = [
  { icon: "💼", name: "LinkedIn DM", desc: "Connection requests + messages" },
  { icon: "📨", name: "LinkedIn InMail", desc: "Premium InMail messages" },
  { icon: "📧", name: "Email", desc: "Cold email outreach" },
  { icon: "💬", name: "WhatsApp", desc: "Direct WhatsApp messages" },
];

const days = ["M", "T", "W", "T", "F", "S", "S"];

const CampaignsList = ({ onCreateNew }: { onCreateNew: () => void }) => (
  <div className="space-y-4">
    {campaignsData.map((c) => (
      <SectionCard key={c.name}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${c.pulsing ? "bg-success animate-pulse" : "bg-warning"}`} />
            <h3 className="text-lg font-semibold text-foreground">{c.name}</h3>
            <StatusBadge label={c.status} color={c.statusColor} />
            {c.autopilot && <StatusBadge label="Autopilot" color="blue" />}
          </div>
          <div className="flex items-center gap-2">
            <button className="text-muted-foreground hover:text-foreground text-sm px-3 py-1 border border-border rounded-lg">
              {c.status === "Active" ? "Pause" : "Resume"}
            </button>
            <button className="text-muted-foreground hover:text-foreground text-sm px-3 py-1 border border-border rounded-lg">
              Edit
            </button>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-foreground">{c.prospects}</div>
            <div className="text-xs text-muted-foreground">Prospects</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{c.contacted}</div>
            <div className="text-xs text-muted-foreground">Contacted</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{c.replyRate}</div>
            <div className="text-xs text-muted-foreground">Reply Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{c.meetings}</div>
            <div className="text-xs text-muted-foreground">Meetings</div>
          </div>
          <div>
            <div className="flex gap-1 justify-center">
              {c.channels.map((ch, i) => (
                <span key={i} className="text-lg">{ch}</span>
              ))}
            </div>
            <div className="text-xs text-muted-foreground">Channels</div>
          </div>
        </div>
      </SectionCard>
    ))}
  </div>
);

const CreateCampaignForm = ({ onBack }: { onBack: () => void }) => {
  const [linkedinMsgs, setLinkedinMsgs] = useState(25);
  const [emailMsgs, setEmailMsgs] = useState(50);
  const [whatsappMsgs, setWhatsappMsgs] = useState(10);
  const [autopilot, setAutopilot] = useState(true);
  const [pitching, setPitching] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground">← Back</button>
        <h3 className="text-2xl font-bold text-foreground">Create New Campaign</h3>
      </div>

      {/* Step 1 */}
      <SectionCard className="space-y-4">
        <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground">1</span>
          Campaign Basics
        </h4>
        <FormInput label="Campaign Name" placeholder="Q1 SaaS Outreach" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-foreground mb-1.5">Select Offer</label>
            <select className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-foreground text-sm focus:ring-2 focus:ring-primary">
              <option>AI Email Warmup</option>
              <option>Full SDR Suite</option>
              <option>+ Create New Offer</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-foreground mb-1.5">Select AI Instructions</label>
            <select className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-foreground text-sm focus:ring-2 focus:ring-primary">
              <option>Value Based (Default)</option>
              <option>Soft Sell</option>
              <option>SPIN Selling</option>
              <option>Direct/Bold</option>
              <option>+ Create New</option>
            </select>
          </div>
        </div>
      </SectionCard>

      {/* Step 2 */}
      <SectionCard className="space-y-4">
        <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground">2</span>
          Channels
        </h4>
        <p className="text-sm text-muted-foreground">Select one or more outreach channels</p>
        <div className="grid grid-cols-2 gap-3">
          {channels.map((ch) => (
            <label key={ch.name} className="cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked={ch.icon === "💼" || ch.icon === "📧"} />
              <div className="border-2 border-border rounded-lg p-4 peer-checked:border-primary peer-checked:bg-primary/10 hover:border-secondary-foreground/30 transition-all">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{ch.icon}</span>
                  <div>
                    <div className="font-medium text-foreground text-sm">{ch.name}</div>
                    <div className="text-xs text-muted-foreground">{ch.desc}</div>
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <label className="block text-sm font-medium text-secondary-foreground mb-2">Cross-Channel Strategy</label>
          <div className="space-y-2">
            {[
              { value: "single", label: "Single Channel", desc: "Use one channel per prospect" },
              { value: "sequence", label: "Multi-Channel Sequence", desc: "e.g. LinkedIn → Email → WhatsApp" },
              { value: "ai_decides", label: "🤖 AI Decides", desc: "AI picks best channel per prospect" },
            ].map((s) => (
              <label key={s.value} className="flex items-center gap-3 cursor-pointer p-3 border border-border rounded-lg has-[:checked]:border-primary has-[:checked]:bg-primary/10">
                <input type="radio" name="channel_strategy" value={s.value} className="text-primary" defaultChecked={s.value === "sequence"} />
                <div>
                  <div className="text-sm font-medium text-foreground">{s.label}</div>
                  <div className="text-xs text-muted-foreground">{s.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* Step 3 */}
      <SectionCard className="space-y-4">
        <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground">3</span>
          Channel Settings
        </h4>

        <details open className="bg-surface-2 border border-border rounded-lg">
          <summary className="px-4 py-3 cursor-pointer text-sm font-medium text-foreground hover:bg-surface-3 flex items-center gap-2">
            <span>💼</span> LinkedIn Settings
          </summary>
          <div className="px-4 pb-4 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Messages per Day</label>
                <div className="flex items-center gap-2">
                  <input type="range" min={1} max={50} value={linkedinMsgs} onChange={(e) => setLinkedinMsgs(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="text-foreground font-mono text-sm bg-background px-2 py-1 rounded border border-border min-w-[2.5rem] text-center">{linkedinMsgs}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Time of Day</label>
                <div className="flex items-center gap-2">
                  <input type="time" defaultValue="09:00" className="flex-1 px-2 py-1 bg-background border border-border rounded text-foreground text-sm" />
                  <span className="text-muted-foreground">to</span>
                  <input type="time" defaultValue="17:00" className="flex-1 px-2 py-1 bg-background border border-border rounded text-foreground text-sm" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-2">Days of Week</label>
              <div className="flex gap-2">
                {days.map((d, i) => (
                  <label key={i} className="flex items-center justify-center w-10 h-10 bg-background border border-border rounded cursor-pointer has-[:checked]:bg-primary has-[:checked]:border-primary">
                    <input type="checkbox" className="sr-only" defaultChecked={i < 5} />
                    <span className="text-xs text-foreground">{d}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </details>

        <details className="bg-surface-2 border border-border rounded-lg">
          <summary className="px-4 py-3 cursor-pointer text-sm font-medium text-foreground hover:bg-surface-3 flex items-center gap-2">
            <span>📧</span> Email Settings
          </summary>
          <div className="px-4 pb-4 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Emails per Day</label>
                <div className="flex items-center gap-2">
                  <input type="range" min={1} max={200} value={emailMsgs} onChange={(e) => setEmailMsgs(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="text-foreground font-mono text-sm bg-background px-2 py-1 rounded border border-border min-w-[2.5rem] text-center">{emailMsgs}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Send From</label>
                <select className="w-full px-2 py-1.5 bg-background border border-border rounded text-foreground text-sm">
                  <option>john@acme.com</option>
                  <option>sales@acme.com</option>
                  <option>+ Connect new email</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Subject Line Strategy</label>
              <select className="w-full px-2 py-1.5 bg-background border border-border rounded text-foreground text-sm">
                <option>🤖 AI generates unique per recipient</option>
                <option>Use template</option>
                <option>A/B test (AI tries 3 variations)</option>
              </select>
            </div>
            <div>
              <FormInput label="Subject Line Template" placeholder="Quick question about {'{company}'}" optional />
              <AISuggestButton label="AI Suggest Subject Lines" />
            </div>
          </div>
        </details>

        <details className="bg-surface-2 border border-border rounded-lg">
          <summary className="px-4 py-3 cursor-pointer text-sm font-medium text-foreground hover:bg-surface-3 flex items-center gap-2">
            <span>💬</span> WhatsApp Settings
          </summary>
          <div className="px-4 pb-4 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Messages per Day</label>
                <div className="flex items-center gap-2">
                  <input type="range" min={1} max={30} value={whatsappMsgs} onChange={(e) => setWhatsappMsgs(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="text-foreground font-mono text-sm bg-background px-2 py-1 rounded border border-border min-w-[2.5rem] text-center">{whatsappMsgs}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">WhatsApp Account</label>
                <select className="w-full px-2 py-1.5 bg-background border border-border rounded text-foreground text-sm">
                  <option>+1 (555) 123-4567</option>
                  <option>+ Connect WhatsApp Business</option>
                </select>
              </div>
            </div>
          </div>
        </details>
      </SectionCard>

      {/* Step 4 */}
      <SectionCard className="space-y-4">
        <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground">4</span>
          Automation Settings
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-surface-2 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-foreground">Autopilot Mode</div>
              <ToggleSwitch checked={autopilot} onChange={setAutopilot} />
            </div>
            <p className="text-xs text-muted-foreground">When ON, messages send automatically. When OFF, require manual approval.</p>
          </div>
          <div className="p-4 bg-surface-2 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-foreground">Pitching Mode</div>
              <ToggleSwitch checked={pitching} onChange={setPitching} />
            </div>
            <p className="text-xs text-muted-foreground">When ON, include pitch in first message. When OFF, build relationship first.</p>
          </div>
        </div>
      </SectionCard>

      {/* Step 5 */}
      <SectionCard className="space-y-4">
        <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground">5</span>
          Select Prospects
        </h4>
        <div className="space-y-2">
          {[
            { value: "icp", label: "Use ICP-matched prospects", desc: "AI found 487 matching contacts", badge: "487 contacts", badgeColor: "green" as const },
            { value: "upload", label: "Use uploaded contacts", desc: "From CSV: SaaS_leads_Q1.csv", badge: "312 contacts", badgeColor: "blue" as const },
            { value: "new", label: "Import new contacts", desc: "Upload or paste new list" },
          ].map((p) => (
            <label key={p.value} className="flex items-center gap-3 cursor-pointer p-3 border border-border rounded-lg has-[:checked]:border-primary has-[:checked]:bg-primary/10">
              <input type="radio" name="prospect_source" value={p.value} className="text-primary" defaultChecked={p.value === "icp"} />
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">{p.label}</div>
                <div className="text-xs text-muted-foreground">{p.desc}</div>
              </div>
              {p.badge && <StatusBadge label={p.badge} color={p.badgeColor!} />}
            </label>
          ))}
        </div>
      </SectionCard>

      <div className="flex gap-3">
        <button className="flex-1 bg-primary text-primary-foreground font-semibold py-4 px-6 rounded-xl hover:bg-primary/90 transition-all text-lg">
          🚀 Launch Campaign
        </button>
        <button className="bg-surface-2 border border-border text-secondary-foreground font-medium py-4 px-6 rounded-xl hover:border-secondary-foreground/30">
          Save as Draft
        </button>
      </div>
    </div>
  );
};

const Campaigns = () => {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="space-y-6">
      {!showCreate ? (
        <>
          <div className="flex items-center justify-between">
            <PageHeader title="Campaigns" subtitle="Create and manage outbound campaigns" />
            <button onClick={() => setShowCreate(true)} className="bg-primary text-primary-foreground font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-all">
              + New Campaign
            </button>
          </div>
          <CampaignsList onCreateNew={() => setShowCreate(true)} />
        </>
      ) : (
        <CreateCampaignForm onBack={() => setShowCreate(false)} />
      )}
    </div>
  );
};

export default Campaigns;
