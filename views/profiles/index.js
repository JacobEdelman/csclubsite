'use strict';

exports.init = function(req, res,next){ //i don't know about next
//hopefully this works with non admins
//the populate might cause some probs with people like non admins
  req.app.db.models.User.findOne({username:req.params.id}).populate('roles.admin', 'name.full').populate('roles.account', 'name.full').exec(function(err, user) {
    if (err||!user) {
      return next(err);
    }

    if (req.xhr) {//what is this???????????/
      res.send(user);
    }
    else {
      res.render('profiles/index', user);//now we can get detials about the user and pass to it and do stuff
    }
  });
  //later I will add options for errors
};

