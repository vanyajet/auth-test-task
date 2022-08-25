const ApiError = require("../exceptions/apiError")
const tokenService = require("../services/tokenService")


module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            return next(ApiError.UnAutharizedError())
        }
        const accessToken = authorizationHeader.split(' ')[1]
        if (!accessToken) {
            return next(ApiError.UnAutharizedError())
        }

        const userData = tokenService.validateAccessToken(accessToken)
        if (!userData) {
            return next(ApiError.UnAutharizedError())
        }

        req.user = userData
        next()
    }
    catch(e) {
        return next(ApiError.UnAutharizedError())
    }
}