const isAdmin = (req, res, next) => {
// If the user is not an admin, do not allow access
    if (!req.session.isAdmin) {
        res.redirect('/');
    } else {
        next();
  }
};

module.exports = isAdmin;