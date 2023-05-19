const { Notice } = require("../../models/notice");

const getNoticeByCategory = async (req, res) => {
  console.log("it is getNoticeByCategory");
  const { type: category } = req.params;
  const { page = 1, limit = 10, search: title } = req.query;
  const skip = (page - 1) * limit;

  console.log("it is getNoticeByCategory controller");
  console.log(category);
  const query = title ? { category, title } : { category };
  console.log("query", query);
  const result = await Notice.find(query, "-updatedAt -createdAt", {
    skip,
    limit,
  });
  console.log(result);

  res.status(200).json(result);
};

module.exports = getNoticeByCategory;