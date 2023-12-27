import { Dispatch, SetStateAction } from "react";
import { CategoryType } from "../types/CategoryType";
import { BlogType } from "../types/BlogType";

export type DataProviderValueType = {
    categories: CategoryType | null | undefined;
    blogs: BlogType | null | undefined;
    loading: boolean;
    error: unknown;
    setReFetch: Dispatch<SetStateAction<boolean>>;
};
