import { Component, Input, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { QueryService } from "src/app/api/query.service";
import { IProduct } from "src/app/Interface/products";


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})

export class CardComponent implements OnInit {

  @Input() product!: IProduct;

  searchWord!: string;

  private readonly destroy$ = new Subject<void>();


  constructor(private queryService: QueryService) {}

  ngOnInit(): void {
    this.queryService.queryData$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data =>
        this.searchWord = data
      )
  }
}

