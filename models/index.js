const User = require('./User');
const Request = require('./Request');



//Requests belongs to users
Request.belongsTo(User, {
  foreignKey: 'user_id'

})


module.exports = { User, Request };
