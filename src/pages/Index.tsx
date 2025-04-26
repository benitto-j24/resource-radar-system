
import React from 'react';
import Layout from '../components/Layout';

const Index = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-6 space-y-4 px-4">
        <div className="flex items-start gap-4 p-4">
          <div className="flex-1 space-y-4">
            <div className="p-4 rounded-lg bg-accent">
              <p className="text-sm">
                Let's work together to analyze and optimize resource utilization across your organization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
