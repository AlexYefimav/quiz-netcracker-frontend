import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Game} from '../../model/game';
import {DuplicateValidator} from './duplicate-validation';

@Injectable({
  providedIn: 'root'
})
export class AddQuestionValidation {
  game: Game;

  constructor(private formBuilder: FormBuilder,
              private duplicateValidator: DuplicateValidator) {
  }

  setGame(game: Game): void {
    this.game = game;
  }

  async createQuestionForm(): Promise<FormGroup> {
    return this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required, Validators.minLength(6)]],
      category: ['', [Validators.required]],
      level: ['', [Validators.required]],
      photo: ['']
    }, { validators: this.duplicateValidator.duplicateValidation(this.game.questions) });
  }
}
