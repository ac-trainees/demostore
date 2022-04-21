import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfiguratorService } from '../api/configurator.service';
import { IProduct } from '../Interface/products';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss']
})

export class ConfiguratorComponent implements OnInit {

  configurator: string | undefined;

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
    private formBuilder: FormBuilder) {

      this.productId = data.id;
      this.selectedProduct = data.product;
      this.configurator = data.config;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.configuratorForm.valid) {
      this.configuratorService.addToCart({...this.configuratorForm.value, productId: this.productId, cta: this.configurator, country: 'example-country'})
        .subscribe(data => {
        console.log(data)
        })
    } else {
      console.log('Please fill out all required fields')
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
    this.formValidation();
  }
}

