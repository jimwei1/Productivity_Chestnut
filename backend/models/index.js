const User = require('./user');
const Task = require('./task');

//task can have only one user but user cn have many tasks

Task.belongsTo(User, {foreignKey: 'user_id'});
User.hasMany(Task);
User.sync({alter: true});
Task.sync({alter: true});
module.exports = {
    Task, User
}