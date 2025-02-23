import Product from '../module/Product.js';
import asyncHandler from 'express-async-handler';
import Category from '../module/Category.js';
import Brand from '../module/Brand.js';

export const CreateProductController = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
  } = req.body;

  const productExists = await Product.findOne({ name });

  if (productExists) {
    throw new Error('product already exists');
  }

  //find category

  const categoryFound = await Category.findOne({
    name: category,
  });

  if (!categoryFound) {
    throw new Error('category not found,please create category first');
  }

  //find brand
  const brandFound = await Brand.findOne({
    name: brand.toLowerCase(),
  });

  if (!brandFound) {
    throw new Error('brand not found,please create brand first');
  }

  const product = await Product.create({
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    user: req.userAuthId,
    price,
    totalQty,
  });
  //push product into category
  categoryFound.products.push(product._id);
  await categoryFound.save();
  //push product into brand
  brandFound.products.push(product._id);
  await brandFound.save();
  //send response
  res.json({
    status: 'success',
    msg: 'Product ctrated Successfully',
    product,
  });
});

export const getAllProductsController = asyncHandler(async (req, res) => {
  console.log(req.query);
  let productQuery = Product.find();

  if (req.query.name) {
    productQuery = productQuery.find({
      name: { $regex: req.query.name, $options: 'i' },
    });
  }
  if (req.query.brand) {
    productQuery = productQuery.find({
      brand: { $regex: req.query.brand, $options: 'i' },
    });
  }

  if (req.query.category) {
    productQuery = productQuery.find({
      category: { $regex: req.query.category, $options: 'i' },
    });
  }

  if (req.query.color) {
    productQuery = productQuery.find({
      colors: { $regex: req.query.color, $options: 'i' },
    });
  }

  if (req.query.size) {
    productQuery = productQuery.find({
      sizes: { $regex: req.query.size, $options: 'i' },
    });
  }

  if (req.query.price) {
    const priceRange = req.query.price.split('-');
    //gte : greater than or equal to
    //lte : less than and equal to

    productQuery = productQuery.find({
      price: { $gte: priceRange[0], $lte: priceRange[1] },
    });
  }

  //page
  const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
  // limit
  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
  //startIndex
  const startIndex = (page - 1) * limit;
  // endIndex
  const endIndex = page * limit;
  // total
  const total = await Product.countDocuments();

  productQuery = productQuery.skip(startIndex).limit(limit);

  // pagination
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
  const products = await productQuery.populate('reviews');
  res.json({
    status: 'success',
    total,
    result: products.length,
    pagination,
    message: 'Product fetch successfully',
    products,
  });
});

export const getProductController = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('reviews');
  if (!product) {
    throw new Error('Product not found');
  } else {
    res.json({
      status: 'success',
      message: 'product fetched successfully',
      product,
    });
  }
});

export const updateProductController = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
  } = req.body;

  //update
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      brand,
      category,
      sizes,
      colors,
      user,
      price,
      totalQty,
    },
    {
      new: true,
    }
  );
  res.json({
    status: 'success',
    message: 'product updated successfully',
    product,
  });
});

export const deleteProductController = asyncHandler(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);

  res.json({
    status: 'success',
    message: 'product deleted successfully',
  });
});
