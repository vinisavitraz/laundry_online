import { Component } from '@angular/core';
import { FormControl, FormGroup} from "@angular/forms";
import {CreateOrderRequestDto} from "../../dto/request/create-order-request.dto";
import {OrderService} from "../../services/order.service";
import {Router} from "@angular/router";
import {Clothing, Order} from "../../../commons";
import {ClothingService} from "../../../clothing/services/clothing.service";
import {User} from "../../../commons/models/user.model";
import {AuthService} from "../../../auth/services/auth.service";
import {ErrorMessagesEnum} from "../../../commons/enums/error-messages.enum";
import {OrderItem} from "../../../commons/models/order-item.model";

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent {

  user: User | undefined;
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
  ) {
    this.dto = new CreateOrderRequestDto(new Order, []);
    this.clothings = [];
    this.edit = false;
    this.totalQuantity = 0;
    this.totalWashTime = 0;
    this.totalWashPrice = 0;
    this.user = undefined;
  }

  ngOnInit(): void {
    this.createForm();

    this.authService.getAuthenticatedUser().subscribe({
      next: (authenticatedUserDto) => {
        this.user = authenticatedUserDto.entity;
      },
      error: (err) => {
        console.log(err);
        this.user = undefined;
      },
    });

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
        const item: OrderItem = this.dto.items![i];

        if (item.clothingId === clothingId) {
          if (this.edit) {
            this.totalWashPrice -= (item.totalQuantity! * item.totalWashPrice!);
            this.totalQuantity -= this.dto.items![i].totalQuantity!;

            this.totalWashPrice += (clothingQuantity * item.totalWashPrice!);
            this.totalQuantity += clothingQuantity;
            this.dto.items![i].totalQuantity! = clothingQuantity;

            this.edit = false;
          } else {
            this.totalWashPrice += (clothingQuantity * item.totalWashPrice!);
            this.totalQuantity += clothingQuantity;
            this.dto.items![i].totalQuantity! += clothingQuantity;
          }
          this.clothingId.setValue('');
          this.clothingQuantity.setValue('');
          return;
        }
      }

      const item: OrderItem = new OrderItem(0, clothing.id, Number(clothingQuantity), clothing.washTime);

      if (clothing.washTime! > this.totalWashTime) {
        this.totalWashTime = clothing.washTime!;
      }

      this.totalWashPrice += (item.totalQuantity! * item.totalWashPrice!);
      this.totalQuantity += item.totalQuantity!;
      this.dto.items!.push(item);

      this.clothingId.setValue('');
      this.clothingQuantity.setValue('');
    });
  }

  public showOrderSummary(): void {
    this.createMessage = undefined;
    this.addNewClothingMessage = undefined;

    if (!this.dto.entity) {
      this.createMessage = ErrorMessagesEnum.ORDER_INVALID
      return;
    }

    if (this.dto.items!.length === 0) {
      this.createMessage = ErrorMessagesEnum.ORDER_WITHOUT_CLOTHINGS
      return;
    }


    this.dto.entity!.customerId = this.user!.id;

    this.orderService.createOrder(this.dto).subscribe(order => {
      if (order.entity === null) {
        alert('Erro criando pedido!');
        return;
      }

      this.router.navigate(['orders/summary/' + order.entity!.id]);
    });
  }

  public editItem(item: OrderItem): void {
    this.edit = true;
    this.clothingId.setValue(item.clothingId!);
    this.clothingQuantity.setValue(item.totalQuantity);
  }

  public removeItem($event: any, itemToDelete: OrderItem): void {
    this.clothingService.findById(itemToDelete.clothingId!).subscribe(clothingResponseDto => {
      if (!clothingResponseDto.entity) {
        return;
      }

      const clothing: Clothing = clothingResponseDto.entity!;
      if (confirm(`Deseja realmente remover a peça de roupa ${clothing.name!}?`)) {

        this.dto.items = this.dto.items!.filter(item => item.clothingId !== clothing.id);

        if (this.dto.items.length === 0) {
          this.resetDetails();
          this.clothingId.setValue('');
          this.clothingQuantity.setValue('');
          return;
        }

        this.totalQuantity -= itemToDelete.totalQuantity!;
        this.totalWashPrice -= (itemToDelete.totalWashPrice! * itemToDelete.totalQuantity!);

        if (clothing.washTime === this.totalWashTime) {
          let newTotalWashTime: number = 0;
          for (let i = 0; i < this.dto.items!.length; i++) {
            const item: OrderItem = this.dto.items![i];

            if (item.clothingId === itemToDelete.clothingId) {
              return;
            }

            if (item.totalWashTime! >= newTotalWashTime) {
              newTotalWashTime = item.totalWashTime!;
            }
          }
          this.totalWashTime = newTotalWashTime;
        }

        this.clothingId.setValue('');
        this.clothingQuantity.setValue('');
      }
    });
  }

  private resetDetails(): void {
    this.totalQuantity = 0;
    this.totalWashTime = 0;
    this.totalWashPrice = 0;
  }

}
