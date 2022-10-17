import { hash } from "bcrypt"
import { compare } from "bcrypt"
import User from "../models/User"

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user).select('-password')
        if (!user) return res.status(400).json({ msg: "User does not exist." })

        return res.json(user)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
export const updateUser = async (req, res) => {
    try {
        const { email, telephone, prenom, nom, password, adresses } = req.body;
        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ msg: "The email already exists." })

        const updatedUser = await User.findOneAndUpdate({ _id: req.params.id }, {
            email, telephone, prenom, nom, password, adresses
        }, { new: true })

        return res.json(updatedUser)

    } catch (error) {
        res.status(error.status).send(error.message)
    }
}

export const deleteUser = async (req, res) => {
    try {

        const deletedUser = await User.findByIdAndDelete(req.params.id)

        if (!deletedUser) return res.status(500).json({ msg: "User does not exist" })

        res.json({ msg: "User Deleted" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const projection = { password: false }
        const users = await User.find({}, projection).sort('-created_at')

        if (!users) return res.status(500).json({ msg: "No Users Found" })

        return res.json(users)

    } catch (error) {
        res.send(error.message)
    }
}

export const updatePassword = async (req, res) => {
    try {

        const { oldPassword, newPassword } = req.body
        const user = await User.findOne({ _id: req.params.id })
        const isMatch = await compare(oldPassword, user.password)
        if (!isMatch) return res.status(400).json({ msg: "Wrong password" })
        const updatedPassword = await hash(newPassword, 10)
        const updatedUser = await User.findOneAndUpdate({ _id: req.params.id }, { password: updatedPassword }, { new: true })

        return res.json(updatedUser)
    } catch (error) {
        res.send(error.message)
    }

}