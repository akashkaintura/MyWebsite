const express = require('express');
const router = express.Router();
const { getAllPosts, getPostById, createPost, updatePostById, deletePostById } = require('../controllers/postController');
const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController');
const contactController = require('../controllers/contactController');


router.use('/auth', authRoutes);

// Define routes
router.get('/', homeController.getHomePage);
router.get('/about', aboutController.getAboutPage);
router.get('/posts', postController.getPostsPage);
router.get('/contact', contactController.getContactPage);

//CRUD Routes
router.get('/posts', getAllPosts);
router.get('/posts/:id', getPostById);
router.post('/posts', createPost);
router.put('/posts/:id', updatePostById);
router.delete('/posts/:id', deletePostById);

module.exports = router;
