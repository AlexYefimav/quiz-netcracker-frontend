import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Category} from "../model/category";
import {CategoryService} from "../service/category.service";
import {Question} from "../model/question";
import {AbstractControl, FormControl} from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[];
  categoryName: string;
  @Input() question: Question;
  @Input() categoryControl: AbstractControl;
  @Output() categoryControlChange = new EventEmitter<AbstractControl>();

  constructor(private categoryService: CategoryService) { }

  async ngOnInit() {
    this.categories = await this.getCategoryList();
  }

  private getCategoryList(): Promise<Category[]> {
    return this.categoryService.getCategories().toPromise();
  }

  getCategoryId(): string {
    for (const category of this.categories) {
      if (this.categoryControl.value === category.title) {
        this.categoryName = category.title;
        return category.id;
      }
    }
  }

  checkForm(): void {
    if (this.categoryControl.valid) {
      this.question.category = this.getCategoryId();
    }
    else {
      this.question.category = null;
    }
    this.categoryControlChange.emit(this.categoryControl);
  }
}
