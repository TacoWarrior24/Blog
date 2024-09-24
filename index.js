import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Setup EJS
app.set('view engine', 'ejs');

// Setup body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Dummy data to simulate posts
let posts = [
  { title: "Chocolate Chip Cookie", description: "A chocolate chip cookie is a drop cookie that features chocolate chips or chocolate morsels as its distinguishing ingredient." },
  { title: "Snickerdoodle", description: "A snickerdoodle is a type of cookie made with flour, fat, sugar, and salt, and rolled in cinnamon sugar. Eggs may also sometimes be used as an ingredient, with cream of tartar and baking soda added to leaven the dough." }
];

// Home route to view all posts
app.get("/", (req, res) => {
  res.render("index.ejs", {posts: posts});
});

// Route to show the edit form for a specific post by index
app.get('/edit/:index', (req, res) => {
  const index = req.params.index;
  const post = posts[index]; // Get the post by index
  res.render('editPost', { post: post, index: index });
});

// Route to update the post after editing
app.post('/edit/:index', (req, res) => {
  const index = req.params.index;
  posts[index] = {
      title: req.body.title,
      description: req.body.description
  };
  res.redirect('/');
});

// Route to delete a post by index
app.post('/delete/:index', (req, res) => {
  const index = req.params.index;
  posts.splice(index, 1);  // Remove the post at the given index
  res.redirect('/');
});

// Route to create a new post
app.get("/post", (req, res) => {
  res.render("post.ejs");
});

// Post route to handle new post submission
app.post('/new', (req, res) => {
  const newPost = {
      title: req.body.title,
      description: req.body.description
  };
  posts.push(newPost);
  res.redirect('/');
});

// Route to see contact information
app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});