const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mailService')
const tokenService = require('./tokenService')
const UserDTO = require('../dataTransferObjects/userDTO')
const ApiError = require('../exceptions/apiError')
const userModel = require('../models/userModel')


class UserService {
    async signup(email, password) {

        const candidate = await userModel.findOne({email})

        if (candidate) {
            throw ApiError.BadRequest(`User with email ${email} already exists`)
        }

        const hashedPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()

        const user = await userModel.create({email, password: hashedPassword, activationLink})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

        const userDTO = new UserDTO(user)
        const tokens = tokenService.generateToken({...userDTO})
        await tokenService.saveToken(userDTO.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDTO
        }
    }

    async activate(activationLink) {
        const user = await userModel.findOne({activationLink})
        if (!user) {
            throw ApiError.BadRequest('Activation Link has expired')
        }
        user.hasActivated = true
        await user.save()
    }

    async signin(email, password) {
        const user = await userModel.findOne({email})
        if (!user) {
            throw ApiError.BadRequest('User with this email has not been found, sign up')
        }
        const correctPassword = await bcrypt.compare(password, user.password)
        if (!correctPassword) {
            throw ApiError.BadRequest('Password is not correct')
        }

        const userDTO = new UserDTO(user)
        const tokens = tokenService.generateToken({...userDTO})
        await tokenService.saveToken(userDTO.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDTO
        }
    }

    async signout(refreshToken) {
        const token = await tokenService.deleteToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnAutharizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDB) {
            throw ApiError.UnAutharizedError()
        }
        const user = await userModel.findById(userData.id)
        const userDTO = new UserDTO(user)
        const tokens = tokenService.generateToken({...userDTO})
        await tokenService.saveToken(userDTO.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDTO
        }
    }

    // async getUsers() {
    //     const users = await userModel.find()
    //     return users
    // }

}

module.exports = new UserService()