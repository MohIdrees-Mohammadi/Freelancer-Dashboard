import { useState } from "react";
import { FreelancerSidebar } from "@/components/FreelancerSidebar";
import { DashboardCards } from "@/components/DashboardCards";
import { EarningsChart } from "@/components/EarningsChart";
import { MyGigs } from "@/components/MyGigs";

const Index = () => {
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
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, Alex! 👋
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your freelance business today.
            </p>
          </div>

          {/* Dashboard Cards */}
          <DashboardCards />

          {/* Earnings Chart */}
          <div className="mb-8">
            <EarningsChart />
          </div>

          {/* My Gigs Section */}
          <MyGigs />
        </div>
      </main>
    </div>
  );
};

export default Index;