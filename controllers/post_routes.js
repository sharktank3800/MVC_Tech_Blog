const router = require('express').Router();

const User = require('../models/User');
const Post = require('../models/Post');

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
    const user = await User.findByPk(req.session.user_id);

    req.user = user;
  }

  next();
}

// TO post
// router.post('/post', isAuthenticated, authenticate, async (req, res) => {
//   try {
//     const post = await Post.create(req.body);

//     await req.user.addpost(post);

//     res.redirect('/');
//   } catch (err) {
//     console.error(err)
//     req.session.errors = err.errors.map(errObj => errObj.message);
//     res.redirect('/blogPost');
//   }
// });

router.post('/post', isAuthenticated, authenticate, async (req, res) => {
  try {
    const post = await Post.create(req.body);
    await req.user.addPost(post);
    res.redirect('/');
  } catch (err) {
    if (err && err.errors) {
      req.session.errors = err.errors.map(errObj => errObj.message);
    } else {
      console.error(err); // Log the error for debugging
      req.session.errors = ['An error occurred. Please try again.'];
    }
    res.redirect('/blogPost');
  }
});


// TO edit a post
router.get("/postedit/:postId", isAuthenticated, authenticate, async (req, res) => {
  const postID = req.params.postId;
  const userID = req.user.id;

  // the post that matches the provided postID belonging to the current user
  const post = await Post.findOne({
    where: {
      id: postID,
      author_id: userID
    },
    include: {
      model: User,
      as: "author"
    }
  });

  if(post){
    res.render("editBlogPost", {
      user: req.user,
      post: post.get({plain: true})
    });
  }

  res.status(404).send("Post not found or unathorized to edit.");
});


// TO Update post 
router.put("/updatePost/:postId", isAuthenticated, authenticate, async (req, res) => {
  const postID = req.params.postId;
  const userID = req.user.id;
  const {title, content} = req.body;

  const post = await Post.findOne({
    where: {
      id: postID,
      author_id: userID
    }
  });

  // update post
  if(post){
    await post.update({title, content});

    return res.redirect("/")
  }

  res.status(404).send("Post not found and failed to update.")
})

// To delete
router.delete("./deletePost/:postId", isAuthenticated, authenticate, async(req, res) => {
  const postID = req.params.postId;
  const userID = req.user.id;

  // validate the post belongs to the user before deletion
  const post = await Post.findOne({
    where: {
    id: postID,
    author_id: userID
   }
  });

  // delete post
  if(post){
    await post.destroy();

    return res.redirect("/dashboard");
  }

  res.status(404).send("Post not found and failed to delete");

})



// export the router
module.exports = router;