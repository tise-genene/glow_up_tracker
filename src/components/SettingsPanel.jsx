import { useLocalStorage } from '../utils/useLocalStorage';
import { motion } from 'framer-motion';
import { useState } from 'react';

const SettingsPanel = () => {
  const [settings, setSettings] = useLocalStorage('settings', {
    notifications: true,
    weeklyReminder: 'Monday',
    theme: 'system',
    showProgressChart: true,
    showEmoji: true,
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleExport = () => {
    const data = localStorage.getItem('weeklyProgress');
    const blob = new Blob([data], { type: 'text/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'glowup-progress.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggle}
        className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-20 right-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96"
        >
          <h2 className="text-xl font-bold mb-4">Settings</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Weekly Reminder
              </label>
              <select
                value={settings.weeklyReminder}
                onChange={(e) => {
                  setSettings((prev) => ({
                    ...prev,
                    weeklyReminder: e.target.value,
                  }));
                }}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
              </select>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => {
                    setSettings((prev) => ({
                      ...prev,
                      notifications: e.target.checked,
                    }));
                  }}
                  className="mr-2"
                />
                Enable Notifications
              </label>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.showProgressChart}
                  onChange={(e) => {
                    setSettings((prev) => ({
                      ...prev,
                      showProgressChart: e.target.checked,
                    }));
                  }}
                  className="mr-2"
                />
                Show Progress Chart
              </label>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.showEmoji}
                  onChange={(e) => {
                    setSettings((prev) => ({
                      ...prev,
                      showEmoji: e.target.checked,
                    }));
                  }}
                  className="mr-2"
                />
                Show Emoji
              </label>
            </div>

            <button
              onClick={handleExport}
              className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Export Progress Data
            </button>
          </div>

          <button
            onClick={handleToggle}
            className="mt-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            Close
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default SettingsPanel;
