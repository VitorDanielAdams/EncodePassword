import { IToken } from "./../utils/Models.types";
import axios, { AxiosInstance } from "axios";
import { IFormLogin, IPassword, PageRequest, PageResponse } from "../utils/Models.types";

export default class Api {
    url = "http://localhost:8085/api";

    axiosClient: AxiosInstance = axios.create({
        baseURL: this.url,
        headers: { "Content-Type": "application/json" }
    });

    public async login<T>(user: IFormLogin): Promise<IToken> {
        try {
            return (await this.axiosClient.post(`${this.url}/login/`, user)).data;
        } catch (error: any) {
            return Promise.reject(error.response);
        }
    }

    public async insertPassword<T>(password: IPassword): Promise<T> {
        try {
            return (await this.axiosClient.post(`${this.url}/passwords/`, password)).data;
        } catch (error: any) {
            return Promise.reject(error.response);
        }
    }

    public async findPagePasswords<T>(pageRequest: PageRequest): Promise<PageResponse<T>> {
        try {

            let requestPath = `${this.url}/passwords/`;
            return (await this.axiosClient.get(requestPath,
                {
                    params: { filtros: pageRequest.filter }
                }
            )).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findById(id: number): Promise<IPassword> {
        try {
            return (await this.axiosClient.get(`${this.url}/passwords/${id}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async updatePassword<T>(password: IPassword, id: number): Promise<T> {
        try {
            return (await this.axiosClient.put(`${this.url}/passwords/${id}`, password)).data;
        } catch (error: any) {
            return Promise.reject(error.response);
        }
    }

    public async delete<T>(id: number): Promise<void> {
        try {
            return (await this.axiosClient.delete(`${this.url}/passwords/${id}`)).data;
        } catch (error: any) {
            return Promise.reject(error.response);
        }
    }

};
