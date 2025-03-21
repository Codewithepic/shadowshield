import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import {
  Upload,
  Lock,
  Shield,
  Clock,
  Eye,
  Trash2,
  FileText,
  X,
  Copy,
} from "lucide-react";
import SecurityRulesConfig from "../shared/SecurityRulesConfig";
import BlockchainVerificationBadge from "../shared/BlockchainVerificationBadge";

interface FileUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FileUploadModal = ({
  open,
  onOpenChange,
}: FileUploadModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "encrypting" | "verifying" | "complete"
  >("idle");
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const simulateUpload = () => {
    setUploadStatus("uploading");
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus("encrypting");
          setTimeout(() => {
            setUploadStatus("verifying");
            setTimeout(() => {
              setUploadStatus("complete");
              setCurrentStep(2);
            }, 1500);
          }, 1500);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    navigate('/dashboard');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-black/10 border border-gray-700 rounded-lg p-4 sm:p-6 lg:p-8 text-center">
              {selectedFile ? (
                <div className="space-y-3 sm:space-y-4">
                  <FileText className="h-10 w-10 sm:h-14 sm:w-14 lg:h-16 lg:w-16 mx-auto text-primary" />
                  <p className="text-base sm:text-lg lg:text-xl font-medium truncate max-w-full">{selectedFile.name}</p>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-400">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <Badge
                    variant="outline"
                    className="bg-green-900/20 text-green-400 border-green-800 text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1"
                  >
                    File Selected
                  </Badge>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4 lg:space-y-6 py-3 sm:py-4">
                  <Upload className="h-10 w-10 sm:h-14 sm:w-14 lg:h-16 lg:w-16 mx-auto text-gray-400" />
                  <p className="text-sm sm:text-base lg:text-lg text-gray-400">
                    Drag and drop your file here or click to browse
                  </p>
                  <Input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Label
                    htmlFor="file-upload"
                    className="inline-block px-3 py-2 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 bg-primary/20 border border-primary/50 rounded-md cursor-pointer hover:bg-primary/30 transition-colors text-xs sm:text-sm lg:text-base"
                  >
                    Select File
                  </Label>
                </div>
              )}
            </div>

            {selectedFile && (
              <div className="space-y-3 sm:space-y-4 p-3 sm:p-4 lg:p-6 bg-black/10 border border-gray-700 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm sm:text-base lg:text-lg font-medium">Upload Status</h3>
                  <Badge
                    variant="outline"
                    className={
                      uploadStatus !== "idle"
                        ? "bg-amber-900/20 text-amber-400 border-amber-800 text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1"
                        : "bg-gray-800 text-gray-400 text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1"
                    }
                  >
                    {uploadStatus === "idle"
                      ? "Ready"
                      : uploadStatus === "uploading"
                        ? "Uploading..."
                        : uploadStatus === "encrypting"
                          ? "Encrypting..."
                          : uploadStatus === "verifying"
                            ? "Blockchain Verification..."
                            : "Complete"}
                  </Badge>
                </div>
                <Progress value={uploadProgress} className="h-2 sm:h-2.5 bg-gray-800" />

                {uploadStatus === "idle" && (
                  <Button onClick={simulateUpload} className="w-full py-2 sm:py-4 lg:py-5 text-xs sm:text-sm lg:text-base">
                    <Upload className="mr-2 h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" /> Begin Secure Upload
                  </Button>
                )}

                {uploadStatus === "complete" && (
                  <div className="flex justify-center py-1 sm:py-2">
                    <BlockchainVerificationBadge />
                  </div>
                )}
              </div>
            )}
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 sm:space-y-5 max-h-[40vh] sm:max-h-[45vh] md:max-h-[50vh] lg:max-h-[55vh] overflow-y-auto pr-1 sm:pr-2">
            <div className="bg-black/10 border border-gray-700 rounded-lg p-3 sm:p-4 lg:p-6">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4 lg:mb-5">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-yellow-500" />
                <h3 className="text-base sm:text-lg lg:text-xl font-medium">Security Configuration</h3>
              </div>

              <Tabs defaultValue="time" className="w-full">
                <TabsList className="grid grid-cols-3 mb-3 sm:mb-4 lg:mb-5">
                  <TabsTrigger
                    value="time"
                    className="data-[state=active]:bg-primary/20 text-xs sm:text-sm lg:text-base px-1 sm:px-2 lg:px-3 h-8 sm:h-9 lg:h-10"
                  >
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 mr-1 sm:mr-2" /> <span className="hidden sm:inline">Time</span><span className="sm:hidden">Time</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="access"
                    className="data-[state=active]:bg-primary/20 text-xs sm:text-sm lg:text-base px-1 sm:px-2 lg:px-3 h-8 sm:h-9 lg:h-10"
                  >
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 mr-1 sm:mr-2" /> <span className="hidden sm:inline">Access</span><span className="sm:hidden">Access</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="manual"
                    className="data-[state=active]:bg-primary/20 text-xs sm:text-sm lg:text-base px-1 sm:px-2 lg:px-3 h-8 sm:h-9 lg:h-10"
                  >
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 mr-1 sm:mr-2" /> <span className="hidden sm:inline">Kill Switch</span><span className="sm:hidden">Kill</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="time" className="space-y-3 sm:space-y-4 p-2 sm:p-3 lg:p-4 bg-black/20 rounded-md">
                  <SecurityRulesConfig />
                </TabsContent>

                <TabsContent value="access" className="space-y-3 sm:space-y-4 p-2 sm:p-3 lg:p-4 bg-black/20 rounded-md">
                  <SecurityRulesConfig />
                </TabsContent>

                <TabsContent value="manual" className="space-y-3 sm:space-y-4 p-2 sm:p-3 lg:p-4 bg-black/20 rounded-md">
                  <SecurityRulesConfig />
                </TabsContent>
              </Tabs>
            </div>

            <div className="bg-black/10 border border-gray-700 rounded-lg p-3 sm:p-4 lg:p-6">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4 lg:mb-5">
                <Lock className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-primary" />
                <h3 className="text-base sm:text-lg lg:text-xl font-medium">Access Control</h3>
              </div>

              <div className="space-y-3 sm:space-y-4 lg:space-y-5">
                <div className="grid gap-1 sm:gap-2">
                  <Label htmlFor="access-email" className="text-xs sm:text-sm lg:text-base mb-1 block">
                    Authorized Email Addresses
                  </Label>
                  <Input
                    id="access-email"
                    placeholder="Enter email addresses (comma separated)"
                    className="bg-black/20 border-gray-700 text-xs sm:text-sm lg:text-base h-8 sm:h-9 lg:h-10"
                  />
                </div>

                <div className="grid gap-1 sm:gap-2">
                  <Label htmlFor="access-wallet" className="text-xs sm:text-sm lg:text-base mb-1 block">
                    Authorized Wallet Addresses (Optional)
                  </Label>
                  <Input
                    id="access-wallet"
                    placeholder="Enter Ethereum addresses (comma separated)"
                    className="bg-black/20 border-gray-700 text-xs sm:text-sm lg:text-base h-8 sm:h-9 lg:h-10"
                  />
                </div>

                <div className="flex items-center space-x-2 sm:space-x-3 bg-black/20 rounded-md p-2 sm:p-3 lg:p-4 mt-1 sm:mt-2">
                  <input
                    type="checkbox"
                    id="generate-one-time"
                    className="rounded bg-black/20 border-gray-700 h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5"
                  />
                  <Label htmlFor="generate-one-time" className="text-xs sm:text-sm lg:text-base">
                    Generate one-time access keys
                  </Label>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 sm:space-y-5 max-h-[40vh] sm:max-h-[45vh] md:max-h-[50vh] lg:max-h-[55vh] overflow-y-auto pr-1 sm:pr-2">
            <div className="bg-black/10 border border-gray-700 rounded-lg p-4 sm:p-5 lg:p-7">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-center mb-4 sm:mb-5 lg:mb-7">
                Mission Briefing: File Ready
              </h3>

              <div className="space-y-2 sm:space-y-3 lg:space-y-4 mb-4 sm:mb-5 lg:mb-7">
                <div className="flex justify-between items-center py-1.5 sm:py-2 lg:py-2.5 border-b border-gray-700">
                  <span className="text-xs sm:text-sm lg:text-base text-gray-400">File Name:</span>
                  <span className="font-medium text-xs sm:text-sm lg:text-base truncate max-w-[180px] sm:max-w-[220px] lg:max-w-[320px]">
                    {selectedFile?.name || "classified_document.pdf"}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 sm:py-2 lg:py-2.5 border-b border-gray-700">
                  <span className="text-xs sm:text-sm lg:text-base text-gray-400">Security Level:</span>
                  <Badge className="bg-red-900/30 text-red-400 border-red-800 text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1">
                    TOP SECRET
                  </Badge>
                </div>

                <div className="flex justify-between items-center py-1.5 sm:py-2 lg:py-2.5 border-b border-gray-700">
                  <span className="text-xs sm:text-sm lg:text-base text-gray-400">Self-Destruct Protocol:</span>
                  <span className="font-medium text-amber-400 text-xs sm:text-sm lg:text-base">
                    Time-based (24 hours)
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 sm:py-2 lg:py-2.5 border-b border-gray-700">
                  <span className="text-xs sm:text-sm lg:text-base text-gray-400">
                    Blockchain Verification:
                  </span>
                  <BlockchainVerificationBadge />
                </div>

                <div className="flex justify-between items-center py-1.5 sm:py-2 lg:py-2.5 border-b border-gray-700">
                  <span className="text-xs sm:text-sm lg:text-base text-gray-400">Access Method:</span>
                  <span className="font-medium text-xs sm:text-sm lg:text-base">One-Time Key</span>
                </div>
              </div>

              <div className="bg-black/30 border border-gray-700 rounded-lg p-3 sm:p-4 lg:p-5 mb-4 sm:mb-5 lg:mb-7">
                <p className="text-center text-xs sm:text-sm lg:text-base text-gray-400 mb-2 sm:mb-3">
                  Secure Access Link
                </p>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Input
                    value="https://shadowshield.io/access/f8e7d6c5b4a3"
                    readOnly
                    className="bg-black/20 border-gray-700 text-xs sm:text-sm h-8 sm:h-9 lg:h-10"
                  />
                  <Button variant="outline" className="shrink-0 h-8 sm:h-9 lg:h-10 px-2 sm:px-3 lg:px-4 text-xs sm:text-sm">
                    <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" /> Copy
                  </Button>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs sm:text-sm lg:text-base text-gray-400 mb-3 sm:mb-4 lg:mb-5">
                  This file will self-destruct according to your security
                  settings.
                </p>
                <Button variant="destructive" className="h-8 sm:h-9 lg:h-10 px-3 sm:px-4 lg:px-5 text-xs sm:text-sm lg:text-base">
                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 mr-1 sm:mr-2" /> Emergency Destroy Now
                </Button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="w-[calc(100%-32px)] sm:max-w-[550px] md:max-w-[650px] lg:max-w-[700px] max-h-[92vh] sm:max-h-[95vh] bg-gray-900 text-white border border-gray-700 p-3 sm:p-4 lg:p-6">
        <DialogHeader className="mb-2 sm:mb-3 lg:mb-5">
          <DialogTitle className="text-base sm:text-lg lg:text-2xl font-bold flex items-center">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 mr-1 sm:mr-2 lg:mr-3 text-yellow-500" />
            {currentStep === 1
              ? "Secure File Upload"
              : currentStep === 2
                ? "Configure Security Settings"
                : "Mission Complete"}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm lg:text-base text-gray-400 mt-1 sm:mt-1.5">
            {currentStep === 1
              ? "Upload your classified file with advanced security protocols."
              : currentStep === 2
                ? "Set self-destruction rules and access controls."
                : "Your file is now secured with blockchain verification and ready to share."}
          </DialogDescription>
          <Button
            className="absolute right-3 top-3 sm:right-4 sm:top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 p-0"
            onClick={handleClose}
          >
            <X className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        <div className="py-1 sm:py-2 lg:py-4">
          <div className="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm lg:text-base ${currentStep >= 1 ? "bg-primary text-primary-foreground" : "bg-gray-800 text-gray-500"}`}
              >
                1
              </div>
              <div
                className={`h-1 sm:h-1.5 w-4 sm:w-7 lg:w-10 ${currentStep > 1 ? "bg-primary" : "bg-gray-800"}`}
              ></div>
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm lg:text-base ${currentStep >= 2 ? "bg-primary text-primary-foreground" : "bg-gray-800 text-gray-500"}`}
              >
                2
              </div>
              <div
                className={`h-1 sm:h-1.5 w-4 sm:w-7 lg:w-10 ${currentStep > 2 ? "bg-primary" : "bg-gray-800"}`}
              ></div>
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm lg:text-base ${currentStep >= 3 ? "bg-primary text-primary-foreground" : "bg-gray-800 text-gray-500"}`}
              >
                3
              </div>
            </div>
            <Badge variant="outline" className="bg-black/20 border-gray-700 text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1">
              {currentStep === 1
                ? "Upload"
                : currentStep === 2
                  ? "Configure"
                  : "Complete"}
            </Badge>
          </div>

          {renderStepContent()}
        </div>

        {/* Fixed footer with buttons always inside container */}
        <div className="mt-3 sm:mt-4 lg:mt-6 pt-3 sm:pt-4 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row sm:justify-between items-center w-full gap-2 sm:gap-3">
            {currentStep > 1 ? (
              <Button 
                variant="outline" 
                className="h-8 sm:h-9 lg:h-10 text-xs sm:text-sm lg:text-base px-3 sm:px-4 lg:px-5 w-full sm:w-auto" 
                onClick={handlePrevStep}
              >
                Back
              </Button>
            ) : (
              <div className="hidden sm:block"> </div> 
            )}
            {currentStep < 3 ? (
              <Button
                className="h-8 sm:h-9 lg:h-10 text-xs sm:text-sm lg:text-base px-3 sm:px-4 lg:px-5 w-full sm:w-auto"
                onClick={handleNextStep}
                disabled={currentStep === 1 && uploadStatus !== "complete"}
              >
                {currentStep === 1 ? "Next: Security Settings" : "Complete Setup"}
              </Button>
            ) : (
              <Button 
                variant="default" 
                className="h-8 sm:h-9 lg:h-10 text-xs sm:text-sm lg:text-base px-3 sm:px-4 lg:px-5 w-full sm:w-auto" 
                onClick={handleClose}
              >
                Close
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Add to your FileUploadModal.tsx
// After file upload is complete
const simulateBlockchainVerification = () => {
  // This would connect to your Ethereum contracts in production
  return new Promise((resolve) => {
    setTimeout(() => {
      const txHash = "0x" + Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2);
      resolve({
        verified: true,
        txHash,
        timestamp: new Date().toISOString()
      });
    }, 1500);
  });
};

export default FileUploadModal;