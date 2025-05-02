import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from '../utils/useLocalStorage';

const Notifications = () => {
  const [notifications, setNotifications] = useLocalStorage('notifications', []);
  const achievements = useState(() => {
    try {
      const item = window.localStorage.getItem('achievements');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      return [];
    }
  })[0];
  const [unreadCount, setUnreadCount] = useState(0);

  // Notification types
  const notificationTypes = {
    achievement: {
      icon: '🌟',
      color: 'bg-blue-500',
      title: 'Achievement Unlocked!'
    },
    reminder: {
      icon: '⏰',
      color: 'bg-yellow-500',
      title: 'Weekly Reminder'
    },
    progress: {
      icon: '📈',
      color: 'bg-green-500',
      title: 'Progress Update'
    },
    milestone: {
      icon: '🎯',
      color: 'bg-purple-500',
      title: 'Milestone Reached'
    }
  };

  // Achievement types
  const achievementTypes = {
    milestone: {
      title: 'Milestone Reached',
      description: 'You reached a significant milestone!',
      points: 100
    },
    progress: {
      title: 'Progress Made',
      description: 'You made progress on your goals!',
      points: 50
    },
    reminder: {
      title: 'Reminder Set',
      description: 'You set a reminder for your goals!',
      points: 10
    }
  };

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
    setUnreadCount(prev => prev - 1);
  };

  // Clear all notifications
  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  // Auto-clear old notifications
  useEffect(() => {
    const now = new Date();
    const cleanedNotifications = notifications.filter(notification => {
      const diff = now - new Date(notification.timestamp);
      return diff < 7 * 24 * 60 * 60 * 1000; // Keep notifications for 7 days
    });
    setNotifications(cleanedNotifications);
  }, [notifications, setNotifications]);

  // Add achievement based on type


  return (
    <div className="flex flex-col space-y-4">
      {/* Notification Badge */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Notifications</h3>
        {unreadCount > 0 && (
          <span className="px-2 py-1 text-xs rounded-full bg-blue-500 text-white">
            {unreadCount}
          </span>
        )}
      </div>

      {/* Achievements Section */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h4 className="text-xl font-semibold mb-4">Achievements</h4>
        <div className="space-y-3">
          {achievements.map(achievement => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <span className={`text-2xl ${achievementTypes[achievement.type].color}`}>
                  {notificationTypes.achievement.icon}
                </span>
                <div>
                  <h5 className="font-medium">{achievement.title}</h5>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(achievement.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h4 className="text-xl font-semibold mb-4">Notifications</h4>
        <AnimatePresence>
          {notifications.map(notification => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`flex items-center justify-between p-3 ${
                notification.read ? 'bg-gray-50' : 'bg-white'
              } rounded-lg transition-colors duration-200 hover:bg-gray-100`}
            >
              <div className="flex items-center space-x-3">
                <span className={`text-2xl ${notificationTypes[notification.type].color}`}>
                  {notificationTypes[notification.type].icon}
                </span>
                <div>
                  <h5 className="font-medium">{notificationTypes[notification.type].title}</h5>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(notification.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => markAsRead(notification.id)}
                className="text-gray-500 hover:text-gray-700"
              >
                {notification.read ? 'Mark Unread' : 'Mark Read'}
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Clear All Button */}
      {notifications.length > 0 && (
        <button
          onClick={clearAll}
          className="text-red-500 hover:text-red-700"
        >
          Clear All Notifications
        </button>
      )}
    </div>
  );
};

export default Notifications;
