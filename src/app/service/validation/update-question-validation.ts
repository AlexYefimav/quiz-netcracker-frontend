import {Injectable} from '@angular/core';
import {Game} from '../../model/game';
import {Category} from '../../model/category';
import {Level} from '../../model/level';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DuplicateValidator} from './duplicate-validation';
import {CategoryService} from '../category.service';
import {LevelService} from '../level.service';
import {Question} from '../../model/question';

@Injectable({
  providedIn: 'root'
})
export class UpdateQuestionValidation {
  game: Game;
  categories: Category[];
  levels: Level[];

  constructor(private formBuilder: FormBuilder,
              private duplicateValidator: DuplicateValidator,
              private categoryService: CategoryService,
              private levelService: LevelService) {
  }

  setCategories(categories: Category[]): void {
    this.categories = categories;
  }

  setLevels(levels: Level[]): void {
    this.levels = levels;
  }

  setGame(game: Game): void {
    this.game = game;
  }

  getCategoryById(categoryId: string): string {
    if (categoryId === '') {
      return '';
    }
    if (this.categories == null) {
      this.categoryService.getCategories().subscribe(categories => {
        this.categories = categories;
      })
    }
    for (const category of this.categories) {
      if (category.id === categoryId) {
        return category.title;
      }
    }
  }

  getLevelById(levelId: string): string {
    if (levelId == null) {
      return '';
    }
    if (this.levels == null) {
      this.levelService.getLevels().subscribe(levels => {
        this.levels = levels;
      })
    }
    for (const level of this.levels) {
      if (level.id === levelId) {
        return level.title;
      }
    }
  }

  createQuestionForm(question: Question): FormGroup {
    const categoryState = this.getCategoryById(question.category);
    const levelState = this.getLevelById(question.level);
    return this.formBuilder.group({
      title: [question.title, [Validators.required, Validators.minLength(6)]],
      description: [question.description, [Validators.required, Validators.minLength(6)]],
      category: [categoryState, [Validators.required]],
      level: [levelState, [Validators.required]],
      photo: ['']
    }, {validators: this.duplicateValidator.duplicateValidation(this.game.questions, question)});
  }
}
