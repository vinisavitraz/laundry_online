import {Component} from '@angular/core';
import {ClothingService} from "../../services/clothing.service";
import {Clothing} from "src/app/commons";

@Component({
  selector: 'app-list-clothings',
  templateUrl: './list-clothings.component.html',
  styleUrls: ['./list-clothings.component.css']
})
export class ListClothingsComponent {

  clothings: Clothing[];

  constructor(private clothingService: ClothingService) {
    this.clothings = [];
  }

  ngOnInit(): void {
    this.clothings = this.listClothings();
  }

  public remove($event: any, clothing: Clothing): void {
    $event.preventDefault();

    if (confirm(`Deseja realmente remover a peça de roupa ${clothing.name}?`)) {
      this.clothingService.remove(clothing);
      this.clothings = this.listClothings();
    }
  }

  private listClothings(): Clothing[] {
    return this.clothingService.getClothings();
  }
}
