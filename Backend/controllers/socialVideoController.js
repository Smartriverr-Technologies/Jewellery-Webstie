import asyncHandler from 'express-async-handler';
import SocialVideo from '../models/socialVideoModel.js';

// @desc    Get all social videos
const getSocialVideos = asyncHandler(async (req, res) => {
  const videos = await SocialVideo.find({}).sort({ sortOrder: 1 }).limit(6);
  res.json(videos);
});

// @desc    Create a new social video
const createSocialVideo = asyncHandler(async (req, res) => {
  const { videoUrl, hashtag } = req.body;
  if (!videoUrl || !hashtag) {
    res.status(400);
    throw new Error('Video URL and hashtag are required');
  }
  const video = new SocialVideo({ videoUrl, hashtag });
  const createdVideo = await video.save();
  res.status(201).json(createdVideo);
});

// @desc    Delete a social video
const deleteSocialVideo = asyncHandler(async (req, res) => {
  const video = await SocialVideo.findById(req.params.id);
  if (video) {
    await SocialVideo.deleteOne({ _id: video._id });
    res.json({ message: 'Social video removed' });
  } else {
    res.status(404);
    throw new Error('Social video not found');
  }
});

export { getSocialVideos, createSocialVideo, deleteSocialVideo };