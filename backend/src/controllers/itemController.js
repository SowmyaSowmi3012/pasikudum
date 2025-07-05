const Item = require("../model/ItemModel")

const getAllItems = async (req, res) => {
  try {
    const result = await Item.find().sort({ createdAt: -1 });
    res.status(200).json(result);
  } catch (err) {
    console.error("getAllItems error →", err.message);
    res.status(500).json({ message: "Failed to fetch items" });
  }
};
const getSeachedItems = async (req,res) =>{
    const {q}=req.query;
    try{
        let items ;
        if(q){
            items=await Item.find({name:{$regex:q, $options :'i'}})
        }
        res.json(items);
    } catch(error){
        res.status(500).json({message:"no iTem found !"})
    }
}

const getSingleItems = async(req,res)=>{
    const {id} = req.params;
    try{
      const item = await Item.findById(id);
      res.json(item)
    } catch(error){
        res.status(500).json({message:"no iTem found !"})
    }
}

module.exports = {
  getAllItems,  getSeachedItems,
    getSingleItems
};
