const ApiError = require("../exceptions/apiError")
const { validationResult } = require('express-validator')
const userService = require("../services/userService")


class UserController {

    async signup(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation problem', errors.array()))
            }
            const {email, password} = req.body
            const userData = await userService.signup(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})

            return res.json(userData)
        }
        catch(e) {
            next(e)
        }
    }

    async signin(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await userService.signin(email, password)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(userData)
        }
        catch(e) {
            next(e)
        }
    }

    async signout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await userService.signout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        }
        catch(e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        }
        catch(e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await userService.refresh(refreshToken)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(userData)
        }
        catch(e) {
            next(e)
        }
    }
    
    // async getUsers(req, res, next) {
    //     try {
    //         const users = await userService.getUsers()
    //         return res.json(users)
    //     }
    //     catch(e) {
    //         next(e)
    //     }
    // }


}

module.exports = new UserController()