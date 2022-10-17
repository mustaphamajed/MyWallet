import Goal from "../models/Goal"

export const createGoal = async (req, res) => {
    try {
        const { name, MontantCible, Enregistre, date, icon, color, note } = req.body;

        const newGoal = new Goal({ name, MontantCible, Enregistre, date, icon, color, note })

        await newGoal.save()
        const Goals = await Goal.find({})
        return res.json(Goals)

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const getGoal = async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id)
        if (!goal) return res.status(400).json({ msg: "Goal does not exist." })

        return res.json(goal)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const updateGoal = async (req, res) => {
    try {
        const { Enregistre } = req.body;

        const goal = await Goal.findOne({ _id: req.params.id })
        if (!goal) res.status(error.status).send("Goal does not exists")

        const updatedGoal = await Goal.findOneAndUpdate(
            { _id: req.params.id },
            { Enregistre },
            { new: true })

        const Goals = await Goal.find({})
        return res.json(Goals)


    } catch (error) {
        res.status(error.status).send(error.message)
    }
}

export const deleteGoal = async (req, res) => {
    try {

        const deletedGoal = await Goal.findByIdAndDelete(req.params.id)

        if (!deletedGoal) return res.status(500).json({ msg: "Goal does not exist" })

        res.json({ msg: "Goal Deleted" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const getAllGoals = async (req, res) => {

    try {
        const Goals = await Goal.find({})

        if (!Goals) return res.status(500).json({ msg: "No Goals Found" })

        return res.json(Goals)

    } catch (error) {
        res.send(error.message)
    }
}