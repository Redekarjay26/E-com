import Color from '../module/Color.js';
import asyncHandler from 'express-async-handler';

export const createColorController = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const colorFound = await Color.findOne({ name });

  if (colorFound) {
    throw new Error('Color already exists');
  }

  const color = await Color.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });

  res.json({
    ststus: 'success',
    message: 'color created successfully',
    color,
  });
});

export const getAllColorController = asyncHandler(async (req, res) => {
  const colors = await Color.find();

  res.json({
    status: 'success',
    message: 'colors fetched successfully',
    colors,
  });
});

export const getSingleColorController = asyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);

  res.json({
    status: 'success',
    message: 'color fetched successfully',
    color,
  });
});

export const updateColorController = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const colorUpdate = await Color.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    {
      new: true,
    }
  );
  res.json({
    status: 'success',
    message: 'color updated successfully',
    colorUpdate,
  });
});

export const DeleteColorController = asyncHandler(async (req, res) => {
  await Color.findByIdAndDelete(req.params.id);
  res.json({
    status: 'success',
    message: 'color deleted successfully',
  });
});
