const Product = require('../models/product');
const cloudinary = require('../config/cloudinary');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    let imageUrl = '';

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      imageUrl
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    console.log('UPDATE PRODUCT');
    console.log('ID:', req.params.id);
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.stock = req.body.stock || product.stock;

    if (req.file) {
      console.log('Uploading new image...');

      const result = await cloudinary.uploader.upload(req.file.path);

      product.imageUrl = result.secure_url;

      console.log('New image URL:', product.imageUrl);
    }

    if (!product.imageUrl) {
      return res.status(400).json({
        message: 'This product has no image. Please select a new image before updating.'
      });
    }

    const updatedProduct = await product.save();

    console.log('Product updated successfully');

    res.json(updatedProduct);
  } catch (error) {
    console.error('UPDATE PRODUCT ERROR:', error);

    res.status(500).json({
      message: error.message
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();

      res.json({
        message: 'Product removed'
      });
    } else {
      res.status(404).json({
        message: 'Product not found'
      });
    }
  } catch (error) {
    console.error('Delete product error:', error);

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};