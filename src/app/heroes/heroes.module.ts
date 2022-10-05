import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { HeroesRoutingModule } from './hero-routing.module';
import { HeroesComponent } from './heroes.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HeroesComponent, HeroDetailsComponent, DialogComponent],
  imports: [
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    CommonModule,
    MatDialogModule,
    HeroesRoutingModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class HeroesModule {}
