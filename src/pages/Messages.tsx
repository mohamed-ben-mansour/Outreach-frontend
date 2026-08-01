import { useRef, useState } from "react";
import PageHeader from "@/components/PageHeader";
import SectionCard from "@/components/SectionCard";
import Tabs from "@/components/Tabs";


const inmailCredits: number = 12;

const channelOptions = [
  { value: "li_connect", label: "🤝 LinkedIn Connection Request", noText: true },
  { value: "li_dm", label: "💼 LinkedIn DM" },
  { value: "li_inmail", label: `📨 LinkedIn InMail (${inmailCredits} credits left)`, requiresCredits: true },
  { value: "email", label: "📧 Email" },
];

const timingUnits = ["minutes", "hours", "days"];
const tones = ["Casual", "Professional", "Direct", "Funny", "Warm"];

type Touch = {
  id: number;
  channel: string;
  delay: number;
  unit: string;
  aiWrite: boolean;
  template: string;
  tone: string;
  nativeLanguage: boolean;
  language: string;
  skipped: boolean;
  approved: boolean;
  feedback: string;
};

let nextId = 100;
const makeTouch = (patch: Partial<Touch> = {}): Touch => ({
  id: nextId++,
  channel: "email",
  delay: 3,
  unit: "days",
  aiWrite: true,
  template: "",
  tone: "Professional",
  nativeLanguage: false,
  language: "English",
  skipped: false,
  approved: false,
  feedback: "",
  ...patch,
});

const aiGeneratedPlan = (): Touch[] => [
  makeTouch({ channel: "li_connect", delay: 0, unit: "days" }),
  makeTouch({ channel: "li_dm", delay: 2, unit: "days" }),
  makeTouch({ channel: "li_inmail", delay: 4, unit: "days" }),
  makeTouch({ channel: "email", delay: 4, unit: "days" }),
];

const manualStart = (): Touch[] => [
  makeTouch({ channel: "li_connect", delay: 0, unit: "days" }),
  makeTouch({ channel: "li_dm", delay: 2, unit: "days", aiWrite: false }),
];

const projectedRates = ["22%", "18%", "12%", "8%", "6%", "5%", "4%"];

