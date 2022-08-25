import { AxiosResponse } from "axios"
import $api from "../axiosConfig"
import { IAuthResponse } from "../interfaces/response/IAuthResponse"


class AuthService {

    static async signin(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/signin', {email, password})
    }

    static async signup(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/signup', {email, password})
    }

    static async signout(): Promise<void> {
        return $api.post('/signout')
    }

}



export default AuthService