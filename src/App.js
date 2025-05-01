import React from 'react';
import './App.css';
import WeekTracker from './components/WeekTracker';
import Dashboard from './components/Dashboard';
import ProgressChart from './components/ProgressChart';
import ThemeToggle from './components/ThemeToggle';
import SettingsPanel from './components/SettingsPanel';
import NotificationSystem from './components/NotificationSystem';
import Profile from './components/Profile';
import EmailTemplates from './components/EmailTemplates';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                GlowUp Boss Tracker
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <SettingsPanel />
              <EmailTemplates />
            </div>
          </div>
        </div>
      </nav>

      <div className="fixed top-0 right-0 z-50 w-full">
        <NotificationSystem />
      </div>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <Dashboard />
              <ProgressChart />
            </div>
            <WeekTracker />
          </div>
        </div>
      </main>
      <Profile />
    </div>
  );
}

export default App;
