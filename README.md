# Glow-Up Boss Tracker

A modern web application to help you track your personal growth journey across various categories including confidence, style, fitness, social skills, and focus.

## Features

- 📊 Weekly progress tracking with visual progress bars
- 📅 Weekly reminders to stay on track
- 📧 Weekly summary emails with progress and wins
- 🎨 Customizable email templates
- 🌓 Dark mode support
- 📱 Mobile-responsive design
- 🎉 Animated notifications for achievements
- 📋 Detailed progress history and charts
- 🎮 Fun emoji-based progress tracking
- 📱 Mobile-friendly interface

## Tech Stack

- React
- Tailwind CSS
- Framer Motion (for animations)
- Local Storage (for data persistence)
- React Notifications Component
- SendGrid (for email functionality)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Project Structure

```
glowup-tracker/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── WeekTracker.jsx
│   │   ├── ProgressChart.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── SettingsPanel.jsx
│   │   ├── NotificationSystem.jsx
│   │   ├── Profile.jsx
│   │   └── EmailTemplates.jsx
│   ├── services/
│   │   └── emailService.js
│   ├── utils/
│   │   └── useLocalStorage.js
│   ├── App.js
│   └── index.js
├── public/
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to the React community for amazing tools and libraries
- Special thanks to Tailwind CSS for the styling framework
- Framer Motion for the smooth animations
