import { Injectable } from '@angular/core';
import {Clothing} from "../../commons";

@Injectable({
  providedIn: 'root'
})
export class ClothingService {

  static CLOTHINGS_KEY = 'clothings';

  constructor() { }

  public getClothings(): Clothing[] {
    const clothingsStorage: string | null = localStorage.getItem(ClothingService.CLOTHINGS_KEY);

    if (clothingsStorage === null) {
      return [];
    }

    return JSON.parse(clothingsStorage);
  }

  public saveClothing(clothing: Clothing): void {
    const clothings: Clothing[] = this.getClothings();

    if (clothings.length === 0) {
      clothing.id = this.getNextId();

      localStorage.setItem(ClothingService.CLOTHINGS_KEY, JSON.stringify([clothing]));
    }

    if (clothing.id === undefined) {
      clothing.id = this.getNextId(clothings);
      clothings.push(clothing);

      localStorage.setItem(ClothingService.CLOTHINGS_KEY, JSON.stringify(clothings));
      return;
    }

    let index: number = clothings.findIndex(clothingArray => clothingArray.id === clothing.id);
    clothings[index] = clothing;

    localStorage.setItem(ClothingService.CLOTHINGS_KEY, JSON.stringify(clothings));
  }

  public findById(id: number): Clothing | undefined {
    const clothings: Clothing[] = this.getClothings();

    return clothings.find(clothing => clothing.id === id);
  }

  public remove(clothing: Clothing): void {
    const clothings: Clothing[] = this.getClothings();
    const newClothings: Clothing[] = clothings.filter(clothingArray => clothingArray.id !== clothing.id);

    localStorage.setItem(ClothingService.CLOTHINGS_KEY, JSON.stringify(newClothings));
  }

  private getNextId(clothings: Clothing[] = []): number {
    if (clothings.length === 0) {
      return 1;
    }

    let nextId: number = 0;

    clothings.forEach(clothing => {
      if (clothing.id! > nextId) {
        nextId = clothing.id! + 1;
      }
    });

    return nextId;
  }
}
