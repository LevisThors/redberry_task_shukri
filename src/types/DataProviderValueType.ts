import { Dispatch, SetStateAction } from "react";
import { CategoryTypeResponse } from "../types/CategoryType";
import { BlogTypeResponse } from "../types/BlogType";

export type DataProviderValueType = {
    categories: CategoryTypeResponse | undefined;
    blogs: BlogTypeResponse | undefined;
    loading: boolean;
    error: unknown;
    setReFetch: Dispatch<SetStateAction<boolean>>;
};
