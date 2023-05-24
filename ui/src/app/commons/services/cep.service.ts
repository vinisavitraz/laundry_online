import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CepResponseDto} from "../dto/response/cep-response.dto";
import {BASE_URL, DEFAULT_HEADERS} from "../constants/app-client.constants";

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private httpClient: HttpClient) { }

  public findCep(cep: string): Observable<CepResponseDto> {
    return this.httpClient.get<CepResponseDto>(BASE_URL + '/cep/' + cep, DEFAULT_HEADERS);
  }
}
