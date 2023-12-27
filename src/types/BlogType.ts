import { CategoryType } from "./CategoryType";

export interface BlogType {
    id: string;
    title: string;
    description: string;
    image: string;
    publish_date: Date;
    categories: CategoryType[];
    author: string;
    email: string;
}

export interface BlogTypeResponse {
    data: BlogType[];
}
