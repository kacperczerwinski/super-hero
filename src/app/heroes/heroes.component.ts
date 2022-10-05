import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { HeroesService } from '../services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit, OnDestroy {
  selectedHero?: Hero;
  heroes: Hero[];
  getHeroesSubscription: Subscription;
  form = new FormGroup({
    id: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
  });
  isCreatingNewHero = false;

  get myHeroes() {
    return this.heroesService.myHeroes;
  }

  get filteredOptions() {
    return this.heroesService.filteredOptions;
  }

  constructor(private router: Router, private heroesService: HeroesService) {}

  ngOnInit(): void {
    if (!this.heroesService.isEditing) {
      this.retrieveHeroes();
    } else {
      this.heroes = this.heroesService.heroes;
      this.heroesService.filterOptions(this.heroes);
    }
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.heroesService.edit(hero);
    this.heroesService.loadNewHeroes(this.heroes);
    this.router.navigate(['heroes/detail', hero.id]);
  }

  addNew(): void {
    const hero: Hero = {
      id: +this.form.get('id').value,
      name: this.form.get('name').value,
    };
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.heroes = [hero, ...this.heroes];
      this.heroesService.loadNewHeroes(this.heroes);
      this.heroesService.filterOptions(this.heroes);
    }
  }

  onAddNewClickOrCancel(): void {
    this.isCreatingNewHero = !this.isCreatingNewHero;
    this.form.reset();
  }

  ngOnDestroy(): void {
    if (this.getHeroesSubscription) {
      this.getHeroesSubscription.unsubscribe();
    }
  }

  retrieveHeroes(): void {
    this.getHeroesSubscription = this.heroesService
      .getHeroes()
      .subscribe((data: Hero[]) => {
        this.heroes = data;
        this.heroesService.filterOptions(this.heroes);
      });
  }
}
