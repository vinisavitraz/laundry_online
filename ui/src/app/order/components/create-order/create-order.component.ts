import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CreateOrderRequestDto} from "../../dto/request/create-order-request.dto";
import {OrderService} from "../../services/order.service";
import {Router} from "@angular/router";
import {Clothing} from "../../../commons";
import {ClothingService} from "../../../clothing/services/clothing.service";
import {ItemOrderRequestDto} from "../../dto/request/item-order-request.dto";
import {User} from "../../../commons/models/user.model";
import {AuthService} from "../../../auth/services/auth.service";
import {ErrorMessagesEnum} from "../../../commons/enums/error-messages.enum";

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent {

  user: User | null;
  clothings: Clothing[];
  orderForm!: FormGroup;
  clothingId!: FormControl;
  clothingQuantity!: FormControl;
  dto: CreateOrderRequestDto;
  edit: boolean;
  totalQuantity: number;
  totalWashTime: number;
  totalWashPrice: number;
  createMessage: string | undefined;
  addNewClothingMessage: string | undefined;

  constructor(
      private authService: AuthService,
      private orderService: OrderService,
      private clothingService: ClothingService,
      private router: Router,
      private formBuilder: FormBuilder,
  ) {
    this.dto = new CreateOrderRequestDto([]);
    this.clothings = [];
    this.edit = false;
    this.totalQuantity = 0;
    this.totalWashTime = 0;
    this.totalWashPrice = 0;
    this.user = null;
  }

  ngOnInit(): void {
    this.createForm();
    this.user = this.authService.getAuthenticatedUser();

    this.clothingService.getClothings().subscribe(clothings => {
      if (clothings.entities) {
        this.clothings = clothings.entities!;
      } //treat error?
    });
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
    this.createMessage = undefined;
    this.addNewClothingMessage = undefined;
    const clothingId: number = Number(this.clothingId.getRawValue());
    const clothingQuantity: number = Number(this.clothingQuantity.getRawValue());

    if (isNaN(clothingId) || isNaN(clothingQuantity)) {
      this.addNewClothingMessage = ErrorMessagesEnum.INVALID_ITEM_INPUT
      return;
    }

    if (clothingId <= 0 || clothingQuantity <= 0) {
      this.addNewClothingMessage = ErrorMessagesEnum.INVALID_ITEM_INPUT
      return;
    }

    this.clothingService.findById(clothingId).subscribe(clothingResponseDto => {
      if (clothingResponseDto.entity === null) {
        throw new Error('Clothing not found. ID: ' + clothingId);
      }
      const clothing: Clothing = clothingResponseDto.entity!;

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

      const item: ItemOrderRequestDto = new ItemOrderRequestDto(clothing, Number(clothingQuantity));

      if (item.clothing!.washTime! > this.totalWashTime) {
        this.totalWashTime = item.clothing!.washTime!;
      }

      this.totalWashPrice += (item.quantity! * item.clothing!.washPrice!);
      this.totalQuantity += item.quantity!;
      this.dto.items!.push(item);

      this.clothingId.setValue('');
      this.clothingQuantity.setValue('');
    });
  }

  public showOrderSummary(): void {
    this.createMessage = undefined;
    this.addNewClothingMessage = undefined;
    console.log('showOrderSummary');

    if (this.dto.items!.length === 0) {
      this.createMessage = ErrorMessagesEnum.ORDER_WITHOUT_CLOTHINGS
      return;
    }

    this.dto.customerId = this.user!.id;

    this.orderService.createOrder(this.dto).subscribe(order => {
      if (order === null) {
        return;
      }

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

  private resetDetails(): void {
    this.totalQuantity = 0;
    this.totalWashTime = 0;
    this.totalWashPrice = 0;
  }

}
