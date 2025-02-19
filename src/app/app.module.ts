import { NgModule } from '@angular/core';
import { HttpClientModule, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GastosComponent } from './gastos/gastos.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { GastoDialogComponent } from './gasto-dialog/gasto-dialog.component';
import { FilterPipe } from './pipes/filter.pipe';

// Angular Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';

// Ngx-Charts Module
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    GastosComponent,
    PieChartComponent,
    GastoDialogComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatTabsModule,
    NgxChartsModule
  ],
  providers: [provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),],
  bootstrap: [AppComponent]
})
export class AppModule { }
