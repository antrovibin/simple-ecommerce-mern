import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice } = req.query;
    let query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (category) {
      query.category = category;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/latest', async (req, res) => {
  try {
    const latestProducts = await Product.find().sort({ createdAt: -1 }).limit(10);
    res.json(latestProducts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;

