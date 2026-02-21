const User = require('./User');
const Topic = require('./Topic');
const DailyPost = require('./DailyPost');
const UserProgress = require('./UserProgress');

// Associations
User.hasMany(DailyPost, { foreignKey: 'user_id', as: 'posts' });
DailyPost.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Topic.hasMany(DailyPost, { foreignKey: 'topic_id', as: 'posts' });
DailyPost.belongsTo(Topic, { foreignKey: 'topic_id', as: 'topic' });

User.hasMany(UserProgress, { foreignKey: 'user_id', as: 'progress' });
UserProgress.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = { User, Topic, DailyPost, UserProgress };
