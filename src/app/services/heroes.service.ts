import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Hero } from '../interfaces/hero.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  selectedHero?: Hero;
  heroes: Hero[] = [];
  isEditing = false;
  myHeroes = new FormControl('');
  filteredOptions!: Observable<Hero[]>;

  constructor(private http: HttpClient, private router: Router) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>('assets/heroes.json');
  }

  edit(selectedHero: Hero): Hero[] {
    this.isEditing = true;
    return (this.heroes = this.heroes.filter((option: Hero) => {
      if (option.id === selectedHero.id) {
        return {
          ...this.heroes,
          name: selectedHero.name,
        };
      } else {
        return option;
      }
    }));
  }

  loadNewHeroes(heroes: Hero[]): void {
    this.heroes = heroes;
  }

  save(_selectedHero: Hero): void {
    this.heroes = this.heroes.filter(
      (hero: Hero) => hero.id !== _selectedHero.id
    );
    this.heroes.push(_selectedHero);
    this.router.navigate(['heroes']);
  }

  remove(selectedHero: Hero): void {
    this.heroes = this.heroes.filter(
      (hero: Hero) => hero.id !== selectedHero.id
    );
    this.selectedHero = { id: null, name: '' };
    this.router.navigate(['heroes']);
  }

  filterOptions(heroes: Hero[]): void {
    this.heroes = heroes;
    this.filteredOptions = this.myHeroes.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): Hero[] {
    const filterValue = value.toLowerCase();
    return this.heroes.filter(
      (option) =>
        option.name.toLowerCase().includes(filterValue) || option.id === +value
    );
  }
}
