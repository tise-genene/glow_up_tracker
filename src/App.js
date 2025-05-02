import React, { useEffect } from 'react';
import './App.css';
import WeekTracker from './components/WeekTracker';
import Dashboard from './components/Dashboard';
import ProgressChart from './components/ProgressChart';
import ThemeToggle from './components/ThemeToggle';
import SettingsPanel from './components/SettingsPanel';
import Profile from './components/Profile';
import EmailTemplates from './components/EmailTemplates';
import Goals from './components/Goals';
import Notifications from './components/Notifications';

function App() {
  // Get theme from localStorage or default to light
  const theme = localStorage.getItem('theme') || 'light';
  
  // Apply theme class to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="container">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                <span className="text-blue-600">GlowUp</span> Boss Tracker
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

      {/* Hero Section */}
      <div className="container py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to GlowUp Boss Tracker
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Track your goals, monitor progress, and stay motivated with our easy-to-use dashboard.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
              Start Tracking
            </button>
            <button className="inline-flex items-center px-8 py-4 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
              View Tutorial
            </button>
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 h-full">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Set Your Goals
            </h3>
            <p className="text-gray-600 mb-4">
              Define what you want to achieve and set clear objectives.
            </p>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200">
              Get Started
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 h-full">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Track Progress
            </h3>
            <p className="text-gray-600 mb-4">
              Monitor your daily progress and stay on track with our intuitive dashboard.
            </p>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200">
              Start Tracking
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 h-full">
            <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Stay Motivated
            </h3>
            <p className="text-gray-600 mb-4">
              Get weekly reminders and insights to keep you motivated.
            </p>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200">
              Set Reminders
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Dashboard */}
          <div className="bg-white rounded-xl shadow-lg p-8 h-full">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Dashboard
            </h3>
            <p className="text-gray-600 mb-6">
              Monitor your overall progress and key metrics
            </p>
            <Dashboard />
          </div>

          {/* Progress & Goals */}
          <div className="bg-white rounded-xl shadow-lg p-8 h-full">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Progress & Goals
            </h3>
            <p className="text-gray-600 mb-6">
              Track your goals and monitor daily progress
            </p>
            <div className="space-y-4">
              <Goals />
              <ProgressChart />
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-lg p-8 h-full">
            <Notifications />
          </div>

          {/* Weekly Tracker */}
          <div className="bg-white rounded-xl shadow-lg p-8 h-full">
            <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Weekly Tracker
            </h3>
            <p className="text-gray-600 mb-6">
              Track your weekly progress and stay on track
            </p>
            <WeekTracker />
          </div>

          {/* Profile & Settings */}
          <div className="bg-white rounded-xl shadow-lg p-8 h-full md:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Your Profile
            </h3>
            <p className="text-gray-600 mb-6">
              Manage your account and preferences
            </p>
            <Profile />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
