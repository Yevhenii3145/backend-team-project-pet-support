const Sponsor = require('../../models/sponsorsModel');

const { HttpError } = require('../../helpers');

const getAllSponsors = async (req, res) => {
  const sponsor = await Sponsor.find();
  // console.log("sponsor:", sponsor);
  if (!sponsor) {
    throw HttpError(404, 'Not found');
  }
  res.json({ sponsor });
};

module.exports = {
  getAllSponsors,
};
