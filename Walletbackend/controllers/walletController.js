import User from "../models/User";
import Wallet from "../models/Wallet"

export const createWallet = async (req, res) => {
    const { name, initialBalance, userId } = req.body;
    try {

        const wallet = await Wallet.findOne({ name })
        if (wallet)
            return res.status(400).json({ msg: "This Wallet already exists." })

        const newWallet = new Wallet({ name, initialBalance, userId })
        const user = await User.findOne({ _id: userId })
        user.haveWallet = true,
            await user.save()
        await newWallet.save()
        return res.json(newWallet)

    } catch (err) {
        return res.status(500).json({ msg: err })
    }
}

export const getWallet = async (req, res) => {
    try {
        const wallet = await Wallet.findById(req.params.id)
        if (!wallet) return res.status(400).json({ msg: "Wallet does not exist." })

        return res.json(wallet)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const updateWallet = async (req, res) => {
    try {
        const { name } = req.body;

        const wallet = await Wallet.findOne({ _id: req.params.id })
        if (!wallet) res.status(error.status).send("Wallet does not exists")

        const updatedWallet = await Wallet.findOneAndUpdate({ _id: req.params.id }, { name, balance }, { new: true })

        return res.json(updatedWallet)

    } catch (error) {
        res.status(error.status).send(error.message)
    }
}

export const deleteWallet = async (req, res) => {
    try {

        const deletedWallet = await Wallet.findByIdAndDelete(req.params.id)

        if (!deletedWallet) return res.status(500).json({ msg: "Wallet does not exist" })

        res.json({ msg: "Wallet Deleted" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const getAllWallets = async (req, res) => {
    try {
        const wallets = await Wallet.findOne({ user: req.body.userId })

        if (!wallets) return res.status(500).json({ msg: "No Wallets Found" })

        return res.json(wallets)

    } catch (error) {
        res.send(error.message)
    }
}