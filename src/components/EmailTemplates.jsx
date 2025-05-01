import { useState } from 'react';
import { useLocalStorage } from '../utils/useLocalStorage';
import { motion } from 'framer-motion';

const EmailTemplates = () => {
  const [settings] = useLocalStorage('settings', {
    emailTemplate: 'default',
    emailSignature: 'GlowUp Boss Tracker',
    emailTheme: 'light',
  });

  const [preview, setPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('default');

  const templates = {
    default: {
      name: 'Default Template',
      description: 'Clean and professional layout',
      preview: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
          <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">Weekly Glow-Up Summary</h1>
          <p style="color: #666; margin-bottom: 20px;">Hi [Name],</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h2 style="color: #333; margin-bottom: 15px;">Your Progress</h2>
            <p style="color: #666;">Overall Progress: [Progress]%</p>
          </div>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h2 style="color: #333; margin-bottom: 15px;">Wins of the Week</h2>
            <p style="color: #666;">[Wins]</p>
          </div>
          <p style="color: #666; margin-top: 20px;">${settings.emailSignature}</p>
        </div>
      `
    },
    modern: {
      name: 'Modern Template',
      description: 'Minimalist and contemporary design',
      preview: `
        <div style="max-width: 600px; margin: 0 auto; padding: 30px; background-color: #f8fafc;">
          <div style="background-color: #ffffff; padding: 25px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #1a56db; font-size: 28px; margin-bottom: 25px; font-weight: 600;">Glow-Up Weekly</h1>
            <div style="display: flex; gap: 15px; margin-bottom: 25px;">
              <div style="flex: 1; background-color: #e3f2fd; padding: 15px; border-radius: 8px;">
                <h3 style="color: #1a56db; font-size: 18px; margin-bottom: 10px;">Progress</h3>
                <p style="color: #648299;">[Progress]%</p>
              </div>
              <div style="flex: 1; background-color: #e3f2fd; padding: 15px; border-radius: 8px;">
                <h3 style="color: #1a56db; font-size: 18px; margin-bottom: 10px;">Wins</h3>
                <p style="color: #648299;">[Wins]</p>
              </div>
            </div>
            <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px;">
              <h3 style="color: #1a56db; font-size: 18px; margin-bottom: 15px;">Areas of Focus</h3>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="color: #1a56db;">•</span>
                  <span style="color: #648299;">Confidence</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="color: #1a56db;">•</span>
                  <span style="color: #648299;">Style</span>
                </div>
              </div>
            </div>
          </div>
          <p style="color: #648299; text-align: center; margin-top: 20px;">${settings.emailSignature}</p>
        </div>
      `
    },
    motivational: {
      name: 'Motivational Template',
      description: 'Inspiring and encouraging design',
      preview: `
        <div style="max-width: 600px; margin: 0 auto; padding: 30px; background-color: #0a192f; color: #ffffff;">
          <div style="background-color: #112240; padding: 25px; border-radius: 10px;">
            <h1 style="color: #64ffda; font-size: 28px; margin-bottom: 25px; font-weight: 600;">Glow-Up Journey</h1>
            <div style="display: flex; gap: 15px; margin-bottom: 25px;">
              <div style="flex: 1; background-color: #1a2a42; padding: 15px; border-radius: 8px;">
                <h3 style="color: #64ffda; font-size: 18px; margin-bottom: 10px;">Your Progress</h3>
                <p style="color: #8892b0;">[Progress]%</p>
              </div>
              <div style="flex: 1; background-color: #1a2a42; padding: 15px; border-radius: 8px;">
                <h3 style="color: #64ffda; font-size: 18px; margin-bottom: 10px;">Victories</h3>
                <p style="color: #8892b0;">[Wins]</p>
              </div>
            </div>
            <div style="background-color: #1a2a42; padding: 20px; border-radius: 8px;">
              <h3 style="color: #64ffda; font-size: 18px; margin-bottom: 15px;">Areas of Growth</h3>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="color: #64ffda;">•</span>
                  <span style="color: #8892b0;">Confidence</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="color: #64ffda;">•</span>
                  <span style="color: #8892b0;">Style</span>
                </div>
              </div>
            </div>
            <div style="text-align: center; margin-top: 20px;">
              <p style="color: #8892b0;">"You're making incredible progress! Keep shining."</p>
              <p style="color: #8892b0; margin-top: 10px;">${settings.emailSignature}</p>
            </div>
          </div>
        </div>
      `
    }
  };

  const handleTemplateChange = (template) => {
    setSelectedTemplate(template);
  };

  const handlePreview = () => {
    setPreview(true);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePreview}
        className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 1a3 3 0 00-3 3v8a3 3 0 003 3h8a3 3 0 003-3v-8a3 3 0 00-3-3m-8 14l2 2m0 0l6-6m-6 6V3"
          />
        </svg>
      </motion.button>

      {preview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-20 left-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96"
        >
          <h2 className="text-xl font-bold mb-4">Email Templates</h2>

          <div className="space-y-4">
            {Object.entries(templates).map(([key, template]) => (
              <div key={key}>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="template"
                    value={key}
                    checked={selectedTemplate === key}
                    onChange={() => handleTemplateChange(key)}
                    className="text-blue-600"
                  />
                  <span className="font-medium">{template.name}</span>
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{template.description}</p>
              </div>
            ))}

            <div className="mt-4">
              <button
                onClick={() => {
                  setPreview(false);
                  // Save template selection
                }}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Save Template
              </button>
            </div>
          </div>

          <button
            onClick={() => setPreview(false)}
            className="mt-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            Close
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default EmailTemplates;
