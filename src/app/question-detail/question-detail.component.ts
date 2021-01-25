import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Question} from '../model/question';
import {MatAccordion} from '@angular/material/expansion';
import {AddQuestionValidation} from '../service/validation/add-question-validation';
import {FormGroup} from '@angular/forms';
import {CategoryService} from '../service/category.service';
import {LevelService} from '../service/level.service';
import {Category} from '../model/category';
import {Level} from '../model/level';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @Input() question: Question;
  // @Output() questionChange = new EventEmitter<Question>();
  categories: Category[];
  levels: Level[];
  @Input() questionForm: FormGroup;

  constructor(private questionValidation: AddQuestionValidation,
              private categoryService: CategoryService,
              private levelService: LevelService) { }

  async ngOnInit() {
    this.categories = await this.getCategoryList();
    this.levels = await this.getLevelList();
  }

  getTitle(): string {
    return this.questionForm?.get('title').value;
  }

  getDescription(): string {
    return this.questionForm?.get('description').value;
  }

  getCategory(): string {
    return this.questionForm?.get('category').value;
  }

  getLevel(): string {
    return this.questionForm?.get('level').value;
  }

  getCategoryList(): Promise<Category[]> {
    return this.categoryService.getCategories().toPromise();
  }

  getCategoryId(): string {
    for (const category of this.categories) {
      if (this.questionForm.get('category').value === category.title) {
        return category.id;
      }
    }
  }

  getLevelList(): Promise<Level[]> {
    return this.levelService.getLevels().toPromise();
  }

  getLevelId(): string {
    for (const level of this.levels) {
      if (this.questionForm.get('level').value === level.title) {
        return level.id;
      }
    }
  }

  checkForm(): void {
    if (this.questionForm.valid) {
      this.question.title = this.getTitle();
      this.question.description = this.getDescription();
      this.question.category = this.getCategoryId();
      this.question.level = this.getLevelId();
    }
    // this.questionFormChange.emit(this.questionForm);
  }
}
