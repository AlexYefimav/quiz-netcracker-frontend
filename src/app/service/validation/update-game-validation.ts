import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Game} from '../../model/game';

@Injectable({
  providedIn: 'root'
})
export class UpdateGameValidation {
  constructor(private formBuilder: FormBuilder) {
  }

  createGameForm(game: Game): FormGroup {
    return this.formBuilder.group({
      title: [game.title, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      description: [game.description, [Validators.required, Validators.minLength(3)]],
      photo: ['']
    });
  }
}
