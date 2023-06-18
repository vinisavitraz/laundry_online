import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {BASE_URL, DEFAULT_HEADERS} from "../../commons/constants/app-client.constants";
import {Customer} from "../../commons/models/customer.model";
import {HttpClient} from "@angular/common/http";
import {CustomerResponseDto} from "../dto/response/customer-response.dto";
import {CreateCustomerRequestDto} from "../dto/request/create-customer-request.dto";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  public registerCustomer(createCustomerRequestDto: CreateCustomerRequestDto): Observable<CustomerResponseDto> {
    return this.httpClient.post<CustomerResponseDto>(
        BASE_URL + '/users/customer',
        createCustomerRequestDto,
        DEFAULT_HEADERS,
    );
  }

  public findById(id: number): Observable<CustomerResponseDto> {
    return this.httpClient.get<CustomerResponseDto>(
        BASE_URL + '/users/' + id, DEFAULT_HEADERS
    );
  }
}
