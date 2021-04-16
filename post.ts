import api from './api';

import { AxiosResponse } from "axios";

import { Person, PeopleTag } from './person';
import { Transaction } from './transaction';

//FILTERS

export class PostFilter {
    text: string = '';
    ownerId: number;
    userId: number;
    name: string;
    tagId: number;
    level: 'all' | 'free' | 'paid' = 'all';
    status: 'all' | 'A' | 'B' = 'all';
    startDate: string;
    endDate: string;
    order: 'RAND()' | 'created_at' | 'viewsCount' | 'likesCount' = 'created_at';
    direction: 'ASC' | 'DESC' = 'DESC';
    page: number = 1;
    itemsPerPage: number = 5;

    constructor(data?: {
        text?: string;
        ownerId?: number;
        userId?: number;
        tagId?: number;
        level?: 'all' | 'free' | 'paid';
        status?: 'all' | 'A' | 'B';
        startDate?: string;
        endDate?: string;
        order?: 'RAND()' | 'created_at' | 'viewsCount' | 'likesCount';
        direction?: 'ASC' | 'DESC';
        page?: number;
        itemsPerPage?: number;
    }) {
        if (data) {
            if (data.text) this.text = data.text;
            if (data.ownerId) this.ownerId = data.ownerId;
            if (data.userId) this.userId = data.userId;
            if (data.level) this.level = data.level;
            if (data.startDate) this.startDate = data.startDate;
            if (data.endDate) this.endDate = data.endDate;
            if (data.order) this.order = data.order;
            if (data.direction) this.direction = data.direction;
            if (data.page) this.page = data.page;
            if (data.itemsPerPage) this.itemsPerPage = data.itemsPerPage;
        }
    }
}

export class ComplaintFilter {
    name: string = '';
    categoryId: string = '';
    startDate: string;
    endDate: string;
    status: 'pending' | 'approved' | 'reproved' | 'all' = "all";
    order: 'RAND()' | 'created_at' = 'created_at';
    direction: 'ASC' | 'DESC' = 'DESC';
    page: number = 1;
    itemsPerPage: number = 5;
}

export class CategoryFilter {
    name: string = '';
    description: string = '';
    order: 'RAND()' | 'created_at' = 'created_at';
    direction: 'ASC' | 'DESC' = 'DESC';
    page: number = 1;
    itemsPerPage: number = 5;
}

export class TagFilter {
    name: string = '';
    order: 'RAND()' | 'created_at' = 'created_at';
    direction: 'ASC' | 'DESC' = 'DESC';
    page: number = 1;
    itemsPerPage: number = 5;

}

//MODELS

export class Category {
    id: number;
    name: string = "";
    description: string;
    createdAt: Date;
    updatedAt: Date;

    static index = async function (): Promise<AxiosResponse<Category[]>> {
        return await api.get('/categories/index');
    };

    static delete = async function (id: number): Promise<AxiosResponse<void>> {
        return await api.delete(`/categories/${id}`);
    };

    static search = async function (filter: CategoryFilter): Promise<AxiosResponse<{ content: Category[], totalElements: number }>> {
        return await api.get('/categories/search', {
            params: filter
        });
    };

    static load = async function (id: string): Promise<AxiosResponse<Category>> {
        return await api.get(`/categories/${id}`);
    };

    static update = async function (id: number, category: Category,): Promise<AxiosResponse<Category>> {
        return await api.put(`/categories/${id}`, category);
    };

    static create = async function (category: Category): Promise<AxiosResponse<Category>> {
        return await api.post(`/categories`, category);
    };
}

export class Complaint {
    id: number;
    text: string;
    image: string;
    imageUrl: string;
    categoryId: number;
    complainerId: number;
    personId: number | null;
    postId: number | null;
    createdAt: string;
    updatedAt: Date;
    category: Category;
    complainer: Person;
    person: Person;
    post: Post;
    statusText: string;
    status: 'pending' | 'approved' | 'reproved';

    constructor(data?: {
        complainerId?: number;
        personId?: number;
        postId?: number;
        status?: 'pending' | 'approved' | 'reproved';
        statusText?: string;
    }) {
        if (data) {
            if (data.complainerId) this.complainerId = data.complainerId;
            if (data.personId) this.personId = data.personId;
            if (data.postId) this.postId = data.postId;
            if (data.status) this.status = data.status;
            if (data.statusText) this.statusText = data.statusText
        }
    }

    static create = async function (complaint: Complaint): Promise<AxiosResponse<Complaint>> {
        return await api.post(`/complaints`, complaint);
    };

    static load = async function (id: string): Promise<AxiosResponse<Post>> {
        return await api.get(`/complaints/${id}`);
    };


    static update = async function (id: number, complaint: Complaint,): Promise<AxiosResponse<Complaint>> {
        return await api.put(`/complaints/${id}`, complaint);
    };

    static index = async function (): Promise<AxiosResponse<Complaint[]>> {
        return await api.get(`/complaints/index`);
    };

    static search = async function (filter: ComplaintFilter): Promise<AxiosResponse<{ content: Complaint[], totalElements: number }>> {
        return await api.get('/complaints/search', {
            params: filter
        });
    };

}

export class Tag {
    id: number;
    name: string = "";
    createdAt: string;
    updatedAt: string;
    peopleTags: PeopleTag[];
    postsTags: PostsTag[];

    static index = async function (): Promise<AxiosResponse<Tag[]>> {
        return await api.get('/tags/index');
    };

    static search = async function (filter: TagFilter): Promise<AxiosResponse<{ content: Tag[], totalElements: number }>> {
        return await api.get('/tags/search', {
            params: filter
        });
    };
    static load = async function (id: string): Promise<AxiosResponse<Tag>> {
        return await api.get(`/tags/${id}`);
    };

    static create = async function (tag: Tag): Promise<AxiosResponse<Tag>> {
        return await api.post(`/tags`, tag);
    };

    static update = async function (id: number, tag: Tag,): Promise<AxiosResponse<Tag>> {
        return await api.put(`/tags/${id}`, tag);
    };

    static delete = async function (id: number): Promise<AxiosResponse<void>> {
        return await api.delete(`/tags/${id}`);
    };
}

export class Like {
    id: number;
    postId: number;
    personId: number;
    createdAt: string;
    updatedAt: string;
    person: Person;
    post: Post;

    static create = async function (like: Like): Promise<AxiosResponse<Like>> {
        return await api.post(`/likes`, like);
    };

    static delete = async function (id: number): Promise<AxiosResponse<void>> {
        return await api.delete(`/likes/${id}`);
    };
}

export class View {
    id: number;
    ip: string | null;
    personId: string | null;
    postId: string | null;
    createdAt: string;
    updatedAt: string;
    person: Person;
    post: Post;

    constructor(data?: {
        personId?: string;
        postId?: string;
    }) {
        if (data) {
            if (data.personId) { this.personId = data.personId } else { this.personId = null };
            if (data.postId) { this.postId = data.postId } else { this.postId = null };
        }
    }

    static create = async function (view: View): Promise<AxiosResponse<View>> {
        return await api.post(`/views`, view);
    };
}

export class PostsTag {
    id: number;
    tagId: string;
    postId: string;
    createdAt: string;
    updatedAt: string;
    post: Post;
    tag: Tag;

    constructor(data?: { tagId?: string, tag?: Tag }) {
        if (data) {
            if (data.tagId) this.tagId = data.tagId;
            if (data.tag) this.tag = data.tag;
        }
    }
}

export class PostItem {
    id: number;
    type: 'video' | 'image';
    item: string;
    itemUrl: string;
    dashUrl: string;
    hlsUrl: string;
    postId: string;
    post: Post;
    createdAt: string;
    updatedAt: string;

    constructor(data?: { type?: 'video' | 'image', item?: string, itemUrl: string }) {
        if (data) {
            if (data.type) this.type = data.type;
            if (data.item) this.item = data.item;
            if (data.itemUrl) this.itemUrl = data.itemUrl;
        }
    }
}

export class Post {
    id: number;
    text: string | null;
    price: number = 0;
    link: string;
    level: "0" | "1" | "2";
    type: 'video' | 'image';
    preview: string;
    previewUrl: string;
    thumbnail?: string;
    likes: Like[] = [];
    views: View[] = [];
    postItems: PostItem[] = [];
    itemsCount: number = 0;
    postsTags: PostsTag[] = [];
    transactions: Transaction[] = [];
    personId: string;
    person: Person;
    likesCount: number = 0;
    viewsCount: number = 0;
    status: 'A' | 'I' | 'P' | 'B';
    createdAt: string;
    updatedAt: string;

    static search = async function (filter: PostFilter): Promise<AxiosResponse<{ content: Post[], totalElements: number }>> {
        return await api.get('/posts/search', {
            params: filter
        });
    };

    static load = async function (id: string): Promise<AxiosResponse<Post>> {
        return await api.get(`/posts/${id}`);
    };

    static update = async function (id: number, post: Post,): Promise<AxiosResponse<Post>> {
        return await api.put(`/posts/${id}`, post);
    };

    static updateStatus = async function (id: number, status: 'A' | 'P'): Promise<AxiosResponse<void>> {
        return await api.patch(`/posts/updateStatus/${id}`, { status });
    };

    static delete = async function (id : number): Promise<AxiosResponse<Post>> {
        return await api.delete(`/posts/${id}`);
    };

    static create = async function (post: Post): Promise<AxiosResponse<Post>> {
        return await api.post(`/posts`, post);
    };
}
