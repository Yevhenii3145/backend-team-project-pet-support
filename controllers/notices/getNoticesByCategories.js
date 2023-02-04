const { HttpError } = require('../../helpers');
const { Notice } = require('../../models/noticeModel');

const getNoticesByCategories = async (req, res) => {
  const { categoryName } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const foundNotices = await Notice.find({ category: categoryName }, '', {
    skip,
    limit,
  });
  if (!foundNotices) {
    throw HttpError(404);
  }
  const notices = [...foundNotices].sort(
    (firstNotice, secondNotice) =>
      new Date(secondNotice.createdAt) - new Date(firstNotice.createdAt)
  );
  res.json({ notices });
};

module.exports = getNoticesByCategories;
