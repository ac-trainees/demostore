import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfiguratorService } from '../api/configurator.service';
import { IProduct } from '../Interface/products';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { CountryService } from '../services/country.service';
import { IConfigForm } from '../Interface/configForm';


@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss']
})

export class ConfiguratorComponent implements OnInit {

  cta!: string;

  country!: string;

  configuratorForm = new FormGroup({
    date: new FormControl(),
    duration: new FormControl(),
    support: new FormControl()
  });

  productId!: number;

  selectedProduct!: IProduct;

  minDate: Date = new Date();

  constructor(
    private configuratorService: ConfiguratorService,
    private dialogRef: MatDialogRef<ConfiguratorComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private formBuilder: FormBuilder,
    public countryService: CountryService) {

      this.productId = data.id;
      this.selectedProduct = data.product;
      this.cta = data.config;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  submit() {
    const formValue: IConfigForm = {
      ...this.configuratorForm.value,
      productId: this.productId,
      country: this.country,
      cta: this.cta
    }
    if (this.configuratorForm.valid) {
      this.configuratorService.addToCart(formValue).subscribe(data => {
        console.log(data)
      })
    } else {
      alert('Please fill out all required fields');
    }
  }

  formValidation() {
    this.configuratorForm = this.formBuilder.group({
      date: ['', Validators.required],
      duration: ['', Validators.required],
      support: []
    })
  }

  ngOnInit() {
    this.country = this.countryService.country;
    this.formValidation();
  }
}

