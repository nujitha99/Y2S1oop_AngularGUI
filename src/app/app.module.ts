import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehicleComponent } from './vehicles/vehicle/vehicle.component';
import { VehicleCollectionComponent } from './vehicles/vehicle-collection/vehicle-collection.component';
import {VehicleService} from './shared/vehicle.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    VehiclesComponent,
    VehicleComponent,
    VehicleCollectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [VehicleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
