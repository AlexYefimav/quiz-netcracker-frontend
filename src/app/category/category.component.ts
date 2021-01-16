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

  ngOnInit(): void {
    this.getCategoryList();
  }

  private getCategoryList(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  save(category: Category) {
    for (let i = 0; i < this.categories.length; ++i) {
      if (category == this.categories[i]) {
        this.question.category = this.categories[i].id;
      }
    }
  }
}
