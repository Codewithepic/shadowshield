// Create src/components/files/FileAccessPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Shield, Lock, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';

const FileAccessPage = () => {
  const { accessId } = useParams();
  const navigate = useNavigate();
  const [stage, setStage] = useState<'verifying'|'authorized'|'unauthorized'|'expired'|'loading'>('loading');
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('classified_mission_273.pdf');
  
  useEffect(() => {
    // Simulate verification process
    const timer = setTimeout(() => setStage('verifying'), 500);
    
    const verificationTimer = setTimeout(() => {
      // Randomize between authorized (70%) and unauthorized (30%)
      const isAuthorized = Math.random() > 0.3;
      setStage(isAuthorized ? 'authorized' : 'unauthorized');
    }, 3000);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(verificationTimer);
      clearInterval(interval);
    };
  }, []);
  
  if (stage === 'loading' || stage === 'verifying') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6">
        <Shield className="h-16 w-16 text-primary mb-6 animate-pulse" />
        <h2 className="text-xl font-bold mb-3">Verifying Access Credentials</h2>
        <p className="text-gray-400 mb-6 text-center max-w-md">
          Please wait while we verify your access level and blockchain credentials.
        </p>
        <Progress value={progress} className="w-full max-w-md h-2 mb-3" />
        <p className="text-sm text-gray-500">
          {stage === 'verifying' ? 'Authenticating...' : 'Initializing secure connection...'}
        </p>
      </div>
    );
  }
  
  if (stage === 'unauthorized') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6">
        <XCircle className="h-16 w-16 text-red-500 mb-6" />
        <h2 className="text-xl font-bold mb-3">Access Denied</h2>
        <p className="text-gray-400 mb-6 text-center max-w-md">
          Your access credentials could not be verified. This attempt has been logged.
        </p>
        <div className="bg-red-900/20 border border-red-800 rounded-md p-4 mb-6 max-w-md">
          <p className="text-sm text-red-400">
            Warning: Multiple unauthorized access attempts will result in file self-destruction.
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate('/dashboard')}>
          Return to Dashboard
        </Button>
      </div>
    );
  }
  
  if (stage === 'expired') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6">
        <Clock className="h-16 w-16 text-amber-500 mb-6" />
        <h2 className="text-xl font-bold mb-3">Access Link Expired</h2>
        <p className="text-gray-400 mb-6 text-center max-w-md">
          This one-time access link has expired or has already been used.
        </p>
        <Button variant="outline" onClick={() => navigate('/dashboard')}>
          Return to Dashboard
        </Button>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6">
      <CheckCircle className="h-16 w-16 text-green-500 mb-6" />
      <h2 className="text-xl font-bold mb-3">Access Granted</h2>
      <p className="text-gray-400 mb-6 text-center max-w-md">
        One-time secure access verified. You can now view this classified file.
      </p>
      
      <div className="bg-black/20 border border-gray-700 rounded-lg p-6 mb-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">File Details</h3>
          <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded-full">
            Decrypted
          </span>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">File Name:</span>
            <span>{fileName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Classification:</span>
            <span className="text-amber-400">TOP SECRET</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Self-Destruct:</span>
            <span>In 23 hours</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Verification:</span>
            <span className="text-green-400">Blockchain Verified</span>
          </div>
        </div>
        
        <div className="mt-6">
          <Button className="w-full">
            <Lock className="h-4 w-4 mr-2" />
            View Classified File
          </Button>
        </div>
      </div>
      
      <p className="text-xs text-gray-500">
        This access has been logged on the blockchain for security purposes.
      </p>
    </div>
  );
};

export default FileAccessPage;