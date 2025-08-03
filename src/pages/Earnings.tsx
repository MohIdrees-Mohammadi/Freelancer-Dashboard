import { FreelancerSidebar } from "@/components/FreelancerSidebar";
import { EarningsChart } from "@/components/EarningsChart";
import { DashboardCards } from "@/components/DashboardCards";
import { useState } from "react";

const Earnings = () => {
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
              Earnings Overview
            </h1>
            <p className="text-muted-foreground">
              Track your income and financial performance.
            </p>
          </div>

          <DashboardCards />
          
          <div className="mt-8">
            <EarningsChart />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Earnings;