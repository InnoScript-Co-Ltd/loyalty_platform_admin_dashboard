import { VariantType } from "notistack";

export const env = [
    'http://localhost:5205/api/v1',
    'https://api.gscexport.com',
];

export const drawerWidth : number = 300;

export const keys = {
    API_TOKEN: "TOKEN",
    USER: "USER",
    PERMISSION: "PERMISSION",
    ROLE: "ROLE",
    LANGUAGE: "LANGUAGE"
}

export interface NotificationOptions {
    variant: VariantType, // "success" | "error" | "warning" | "default" | "info"
    msg: string,
    show: false,
}

export const notificationOptions: NotificationOptions = {
    variant: "info",
    msg: "",
    show: false
}

export interface HTTPResponse {
    status: number,
    statusText: string,
    data: any,
}

export interface HTTPErrorResponse {
    message: string,
    status: number,
    notification?: {
        show: boolean,
        msg: string,
        variant: string,
    },
    error?: any | null
}


interface Paginate_Options {
    rows: number,
    rowsPerPageOptions: Array<number>,
    total: number
}

export const paginateOptions : Paginate_Options = {
    rows: 10,
    rowsPerPageOptions: [10,50,100,150,500,1000],
    total: 0,
    // paginatorTemplate: "RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",
    // currentPageReportTemplate: "{first} to {last} of {totalRecords}",
    // paginatorLeft: paginatorLeft, 
    // sortMode: "single",
    // resizableColumns: true,
    // lazy: true
}