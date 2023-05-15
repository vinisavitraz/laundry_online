import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CreateOrderRequestDto} from "../../dto/request/create-order-request.dto";
import {OrderService} from "../../services/order.service";
import {Router} from "@angular/router";
import {Clothing} from "../../../commons";
import {ClothingService} from "../../../clothing/services/clothing.service";
import {ItemOrderRequestDto} from "../../dto/request/item-order-request.dto";

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent {

  clothings: Clothing[];
  orderForm!: FormGroup;
  clothingId!: FormControl;
  clothingQuantity!: FormControl;
  dto: CreateOrderRequestDto;
  edit: boolean;

  constructor(
      private orderService: OrderService,
      private clothingService: ClothingService,
      private router: Router,
      private formBuilder: FormBuilder,
  ) {
    this.dto = new CreateOrderRequestDto([]);
    this.clothings = this.listClothings();
    this.edit = false;
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.clothingId = new FormControl('');
    this.clothingQuantity = new FormControl('');

    this.orderForm = new FormGroup({
      clothingId: this.clothingId,
      clothingQuantity: this.clothingQuantity,
    });
  }

  public addNewClothing(): void {
    const clothingId: string = this.clothingId.getRawValue();
    const clothingQuantity: string = this.clothingQuantity.getRawValue();

    if (clothingId === '' || clothingQuantity === '') {
      return;
    }

    for (let i = 0; i < this.dto.items!.length; i++) {
      const item: ItemOrderRequestDto = this.dto.items![i];

      if (item.clothing!.id === Number(clothingId)) {
        if (this.edit) {
          this.dto.items![i].quantity! = Number(clothingQuantity);
          this.edit = false;
        } else {
          this.dto.items![i].quantity! += Number(clothingQuantity);
        }
        this.clothingId.setValue('');
        this.clothingQuantity.setValue('');
        return;
      }
    }

    const clothing: Clothing | undefined = this.clothingService.findById(Number(clothingId));

    const item: ItemOrderRequestDto = new ItemOrderRequestDto(clothing, Number(clothingQuantity));

    this.dto.items!.push(item);

    console.log('kkkk');

    this.clothingId.setValue('');
    this.clothingQuantity.setValue('');

    // this.items.push(this.formBuilder.group({
    //   itemQuantity: null,
    //   clothingId: null,
    // }))
  }

  public showOrderSummary(): void {
    this.orderService.createOrder(this.dto).subscribe(order => {
      this.router.navigate(['orders/summary/' + order.id]);
    });
  }

  public editItem(item: ItemOrderRequestDto): void {
    this.edit = true;
    this.clothingId.setValue(item.clothing!.id);
    this.clothingQuantity.setValue(item.quantity);
  }

  public removeItem($event: any, itemToDelete: ItemOrderRequestDto): void {
    if (confirm(`Deseja realmente remover a peça de roupa ${itemToDelete.clothing?.name!}?`)) {

      this.dto.items = this.dto.items!.filter(item => item.clothing!.id !== itemToDelete.clothing!.id);

      this.clothingId.setValue('');
      this.clothingQuantity.setValue('');
    }
  }

  private listClothings(): Clothing[] {
    console.log('listClothings');
    console.log(this.clothingService.getClothings());
    return this.clothingService.getClothings();
  }

}
