import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';
import { ChartComponent } from './chart/chart.component';
import { CustomDatePipe } from './customdates/custom-dates.pipe';

@NgModule({
   imports: [
      CommonModule,
      GoogleChartsModule.forRoot()
   ],
   declarations: [
      ChartComponent,
      CustomDatePipe
   ],
   exports: [
      ChartComponent
   ]
})
export class SharedUiChartModule {}
