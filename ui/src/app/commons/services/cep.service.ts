import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CepResponseDto} from "../dto/response/cep-response.dto";

@Injectable({
  providedIn: 'root'
})
export class CepService {

  static BASE_URL = 'http://localhost:8080/cep/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    })
  };
  constructor(private httpClient: HttpClient) { }

  public findCep(cep: string): Observable<CepResponseDto> {
    return this.httpClient.get<CepResponseDto>(CepService.BASE_URL + cep, this.httpOptions);
  }
}
