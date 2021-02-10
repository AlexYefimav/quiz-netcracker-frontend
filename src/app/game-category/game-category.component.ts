import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GameCategory} from "../model/game-category";
import {GameCategoryService} from "../service/game-category.service";
import {Game} from "../model/game";
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-game-category',
  templateUrl: './game-category.component.html',
  styleUrls: ['./game-category.component.css']
})
export class GameCategoryComponent implements OnInit {

  gameCategories: GameCategory[];
  gameCategoryName: string;
  @Input() game: Game;
  @Input() gameCategoryControl: AbstractControl;
  @Output() gameCategoryControlChange = new EventEmitter<AbstractControl>();

  constructor(private gameCategoryService: GameCategoryService) {
  }

  ngOnInit(): void {
    this.gameCategoryService.getGameCategories().subscribe(gameCategories => {
      this.gameCategories = gameCategories;
    });
  }

  getGameCategoryId(): string {
    for (const gameCategory of this.gameCategories) {
      if (this.gameCategoryControl.value === gameCategory.title) {
        this.gameCategoryName = gameCategory.title;
        return gameCategory.id;
      }
    }
  }

  checkForm(): void {
    if (this.gameCategoryControl.valid) {
      this.game.gameCategory = this.getGameCategoryId();
    } else {
      this.game.gameCategory = null;
    }
    this.gameCategoryControlChange.emit(this.gameCategoryControl);
  }
}
