const User = require('./user');
const Task = require('./task');
const Site = require('./site');
const Project = require('./project');
const Class = require('./class');
const Enrollment = require('./associationTables/enrollment');

//task can have only one user but user cn have many tasks

Task.belongsTo(User, {foreignKey: 'user_id'});
User.hasMany(Task);
// User.sync();
// Task.sync();

Task.belongsTo(Project);
// Task.sync();

//MANY TO MANY RELATIONSHIPS
Site.belongsToMany(User, {through: 'user_site'});
User.belongsToMany(Site, {through: 'user_site'});

Class.belongsToMany(User, {through: Enrollment});
User.belongsToMany(Class, {through: Enrollment});


// Site.sync();
// Task.sync();
// User.sync();
// Project.sync();
// Class.sync({alter: true});



module.exports = {
    Task, User, Site, Project, Class, Enrollment
}


// //Sites belong to one user each
// User.hasMany(Site);
// Site.hasMany(User, {foreignKey: 'user_id'});
// Site.sync({alter: true});

// //Projects have many tasks
// Project.hasMany(Task);
// Task.belongsTo(Project, {foreignKey: 'project_id'});
// Project.sync({alter: true});
// Task.sync({alter: true});

// //Classes have many projects
// Class.hasMany(Project);
// Project.belongsTo(Class, {foreignKey: 'class_id'});
// Class.sync({alter: true});
// Project.sync({alter: true});

// //Users have many classes
// User.hasMany(Class, {through: 'enrollment'});
// Class.hasMany(User, {through: 'enrollment'});
// User.sync({alter: true});
// Class.sync({alter: true});

// //Users have many sites
// User.hasMany(Site);
// Site.belongsTo(User, {foreignKey: 'user_id'});
// User.sync({alter: true});
// Site.sync({alter: true});

// //Users have many projects
// User.hasMany(Project, {foreignKey: 'user_id'});
// Project.belongsTo(User, {foreignKey: 'user_id'});
// User.sync({alter: true});
// Project.sync({alter: true});

