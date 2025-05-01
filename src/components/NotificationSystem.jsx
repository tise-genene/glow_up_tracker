import React, { useCallback } from 'react';
import { useLocalStorage } from '../utils/useLocalStorage';
import { showReminderNotification } from '../utils/notifications';

// Create a custom notification container component
const CustomNotificationContainer = () => {
  return (
    <div className="react-notifications-container">
      <div className="notifications top-right" />
    </div>
  );
};

function NotificationSystem() {
  const [settings] = useLocalStorage('settings', {
    notifications: true,
    weeklyReminder: 'Monday',
  });

  // Check if it's the reminder day
  const checkReminder = useCallback(() => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const reminderDay = settings.weeklyReminder;
    
    if (settings.notifications && today === reminderDay) {
      showReminderNotification();
    }
  }, [settings.notifications, settings.weeklyReminder]);

  // Check for reminder when component mounts
  React.useEffect(() => {
    checkReminder();
    // Check every hour
    const interval = setInterval(checkReminder, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [checkReminder]);

  return (
    <div className="fixed top-0 right-0 z-50 w-full">
      <CustomNotificationContainer />
    </div>
  );
}

export default NotificationSystem;
