import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GastosComponent } from './gastos/gastos.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

// Módulos do Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

// Importação do módulo do ngx-charts
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({ declarations: [
        AppComponent,
        GastosComponent,
        PieChartComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatButtonModule,
        NgxChartsModule], providers: [
        provideClientHydration(),
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule { }
