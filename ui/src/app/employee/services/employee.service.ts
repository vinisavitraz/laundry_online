import { Injectable } from '@angular/core';
import {Employee} from "../../commons/models/employee.model";
import {BASE_URL, DEFAULT_HEADERS} from "../../commons/constants/app-client.constants";
import {HttpClient} from "@angular/common/http";
import {EmployeesResponseDto} from "../dto/response/employees-response.dto";
import {Observable} from "rxjs";
import {StatusResponseDto} from "../../commons/dto/response/status-response.dto";
import {ClothingResponseDto} from "../../clothing/dto/response/clothing-response.dto";
import {EmployeeResponseDto} from "../dto/response/employee-response.dto";
import {CreateEmployeeRequestDto} from "../dto/request/create-employee-request.dto";
import {UpdateEmployeeRequestDto} from "../dto/request/update-employee-request.dto";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
      private httpClient: HttpClient,
  ) { }

  public getEmployees(): Observable<EmployeesResponseDto> {
    return this.httpClient.get<EmployeesResponseDto>(
        BASE_URL + '/users/employees', DEFAULT_HEADERS,
    );
  }

  public saveEmployee(employee: Employee): Observable<EmployeeResponseDto> {
    if (employee.id === undefined) {
      const createEmployeeRequestDto: CreateEmployeeRequestDto = new CreateEmployeeRequestDto(employee);

      return this.httpClient.post<ClothingResponseDto>(
          BASE_URL + '/users/employee',
          createEmployeeRequestDto,
          DEFAULT_HEADERS,
      );
    }

    const updateEmployeeRequestDto: UpdateEmployeeRequestDto = new UpdateEmployeeRequestDto(employee);

    return this.httpClient.put<ClothingResponseDto>(
        BASE_URL + '/users/employee',
        updateEmployeeRequestDto,
        DEFAULT_HEADERS
    );
  }

  public findById(id: number): Observable<EmployeeResponseDto> {
    return this.httpClient.get<EmployeeResponseDto>(
        BASE_URL + '/users/' + id, DEFAULT_HEADERS
    );
  }

  public remove(employee: Employee): Observable<StatusResponseDto> {
    return this.httpClient.delete<StatusResponseDto>(
        BASE_URL + '/users/' + employee.id,
        DEFAULT_HEADERS
    );
  }
}
