import api from './api';
import { AxiosResponse } from "axios";

export class Repository {
    full_name?: string;
    description?: string;
    owner?: {
        login?: string;
        avatar_url?: string;
    }

    static findByName = async function (full_name: string): Promise<AxiosResponse<Repository[]>> {
        return await api.get(`repos/${full_name}`);
    };

    static load = async function (repo: string): Promise<AxiosResponse<Repository[]>> {
        return await api.get(`repos/${repo}`);
    };

    static loadIssues = async function (repo: string): Promise<AxiosResponse<Repository[]>> {
        return await api.get(`repos/${repo}/issues`);
    };


}
