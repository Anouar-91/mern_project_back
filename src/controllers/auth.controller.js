import { response } from 'express'
import { signUpErrors, signInErrors } from '../utils/errors.utils'

const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

//equivalent de 3 jours
const maxAge = 3 * 24 * 60 * 60 * 1000
//function qui créer le token en fonction d'une clé de cryptage qu'on aura mis dans variable d'environnemment
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
}


export const signUp = async (req, res) => {
    const { pseudo, email, password } = req.body
    try {
        const user = await User.create({ pseudo, email, password })
        res.status(201).send({ user: user._id })
    }
    catch(err) {
        const errors = signUpErrors(err)
        return res.status(200).send({errors })
    }
}

export const signIn = async (req, res) => {
    const { email, password } = req.body

    try {
        //check user exist and compare email with password
        const user = await User.login(email, password)
        //create token
        const token = createToken(user._id)
        //on retourne le token dans les cookies accessible seulement par le serveur
        res.cookie('jwt', token, { httpOnly: true, maxAge })
        res.status(200).json({ user: user._id })
    }
    catch (err) {
        console.log(err)
        const errors = signInErrors(err)
        return res.status(200).send({errors })
    }


}

export const logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({ message: "disconect" })
}

