import { ReactNode, useState } from "react";

interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
  badgeColor?: "red" | "blue";
}

interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  children: (activeTab: string) => ReactNode;
}

const Tabs = ({ tabs, defaultTab, children }: TabsProps) => {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id);

  return (
    <div>
      <div className="flex gap-2 border-b border-border mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              active === tab.id
                ? "text-primary border-primary"
                : "text-muted-foreground border-transparent hover:text-secondary-foreground"
            }`}
          >
            {tab.label}
            {tab.badge !== undefined && (
              <span
                className={`ml-1 text-xs px-1.5 py-0.5 rounded-full text-foreground ${
                  tab.badgeColor === "red" ? "bg-destructive" : "bg-primary"
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
      {children(active)}
    </div>
  );
};

export default Tabs;
