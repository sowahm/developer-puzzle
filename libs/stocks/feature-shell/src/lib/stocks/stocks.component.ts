import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';


@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  symbol: string;
  period: string;
  quotes$ = this.priceQuery.priceQueries$;

  minDate = new Date(2000, 0, 1);
  maxDate = new Date();


  Dfrom = new FormControl(new Date());
  Dto  = new FormControl(new Date());
 
  serializedDate = new FormControl((new Date()).toISOString());


  timePeriods = [
    { viewValue: 'All available data', value: 'max' },
    { viewValue: 'Five years', value: '5y' },
    { viewValue: 'Two years', value: '2y' },
    { viewValue: 'One year', value: '1y' },
    { viewValue: 'Year-to-date', value: 'ytd' },
    { viewValue: 'Six months', value: '6m' },
    { viewValue: 'Three months', value: '3m' },
    { viewValue: 'One month', value: '1m' }
  ];
  rangeFilter: any;
  getData: any;

  constructor(fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required],
    });
  }

  ngOnInit() {}


 
  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, period} = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, period);
      
    } 
  
  console.log(Math.floor((Date.UTC(this.Dto.value.getFullYear(), this.Dto.value.getMonth(), this.Dto.value.getDate()) - Date.UTC(this.Dfrom.value.getFullYear(), this.Dfrom.value.getMonth(), this.Dfrom.value.getDate()) ) /(1000 * 60 * 60 * 24)));
  } 
 

    Drange({ Dto, Dfrom }: { Dto: any; Dfrom: any; }){
      
      return Math.floor((Date.UTC(Dto.getFullYear(), Dto.getMonth(), Dto.getDate()) - Date.UTC(Dfrom.getFullYear(), Dfrom.getMonth(), Dfrom.getDate()) ) /(1000 * 60 * 60 * 24));
    }
   

}
