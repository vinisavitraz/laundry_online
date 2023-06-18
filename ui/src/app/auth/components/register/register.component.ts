import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {RequestRegisterDto} from "../../dto/request/request-register.dto";
import {CepService} from "../../../commons/services/cep.service";
import {RoutesEnum} from "../../../commons/enums/routes.enum";
import {Router} from "@angular/router";
import {CustomerService} from "../../../customer/services/customer.service";
import {Customer} from "../../../commons/models/customer.model";
import {RolesEnum} from "../../../commons/enums/roles.enum";
import {CreateCustomerRequestDto} from "../../../customer/dto/request/create-customer-request.dto";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  nameInput!: FormControl;
  documentInput!: FormControl;
  emailInput!: FormControl;
  phoneInput!: FormControl;
  cepInput!: FormControl;
  streetInput!: FormControl;
  streetNumberInput!: FormControl;
  districtInput!: FormControl;
  cityInput!: FormControl;
  stateInput!: FormControl;
  dto: RequestRegisterDto;
  message: string | undefined;

  constructor(
      private cepService: CepService,
      private customerService: CustomerService,
      private router: Router,
  ) {
    this.dto = new RequestRegisterDto();
    this.message = undefined;
  }

  ngOnInit(): void {
    this.createForm();

    this.registerForm!.get('cep')?.valueChanges.subscribe(cep => {
      this.findCep(cep);
    });
  }

  private createForm(): void {
    this.nameInput = new FormControl(this.dto.name);
    this.documentInput = new FormControl(this.dto.document);
    this.emailInput = new FormControl(this.dto.email);
    this.phoneInput = new FormControl(this.dto.phone);
    this.cepInput = new FormControl(this.dto.cep);
    this.streetInput = new FormControl(this.dto.street);
    this.streetNumberInput = new FormControl(this.dto.streetNumber);
    this.districtInput = new FormControl(this.dto.district);
    this.cityInput = new FormControl(this.dto.city);
    this.stateInput = new FormControl(this.dto.state);

    this.registerForm = new FormGroup({
      cep: this.cepInput,
      street: this.streetInput,
      streetNumber: this.streetNumberInput,
      district: this.districtInput,
      city: this.cityInput,
      state: this.stateInput,
      name: this.nameInput,
      document: this.documentInput,
      email: this.emailInput,
      phone: this.phoneInput,
    });
  }

  public findCep(cep: string): void {
    if (cep.length < 8 || cep.length > 8) {
      return;
    }

    this.cepService.findCep(cep).subscribe(addressInfo => {
      this.streetInput.setValue(addressInfo.address?.street);
      this.streetNumberInput.setValue(addressInfo.address?.streetNumber);
      this.districtInput.setValue(addressInfo.address?.district);
      this.cityInput.setValue(addressInfo.address?.city);
      this.stateInput.setValue(addressInfo.address?.state);
    });
  }

  public registerUser(): void {
    if (!this.registerForm.valid) {
      return;
    }

    const createCustomerRequestDto: CreateCustomerRequestDto = new CreateCustomerRequestDto(
        this.nameInput.getRawValue(),
        this.emailInput.getRawValue(),
        this.documentInput.getRawValue(),
        this.phoneInput.getRawValue(),
        this.cepInput.getRawValue(),
        this.streetInput.getRawValue(),
        this.streetNumberInput.getRawValue(),
        this.districtInput.getRawValue(),
        this.cityInput.getRawValue(),
        this.stateInput.getRawValue(),
    );

    this.customerService.registerCustomer(createCustomerRequestDto).subscribe((responseDto) => {
      if (responseDto.entity !== null) {
        this.router.navigate([RoutesEnum.LOGIN]);
        return;
      }
    });
  }
}
