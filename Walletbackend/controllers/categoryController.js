import Category from "../models/Category"

export const createCategory = async (req, res) => {
    try {
        const { name, IconName, color } = req.body;
        const category = await Category.findOne({ name })
        if (category)
            return res.status(400).json({ msg: "This Category already exists." })

        const newCategory = new Category({ name, IconName, color })

        await newCategory.save()
        const categories = await Category.find({})
        return res.json(categories)

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const getCategory = async (req, res) => { 
    try {
        const category = await Category.findById(req.params.id)
        if (!category) return res.status(400).json({ msg: "Category does not exist." })

        return res.json(category)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { name,IconName,color } = req.body;

        const category = await Category.findOne({ _id: req.params.id })
        if (!category) res.status(error.status).send("Category does not exists")

        await Category.findOneAndUpdate({ _id: req.params.id }, { name,IconName,color }, { new: true })

        const categories = await Category.find({})
        return res.json(categories)

    } catch (error) {
        res.status(error.status).send(error.message)
    }
}

export const deleteCategory = async (req, res) => {
    try {

        const deletedCategory = await Category.findByIdAndDelete(req.params.id)

        if (!deletedCategory) return res.status(500).json({ msg: "Category does not exist" })

        res.json({ msg: "Category Deleted" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({})

        if (!categories) return res.status(500).json({ msg: "No Categories Found" })

        return res.json(categories)

    } catch (error) {
        res.send(error.message)
    }
}