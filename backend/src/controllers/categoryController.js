const Category = require("../model/categoryModel.js")
const Item = require("../model/ItemModel.js")

const getCategory = async (req, res) => {
    const { category } = req.params

    try {
        const categoryData = await Category.findOne({ name: { $regex: new RegExp(category, "i") } });

        if (!categoryData) {
            return res.status(404).json({ message: "No data found" })
        }
        const items = await Item.find({ menuId: categoryData.menuId })
        console.log(items)

        res.status(200).json(items)

    } catch (error) {
        res.status(500).json({ message: error.message || "eroor catccher" })
    }
}

module.exports = {
    getCategory
}