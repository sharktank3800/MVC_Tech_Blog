// Create an express router instance object
const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');

// block an auth page if user is already logged in
function isLoggedIn(req, res, next) {
  if (req.session.user_id) {
    return res.redirect('/');
  }

  next();
}

// block a route if a user is not logged in
function isAuthenticated(req, res, next) {
  if (!req.session.user_id) {
    return res.redirect('/login');
  }

  next();
}


// join user data to the request if they are logged in
async function authenticate(req, res, next) {
  const user_id = req.session.user_id;

  if (user_id) {
    const user = await User.findByPk(req.session.user_id, {
      attributes: ['id', 'email']
    });

    req.user = user.get({ plain: true });
  }

  next();
}


// route to render the landing page
router.get('/', authenticate, async (req, res) => {
  const posts = await Post.findAll({
    include: {
      model: User,
      as: 'author'
    }
  });

  res.render('landing', {
    user: req.user,
    posts: posts.map(p => p.get({ plain: true }))
  });
});


// route to render the register page
router.get('/register', isLoggedIn, authenticate, (req, res) => {
  res.render('register_form', {
    errors: req.session.errors,
    user: req.user
  });

  req.session.errors = [];
});

// route to render the login page
router.get('/login', isLoggedIn, authenticate, (req, res) => {

  res.render('login', {
    errors: req.session.errors,
    user: req.user
  });

  req.session.errors = [];
});

// route to render blogPost page
router.get("/post", isAuthenticated, authenticate, (req, res) => {
  res.render("blogPost", {
    user: req.user
  });

  req.session.errors = [];
})

// route to render blogPostComment page
router.get("/comment", isAuthenticated, authenticate, async (req, res) => {
  res.render("blogPostComment", {
    user: req.user
  });

  req.session.errors = [];
})


// route for dashboard
router.get("/dashboard", isAuthenticated, authenticate, async (req, res) => {
  // get the current users ID
  const userID = req.user.id;

  const posts = await Post.findAll({
    where: {author_id: userID},
    include: {
      model: User,
      as: "author"
    }
  });

  res.render("dashboard", {
    user: req.user,
    posts: posts.map(p => p.get({plain: true}))
  });

});



// export the router
module.exports = router;