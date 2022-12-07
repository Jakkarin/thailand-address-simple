export interface Config {
    database: string;
}
export interface Database {
    data: any[];
    words: string;
    lookup: string;
}
export interface Address {
    amphoe: string;
    district: string;
    province: string;
    zipcode: string;
}
