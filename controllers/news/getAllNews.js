const New = require('../../models/newModel');

const { HttpError } = require('../../helpers');

const getAllNews = async (req, res) => {
  const news = await New.find();
  // console.log(news);
  if (!news) {
    throw HttpError(404, 'Not found');
  }
  res.json({ news });
};

module.exports = {
  getAllNews,
};
