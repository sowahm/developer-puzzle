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
  setting ={
    format: 'MM-dd-yyyy'
  }
  serializedDate = new FormControl((new Date()).toISOString());

   dperiod = 7 - 5;

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
    console.log((this.Dto.value.getTime() - this.Dfrom.value.getTime()));

  } 
 

    Drange(Dto: { getTime: () => number; }, Dfrom: { getTime: () => number; }){
       let diff = (Dto.getTime() - Dfrom.getTime()) / 1000;
        diff /= (60 * 60 * 24)
        return Math.abs(Math.round(diff/365.25))
    }
   

}
