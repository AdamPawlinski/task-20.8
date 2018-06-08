const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://<AdamPawlinski>:<Flash78!>@ds235180.mlab.com:35180/users-db', {
    useMongoClient: true
});



const userSchema = new Schema({
  name: String,
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  admin: Boolean
});

const User = mongoose.model('User', userSchema);

userSchema.method('manify', function(next){
  var self = this;
  self.name = self.name + '-boy';
  return next(null, self.name);
});

userSchema.pre('save', function(next){
  const currentDate = newDate();
  this.updated_at = currentDate;
  if(!this.created_at) {
    this.created_at = currentDate;
    next();
  }
});

const zdzislaw = new User ({
  name: 'Zdzisław',
  username: 'Zdzisław_the_man',
  password: 'password'
});

zdzislaw.manify(function(err, name){
  if(err) throw err;
  console.log('Your name is: ' + name);
});

zdzislaw.save(function(err){
  if(err) throw err;
  console.log('User' + zdzislaw.name + 'successfully saved');
});

const benny = new User({
    name: 'Benny',
    username: 'Benny_the_boy',
    password: 'password'
});

benny.manify(function(err, name) {
    if (err) throw err;
    console.log('Your new name is ' + name);
});

benny.save(function(err) {
    if (err) throw err;
    console.log('User ' + benny.name +  ' succesfully saved');
});

const mark = new User({
    name: 'Mark',
    username: 'Mark_the_boy',
    password: 'password'
});

mark.manify(function(err, name) {
    if (err) throw err;
    console.log('Twoje nowe imię to: ' + name);
});

mark.save(function(err) {
    if (err) throw err;
    console.log('User ' + mark.name +  ' succesfully saved');
});

const findAllUsers = function(){
  const query = User.find({});
  const promise = query.exec();
  promise.then(function(records){
    console.log('Actual database records are ' + records);
  });
  promise.catch(function(reason){
    console.log('Something went wrong: ', reason);
  });
}

const findSpecificRecord = function() {
  User.find({username: 'Zdzisław_the_man'}).exec(function(err, res){
    if(err) throw err;
    console.log('Record you are looking for is ' + res);
  });
}

const updateUserPassword = function(){
  return User.find({username: 'Zdzisław_the_man'}, function(err, res){
    if(err) throw err;
    console.log('Old password is ' + user[0].password);
    user[0].password = 'newPassword';
    console.log('New password is ' + user[0].password);
    user[0].save(function(err){
      if(err) throw err;
      console.log('User ' + user[0].name + ' successfully updated');
    });
  });
}

const updateUsername = function (){
  return User.findOneAndUpdate({username: 'Benny_the_boy'}, {username: 'Benny_the_man'}, {new: true}, function(err, user){
    if(err) throw err;
    console.log('Username after updating is: ' + user.username);
  })
}

const findMarkAndDelete = function(){
  user.find({username: 'Mark_the_boy'}, function(err, user){
    if(err) throw err;
    user = user[0];
    user.remove(function(err){
        if(err) throw err;
        console.log('User successfully deleted');
    });
  });
}

const findBennyAndDelete = function(){
  user.find({username: 'Benny_the_man'}, function(err, user){
    if(err) throw err;
    user = user[0];
    user.remove(function(err){
        if(err) throw err;
        console.log('User successfully deleted');
    });
  });
}

const findZdzislawAndRemove = function(){
  return User.findOneAndRemove({username: 'Zdzislaw_the_man'})
    .then(function(user){
      return user.remove(function(){
        console.log('User successfully deleted');
      });
    });
}

Promise.all([zdzislaw.save(), mark.save(), benny.save()])
  .then(findAllUsers)
  .then(findSpecificRecord)
  .then(updateUserPassword)
  .then(updateUsername)
  .then(findMarkAndDelete)
  .then(findBennyAndDelete)
  .then(findZdzislawAndRemove)
  .catch(console.log.bind(console))
