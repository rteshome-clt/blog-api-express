import express from 'express';
import { fileURLToPath } from 'url';
import { resetPosts, readPost, createPost, updatePost, deletePost, listPosts } from './blogService.js';


const __filename = fileURLToPath(import.meta.url);

const app = express();
const PORT = 3000;

app.use(express.json());

// ------------------- Routes -------------------

// Reset all posts (example route)
app.post('/reset', async (req, res) => {
  await resetPosts();
  res.json({ message: 'Posts have been reset' });
});

// TODO: Implement the following routes:
// POST /posts        → Create a new post
app.post('/posts', async (req, res) => {
  const { title, content } = req.body;

  // if not a string or empty, return bad request error
  if (typeof title !== 'string' || typeof content !== 'string' ||
      title.trim() === '' || content.trim() === '') {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  // tries to create a new post and return it, if not possible sends internal server error message
  try {
    const newPost = await createPost(title, content);
    res.status(201).json(newPost);
  } catch(err) {
    res.status(500).json({
      error: 'Failed to create post'
    });
  }
});

// GET /posts/:id     → Read a post by ID
app.get('/posts/:id', async (req, res) => {
  const id = parseInt(req.params.id);   //converts id into an int
  const post = await readPost(id);

  // if id is not found return error
  if(!post) {
    return res.status(404).json({
      error: `Post ${id} not found`});
  }
  // returns found post
  return res.json(post);
})

// PUT /posts/:id     → Update a post by ID
app.put('/posts/:id', async (req, res) => {
  const id = parseInt(req.params.id);   //converts id into an int
  let { title, content } = req.body;    // gets title and content

  // if title or content is empty set as undefined
  if (typeof title === 'string' && title.trim() === '') title = undefined;
  if (typeof content === 'string' && content.trim() === '') content = undefined;
  
  // if undefined return bad request error
  if (title === undefined && content === undefined) {
    return res.status(400).json({ error: 'Either title or content must be provided' });
  }

  const updated = await updatePost(id, title, content);

  // if post is not updated with new title and content, return not found error
  if (!updated) {
    return res.status(404).json({
      error: `Post ${id} not found`});
  }

  res.json({
    message: `Post ${id} updated`});
});

// DELETE /posts/:id  → Delete a post by ID
app.delete('/posts/:id', async (req, res) => {
  const id = parseInt(req.params.id);   //converts id into an int
  const deleted = await deletePost(id);

  // if post was not deleted, return not found error
  if (!deleted) {
    return res.status(404).json({
      error: `Post ${id} not found`});
  }
  
  res.json({
    message: `Post ${id} deleted`});
});

// GET /posts         → List all posts
app.get('/posts', async (req, res) => {
  const posts = await listPosts();
  res.json(posts);
});


if (process.argv[1] === __filename) {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export default app;
