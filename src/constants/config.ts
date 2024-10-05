
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

export const notificationOptions = {
    severity: "info",
    sticky: false,
    life: 2000,
    closable: true,
    icon: "pi pi-info-circle",
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