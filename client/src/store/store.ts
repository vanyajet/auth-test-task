import axios from "axios";
import { makeAutoObservable } from "mobx";
import { API_URL } from "../axiosConfig";
import { IFetchedUser } from "../interfaces/IFetchedUser";
import { IUser } from "../interfaces/IUser";
import { IAuthResponse } from "../interfaces/response/IAuthResponse";
import AuthService from "../services/AuthService";

export default class Store {

    user = {} as IUser
    isAuth = false
    isLoading = false

    fetchedUsers:IFetchedUser[] = []


    constructor() {
        makeAutoObservable(this)
    }

    setUsers(users:IFetchedUser[]) {
        this.fetchedUsers = users
    }

    setAuth(auth:boolean) {
        this.isAuth = auth
    }

    setUser(user: IUser) {
        this.user = user
    }

    setLoading(loading:boolean) {
        this.isLoading = loading
    }

    async signin(email: string, password:string) {
        try {
            const response = await AuthService.signin(email, password)
            console.log(response)
            
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        }
        catch(e) {
            console.log(e)
            
        }
    }

    async signup(email: string, password:string) {
        try {
            const response = await AuthService.signup(email, password)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        }
        catch(e) {
            console.log(e)
            
        }
    }

    async signout() {
        try {
            const response = await AuthService.signout()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({} as IUser)
        }
        catch(e) {
            console.log(e)
            
        }
    }

    async checkAuth() {
        this.setLoading(true)
        try {
            const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
            
        }
        catch(e) {
            console.log(e)
        }
        finally {
            this.setLoading(false)
        }
    }

    async fetchUsers () {
        const usersResult = await axios.get(
            'https://jsonplaceholder.typicode.com/users'
        );
        this.setUsers(usersResult.data);
    }

    deleteUser(id:number) {
        this.fetchedUsers = this.fetchedUsers.filter(item => item.id !== id)
    }

}