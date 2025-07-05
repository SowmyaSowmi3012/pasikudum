const Item = require("../model/ItemModel");

const getAllItems = async (req, res) => {
  try {
    const result = await Item.find().sort({ createdAt: -1 });
    res.status(200).json(result);
  } catch (err) {
    console.error("getAllItems error →", err.message);
    res.status(500).json({ message: "Failed to fetch items" });
  }
};

const getSearchedItems = async (req, res) => {
  const { q } = req.query;
  try {
    if (!q) {
      return res.status(400).json({ message: "Search query missing" });
    }

    const items = await Item.find({ name: { $regex: q, $options: 'i' } });
    res.json(items);
  } catch (error) {
    console.error("getSearchedItems error →", error.message);
    res.status(500).json({ message: "Failed to search items" });
  }
};

const getSingleItems = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    console.error("getSingleItems error →", error.message);
    res.status(500).json({ message: "Error fetching item" });
  }
};

module.exports = {
  getAllItems,
  getSearchedItems,
  getSingleItems,
};
