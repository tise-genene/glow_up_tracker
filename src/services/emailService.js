const emailService = {
  sendWeeklySummary: async (email, name, currentWeek) => {
    // Calculate progress
    const completedCategories = Object.values(currentWeek.categories).filter(Boolean).length;
    const totalCategories = Object.keys(currentWeek.categories).length;
    const progressPercentage = (completedCategories / totalCategories) * 100;

    // Format the email content
    const emailContent = `
      <h2>Weekly Glow-Up Summary</h2>
      <p>Hi ${name},</p>
      <p>Here's your weekly glow-up summary:</p>
      
      <h3>Weekly Progress (${currentWeek.year}-W${currentWeek.weekNumber})</h3>
      <p>Overall Progress: ${progressPercentage.toFixed(1)}%</p>
      
      <h3>Category Progress:</h3>
      <ul>
        ${Object.entries(currentWeek.categories)
          .map(([category, completed]) => 
            `<li>${category}: ${completed ? '✅' : '❌'}</li>`
          )
          .join('')}
      </ul>
      
      <h3>This Week's Wins:</h3>
      <p>${currentWeek.wins || 'No wins recorded this week'}</p>
      
      <p>Keep up the great work!</p>
      <p>GlowUp Boss Tracker</p>
    `;

    // In a real application, you would send this email using an email service
    // For now, we'll just return the content
    return emailContent;
  },

  sendReminder: async (email, name, settings) => {
    const emailContent = `
      <h2>Weekly Glow-Up Reminder</h2>
      <p>Hi ${name},</p>
      <p>It's ${settings.weeklyReminder}! Don't forget to track your progress for this week.</p>
      <p>Log in to your GlowUp Boss Tracker to update your progress.</p>
      <p>GlowUp Boss Tracker</p>
    `;

    return emailContent;
  }
};

export default emailService;
