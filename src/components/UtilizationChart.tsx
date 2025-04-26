
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', utilization: 87 },
  { name: 'Tue', utilization: 75 },
  { name: 'Wed', utilization: 92 },
  { name: 'Thu', utilization: 65 },
  { name: 'Fri', utilization: 88 },
];

const UtilizationChart = () => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Weekly Resource Utilization</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="utilization" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default UtilizationChart;
