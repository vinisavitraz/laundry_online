import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListClothingsComponent } from './components/list-clothings/list-clothings.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { CreateClothingComponent } from './components/create-clothing/create-clothing.component';
import { EditClothingComponent } from './components/edit-clothing/edit-clothing.component';
import {CommonsModule} from "../commons";
import { ClothingDetailComponent } from './components/clothing-detail/clothing-detail.component';
import {NgxMaskModule} from "ngx-mask";

@NgModule({
  declarations: [
    ListClothingsComponent,
    CreateClothingComponent,
    EditClothingComponent,
    ClothingDetailComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        CommonsModule,
        NgxMaskModule.forRoot(),
    ]
})
export class ClothingModule { }
