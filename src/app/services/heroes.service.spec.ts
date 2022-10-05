import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Hero } from '../interfaces/hero.interface';

import { HeroesService } from './heroes.service';

describe('HeroesService', () => {
  let service: HeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
    });
    service = TestBed.inject(HeroesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load new heroes', () => {
    const heroe = [{ id: 123, name: 'SpiderTest' }];
    service.loadNewHeroes(heroe);
    expect(service.heroes).not.toBe(null);
  });

  it('should load all heroes', () => {
    let result: Hero[] = [];
    service.getHeroes().subscribe((heroes) => {
      result = heroes;
      expect(result.length).toBe(9);
    });
  });

  it('isEditing variable should be true ', () => {
    let heroe: Hero = { id: 123, name: 'SpiderTest' };
    service.edit(heroe);
    expect(service.isEditing).toBe(true);
  });
});
