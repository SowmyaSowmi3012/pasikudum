const Category = require("../model/categoryModel.js");
const Item = require("../model/ItemModel.js");

const getCategory = async (req, res) => {
  const { category } = req.params;
  console.log("🔎 Requested category:", category);

  try {
    // Find category by name (case-insensitive)
    const categoryData = await Category.findOne({
      name: { $regex: new RegExp(category, "i") },
    });

    if (!categoryData) {
      return res.status(404).json({
        message: `No category found for "${category}"`,
      });
    }

    // Fetch items with matching menuId
    const items = await Item.find({ menuId: categoryData.menuId });

    if (!items.length) {
      return res.status(404).json({
        message: `No items found under the "${category}" category`,
      });
    }

    res.status(200).json(items);
  } catch (error) {
    console.error("❌ Error fetching category data:", error);
    res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};

module.exports = {
  getCategory,
};
