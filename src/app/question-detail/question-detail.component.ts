import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Question} from '../model/question';
import {MatAccordion} from '@angular/material/expansion';
import {FormGroup} from '@angular/forms';
import {CategoryService} from '../service/category.service';
import {LevelService} from '../service/level.service';
import {Category} from '../model/category';
import {Level} from '../model/level';
import {PhotoService} from '../service/photo.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @Input() question: Question;
  categories: Category[];
  levels: Level[];
  @Input() questionForm: FormGroup;
  picture: any;

  constructor(private categoryService: CategoryService,
              private levelService: LevelService,
              private photoService: PhotoService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
    this.levelService.getLevels().subscribe(levels => {
      this.levels = levels;
    });
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

  getCategoryId(): string {
    for (const category of this.categories) {
      if (this.questionForm.get('category').value === category.title) {
        return category.id;
      }
    }
  }

  getLevelId(): string {
    for (const level of this.levels) {
      if (this.questionForm.get('level').value === level.title) {
        return level.id;
      }
    }
  }

  getPhoto(): string {
    return this.questionForm.get('photo').value;
  }

  checkForm(): void {
    if (this.questionForm.valid) {
      this.question.title = this.getTitle();
      this.question.description = this.getDescription();
      this.question.category = this.getCategoryId();
      this.question.level = this.getLevelId();
      this.question.photo = this.getPhoto();
    }
  }

  selectFile(event): void {
    this.picture = event.target.files[0];
    const formData = new FormData();
    formData.append('file', this.picture);
    this.photoService.uploadFile(formData).subscribe((result) => {
      this.question.photo = result.photo;
      this.questionForm.get('photo').patchValue(this.question.photo);
    });
  }
}
