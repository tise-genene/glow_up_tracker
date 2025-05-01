import { useState } from 'react';
import { useLocalStorage } from '../utils/useLocalStorage';
import { motion } from 'framer-motion';
import emailService from '../services/emailService';

const Profile = () => {
  const [profile, setProfile] = useLocalStorage('profile', {
    name: '',
    email: '',
    receiveEmails: true,
  });

  const [showProfile, setShowProfile] = useState(false);

  const handleProfileToggle = () => {
    setShowProfile(!showProfile);
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    setProfile({
      name: e.target.name.value,
      email: e.target.email.value,
      receiveEmails: e.target.receiveEmails.checked,
    });
  };

  const handleSendTestEmail = async () => {
    if (!profile.email) {
      alert('Please enter your email first');
      return;
    }

    try {
      const content = await emailService.sendWeeklySummary(profile.email, profile.name);
      alert('Test email content generated successfully!');
      console.log('Test email content:', content);
    } catch (error) {
      console.error('Error sending test email:', error);
      alert('Failed to send test email');
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleProfileToggle}
        className="p-3 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </motion.button>

      {showProfile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed top-16 right-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96"
        >
          <h2 className="text-xl font-bold mb-4">Profile Settings</h2>

          <form onSubmit={handleProfileSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                defaultValue={profile.name}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                defaultValue={profile.email}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="receiveEmails"
                  defaultChecked={profile.receiveEmails}
                  className="mr-2"
                />
                Receive weekly summary emails
              </label>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleSendTestEmail}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                Send Test Email
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                Save Profile
              </button>
            </div>
          </form>

          <button
            onClick={handleProfileToggle}
            className="mt-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            Close
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Profile;
