import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VehicleCollectionComponent} from './vehicles/vehicle-collection/vehicle-collection.component';
import {VehicleComponent} from './vehicles/vehicle/vehicle.component';


const routes: Routes = [
  { path: 'vehicles', component: VehicleCollectionComponent },
  { path: 'booking', component: VehicleComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
