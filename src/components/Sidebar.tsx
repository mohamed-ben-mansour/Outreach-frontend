import { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { icon: "📊", label: "Dashboard", path: "/" },
  { icon: "🎨", label: "Studio", path: "/studio" },
  { icon: "🎯", label: "Prospecting", path: "/prospecting" },
  { icon: "🏆", label: "Pipeline Results", path: "/pipeline-results" },
  { icon: "🚀", label: "Campaigns", path: "/campaigns" },
  { icon: "✉️", label: "Messages", path: "/messages" },
  { icon: "⚙️", label: "Settings", path: "/settings" },
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-card border-r border-border flex flex-col shrink-0">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-foreground">AI Outbound Agent</h1>
        <p className="text-xs text-muted-foreground mt-1">Autonomous Sales Engine</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                isActive
                  ? "bg-primary/20 border-l-[3px] border-primary text-muted-foreground"
                  : "text-muted-foreground hover:bg-primary/10"
              }`
            }
          >
            <span>{item.icon}</span> {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-foreground truncate">John Doe</div>
            <div className="text-xs text-muted-foreground">Pro Plan</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
