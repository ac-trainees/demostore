import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfiguratorService } from '../api/configurator.service';
import { IProduct } from '../Interface/products';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { CountryService } from '../services/country.service';


@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss']
})

export class ConfiguratorComponent implements OnInit {

  cta: string | undefined;

  country: string | undefined;

  configuratorForm = new FormGroup({
    date: new FormControl(),
    duration: new FormControl(),
    support: new FormControl()
  });

  productId: number | undefined;

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

 /*  public configuratorModel = {

  }
  public  configuratorFields: FormlyFieldConfig[] = [
    {
    key: 'support',
    type: 'checkbox',
    templateOptions: {
        label: 'Support Service:',
        required: true,
      }
    }
  ] */

  onCancelClick(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.configuratorForm.valid) {
      this.configuratorService.addToCart({
        ...this.configuratorForm.value,
        productId: this.productId,
        cta: this.cta,
        country: this.country
      }).subscribe(data => {
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

