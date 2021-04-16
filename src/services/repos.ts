import api from './api';
import { AxiosResponse } from "axios";

export class Repository {
    full_name?: string;
    description?: string;
    stargazers_count?:number;
    forks_count?:number;
    open_issues_count?:number;
    owner?: {
        login?: string;
        avatar_url?: string;
    }

    static findByName = async function (filter: string): Promise<AxiosResponse<Repository[]>> {
        return await api.get(`/repos/${filter}`);
    };

    static load = async function (repo: string): Promise<AxiosResponse<Repository>> {
        return await api.get(`repos/${repo}`);
    };
}

export class Issues {
    id?: number;
    title?: string;
    html_url?:string;
    user?: {
        login?: string;
    }
    static load = async function (issue: string): Promise<AxiosResponse<Issues[]>> {
        return await api.get(`repos/${issue}/issues`);
    };

}
