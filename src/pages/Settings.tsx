import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import SectionCard from "@/components/SectionCard";
import Tabs from "@/components/Tabs";
import FormInput from "@/components/FormInput";
import FormTextarea from "@/components/FormTextarea";
import ToggleSwitch from "@/components/ToggleSwitch";

const emailAccounts = [
  { email: "john@acme.com", provider: "Gmail", status: "Warmed up", statusColor: "green" },
  { email: "sales@acme.com", provider: "Outlook", status: "Warming up (Day 7/14)", statusColor: "yellow" },
];

const crmIntegrations = [
  { icon: "🟠", name: "HubSpot", status: "Connected", connected: true },
  { icon: "☁️", name: "Salesforce", status: "Connect", connected: false },
  { icon: "🟢", name: "Pipedrive", status: "Connect", connected: false },
];

const prospectingTools = [
  { icon: "🚀", name: "Apollo.io", connected: true },
  { icon: "🎯", name: "Hunter.io", connected: false },
  { icon: "💼", name: "LinkedIn Sales Navigator", connected: true, noKey: true },
];

const calendarIntegrations = [
  { icon: "📅", name: "Google Calendar", connected: true },
  { icon: "📆", name: "Outlook Calendar", connected: false },
  { icon: "🗓️", name: "Calendly", connected: true },
  { icon: "📋", name: "Cal.com", connected: false },
];

