import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Level} from "../model/level";
import {Question} from "../model/question";
import {LevelService} from "../service/level.service";
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit {

  levels: Level[];
  levelName: string;
  @Input() question: Question;
  @Input() levelControl: AbstractControl;
  @Output() levelControlChange = new EventEmitter<AbstractControl>();

  constructor(private levelService: LevelService) { }

  async ngOnInit() {
    this.levels = await this.getLevels();
  }

  private getLevels(): Promise<Level[]>{
    return this.levelService.getLevels().toPromise();
  }

  getLevelId(): string {
    for (const level of this.levels) {
      if (this.levelControl.value === level.title) {
        this.levelName = level.title;
        return level.id;
      }
    }
  }

  checkForm(): void {
    if (this.levelControl.valid) {
      this.question.level = this.getLevelId();
    }
    else {
      this.question.level = null;
    }
    this.levelControlChange.emit(this.levelControl);
  }
}
