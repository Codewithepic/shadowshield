import React, { useState } from 'react';
import { Shield, AlertTriangle, Clock, User, Map, Cpu, Eye, Lock, Keyboard } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';

type SecurityEvent = {
  id: string;
  timestamp: Date;
  type: 'warning' | 'critical' | 'info';
  message: string;
  location?: string;
  ip?: string;
  action?: string;
  aiConfidence?: number;
};

const AISecurityLog = () => {
  // Only initialize with a system startup message - no automatic updates
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([
    {
      id: '1',
      timestamp: new Date(),
      type: 'info',
      message: 'System startup completed, AI security protocols active',
      aiConfidence: 100
    }
  ]);
  
  // Pre-configured events for the demo
  const triggerLoginAttack = () => {
    const newEvent: SecurityEvent = {
      id: Date.now().toString(),
      timestamp: new Date(),
      type: 'warning',
      message: 'Suspicious login pattern detected',
      location: 'Moscow, Russia',
      ip: '185.93.xx.xx',
      action: 'Access temporarily restricted',
      aiConfidence: 87
    };
    
    setSecurityEvents(prev => [newEvent, ...prev]);
  };
  
  const triggerBruteForce = () => {
    const newEvent: SecurityEvent = {
      id: Date.now().toString(),
      timestamp: new Date(),
      type: 'critical',
      message: 'Multiple failed access attempts (6) detected',
      location: 'Beijing, China',
      ip: '112.47.xx.xx',
      action: 'Self-destruction protocol initiated',
      aiConfidence: 95
    };
    
    setSecurityEvents(prev => [newEvent, ...prev]);
  };
  
  const triggerFileAccess = () => {
    const newEvent: SecurityEvent = {
      id: Date.now().toString(),
      timestamp: new Date(),
      type: 'warning',
      message: 'Unauthorized file access attempt detected',
      location: 'Unknown Location',
      ip: '45.159.xx.xx',
      action: 'Access blocked, fake data injected',
      aiConfidence: 85
    };
    
    setSecurityEvents(prev => [newEvent, ...prev]);
  };
  
  const clearEvents = () => {
    // Keep only the initial system startup message
    setSecurityEvents([{
      id: '1',
      timestamp: new Date(),
      type: 'info',
      message: 'System startup completed, AI security protocols active',
      aiConfidence: 100
    }]);
  };
  
  const getEventIcon = (type: SecurityEvent['type']) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'info':
        return <Shield className="h-4 w-4 text-blue-500" />;
    }
  };
  
  return (
    <div className="space-y-4 text-white">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center text-white">
          <Cpu className="h-5 w-5 mr-2 text-yellow-500" />
          AI Intrusion Detection System
        </h2>
        <Badge variant="outline" className="bg-green-900/30 text-green-400 border-green-800">
          ACTIVE
        </Badge>
      </div>
      
      {/* Demo Controls - for your live presentation */}
      <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-black/30 border border-gray-700 rounded-lg">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center justify-center bg-amber-900/20 border-amber-800 hover:bg-amber-900/30"
          onClick={triggerLoginAttack}
        >
          <User className="h-3 w-3 mr-1 text-amber-500" />
          <span className="text-xs">Login Attack</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center justify-center bg-red-900/20 border-red-800 hover:bg-red-900/30"
          onClick={triggerBruteForce}
        >
          <Keyboard className="h-3 w-3 mr-1 text-red-500" />
          <span className="text-xs">Brute Force</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center justify-center bg-blue-900/20 border-blue-800 hover:bg-blue-900/30"
          onClick={triggerFileAccess}
        >
          <Eye className="h-3 w-3 mr-1 text-blue-500" />
          <span className="text-xs">File Access</span>
        </Button>
      </div>
      
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {securityEvents.map(event => (
          <div key={event.id} className={`p-3 rounded-lg border text-white
            ${event.type === 'critical' ? 'bg-red-900/20 border-red-800' : 
              event.type === 'warning' ? 'bg-amber-900/20 border-amber-800' : 
              'bg-blue-900/20 border-blue-800'}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {getEventIcon(event.type)}
                <span className="font-medium text-white">{event.message}</span>
              </div>
              <span className="text-xs text-gray-300">
                {event.timestamp.toLocaleTimeString()}
              </span>
            </div>
            
            {(event.location || event.ip) && (
              <div className="flex flex-col space-y-1 mb-2">
                {event.location && (
                  <div className="flex items-center gap-1 text-xs text-gray-300">
                    <Map className="h-3 w-3" />
                    <span>{event.location}</span>
                  </div>
                )}
                {event.ip && (
                  <div className="flex items-center gap-1 text-xs text-gray-300">
                    <User className="h-3 w-3" />
                    <span>IP: {event.ip}</span>
                  </div>
                )}
              </div>
            )}
            
            {event.action && (
              <div className="mt-2 text-sm">
                <span className="font-medium text-white">Action taken: </span>
                <span className={event.type === 'critical' ? 'text-red-400' : 'text-amber-400'}>
                  {event.action}
                </span>
              </div>
            )}
            
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs text-gray-300">AI Confidence:</span>
              <div className="h-1.5 w-24 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    event.aiConfidence && event.aiConfidence > 90 ? 'bg-green-500' : 
                    event.aiConfidence && event.aiConfidence > 75 ? 'bg-blue-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${event.aiConfidence}%` }}
                ></div>
              </div>
              <span className="text-xs text-white">{event.aiConfidence}%</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs"
          onClick={clearEvents}
        >
          Clear Log
        </Button>
      </div>
    </div>
  );
};

export default AISecurityLog;