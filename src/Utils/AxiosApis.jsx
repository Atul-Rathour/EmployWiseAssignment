import axios from 'axios'
import React from 'react'

const BASE_URL = 'https://reqres.in/'

export const authApi = axios.create({
    baseURL: BASE_URL
})

authApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error);
    }
)

