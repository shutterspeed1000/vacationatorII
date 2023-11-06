const router = require('express').Router();
const { where } = require('sequelize');
const { User, Request } = require('../models');
const withAuth = require('../utils/auth');
const isAdmin  = require('../utils/admin')



// route to login page in Handlebars
  router.get('/login',  async (req, res) => {
    res.render('login')
  });


// route to new request page, req to logged in
  router.get('/request', withAuth, async (req, res) => {
    res.render(`requests`, {logged_in: req.session.logged_in, isAdmin: req.session.isAdmin })
  });

  

  //route to new-user page, req admin rights
  router.get('/newuser', isAdmin, async (req, res) => {
    res.render('newuser')
  });


  //route to home to display all requests, req user to be logged in
   router.get("/", withAuth, async (req, res) => {

    try{
      const userRequest = await Request.findAll({
        include: [{ model: User }],
        where: {user_id: req.session.user_id},
      });

      console.log(userRequest)
      const usrReq = userRequest.map(post => post.get({ plain: true }))
      console.log(usrReq)
      res.render('home', {usrReq,logged_in: req.session.logged_in, isAdmin: req.session.isAdmin });

    }catch (err) {
      res.status(500).json(err);
      console.log
    }
  });

//route for approvals page, req user to be admin
router.get("/approve", isAdmin, async (req, res) => {

  try{
    const userRequest = await Request.findAll({
      include: [{ model: User }],
    });

    console.log(userRequest)
    const usrReq = userRequest.map(post => post.get({ plain: true }))
    console.log(usrReq)
    res.render('approve', {usrReq,logged_in: req.session.logged_in, isAdmin: req.session.isAdmin});

  }catch (err) {
    res.status(500).json(err);
    console.log
  }
});


    // GET all users for admin page, req user to be admin
router.get('/admin', isAdmin, async (req, res) => {
  try {
    const userData = 
    await User.findAll({
  
    });

    const retUsers = userData.
    map(post => post.get({ plain: true }))
    console.log(retUsers)
    res.render('admin',{retUsers,logged_in: req.session.logged_in, isAdmin: req.session.isAdmin});

  } catch (err) {
    
    res.status(500).json(err);
    console.log
  }
});


  module.exports = router;