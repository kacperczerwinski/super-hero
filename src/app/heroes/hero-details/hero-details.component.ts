import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { HeroesService } from 'src/app/services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';
import { DialogComponent } from '../dialog/dialog.component';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss'],
})
export class HeroDetailsComponent implements OnInit, OnDestroy {
  selectedHero?: Hero;
  selectedHeroId: string;
  heroes: Hero[];
  selectedHeroIdSubscription: Subscription;
  dialogSubscription: Subscription;
  isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private heroesService: HeroesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.readParamsId();
    this.getSelectedHero();
  }

  readParamsId(): void {
    this.selectedHeroIdSubscription = this.route.params
      .pipe(
        map((params) => {
          this.selectedHeroId = params.id;
        })
      )
      .subscribe();
  }

  onEdit(): void {
    this.heroes = this.heroesService.heroes;
    this.isEditing = true;
  }

  onRemove(selectedHero: Hero): void {
    this.openDialog(selectedHero);
  }

  onSave(selectedHero: Hero): void {
    this.heroesService.save(selectedHero);
    this.isEditing = false;
  }

  getSelectedHero(): void {
    this.heroesService.heroes.filter((hero) => {
      return hero.id === +this.selectedHeroId ? (this.selectedHero = hero) : '';
    });
  }

  openDialog(selectedHero: Hero): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { selectedHero: selectedHero },
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe();
  }

  ngOnDestroy(): void {
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }
    if (this.selectedHeroIdSubscription) {
      this.selectedHeroIdSubscription.unsubscribe();
    }
  }
}
