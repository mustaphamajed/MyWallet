import Payment from "../models/Payment"
import Budget from '../models/Budget'
export const createPayment = async (req, res) => {
    try {
        const { name, category, budget, type, amount, paymentMethod } = req.body;
        const payment = await Payment.findOne({ name })
        if (payment)
            return res.status(400).json({ msg: "This Payment already exists." })

        const newPayment = new Payment({ name, category, budget, type, amount, paymentMethod })
        const associatedBudget = await Budget.findOne({ _id: budget })
        if (associatedBudget.finalBudget - amount < 0)
            return res.status(400).json({ msg: "insufficient balance" })

        await newPayment.save()
        associatedBudget.finalBudget -= amount
        await associatedBudget.save()


        return res.json(newPayment)

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const getPayment = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id)
        if (!payment) return res.status(400).json({ msg: "Payment does not exist." })

        return res.json(payment)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const updatePayment = async (req, res) => {
    try {
        const { name, type, amount } = req.body;

        const payment = await Payment.findOne({ _id: req.params.id })
        if (!payment) res.status(error.status).send("Payment does not exists")

        const updatedPayment = await Payment.findOneAndUpdate(
            { _id: req.params.id },
            { name, type, amount },
            { new: true })

        return res.json(updatedPayment)

    } catch (error) {
        res.status(error.status).send(error.message)
    }
}

export const deletePayment = async (req, res) => {

    const { budgetId } = req.params
    try {

        const deletedPayment = await Payment.findByIdAndDelete(req.params.id)

        if (!deletedPayment) return res.status(500).json({ msg: "Payment does not exist" })
        const payments = await Payment.find({ budget: budgetId })
        res.json(payments)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const getAllPayments = async (req, res) => {
    const { budgetId } = req.params
    try {
        const payments = await Payment.find({ budget: budgetId })

        if (!payments) return res.status(500).json({ msg: "No Payments Found" })

        return res.json(payments)

    } catch (error) {
        res.send(error.message)
    }
}