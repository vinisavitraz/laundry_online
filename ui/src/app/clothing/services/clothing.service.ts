import { Injectable } from '@angular/core';
import {Clothing} from "../../commons";
import {BASE_URL, DEFAULT_HEADERS} from "../../commons/constants/app-client.constants";
import {ClothingsResponseDto} from "../dto/response/clothings-response.dto";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ClothingResponseDto} from "../dto/response/clothing-response.dto";
import {CreateClothingRequestDto} from "../dto/request/create-clothing-request.dto";
import {UpdateClothingRequestDto} from "../dto/request/update-clothing-request.dto";
import {StatusResponseDto} from "../../commons/dto/response/status-response.dto";

@Injectable({
  providedIn: 'root'
})
export class ClothingService {

  static GET_CLOTHINGS = '/clothings';
  static GET_CLOTHING_BY_ID = '/clothings/';
  static CREATE_CLOTHING = '/clothings';
  static UPDATE_CLOTHING = '/clothings';
  static DELETE_CLOTHING_BY_ID = '/clothings/';

  constructor(private httpClient: HttpClient) { }

  public getClothings(): Observable<ClothingsResponseDto> {
    return this.httpClient.get<ClothingsResponseDto>(
        BASE_URL + ClothingService.GET_CLOTHINGS, DEFAULT_HEADERS
    );
  }

  public saveClothing(clothing: Clothing): Observable<ClothingResponseDto> {
    if (clothing.id === undefined) {
      const createClothingDto: CreateClothingRequestDto = new CreateClothingRequestDto(clothing);
      return this.httpClient.post<ClothingResponseDto>(
          BASE_URL + ClothingService.CREATE_CLOTHING,
          createClothingDto,
          DEFAULT_HEADERS,
      );
    }

    const updateClothingRequestDto: UpdateClothingRequestDto = new UpdateClothingRequestDto(clothing);
    return this.httpClient.put<ClothingResponseDto>(
        BASE_URL + ClothingService.UPDATE_CLOTHING,
        updateClothingRequestDto,
        DEFAULT_HEADERS
    );
  }

  public findById(id: number): Observable<ClothingResponseDto> {
    return this.httpClient.get<ClothingResponseDto>(
        BASE_URL + ClothingService.GET_CLOTHING_BY_ID + id, DEFAULT_HEADERS
    );
  }

  public remove(clothing: Clothing): Observable<StatusResponseDto> {
    return this.httpClient.delete<StatusResponseDto>(
        BASE_URL + ClothingService.DELETE_CLOTHING_BY_ID + clothing.id,
        DEFAULT_HEADERS
    );
  }
}
