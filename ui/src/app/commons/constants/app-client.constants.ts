import {HttpHeaders} from "@angular/common/http";

export const BASE_URL = 'http://localhost:8080';

export const DEFAULT_HEADERS = {
    headers: new HttpHeaders({
        'Content-type': 'application/json',
    })
};