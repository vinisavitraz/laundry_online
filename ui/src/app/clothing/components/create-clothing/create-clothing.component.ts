import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ClothingService} from "../../services/clothing.service";
import {Router} from "@angular/router";
import {RoutesEnum} from "../../../commons/enums/routes.enum";
import {Clothing} from "src/app/commons";

@Component({
  selector: 'app-create-clothing',
  templateUrl: './create-clothing.component.html',
  styleUrls: ['./create-clothing.component.css']
})
export class CreateClothingComponent implements OnInit {
  @ViewChild('createClothingForm') createClothingForm!: NgForm;
  clothing!: Clothing;

  constructor(private clothingService: ClothingService, private router: Router) {}

  ngOnInit(): void {
    this.clothing = new Clothing();
  }

  public async save(): Promise<void> {
    if (this.createClothingForm.form.valid) {
      this.clothingService.saveClothing(this.clothing);
      await this.router.navigate([RoutesEnum.LIST_CLOTHINGS])
    }
  }
}
