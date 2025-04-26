
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";

const AnomalyAlerts = () => {
  return (
    <Card className="col-span-4 lg:col-span-2">
      <CardHeader>
        <CardTitle>Anomaly Alerts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>High Utilization Detected</AlertTitle>
          <AlertDescription>
            Team A is showing 95% utilization for the past week
          </AlertDescription>
        </Alert>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Low Utilization Warning</AlertTitle>
          <AlertDescription>
            Backend team showing 45% utilization this sprint
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default AnomalyAlerts;
