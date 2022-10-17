import Debt from "../models/Debt"
import Budget from '../models/Budget'
import { debtType } from "../models/Enum";
import Wallet from "../models/Wallet"
export const createDebt = async (req, res) => {

    const { name, description, budget, type, amount, date, dueDate } = req.body;
    try {
        const associatedBudget = await Budget.findById({ _id: budget })

        if (!associatedBudget) {
            return res.status(404).json({ msg: "budget not found" })
        } else {
            const newDebt = new Debt({ name, description, budget: associatedBudget, type, amount, date, dueDate })
            if (type === "PRETE") {
                if (associatedBudget.remainingBalance - amount < 0)
                    return res.status(400).json({ msg: "insufficient balance" })
                associatedBudget.remainingBalance -= amount
                await associatedBudget.save()

            }

            await newDebt.save()
            return res.json(newDebt)
        }


    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const getDebt = async (req, res) => {
    try {
        const debt = await Debt.findById(req.params.id)
        if (!debt) return res.status(400).json({ msg: "Debt does not exist." })

        return res.json(debt)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const updateDebt = async (req, res) => {
    try {
        const { name, description,budget, type, amount, date, dueDate } = req.body;

        const debt = await Debt.findOne({ _id: req.params.id })
        if (!debt) res.status(error.status).send("Debt does not exists")

        await Debt.findOneAndUpdate(
            { _id: req.params.id },
            { name, description, type, amount, date, dueDate },
            { new: true })
            const debts = await Debt.find({ budget: budget })
           return res.json(debts)
       

    } catch (error) {
        res.status(error.status).send(error.message)
    }
}

export const deleteDebt = async (req, res) => {
    const { budgetId } = req.body
    try {

        const deletedDebt = await Debt.findByIdAndDelete(req.params.id)

        if (!deletedDebt) return res.status(500).json({ msg: "Debt does not exist" })
        const debts = await Debt.find({ budget: budgetId })
        res.json(debts)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const getAllDebts = async (req, res) => {
    const { budgetId } = req.params
    try {
        const debts = await Debt.find({ budget: budgetId }).populate('budget')

        if (!debts) return res.status(500).json({ msg: "No Debts Found" })

        return res.json(debts)

    } catch (error) {
        res.send(error.message)
    }
}