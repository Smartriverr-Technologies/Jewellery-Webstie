import asyncHandler from 'express-async-handler';
import Setting from '../models/settingModel.js';

// @desc    Get site settings
const getSettings = asyncHandler(async (req, res) => {
  // There should only ever be one settings document
  let settings = await Setting.findOne();
  if (!settings) {
    // If no settings exist, create a default one
    settings = await Setting.create({});
  }
  res.json(settings);
});

// @desc    Update site settings (Admin only)
const updateSettings = asyncHandler(async (req, res) => {
  let settings = await Setting.findOne();
  if (settings) {
    settings.shippingCharge = req.body.shippingCharge || settings.shippingCharge;
    settings.freeShippingThreshold = req.body.freeShippingThreshold || settings.freeShippingThreshold;
    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } else {
    res.status(404);
    throw new Error('Settings not found');
  }
});

export { getSettings, updateSettings };