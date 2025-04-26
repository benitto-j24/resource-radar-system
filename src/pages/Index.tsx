
import React from 'react';
import Header from '../components/Header';
import DashboardMetrics from '../components/DashboardMetrics';
import UtilizationChart from '../components/UtilizationChart';
import AnomalyAlerts from '../components/AnomalyAlerts';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-6 space-y-6">
        <h1 className="text-3xl font-bold">Resource Utilization Dashboard</h1>
        <DashboardMetrics />
        <div className="grid gap-4 grid-cols-4">
          <UtilizationChart />
          <AnomalyAlerts />
        </div>
      </main>
    </div>
  );
};

export default Index;