const StepCard = ({
  touch,
  index,
  total,
  onUpdate,
  onRemove,
  onMove,
  onDragStart,
  onDrop,
}: {
  touch: Touch;
  index: number;
  total: number;
  onUpdate: (patch: Partial<Touch>) => void;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
  onDragStart: () => void;
  onDrop: () => void;
}) => {
  const channel = channelOptions.find((c) => c.value === touch.channel);
  const noText = !!channel?.noText;

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className={`bg-surface-2 border rounded-lg p-4 transition-all ${
        touch.skipped ? "opacity-50 border-dashed border-border" : touch.approved ? "border-success/50" : "border-border"
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="cursor-grab text-muted-foreground text-sm select-none" title="Drag to reorder">⠿</span>
        <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground">{index + 1}</span>
        <span className="text-sm font-medium text-foreground">{index === 0 ? "First Touch" : `Follow-up ${index}`}</span>
        {touch.approved && <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full">Approved</span>}
        {touch.skipped && <span className="text-xs bg-warning/10 text-warning px-2 py-0.5 rounded-full">Skipped</span>}
        <div className="ml-auto flex items-center gap-1">
          <button onClick={() => onMove(-1)} disabled={index === 0} className="text-xs px-2 py-1 rounded border border-border text-secondary-foreground disabled:opacity-30">↑</button>
          <button onClick={() => onMove(1)} disabled={index === total - 1} className="text-xs px-2 py-1 rounded border border-border text-secondary-foreground disabled:opacity-30">↓</button>
          <button onClick={() => onUpdate({ skipped: !touch.skipped })} className="text-xs px-2 py-1 rounded border border-border text-secondary-foreground">
            {touch.skipped ? "Unskip" : "⏭️ Skip"}
          </button>
          <button onClick={onRemove} className="text-xs px-2 py-1 rounded border border-destructive/30 text-destructive">🗑️</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Channel</label>
          <select
            value={touch.channel}
            onChange={(e) => onUpdate({ channel: e.target.value })}
            className="w-full px-2 py-1.5 bg-background border border-border rounded text-foreground text-sm"
          >
            {channelOptions.map((c) => (
              <option key={c.value} value={c.value} disabled={c.requiresCredits && inmailCredits === 0}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Timing {index === 0 ? "(after enrollment)" : "(after previous step)"}</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              value={touch.delay}
              onChange={(e) => onUpdate({ delay: Number(e.target.value) })}
              className="w-20 px-2 py-1.5 bg-background border border-border rounded text-foreground text-sm"
            />
            <select
              value={touch.unit}
              onChange={(e) => onUpdate({ unit: e.target.value })}
              className="flex-1 px-2 py-1.5 bg-background border border-border rounded text-foreground text-sm"
            >
              {timingUnits.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
          {touch.delay === 0 && <p className="text-xs text-muted-foreground mt-1">Sends immediately</p>}
        </div>
      </div>

      {noText ? (
        <div className="text-xs text-muted-foreground bg-background border border-border rounded-lg px-3 py-2">
          🤝 Connection request sent without a note — no message needed.
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs text-muted-foreground">Message Template</label>
              <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-border bg-surface-2 text-primary"
                  checked={touch.aiWrite}
                  onChange={(e) => onUpdate({ aiWrite: e.target.checked })}
                />
                Let AI write
              </label>
            </div>
            <div className="relative">
              <textarea
                rows={3}
                disabled={touch.aiWrite}
                value={touch.template}
                onChange={(e) => onUpdate({ template: e.target.value })}
                className={`w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm placeholder-muted-foreground font-mono transition-all ${touch.aiWrite ? "blur-[2px] opacity-60 pointer-events-none select-none" : ""}`}
                placeholder="Hey {firstName}, saw your post about {recentTopic}..."
              />
              {touch.aiWrite && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs text-primary bg-primary/10 border border-primary/30 rounded-lg px-3 py-1.5">
                    🤖 AI will write this message
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Voice / style</label>
              <select
                value={touch.tone}
                onChange={(e) => onUpdate({ tone: e.target.value })}
                className="w-full px-2 py-1.5 bg-background border border-border rounded text-foreground text-sm"
              >
                {tones.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Language</label>
              <select
                value={touch.nativeLanguage ? "native" : touch.language}
                onChange={(e) =>
                  e.target.value === "native"
                    ? onUpdate({ nativeLanguage: true })
                    : onUpdate({ nativeLanguage: false, language: e.target.value })
                }
                className="w-full px-2 py-1.5 bg-background border border-border rounded text-foreground text-sm"
              >
                <option value="English">English</option>
                <option value="native">🌍 Prospect's native language</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>
          </div>

          <div className="bg-background border border-border rounded-lg p-3 space-y-2">
            <label className="block text-xs text-muted-foreground">Feedback for the rewrite</label>
            <textarea
              rows={2}
              value={touch.feedback}
              onChange={(e) => onUpdate({ feedback: e.target.value })}
              placeholder='e.g. "make it shorter, more casual, mention their new role"'
              className="w-full px-3 py-2 bg-surface-2 border border-border rounded text-foreground text-xs placeholder-muted-foreground"
            />
            <button
              disabled={!touch.feedback.trim()}
              className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded disabled:opacity-40"
            >
              🔄 Regenerate with feedback
            </button>
          </div>

        </div>
      )}

      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
        <button
          onClick={() => onUpdate({ approved: !touch.approved })}
          className={`text-xs px-3 py-1.5 rounded-lg ${touch.approved ? "bg-surface-3 border border-border text-secondary-foreground" : "bg-success text-success-foreground"}`}
        >
          {touch.approved ? "Undo approval" : "✓ Approve step"}
        </button>
      </div>
    </div>
  );
};

const SequencesTab = () => {
  const [seqMode, setSeqMode] = useState<"ai" | "manual">("ai");
  const [touches, setTouches] = useState<Touch[]>([]);
  const [planReady, setPlanReady] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [planFeedback, setPlanFeedback] = useState("");
  const [maxTouches, setMaxTouches] = useState("");
  const [maxDays, setMaxDays] = useState("");
  const [firstChannel, setFirstChannel] = useState("");
  const dragIndex = useRef<number | null>(null);

  const updateTouch = (id: number, patch: Partial<Touch>) =>
    setTouches((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));

  const removeTouch = (id: number) => setTouches((prev) => prev.filter((t) => t.id !== id));

  const move = (index: number, dir: -1 | 1) =>
    setTouches((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });

  const dropAt = (index: number) =>
    setTouches((prev) => {
      const from = dragIndex.current;
      dragIndex.current = null;
      if (from === null || from === index) return prev;
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(index, 0, moved);
      return next;
    });

  const generatePlan = () => {
    const plan = aiGeneratedPlan();
    const limit = Number(maxTouches);
    const trimmed = limit > 0 ? plan.slice(0, limit) : plan;
    if (firstChannel) trimmed[0] = { ...trimmed[0], channel: firstChannel };
    setTouches(trimmed);
    setPlanReady(true);
    setStopped(false);
  };

  const startManual = () => {
    setTouches(manualStart());
    setPlanReady(true);
    setStopped(false);
  };

  const restart = () => {
    setPlanReady(false);
    setTouches([]);
    setStopped(false);
  };

  const active = touches.filter((t) => !t.skipped);
  const totalDays = active.reduce((sum, t) => sum + (t.unit === "days" ? t.delay : 0), 0);
  const allApproved = active.length > 0 && active.every((t) => t.approved);

  const steps = (
    <SectionCard className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-foreground">
          {seqMode === "ai" ? "AI Projected Sequence" : "Your Sequence"}
        </h4>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Steps:</span>
          <span className="text-foreground font-mono text-sm bg-surface-2 px-2 py-1 rounded border border-border">{touches.length}</span>
          <button onClick={restart} className="text-xs border border-border text-secondary-foreground px-3 py-1.5 rounded-lg">
            ↺ Restructure
          </button>
        </div>
      </div>

      {touches.map((t, i) => (
        <StepCard
          key={t.id}
          touch={t}
          index={i}
          total={touches.length}
          onUpdate={(patch) => updateTouch(t.id, patch)}
          onRemove={() => removeTouch(t.id)}
          onMove={(dir) => move(i, dir)}
          onDragStart={() => (dragIndex.current = i)}
          onDrop={() => dropAt(i)}
        />
      ))}

      <button
        onClick={() => setTouches((prev) => [...prev, makeTouch({ aiWrite: seqMode === "ai" })])}
        className="w-full border-2 border-dashed border-border text-muted-foreground py-3 rounded-lg hover:border-secondary-foreground/30 hover:text-secondary-foreground transition-all"
      >
        + Add Step
      </button>

      <div className="bg-surface-2 border border-border rounded-lg p-4 flex justify-between text-sm">
        <span className="text-muted-foreground">{active.length} active steps • ~{totalDays} days total</span>
        <span className="text-success font-medium">
          Projected reply rate: {active.reduce((sum, _t, i) => sum + parseInt(projectedRates[i] ?? "4%"), 0)}%
        </span>
      </div>
    </SectionCard>
  );

  const planActions = (
    <SectionCard className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setTouches((prev) => prev.map((t) => ({ ...t, approved: true })))}
          className="bg-success text-success-foreground text-sm px-4 py-2 rounded-lg hover:bg-success/90"
        >
          ✓ Approve whole plan
        </button>
        <button
          onClick={generatePlan}
          className="bg-surface-2 border border-border text-secondary-foreground text-sm px-4 py-2 rounded-lg"
        >
          🔄 Regenerate plan with feedback
        </button>
        <button
          onClick={() => setStopped(true)}
          className="bg-surface-2 border border-destructive/30 text-destructive text-sm px-4 py-2 rounded-lg"
        >
          🛑 Stop sequence
        </button>
        {allApproved && <span className="text-xs text-success">All steps approved</span>}
        {stopped && <span className="text-xs text-destructive">Sequence stopped — no further sends.</span>}
      </div>
      <textarea
        rows={2}
        value={planFeedback}
        onChange={(e) => setPlanFeedback(e.target.value)}
        placeholder='Feedback for regeneration, e.g. "fewer touches, more LinkedIn, less salesy"'
        className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-foreground text-sm placeholder-muted-foreground"
      />
    </SectionCard>
  );

  return (
    <div className="space-y-6">
      <SectionCard>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer p-4 border-2 border-border rounded-lg has-[:checked]:border-primary has-[:checked]:bg-primary/10">
            <input type="radio" name="sequence_mode" checked={seqMode === "ai"} onChange={() => { setSeqMode("ai"); restart(); }} className="text-primary" />
            <div>
              <div className="text-sm font-medium text-foreground">🤖 AI Generates Sequence</div>
              <div className="text-xs text-muted-foreground">AI decides # of touches, timing, channels, and message angles</div>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-4 border-2 border-border rounded-lg has-[:checked]:border-primary has-[:checked]:bg-primary/10">
            <input type="radio" name="sequence_mode" checked={seqMode === "manual"} onChange={() => { setSeqMode("manual"); restart(); }} className="text-primary" />
            <div>
              <div className="text-sm font-medium text-foreground">✍️ Use My Custom Sequence</div>
              <div className="text-xs text-muted-foreground">Define each step yourself (write your own messages or let AI write per step)</div>
            </div>
          </label>
        </div>
      </SectionCard>

      {seqMode === "ai" && !planReady && (
        <SectionCard className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">AI Sequence Preferences</h4>
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
            <p className="text-sm text-primary mb-3">🤖 AI will automatically decide:</p>
            <ul className="text-xs text-primary/80 space-y-1 ml-4 list-disc">
              <li>Number of touches (based on offer, ICP, urgency)</li>
              <li>Timing between touches (based on historical reply rates)</li>
              <li>Channel per touch (based on available data)</li>
              <li>Message angle per touch (different hooks, avoid repetition)</li>
              <li>When to give up (based on engagement signals)</li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-foreground mb-1.5">Override: Max Touches <span className="text-muted-foreground">(optional)</span></label>
              <input type="number" min={1} max={7} value={maxTouches} onChange={(e) => setMaxTouches(e.target.value)} className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-foreground text-sm placeholder-muted-foreground" placeholder="Leave blank for AI to decide" />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-foreground mb-1.5">Override: Max Days <span className="text-muted-foreground">(optional)</span></label>
              <input type="number" min={1} max={30} value={maxDays} onChange={(e) => setMaxDays(e.target.value)} className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-foreground text-sm placeholder-muted-foreground" placeholder="Leave blank for AI to decide" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-foreground mb-1.5">Preferred First Channel</label>
            <select value={firstChannel} onChange={(e) => setFirstChannel(e.target.value)} className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-foreground text-sm">
              <option value="">AI decides based on data</option>
              {channelOptions.map((c) => (
                <option key={c.value} value={c.value} disabled={c.requiresCredits && inmailCredits === 0}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <button onClick={generatePlan} className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-xl hover:bg-primary/90 transition-all">
            Generate Sequence Plan
          </button>
        </SectionCard>
      )}

      {seqMode === "manual" && !planReady && (
        <SectionCard className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Build Your Own Sequence</h4>
          <p className="text-sm text-muted-foreground">Start from a blank plan and add steps, channels, timing, and messages yourself. You can still let AI write any individual message.</p>
          <button onClick={startManual} className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-xl hover:bg-primary/90 transition-all">
            Start Building
          </button>
        </SectionCard>
      )}

      {planReady && (
        <>
          {steps}
          {planActions}
          <button className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-xl hover:bg-primary/90 transition-all">
            Save Sequence
          </button>
        </>
      )}
    </div>
  );
};

const approvalsData = [
  {
    initials: "SC",
    name: "Sarah Chen",
    title: "VP Sales @ Acme Corp",
    match: "92%",
    matchColor: "green",
    channel: "💼 LinkedIn DM",
    touch: "Touch 1 of 3",
    campaign: "Q1 SaaS Outreach",
    message: "Hey Sarah — saw your post about scaling SDR teams without burning cash. We just helped TechCorp cut their outbound costs by 60% while 3x-ing meetings booked. Mind if I share how?",
  },
  {
    initials: "MJ",
    name: "Mike Johnson",
    title: "Head of Growth @ StartupXYZ",
    match: "74%",
    matchColor: "yellow",
    channel: "📧 Email",
    touch: "Touch 2 of 3",
    campaign: "Q1 SaaS Outreach",
    subject: "Quick follow-up on outbound automation",
    message: "Hey Mike — following up on my LinkedIn message. I noticed you're hiring 3 SDRs — what if you could get the same output with AI instead? Happy to show you a 5-min demo. Would Thursday work?",
  },
];

const ApprovalCard = ({ a }: { a: (typeof approvalsData)[number] }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <SectionCard>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-surface-3 rounded-full flex items-center justify-center text-foreground font-bold">
          {a.initials}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-foreground">{a.name}</span>
            <span className="text-xs text-muted-foreground">{a.title}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${a.matchColor === "green" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
              {a.match} match
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <span>{a.channel}</span>
            <span>•</span>
            <span>{a.touch}</span>
            <span>•</span>
            <span>{a.campaign}</span>
          </div>
          <div className="bg-surface-2 border border-border rounded-lg p-3 mb-3">
            {a.subject && <p className="text-sm text-muted-foreground mb-1">Subject: {a.subject}</p>}
            <p className="text-sm text-secondary-foreground font-mono">{a.message}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-success text-success-foreground text-xs px-3 py-1.5 rounded-lg hover:bg-success/90">✓ Approve</button>
            <button className="bg-surface-2 border border-border text-secondary-foreground text-xs px-3 py-1.5 rounded-lg">✏️ Edit</button>
            <button
              onClick={() => {
                setShowFeedback((v) => !v);
                setSent(false);
              }}
              className={`text-xs px-3 py-1.5 rounded-lg border ${showFeedback ? "bg-surface-3 border-secondary-foreground/30 text-foreground" : "bg-surface-2 border-border text-secondary-foreground"}`}
            >
              🔄 Regenerate
            </button>
            <button className="bg-surface-2 border border-border text-secondary-foreground text-xs px-3 py-1.5 rounded-lg">⏭️ Skip</button>
            <button className="bg-surface-2 border border-destructive/30 text-destructive text-xs px-3 py-1.5 rounded-lg">🚫 Block</button>
          </div>

          {showFeedback && (
            <div className="mt-3 bg-surface-2 border border-border rounded-lg p-3 space-y-2">
              <label className="block text-xs text-muted-foreground">Feedback for the rewrite</label>
              <textarea
                rows={2}
                value={feedback}
                onChange={(e) => {
                  setFeedback(e.target.value);
                  setSent(false);
                }}
                placeholder='e.g. "shorter, mention their recent funding round, drop the compliment"'
                className="w-full px-3 py-2 bg-background border border-border rounded text-foreground text-xs placeholder-muted-foreground"
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSent(true)}
                  disabled={!feedback.trim()}
                  className="bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-lg disabled:opacity-40"
                >
                  ↩ Regenerate with feedback
                </button>
                <button
                  onClick={() => setShowFeedback(false)}
                  className="bg-surface-3 border border-border text-secondary-foreground text-xs px-3 py-1.5 rounded-lg"
                >
                  Cancel
                </button>
                {sent && <span className="text-xs text-success">Feedback sent — rewriting…</span>}
              </div>
            </div>
          )}
        </div>
      </div>
    </SectionCard>
  );
};

const ApprovalsTab = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">12 messages pending approval</div>
      <div className="flex gap-2">
        {["Approve All", "Approve Top 50%", "Regenerate All"].map((a) => (
          <button key={a} className="text-xs bg-surface-2 border border-border text-secondary-foreground px-3 py-1.5 rounded-lg hover:border-secondary-foreground/30">
            {a}
          </button>
        ))}
      </div>
    </div>

    {approvalsData.map((a) => (
      <ApprovalCard key={a.initials} a={a} />
    ))}

    <div className="text-center py-4">
      <button className="text-muted-foreground text-sm hover:text-secondary-foreground">Load more (10 remaining)</button>
    </div>
  </div>
);


const conversations = [
  { initials: "SC", name: "Sarah Chen", time: "2m ago", preview: "Sounds interesting! Let's chat tomorrow...", unread: true },
  { initials: "JD", name: "John Davis", time: "1h ago", preview: "Not interested right now, but maybe Q2...", unread: false },
  { initials: "AL", name: "Amy Lee", time: "3h ago", preview: "Can you send me the pricing details?", unread: true },
];

const suggestedReplies = [
  { tone: "Casual", text: "Awesome! I'm free tomorrow at 2pm or 4pm EST. Here's my Calendly if either works: [link]. Looking forward to it!" },
  { tone: "Professional", text: "Great to hear, Sarah. I have availability tomorrow between 2-5pm EST. Feel free to pick a slot here: [link]. Talk soon." },
  { tone: "Direct", text: "Perfect. 2pm EST tomorrow? calendly.com/me/15min" },
];

const InboxTab = () => (
  <div className="flex gap-4 h-[600px]">
    <div className="w-1/3 bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-3 border-b border-border">
        <input type="text" placeholder="Search conversations..." className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-foreground text-sm placeholder-muted-foreground" />
      </div>
      <div className="p-2 border-b border-border flex gap-2">
        <button className="flex-1 text-xs bg-primary text-primary-foreground px-2 py-1 rounded">All</button>
        {["💼", "📧", "💬"].map((ch) => (
          <button key={ch} className="flex-1 text-xs bg-surface-2 text-secondary-foreground px-2 py-1 rounded hover:bg-surface-3">{ch}</button>
        ))}
      </div>
      <div className="overflow-y-auto">
        {conversations.map((c) => (
          <div key={c.initials} className={`p-3 border-b border-border hover:bg-surface-2 cursor-pointer ${c.initials === "SC" ? "bg-primary/5" : ""}`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-surface-3 rounded-full flex items-center justify-center text-foreground text-sm font-bold">
                {c.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground text-sm">{c.name}</span>
                  <span className="text-xs text-muted-foreground">{c.time}</span>
                </div>
                <div className="text-xs text-secondary-foreground truncate">{c.preview}</div>
              </div>
              {c.unread && <div className="w-2 h-2 bg-primary rounded-full" />}
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="flex-1 bg-card border border-border rounded-xl flex flex-col overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-surface-3 rounded-full flex items-center justify-center text-foreground font-bold">SC</div>
          <div>
            <div className="font-medium text-foreground">Sarah Chen</div>
            <div className="text-xs text-muted-foreground">VP Sales @ Acme Corp • 💼 LinkedIn</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-success text-success-foreground text-xs px-3 py-1.5 rounded-lg">📅 Book Meeting</button>
          <button className="bg-surface-2 border border-border text-secondary-foreground text-xs px-3 py-1.5 rounded-lg">Mark Closed</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex justify-end">
          <div className="max-w-[70%]">
            <div className="bg-primary text-primary-foreground text-sm p-3 rounded-lg rounded-br-none">
              Hey Sarah — saw your post about scaling SDR teams without burning cash. We just helped TechCorp cut their outbound costs by 60% while 3x-ing meetings booked. Mind if I share how?
            </div>
            <div className="text-xs text-muted-foreground mt-1 text-right">Sent 2 days ago • 💼 LinkedIn DM</div>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[70%]">
            <div className="bg-surface-2 text-secondary-foreground text-sm p-3 rounded-lg rounded-bl-none border border-border">
              Sounds interesting! Let's chat tomorrow if you have 15 minutes. What does your calendar look like?
            </div>
            <div className="text-xs text-muted-foreground mt-1">Received 2 minutes ago</div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border bg-background">
        <div className="text-xs text-muted-foreground mb-2">✨ AI Suggested Replies</div>
        <div className="space-y-2">
          {suggestedReplies.map((r) => (
            <div key={r.tone} className="bg-surface-2 border border-border rounded-lg p-3 cursor-pointer hover:border-primary transition-all">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">{r.tone}</span>
                <button className="text-xs text-primary">Use this</button>
              </div>
              <p className="text-sm text-secondary-foreground">{r.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <textarea rows={2} className="flex-1 px-3 py-2 bg-surface-2 border border-border rounded-lg text-foreground text-sm placeholder-muted-foreground resize-none" placeholder="Type your reply..." />
          <button className="bg-primary text-primary-foreground px-4 rounded-lg hover:bg-primary/90">Send</button>
        </div>
      </div>
    </div>
  </div>
);

const Messages = () => {
  const msgTabs = [
    { id: "sequences", label: "Sequences" },
    { id: "approvals", label: "Approvals", badge: 12, badgeColor: "red" as const },
    { id: "inbox", label: "Inbox", badge: 5, badgeColor: "blue" as const },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Messages" subtitle="Sequences, approvals, and inbox" />
      <Tabs tabs={msgTabs}>
        {(tab) => (
          <>
            {tab === "sequences" && <SequencesTab />}
            {tab === "approvals" && <ApprovalsTab />}
            {tab === "inbox" && <InboxTab />}
          </>
        )}
      </Tabs>
    </div>
  );
};

export default Messages;
