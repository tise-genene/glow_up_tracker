import { useLocalStorage } from '../utils/useLocalStorage';
import { motion } from 'framer-motion';

const Dashboard = () => {
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

  // Calculate progress percentage
  const completedCategories = Object.values(currentWeek.categories).filter(Boolean).length;
  const totalCategories = Object.keys(currentWeek.categories).length;
  const progressPercentage = (completedCategories / totalCategories) * 100;

  // Categories with emojis
  const categories = [
    { id: 'confidence', label: 'Confidence', emoji: '💪', color: 'blue' },
    { id: 'style', label: 'Style', emoji: '👕', color: 'purple' },
    { id: 'fitness', label: 'Fitness', emoji: '🏋️', color: 'green' },
    { id: 'social', label: 'Social', emoji: '👥', color: 'pink' },
    { id: 'focus', label: 'Focus', emoji: '🎯', color: 'yellow' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800"
    >
      <h2 className="text-2xl font-bold mb-6">Your Weekly Progress</h2>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="mb-2 text-sm font-medium">Weekly Progress</div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <motion.div 
            initial={{ width: '0%' }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1 }}
            className="bg-blue-600 h-2.5 rounded-full"
          />
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {completedCategories}/{totalCategories} completed
        </div>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categories.indexOf(category) * 0.1 }}
            className="text-center"
          >
            <div className={`p-4 rounded-lg text-2xl transition-colors ${
              currentWeek.categories[category.id]
                ? `bg-${category.color}-500 text-white`
                : 'bg-gray-200 dark:bg-gray-700'
            }`}>
              {category.emoji}
            </div>
            <p className="mt-2 text-sm">
              {category.label}
              <span className={`ml-1 ${
                currentWeek.categories[category.id]
                  ? `text-${category.color}-500`
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {currentWeek.categories[category.id] ? '✅' : '❌'}
              </span>
            </p>
          </motion.div>
        ))}
      </div>

      {/* Wins Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">This Week's Wins</h3>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.5 }}
          className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700"
        >
          {currentWeek.wins ? (
            <p className="text-gray-800 dark:text-gray-300">{currentWeek.wins}</p>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No wins recorded yet</p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
