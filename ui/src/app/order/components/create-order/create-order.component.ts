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
  totalQuantity: number;
  totalWashTime: number;
  totalWashPrice: number;

  constructor(
      private orderService: OrderService,
      private clothingService: ClothingService,
      private router: Router,
      private formBuilder: FormBuilder,
  ) {
    this.dto = new CreateOrderRequestDto([]);
    this.clothings = this.listClothings();
    this.edit = false;
    this.totalQuantity = 0;
    this.totalWashTime = 0;
    this.totalWashPrice = 0;
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
    console.log(this.totalQuantity);
    const clothingId: number = Number(this.clothingId.getRawValue());
    const clothingQuantity: number = Number(this.clothingQuantity.getRawValue());

    if (isNaN(clothingId) || isNaN(clothingQuantity)) {
      return;
    }

    if (clothingId <= 0 || clothingQuantity <= 0) {
      return;
    }

    for (let i = 0; i < this.dto.items!.length; i++) {
      const item: ItemOrderRequestDto = this.dto.items![i];

      if (item.clothing!.id === clothingId) {
        if (this.edit) {
          this.totalWashPrice -= (item.quantity! * item.clothing!.washPrice!);
          this.totalQuantity -= this.dto.items![i].quantity!;

          this.totalWashPrice += (clothingQuantity * item.clothing!.washPrice!);
          this.totalQuantity += clothingQuantity;
          this.dto.items![i].quantity! = clothingQuantity;

          this.edit = false;
        } else {
          this.totalWashPrice += (clothingQuantity * item.clothing!.washPrice!);
          this.totalQuantity += clothingQuantity;
          this.dto.items![i].quantity! += clothingQuantity;
        }
        this.clothingId.setValue('');
        this.clothingQuantity.setValue('');
        console.log(this.totalQuantity);
        return;
      }
    }

    const clothing: Clothing | undefined = this.clothingService.findById(Number(clothingId));
    const item: ItemOrderRequestDto = new ItemOrderRequestDto(clothing, Number(clothingQuantity));

    if (item.clothing!.washTime! > this.totalWashTime) {
      this.totalWashTime = item.clothing!.washTime!;
    }

    this.totalWashPrice += (item.quantity! * item.clothing!.washPrice!);
    this.totalQuantity += item.quantity!;
    this.dto.items!.push(item);

    this.clothingId.setValue('');
    this.clothingQuantity.setValue('');
    console.log(this.totalQuantity);
  }

  public showOrderSummary(): void {
    if (this.dto.items!.length === 0) {
      return;
    }

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

      if (this.dto.items.length === 0) {
        this.resetDetails();
        this.clothingId.setValue('');
        this.clothingQuantity.setValue('');
        return;
      }

      this.totalQuantity -= itemToDelete.quantity!;
      this.totalWashPrice -= (itemToDelete.clothing!.washPrice! * itemToDelete.quantity!);

      if (itemToDelete.clothing!.washTime === this.totalWashTime) {
        let newTotalWashTime: number = 0;
        for (let i = 0; i < this.dto.items!.length; i++) {
          const item: ItemOrderRequestDto = this.dto.items![i];

          if (item.clothing!.id === itemToDelete.clothing!.id) {
            return;
          }

          if (item.clothing!.washTime! >= newTotalWashTime) {
            newTotalWashTime = item.clothing!.washTime!;
          }
        }
        this.totalWashTime = newTotalWashTime;
      }

      this.clothingId.setValue('');
      this.clothingQuantity.setValue('');
    }
  }

  private listClothings(): Clothing[] {
    console.log(this.clothingService.getClothings());
    return this.clothingService.getClothings();
  }

  private resetDetails(): void {
    this.totalQuantity = 0;
    this.totalWashTime = 0;
    this.totalWashPrice = 0;
  }

}
