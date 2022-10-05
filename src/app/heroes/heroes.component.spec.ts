import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroesComponent } from './heroes.component';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [HeroesComponent, MatAutocomplete],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid if there is no hero information introduced', () => {
    component.addNew();
    expect(component.form.invalid).toBe(true);
  });

  it('form should be valid if there is hero information introduced', () => {
    component.form.setValue({
      id: '123',
      name: 'SpiderTest',
    });
    component.heroes = [];
    component.addNew();
    expect(component.form.valid).toBe(true);
  });

  it('retrieveHeores should be called', () => {
    const spy = spyOn<HeroesComponent, any>(component, 'retrieveHeroes');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
});
