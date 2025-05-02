import { useState, useEffect } from 'react';
import { useLocalStorage } from '../utils/useLocalStorage';
import { motion } from 'framer-motion';

const Goals = () => {
  const [goals, setGoals] = useLocalStorage('goals', []);
  const [goalNotes, setGoalNotes] = useState({});
  const [goalProgress, setGoalProgress] = useState({});
  const [newGoal, setNewGoal] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('confidence');

  const categories = [
    { id: 'confidence', label: 'Confidence', emoji: '💪' },
    { id: 'style', label: 'Style', emoji: '👕' },
    { id: 'fitness', label: 'Fitness', emoji: '🏋️' },
    { id: 'social', label: 'Social', emoji: '👥' },
    { id: 'focus', label: 'Focus', emoji: '🎯' },
  ];

  const addGoal = () => {
    if (newGoal.trim()) {
      const newGoalData = {
        id: Date.now(),
        text: newGoal,
        category: selectedCategory,
        createdAt: new Date(),
        completed: false,
        dueDate: null,
        priority: 'medium',
        notes: '',
        progress: 0
      };
      setGoals([...goals, newGoalData]);
      setNewGoal('');
      // Trigger achievement for new goal
      triggerAchievement('new_goal');
    }
  };

  const triggerAchievement = (type) => {
    // This will be connected to the Notifications component
    console.log('Triggering achievement:', type);
  };

  const openGoalNotes = (id) => {
    setGoalNotes(prev => ({
      ...prev,
      [id]: true
    }));
  };

  const closeGoalNotes = (id) => {
    setGoalNotes(prev => ({
      ...prev,
      [id]: false
    }));
  };

  const saveGoalNote = (id, note) => {
    setGoals(goals.map(goal =>
      goal.id === id ? { ...goal, notes: note } : goal
    ));
    closeGoalNotes(id);
  };

  // Initialize progress for existing goals
  useEffect(() => {
    const initialProgress = {};
    goals.forEach(goal => {
      initialProgress[goal.id] = goal.progress || 0;
    });
    setGoalProgress(initialProgress);
  }, [goals]);

  const updateGoalProgress = (id, progress) => {
    setGoalProgress(prev => ({
      ...prev,
      [id]: progress
    }));
    setGoals(goals.map(goal =>
      goal.id === id ? { ...goal, progress } : goal
    ));
    // Trigger achievement for progress milestones
    if (progress === 100) {
      triggerAchievement('goal_completed');
    }
  };

  const toggleGoal = (id) => {
    setGoals(goals.map(goal =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
    // Trigger achievement for goal completion
    if (goals.find(goal => goal.id === id)?.completed) {
      triggerAchievement('goal_completed');
    }
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Goals</h2>

      {/* Add Goal Form */}
      <div className="mb-6">
        <div className="flex space-x-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.emoji} {cat.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Enter your goal..."
            className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
          />
          <button
            onClick={addGoal}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Add Goal
          </button>
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: goals.indexOf(goal) * 0.1 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
          <div
            key={goal.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleGoal(goal.id)}
                  className={`p-2 rounded-full ${
                    goal.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {goal.completed ? '✅' : '❌'}
                </button>
                <div className="w-24">
                  <div className="text-xs text-gray-500">Progress</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${goalProgress[goal.id] || goal.progress}%` }}
                    />
                  </div>
                  <div className="mt-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={goalProgress[goal.id] || goal.progress}
                      onChange={(e) => updateGoalProgress(goal.id, parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <div>
                  <p className="font-medium">{goal.text}</p>
                  {goal.dueDate && (
                    <small className="text-gray-500">
                      Due: {new Date(goal.dueDate).toLocaleDateString()}
                    </small>
                  )}
                </div>
                <small className="text-gray-500">
                  {goal.category === 'confidence' && '💪 Confidence'}
                  {goal.category === 'style' && '👕 Style'}
                  {goal.category === 'fitness' && '🏋️ Fitness'}
                  {goal.category === 'social' && '👥 Social'}
                  {goal.category === 'focus' && '🎯 Focus'}
                </small>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500">Priority:</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      goal.priority === 'high' ? 'bg-red-100 text-red-600' :
                      goal.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {goal.priority}
                    </span>
                  </div>
                  <button
                    onClick={() => openGoalNotes(goal.id)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    {goalNotes[goal.id] ? 'Close Note' : 'Add Note'}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              {goalNotes[goal.id] && (
                <div className="mt-2">
                  <textarea
                    value={goal.notes}
                    onChange={(e) => saveGoalNote(goal.id, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    placeholder="Add notes about this goal..."
                  />
                </div>
              )}
              <button
                onClick={() => deleteGoal(goal.id)}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Delete
              </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Goals Message */}
      {!goals.length && (
        <div className="text-center py-8 text-gray-500">
          <p>No goals set yet. Start by adding your first goal above!</p>
        </div>
      )}
    </div>
  );
};

export default Goals;
