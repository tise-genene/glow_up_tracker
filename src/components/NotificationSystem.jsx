import React, { useEffect, useCallback } from 'react';
import { NotificationContainer } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { useLocalStorage } from '../utils/useLocalStorage';
import { showReminderNotification } from '../utils/notifications';

const NotificationSystem = () => {
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
  useEffect(() => {
    checkReminder();
    // Check every hour
    const interval = setInterval(checkReminder, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [checkReminder]);

  return (
    <NotificationContainer />
  );
};

export default NotificationSystem;
