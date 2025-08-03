import { FreelancerSidebar } from "@/components/FreelancerSidebar";
import { MyGigs } from "@/components/MyGigs";
import { useState } from "react";

const Gigs = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <FreelancerSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <main
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "ml-16" : "ml-80"
        }`}
      >
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              My Gigs
            </h1>
            <p className="text-muted-foreground">
              Manage your active gigs and create new ones.
            </p>
          </div>

          <MyGigs />
        </div>
      </main>
    </div>
  );
};

export default Gigs;