import React from "react";
import { DataProviderValueType } from "../types/DataProviderValueType";

export const DataContext = React.createContext<
    DataProviderValueType | undefined
>(undefined);
