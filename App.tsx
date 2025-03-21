import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import DashboardContent from "./components/dashboard/DashboardContent";
import FileUploadModal from "./components/files/FileUploadModal";
import MessageComposer from "./components/messages/MessageComposer";
import FileAccessPage from "./components/files/FileAccessPage";

// Define minimal placeholder components for routes that don't exist yet
const Settings = () => <div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p className="mt-4 text-gray-400">System settings page (under development)</p></div>;
const Profile = () => <div className="p-6"><h1 className="text-2xl font-bold">Profile</h1><p className="mt-4 text-gray-400">User profile page (under development)</p></div>;
const Notifications = () => <div className="p-6"><h1 className="text-2xl font-bold">Notifications</h1><p className="mt-4 text-gray-400">Notifications page (under development)</p></div>;

// Optional: Create a simple placeholder for AISecurityLog if it doesn't exist yet
const AISecurityLog = () => <div className="p-6"><h1 className="text-2xl font-bold">Security Log</h1><p className="mt-4 text-gray-400">AI Security monitoring (under development)</p></div>;

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<DashboardContent />} />
          <Route path="dashboard" element={<DashboardContent />} />
          <Route path="files" element={<FileUploadModal open={true} onOpenChange={() => {}} />} />
          <Route path="messages" element={<MessageComposer isOpen={true} onClose={() => {}} />} />
          <Route path="security-log" element={<AISecurityLog />} />
          <Route path="settings" element={<Settings />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        {/* Add the file access route */}
        <Route path="/access/:accessId" element={<FileAccessPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