const IntegrationsTab = () => (
  <div className="space-y-6">
    <SectionCard>
      <h3 className="text-lg font-semibold text-foreground mb-4">📧 Email Accounts</h3>
      <div className="space-y-3">
        {emailAccounts.map((e) => (
          <div key={e.email} className="flex items-center justify-between p-3 bg-surface-2 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✉️</span>
              <div>
                <div className="text-sm font-medium text-foreground">{e.email}</div>
                <div className="text-xs text-success">Connected via {e.provider}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded-full ${e.statusColor === "green" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                {e.status}
              </span>
              <button className="text-xs text-destructive hover:text-destructive/80">Disconnect</button>
            </div>
          </div>
        ))}
        <button className="w-full border-2 border-dashed border-border text-muted-foreground py-3 rounded-lg hover:border-secondary-foreground/30 hover:text-secondary-foreground transition-all">
          + Connect Email Account
        </button>
      </div>
    </SectionCard>

    <SectionCard>
      <h3 className="text-lg font-semibold text-foreground mb-4">💼 LinkedIn</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-surface-2 border border-border rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💼</span>
            <div>
              <div className="text-sm font-medium text-foreground">John Doe</div>
              <div className="text-xs text-success">Connected</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Daily limit: 25/50 used</span>
            <button className="text-xs text-destructive hover:text-destructive/80">Disconnect</button>
          </div>
        </div>
        <div className="bg-warning/10 border border-warning/30 rounded-lg p-3">
          <p className="text-xs text-warning">⚠️ Stay under LinkedIn's daily limits to avoid restrictions. We recommend max 50 connection requests/day.</p>
        </div>
      </div>
    </SectionCard>

    <SectionCard>
      <h3 className="text-lg font-semibold text-foreground mb-4">💬 WhatsApp</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-surface-2 border border-border rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💬</span>
            <div>
              <div className="text-sm font-medium text-foreground">+1 (555) 123-4567</div>
              <div className="text-xs text-success">WhatsApp Business Connected</div>
            </div>
          </div>
          <button className="text-xs text-destructive hover:text-destructive/80">Disconnect</button>
        </div>
        <button className="w-full border-2 border-dashed border-border text-muted-foreground py-3 rounded-lg hover:border-secondary-foreground/30 transition-all">
          + Connect WhatsApp Business
        </button>
      </div>
    </SectionCard>

    <SectionCard>
      <h3 className="text-lg font-semibold text-foreground mb-4">🔗 CRM Integrations</h3>
      <div className="grid grid-cols-3 gap-3">
        {crmIntegrations.map((c) => (
          <button key={c.name} className="flex flex-col items-center justify-center p-4 bg-surface-2 border border-border rounded-lg hover:border-primary transition-all">
            <span className="text-3xl mb-2">{c.icon}</span>
            <span className="text-sm text-foreground">{c.name}</span>
            <span className={`text-xs mt-1 ${c.connected ? "text-success" : "text-muted-foreground"}`}>{c.status}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 p-3 bg-surface-2 border border-border rounded-lg">
        <FormInput label="Custom Webhook URL" type="url" placeholder="https://your-crm.com/webhook" />
        <p className="text-xs text-muted-foreground mt-1">Send all activities to your custom endpoint</p>
      </div>
    </SectionCard>

    <SectionCard>
      <h3 className="text-lg font-semibold text-foreground mb-4">🔍 Prospecting Tools</h3>
      <div className="space-y-3">
        {prospectingTools.map((t) => (
          <div key={t.name} className="p-3 bg-surface-2 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{t.icon}</span>
                <span className="text-sm font-medium text-foreground">{t.name}</span>
              </div>
              <span className={`text-xs ${t.connected ? "text-success" : "text-muted-foreground"}`}>
                {t.connected ? "Connected" : "Not connected"}
              </span>
            </div>
            {!t.noKey && (
              <input type="password" className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm placeholder-muted-foreground" placeholder="API Key" defaultValue={t.connected ? "••••••••••••••••" : ""} />
            )}
            {t.noKey && <p className="text-xs text-muted-foreground">Linked via your LinkedIn account</p>}
          </div>
        ))}
      </div>
    </SectionCard>

    <SectionCard>
      <h3 className="text-lg font-semibold text-foreground mb-4">📅 Calendar</h3>
      <div className="grid grid-cols-2 gap-3">
        {calendarIntegrations.map((c) => (
          <button key={c.name} className="flex items-center gap-3 p-4 bg-surface-2 border border-border rounded-lg hover:border-primary transition-all">
            <span className="text-2xl">{c.icon}</span>
            <div className="text-left">
              <div className="text-sm font-medium text-foreground">{c.name}</div>
              <div className={`text-xs ${c.connected ? "text-success" : "text-muted-foreground"}`}>
                {c.connected ? "Connected" : "Connect"}
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-4">
        <FormInput label="Default Booking Link" type="url" placeholder="https://calendly.com/you/15min" />
        <p className="text-xs text-muted-foreground mt-1">AI will use this link in booking CTAs</p>
      </div>
    </SectionCard>

    <button className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-xl hover:bg-primary/90 transition-all">
      Save Integrations
    </button>
  </div>
);

const exclusionsPeople = ["john@competitor.com", "linkedin.com/in/janedoe", "ceo@bigclient.com"];
const exclusionsCompanies = ["competitor1.com", "competitor2.com", "existingclient.com"];

const DNCTab = () => {
  const [exCustomers, setExCustomers] = useState(true);
  const [exNotInterested, setExNotInterested] = useState(true);
  const [exUnsub, setExUnsub] = useState(true);
  const [exSpam, setExSpam] = useState(true);

  return (
    <div className="space-y-6">
      <SectionCard className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Exclude Specific People</h3>
        <div>
          <label className="block text-sm font-medium text-secondary-foreground mb-1.5">Add by Email or LinkedIn URL</label>
          <div className="flex gap-2">
            <input type="text" className="flex-1 px-3 py-2 bg-surface-2 border border-border rounded-lg text-foreground text-sm placeholder-muted-foreground" placeholder="john@competitor.com or https://linkedin.com/in/someone" />
            <button className="bg-primary text-primary-foreground px-4 rounded-lg hover:bg-primary/90">Add</button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-foreground mb-1.5">Upload CSV of Exclusions</label>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-secondary-foreground/30 cursor-pointer">
            <div className="text-muted-foreground mb-2">📄</div>
            <div className="text-sm text-secondary-foreground">Click to upload exclusion list</div>
            <div className="text-xs text-muted-foreground mt-1">CSV with emails or LinkedIn URLs</div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-foreground mb-2">Current Exclusions (People)</label>
          <div className="bg-surface-2 border border-border rounded-lg max-h-48 overflow-y-auto">
            {exclusionsPeople.map((e, i) => (
              <div key={e} className={`flex items-center justify-between p-3 ${i < exclusionsPeople.length - 1 ? "border-b border-border" : ""}`}>
                <span className="text-sm text-secondary-foreground">{e}</span>
                <button className="text-xs text-destructive hover:text-destructive/80">Remove</button>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">{exclusionsPeople.length} people excluded</p>
        </div>
      </SectionCard>

      <SectionCard className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Exclude Companies</h3>
        <div>
          <label className="block text-sm font-medium text-secondary-foreground mb-1.5">Add by Company Name or Domain</label>
          <div className="flex gap-2">
            <input type="text" className="flex-1 px-3 py-2 bg-surface-2 border border-border rounded-lg text-foreground text-sm placeholder-muted-foreground" placeholder="Competitor Inc or competitor.com" />
            <button className="bg-primary text-primary-foreground px-4 rounded-lg hover:bg-primary/90">Add</button>
          </div>
        </div>
        <FormTextarea label="Bulk Add Domains" rows={3} mono placeholder={`competitor1.com\ncompetitor2.com\nexistingclient.com`} hint="One domain per line" />
        <div>
          <label className="block text-sm font-medium text-secondary-foreground mb-2">Current Exclusions (Companies)</label>
          <div className="bg-surface-2 border border-border rounded-lg max-h-48 overflow-y-auto">
            {exclusionsCompanies.map((e, i) => (
              <div key={e} className={`flex items-center justify-between p-3 ${i < exclusionsCompanies.length - 1 ? "border-b border-border" : ""}`}>
                <span className="text-sm text-secondary-foreground">{e}</span>
                <button className="text-xs text-destructive hover:text-destructive/80">Remove</button>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">{exclusionsCompanies.length} companies excluded</p>
        </div>
      </SectionCard>

      <SectionCard className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Auto-Exclusions</h3>
        {[
          { label: "Exclude existing customers", desc: "Pull from connected CRM", state: exCustomers, setter: setExCustomers },
          { label: "Exclude \"not interested\" replies", desc: "Auto-detect negative responses", state: exNotInterested, setter: setExNotInterested },
          { label: "Exclude unsubscribes", desc: "Anyone who clicked unsubscribe link", state: exUnsub, setter: setExUnsub },
          { label: "Exclude spam reporters", desc: "Anyone who marked as spam", state: exSpam, setter: setExSpam },
        ].map((item) => (
          <label key={item.label} className="flex items-center justify-between p-3 bg-surface-2 border border-border rounded-lg cursor-pointer">
            <div>
              <div className="text-sm font-medium text-foreground">{item.label}</div>
              <div className="text-xs text-muted-foreground">{item.desc}</div>
            </div>
            <ToggleSwitch checked={item.state} onChange={item.setter} />
          </label>
        ))}
      </SectionCard>

      <button className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-xl hover:bg-primary/90 transition-all">
        Save Do Not Contact Settings
      </button>
    </div>
  );
};

const AccountTab = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [slackNotif, setSlackNotif] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [twoFA, setTwoFA] = useState(false);

  return (
    <div className="space-y-6">
      <SectionCard className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Profile</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xl font-bold">JD</div>
          <button className="text-sm text-primary hover:text-primary/80">Change avatar</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormInput label="First Name" value="John" />
          <FormInput label="Last Name" value="Doe" />
        </div>
        <FormInput label="Email" type="email" value="john@acme.com" />
        <div>
          <label className="block text-sm font-medium text-secondary-foreground mb-1.5">Timezone</label>
          <select className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-foreground text-sm">
            <option>America/New_York (EST)</option>
            <option>America/Los_Angeles (PST)</option>
            <option>America/Chicago (CST)</option>
            <option>Europe/London (GMT)</option>
            <option>Europe/Paris (CET)</option>
          </select>
        </div>
      </SectionCard>

      <SectionCard className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Subscription</h3>
        <div className="flex items-center justify-between p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <div>
            <div className="text-lg font-semibold text-foreground">Pro Plan</div>
            <div className="text-sm text-secondary-foreground">$99/month • Renews Jan 15, 2025</div>
          </div>
          <button className="bg-surface-2 border border-border text-secondary-foreground text-sm px-4 py-2 rounded-lg hover:border-secondary-foreground/30">
            Manage Subscription
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { value: "4,231", label: "Prospects contacted", limit: "of 10,000/mo" },
            { value: "12,847", label: "AI messages generated", limit: "of ∞" },
            { value: "3", label: "Email accounts", limit: "of 5 max" },
          ].map((s) => (
            <div key={s.label} className="p-3 bg-surface-2 border border-border rounded-lg">
              <div className="text-xl font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.limit}</div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Security</h3>
        <div>
          <label className="block text-sm font-medium text-secondary-foreground mb-1.5">Change Password</label>
          <div className="grid grid-cols-2 gap-4">
            <input type="password" className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-foreground text-sm placeholder-muted-foreground" placeholder="Current password" />
            <input type="password" className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-foreground text-sm placeholder-muted-foreground" placeholder="New password" />
          </div>
        </div>
        <label className="flex items-center justify-between p-3 bg-surface-2 border border-border rounded-lg cursor-pointer">
          <div>
            <div className="text-sm font-medium text-foreground">Two-factor authentication</div>
            <div className="text-xs text-muted-foreground">Secure your account with 2FA</div>
          </div>
          <ToggleSwitch checked={twoFA} onChange={setTwoFA} />
        </label>
      </SectionCard>

      <SectionCard className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
        {[
          { label: "Email notifications", desc: "Replies, meeting bookings, campaign alerts", state: emailNotif, setter: setEmailNotif },
          { label: "Slack notifications", desc: "Get notified in your workspace", state: slackNotif, setter: setSlackNotif },
          { label: "Weekly digest", desc: "Summary of campaign performance", state: weeklyDigest, setter: setWeeklyDigest },
        ].map((n) => (
          <label key={n.label} className="flex items-center justify-between p-3 bg-surface-2 border border-border rounded-lg cursor-pointer">
            <div>
              <div className="text-sm font-medium text-foreground">{n.label}</div>
              <div className="text-xs text-muted-foreground">{n.desc}</div>
            </div>
            <ToggleSwitch checked={n.state} onChange={n.setter} />
          </label>
        ))}
      </SectionCard>

      <SectionCard danger className="space-y-4">
        <h3 className="text-lg font-semibold text-destructive">Danger Zone</h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-foreground">Export all data</div>
            <div className="text-xs text-muted-foreground">Download all your campaigns, contacts, and messages</div>
          </div>
          <button className="bg-surface-2 border border-border text-secondary-foreground text-sm px-4 py-2 rounded-lg hover:border-secondary-foreground/30">Export</button>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <div className="text-sm font-medium text-foreground">Delete account</div>
            <div className="text-xs text-muted-foreground">Permanently delete your account and all data</div>
          </div>
          <button className="bg-destructive/10 border border-destructive/30 text-destructive text-sm px-4 py-2 rounded-lg hover:bg-destructive/20">Delete Account</button>
        </div>
      </SectionCard>

      <button className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-xl hover:bg-primary/90 transition-all">
        Save Account Settings
      </button>
    </div>
  );
};

const Settings = () => {
  const settingsTabs = [
    { id: "integrations", label: "Integrations" },
    { id: "dnc", label: "Do Not Contact" },
    { id: "account", label: "Account" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Integrations and preferences" />
      <Tabs tabs={settingsTabs}>
        {(tab) => (
          <>
            {tab === "integrations" && <IntegrationsTab />}
            {tab === "dnc" && <DNCTab />}
            {tab === "account" && <AccountTab />}
          </>
        )}
      </Tabs>
    </div>
  );
};

export default Settings;
