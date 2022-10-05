import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { HeroesComponent } from './heroes.component';

const routes: Routes = [
  { path: '', component: HeroesComponent },
  { path: 'detail/:id', component: HeroDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
