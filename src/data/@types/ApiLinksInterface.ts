export interface ApiLinksInterface {
    type: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    rel: string;
    uri: string;
}
