import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocalStorage } from '../utils/useLocalStorage';

const ProgressChart = () => {
  const [weeklyProgress, setWeeklyProgress] = useLocalStorage('weeklyProgress', []);
  const [currentWeek] = useLocalStorage('currentWeek', {
    weekNumber: 1,
    year: new Date().getFullYear(),
    categories: {
      confidence: false,
      style: false,
      fitness: false,
      social: false,
      focus: false,
    },
    wins: '',
  });

  // Update weekly progress when currentWeek changes
  useEffect(() => {
    const progress = weeklyProgress;
    const lastWeek = progress[progress.length - 1];

    // Only add new week if it's different from last week
    if (!lastWeek || 
        lastWeek.year !== currentWeek.year || 
        lastWeek.weekNumber !== currentWeek.weekNumber) {
      progress.push({
        ...currentWeek,
        timestamp: new Date().toISOString()
      });
      setWeeklyProgress(progress);
    }
  }, [currentWeek, weeklyProgress, setWeeklyProgress]);

  // Calculate progress for each week
  const calculateProgress = (week) => {
    const completed = Object.values(week.categories).filter(Boolean).length;
    const total = Object.keys(week.categories).length;
    return (completed / total) * 100;
  };

  // Get last 5 weeks of progress
  const lastFiveWeeks = weeklyProgress.slice(-5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 bg-white rounded-xl shadow-lg border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Progress Over Time</h2>
      <div className="space-y-4">
        {lastFiveWeeks.map((week, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ delay: index * 0.1 }}
            className="bg-green-500 h-2.5 rounded-full"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Week {week.weekNumber} - {week.year}
              </span>
              <span className="text-sm font-medium">
                {calculateProgress(week).toFixed(1)}%
              </span>
            </div>
            <div className="bg-gray-100 rounded-full h-2.5">
              <motion.div 
                initial={{ width: '0%' }}
                animate={{ width: `${calculateProgress(week)}%` }}
                transition={{ duration: 0.5 }}
                className="bg-blue-600 h-2.5 rounded-full"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProgressChart;
