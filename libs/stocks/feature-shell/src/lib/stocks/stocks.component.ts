import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { range } from 'lodash-es';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  symbol: string;
  period: string;
  range = 0;
  days: number = 1000 * 60 * 60 * 24;

  quotes$ = this.priceQuery.priceQueries$;

  periodStart= new FormControl(new Date(1990, 0, 1));
  periodEnd  = new FormControl(new Date(2025, 0, 1));
  // serializedDate = new FormControl((new Date()).toISOString());
  

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

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required],
    });
  }

  ngOnInit() {
    

  }

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, period} = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, period);
    } 
    
  } 

   DateRange(periodStart: number, periodEnd: number) {
    // tslint:disable-next-line: no-shadowed-variable
   let range = (periodEnd - periodStart);

    range /= (60 * 60 * 24 * 7);
    console.log(Math.floor(range / this.days));
   }

   fetchByRange(){
      console.log(range);
  }

}
