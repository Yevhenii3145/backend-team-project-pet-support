const {Notice} = require("../../models/noticeModel");
const {HttpError} = require("../../helpers");

const getNoticeById = async (req, res) => {
  const { noticeId } = req.params;
  const notice = await Notice.findById(noticeId);
  // const notice = await Notice.findById(noticeId).populate(
  //   "owner",
  //   "email phone"
  // );
  if (!notice) {
    throw HttpError(404);
  }
  res.json({notice});
};

module.exports = getNoticeById;
