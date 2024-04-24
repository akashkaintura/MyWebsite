const Post = require('../models/Post');

app.post('/posts', async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const newPost = new Post({ title, content, author });
    await newPost.save(); 
    res.status(201).json(newPost); 
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, { title, content, author }, { new: true });
    res.json(updatedPost);
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
