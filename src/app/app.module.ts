import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesRoutingModule } from './heroes/hero-routing.module';
import { HeroesModule } from './heroes/heroes.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    HeroesRoutingModule,
    HeroesModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
