import React, { useCallback, useEffect } from 'react';
import { useLocalStorage } from '../utils/useLocalStorage';
import { showReminderNotification } from '../utils/notifications';

function NotificationSystem() {
  const [settings] = useLocalStorage('settings', {
    notifications: true,
    weeklyReminder: 'Monday',
  });

  // Initialize notification store
  useEffect(() => {
    if (!window.notificationStore) {
      window.notificationStore = {
        notifications: [],
        addNotification: (notification) => {
          const id = Date.now();
          const newNotification = {
            ...notification,
            id,
            createdAt: new Date(),
          };
          window.notificationStore.notifications.push(newNotification);
          return id;
        },
        removeNotification: (id) => {
          window.notificationStore.notifications = window.notificationStore.notifications.filter(n => n.id !== id);
        },
        clearNotifications: () => {
          window.notificationStore.notifications = [];
        }
      };
    }
    // Initialize the actual React Notifications store
    if (!window.store) {
      window.store = window.notificationStore;
    }
  }, []);

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
    <div className="fixed top-0 right-0 z-50 w-full">
      <div className="react-notifications-container">
        <div className="notifications top-right" />
      </div>
    </div>
  );
}

export default NotificationSystem;
