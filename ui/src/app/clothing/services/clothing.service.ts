import { Injectable } from '@angular/core';
import {Clothing} from "../../commons";

@Injectable({
  providedIn: 'root'
})
export class ClothingService {

  idCounter: number = 0;
  clothings: Clothing[] = [];

  constructor() { }

  public listClothings(): Clothing[] {
    return this.clothings;
  }

  public saveClothing(clothing: Clothing): void {
    if (clothing.id === undefined) {
      clothing.id = this.getNextId();
      this.clothings.push(clothing);
      return;
    }

    let index: number = this.clothings.findIndex(clothingArray => clothingArray.id === clothing.id);
    this.clothings[index] = clothing;
  }

  public findById(id: number): Clothing | undefined {
    return this.clothings.find(clothing => clothing.id === id);
  }

  public remove(clothing: Clothing): void {
    this.clothings = this.clothings.filter(clothingArray => clothingArray.id !== clothing.id);
  }

  private getNextId(): number {
    this.idCounter++;

    return this.idCounter;
  }
}
