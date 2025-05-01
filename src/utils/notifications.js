import { store } from 'react-notifications-component';

// Initialize the store if it doesn't exist
if (!store) {
  console.error('Notification store not initialized');
  store = {
    addNotification: (notification) => {
      console.error('Notification store not properly initialized');
    }
  };
}

// Add CSS classes for animations
const animationClasses = {
  fadeIn: 'animate__animated animate__fadeIn',
  fadeOut: 'animate__animated animate__fadeOut'
};

export const showReminderNotification = () => {
  store.addNotification({
    title: "Weekly Reminder",
    message: "Check your progress and set goals for this week!",
    type: "info",
    insert: "top",
    container: "top-right",
    animationIn: animationClasses.fadeIn,
    animationOut: animationClasses.fadeOut,
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};

export const showSuccessNotification = (message) => {
  store.addNotification({
    title: "Success!",
    message,
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: animationClasses.fadeIn,
    animationOut: animationClasses.fadeOut,
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  });
};

export const showErrorNotification = (message) => {
  store.addNotification({
    title: "Error",
    message,
    type: "danger",
    insert: "top",
    container: "top-right",
    animationIn: animationClasses.fadeIn,
    animationOut: animationClasses.fadeOut,
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};