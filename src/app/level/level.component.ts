import {Component, Input, OnInit} from '@angular/core';
import {Level} from "../model/level";
import {Question} from "../model/question";
import {LevelService} from "../service/level.service";

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit {

  levels: Level[];
  levelName: string;
  @Input() question: Question;

  constructor(private levelService: LevelService) { }

  ngOnInit(): void {
    this.getLevels();
  }

  private getLevels(): void{
    this.levelService.getLevels().subscribe(levels=>{
      this.levels = levels
    });
  }

  save(level: Level) {
    for (let i = 0; i < this.levels.length; ++i) {
      if (level == this.levels[i]) {
        this.question.level = this.levels[i].id;
      }
    }
  }
}