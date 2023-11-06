const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');
const isAdmin = require("../../utils/admin");

// get all users from database
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
  
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// check for user in db to login to system/sets session information for admin, logged in, and user id.
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.email = userData.email;
      req.session.logged_in = true;
      req.session.isAdmin = userData.isAdmin;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//logout user form system
router.post('/logout', withAuth, (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.render('login');
    });
  } else {
    res.status(404).end();
  }
});

// create user in system, requires admin rights
router.post('/', isAdmin, async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});


// Delete User from system
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const projectData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No userfound with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
