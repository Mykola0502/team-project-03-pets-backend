const { Notice } = require("../../models/notice");
const { paginate } = require("../../utils");

const getAllOwnerNotices = async (req, res) => {
  const { id: owner } = req.userId;
  const { page: processedPage, limit: processedLimit } = req.query;

  const { page, limit, skip } = paginate(processedPage, processedLimit);

  // let { page = 1, limit = 12 } = req.query;

  // const parsedPage = parseInt(page);
  // const parsedLimit = parseInt(limit);
  // page = parsedPage >= 1 ? parsedPage : 1;
  // limit = parsedLimit > 1 && parsedLimit < 12 ? parsedLimit : 12;

  // const skip = (parseInt(page) - 1) * limit;

  const totalNotices = await Notice.find({
    owner,
  }).count();

  const notices = await Notice.find({ owner }, "", { skip, limit });

  res.json({
    status: "success",
    code: 200,
    data: {
      totalNotices,
      page,
      totalPages: Math.ceil(totalNotices / limit),
      currentOnPage: notices.length,
      notices,
    },
  });
};

module.exports = getAllOwnerNotices;
