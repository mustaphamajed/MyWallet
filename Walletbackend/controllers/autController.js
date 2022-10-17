
import { hash, compare } from 'bcrypt'
import { sign } from "jsonwebtoken"
import User from '../models/User'
import Config from '../config/config';

export const register = async (req, res) => {
    try {

        const { email, telephone, prenom, nom, password, roles, adresses } = req.body;

        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ msg: "The email already exists." })

        // Password Encryption
        const passwordHash = await hash(password, 10)
        const newUser = new User({
            email, telephone, prenom, nom, password: passwordHash, roles, adresses, haveWallet: false
        })

        // Save mongodb
        await newUser.save()


        res.json(newUser)

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ msg: "Incorrect identifiers." })

        const isMatch = await compare(password, user.password)
        if (!isMatch) return res.status(400).json({ msg: "Incorrect identifiers." })

        // If login success , create access token
        const accesstoken = createAccessToken(user)

        res.json(user)

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

const createAccessToken = (user) => {
    const token = sign({
        "UserInfo": {
            "id": user._id,
            "roles": user.roles
        }
    }, Config.ACCESS_TOKEN_SECRET, { expiresIn: '7d' })
    return token
}
