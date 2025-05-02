import { useState } from 'react';
import { useLocalStorage } from '../utils/useLocalStorage';

const categories = [
  { id: 'confidence', label: 'Confidence', emoji: '💪' },
  { id: 'style', label: 'Style', emoji: '👕' },
  { id: 'fitness', label: 'Fitness', emoji: '🏋️' },
  { id: 'social', label: 'Social', emoji: '👥' },
  { id: 'focus', label: 'Focus', emoji: '🎯' },
];

const WeekTracker = () => {
  const [currentWeek, setCurrentWeek] = useLocalStorage('currentWeek', {
    weekNumber: 1,
    year: new Date().getFullYear(),
    categories: categories.reduce((acc, cat) => ({
      ...acc,
      [cat.id]: false,
    }), {}),
    wins: '',
  });

  const [wins, setWins] = useState(currentWeek.wins);

  const toggleCategory = (categoryId) => {
    setCurrentWeek((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [categoryId]: !prev.categories[categoryId],
      },
    }));
  };

  const saveWins = (e) => {
    setWins(e.target.value);
    setCurrentWeek((prev) => ({
      ...prev,
      wins: e.target.value,
    }));
  };

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2
        className="text-sm font-medium text-gray-600"
      >
        This Week's Glow-Up
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="text-center">
            <button
              onClick={() => toggleCategory(category.id)}
              className={`p-4 rounded-lg text-2xl transition-colors ${
                currentWeek.categories[category.id]
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              {category.emoji}
            </button>
            <p
              className="text-center p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 text-sm"
            >
              {category.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <label className="block text-sm font-medium mb-2">
          This Week's Wins
        </label>
        <textarea
          value={wins}
          onChange={saveWins}
          rows={4}
          className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="What did you accomplish this week?"
        />
      </div>
    </div>
  );
};

export default WeekTracker;
