import {Component, Input, OnInit} from '@angular/core';
import {Category} from "../model/category";
import {CategoryService} from "../service/category.service";
import {Question} from "../model/question";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[];
  categoryName: string;
  @Input() question: Question;

  constructor(private categoryService: CategoryService) { }

  async ngOnInit() {
    this.categories = await this.getCategoryList();
  }

  private getCategoryList(): Promise<Category[]> {
    return this.categoryService.getCategories().toPromise();
  }

  save(category: Category) {
    for (let i = 0; i < this.categories.length; ++i) {
      if (category == this.categories[i]) {
        this.question.category = this.categories[i].id;
      }
    }
  }
}
