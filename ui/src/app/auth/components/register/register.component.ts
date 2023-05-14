import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {RequestRegisterDto} from "../../dto/request-register.dto";
import {CepService} from "../../../commons/services/cep.service";
import {RoutesEnum} from "../../../commons/enums/routes.enum";
import {Router} from "@angular/router";
import {UserService} from "../../../user/services/user.service";

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

  constructor(
      private cepService: CepService,
      private userService: UserService,
      private router: Router,
  ) {
    this.dto = new RequestRegisterDto();
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
    })
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

    this.dto.name = this.nameInput.getRawValue();
    this.dto.email = this.emailInput.getRawValue();
    this.dto.document = this.documentInput.getRawValue();
    this.dto.phone = this.phoneInput.getRawValue();
    this.dto.cep = this.cepInput.getRawValue();
    this.dto.street = this.streetInput.getRawValue();
    this.dto.streetNumber = this.streetNumberInput.getRawValue();
    this.dto.district = this.districtInput.getRawValue();
    this.dto.city = this.cityInput.getRawValue();
    this.dto.state = this.stateInput.getRawValue();


    this.userService.registerCustomer(this.dto).subscribe((customer) => {
      this.router.navigate([RoutesEnum.LOGIN]);
    });
  }
}
