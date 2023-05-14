import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Clothing} from "src/app/commons";
import {ClothingService} from "../../services/clothing.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RoutesEnum} from "../../../commons/enums/routes.enum";

@Component({
  selector: 'app-edit-clothing',
  templateUrl: './edit-clothing.component.html',
  styleUrls: ['./edit-clothing.component.css']
})
export class EditClothingComponent implements OnInit {
  @ViewChild('editClothingForm') editClothingForm!: NgForm;
  clothing!: Clothing;

  constructor(
      private clothingService: ClothingService,
      private router: Router,
      private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id: number = +this.route.snapshot.params['id'];
    const clothing: Clothing | undefined = this.clothingService.findById(id);

    if (clothing === undefined) {
      throw new Error('Clothing not found. ID: ' + id);
    }

    this.clothing = clothing;
  }

  public async save(): Promise<void> {
    if (this.editClothingForm.form.valid) {
      this.clothingService.saveClothing(this.clothing);
      await this.router.navigate([RoutesEnum.LIST_CLOTHINGS])
    }
  }
}
