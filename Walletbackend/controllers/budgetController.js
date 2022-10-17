import Budget from "../models/Budget"
import User from "../models/User";



export const createBudget = async (req, res) => {

    const { name, incomes, expenses, userId, startDate, endDate, initialBudget } = req.body;
    try {

        const budget = await Budget.findOne({ name })
        if (budget)
            return res.status(400).json({ msg: "This Budget already exists." })

        const allIncomes = incomes.reduce((acc, a) => acc + a.amount, 0)
        const allExpenses = expenses.reduce((acc, a) => acc + a.amount, 0)
        const finalBudget = initialBudget + (allIncomes - allExpenses)

        const newBudget = new Budget({ userId, name, incomes, expenses, startDate, endDate, finalBudget, initialBudget })
        const user = await User.findOne({ _id: userId })
        user.haveWallet = true,
            await user.save()

        await newBudget.save()

        return res.json(newBudget)

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
export const getAllBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find({ userId: req.params.userId })

        if (!budgets) return res.status(500).json({ msg: "No Budgets Found" })

        return res.json(budgets)

    } catch (error) {
        res.send(error.message)
    }
}

export const getBudget = async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id)
        if (!budget) return res.status(400).json({ msg: "Budget does not exist." })

        return res.json(budget)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const deleteBudget = async (req, res) => {
    const { userId } = req.body
    try {

        const deletedBudget = await Budget.findByIdAndDelete(req.params.id)

        if (!deletedBudget) return res.status(500).json({ msg: "Budget does not exist" })
        const budgets = await Budget.find({ userId: userId })
        res.json(budgets)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}


export const addExpensesOrIncomes = async (req, res) => {
    const { expenses, incomes } = req.body
    try {
        const budget = await Budget.find({ _id: req.params.budgetId })
        budget.incomes.push(incomes)
        budget.expenses.push(expenses)
        budget.finalBudget += incomes.amount - expenses.amount
        await budget.save()
        return budget

    }
    catch (error) {
        res.send(error.message)
    }

}