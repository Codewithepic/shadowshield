import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Shield, Lock, FileText, MessageSquare, 
  Activity, AlertTriangle, Users, Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AISecurityLog from '../security/AISecurityLog';
import DataInjectionDefense from '../security/DataInjectionDefense';
import OneTimeAccessGenerator from '../security/OneTimeAccessGenerator';
import ActivityFeed from './ActivityFeed'; // Import the ActivityFeed component

const DashboardContent = () => {
  const navigate = useNavigate();
  
  const securityStats = [
    {
      title: "Security Status",
      value: "Active",
      icon: <Shield className="h-5 w-5 text-green-500" />,
      color: "text-green-500"
    },
    {
      title: "Protected Files",
      value: "14",
      icon: <FileText className="h-5 w-5 text-blue-500" />,
      color: "text-blue-500"
    },
    {
      title: "Secure Messages",
      value: "23",
      icon: <MessageSquare className="h-5 w-5 text-purple-500" />,
      color: "text-purple-500"
    },
    {
      title: "Intrusion Attempts",
      value: "7",
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      color: "text-amber-500"
    }
  ];
  
  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Mission Control Center</h1>
          <p className="text-gray-400">Welcome back, Agent Smith</p>
        </div>
        
        <div className="flex space-x-3 mt-4 md:mt-0">
          <Button 
            onClick={() => navigate('/files')}
            className="flex items-center space-x-2"
          >
            <Lock className="h-4 w-4" />
            <span>Secure Upload</span>
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/messages')}
            className="flex items-center space-x-2"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Send Message</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {securityStats.map((stat, index) => (
          <Card key={index} className="bg-gray-900 border-gray-800">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <div className="bg-gray-800 p-3 rounded-full">
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-yellow-500">Security Operations Center</CardTitle>
            </CardHeader>
            <CardContent>
              <AISecurityLog />
            </CardContent>
          </Card>
          
          {/* Add the ActivityFeed component here */}
          <ActivityFeed maxItems={5} />
        </div>
        
        <div className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-yellow-500">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <OneTimeAccessGenerator />
              <DataInjectionDefense />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
