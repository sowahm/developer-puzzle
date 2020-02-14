import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { MatDatepickerInputEvent } from '@angular/material';


@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  constructor(fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required],
    });
  }
  stockPickerForm: FormGroup;
  events: string[] = [];
  symbol: string;
  period: string;
  Drange: number;
  timePeriods: any[];
  D_from: any;
  D_to: any;

  quotes$ = this.priceQuery.priceQueries$;

  minDate = new Date(2000, 0, 1);
  maxDate = new Date();

  Dfrom = new FormControl(new Date());
  Dto  = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  // timePeriods = [
  //   { viewValue: 'All available data', value: 'max' },
  //   { viewValue: 'Five years', value: '5y' },
  //   { viewValue: 'Two years', value: '2y' },
  //   { viewValue: 'One year', value: '1y' },
  //   { viewValue: 'Year-to-date', value: 'ytd' },
  //   { viewValue: 'Six months', value: '6m' },
  //   { viewValue: 'Three months', value: '3m' },
  //   { viewValue: 'One month', value: '1m' }
  // ];
  // tslint:disable-next-line: member-ordering
  rangeFilter: any;
  getData: any;

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.Drange = (Math.floor((Date.UTC(this.Dto.value.getFullYear(), this.Dto.value.getMonth(), this.Dto.value.getDate()) - Date.UTC(this.Dfrom.value.getFullYear(), this.Dfrom.value.getMonth(), this.Dfrom.value.getDate()) ) /(1000 * 60 * 60 * 24)));
    console.log(this.Drange); 
    if (this.Drange > 500) {
      console.log(this.timePeriods)
      this.timePeriods = [{viewValue: 'All available data', value: 'max' }]
    } else if
     (this.Drange < 500 ) {
      console.log(this.timePeriods)
      this.timePeriods = [{viewValue: 'All available data', value: '5y' }]
    }
  }

  ngOnInit() {}

  
 
  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, period} = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, period);
      
    } 
   
  } 
  // getRange(){
  //   this.Drange = (Math.floor((Date.UTC(this.Dto.value.getFullYear(), this.Dto.value.getMonth(), this.Dto.value.getDate()) - Date.UTC(this.Dfrom.value.getFullYear(), this.Dfrom.value.getMonth(), this.Dfrom.value.getDate()) ) /(1000 * 60 * 60 * 24)));
  //   console.log(this.Drange); 
  // }
  
  }
  

