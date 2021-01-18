import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { SearchRoutingModule } from './search-routing.module';
import { WidgetSearchBarComponent } from './widget-search-bar/widget-search-bar.component';
import { WidgetSearchBarButtonComponent } from './widget-search-bar-button/widget-search-bar-button.component';
import { SearchResultListComponent } from './search-result-list/search-result-list.component';
import { SearchResultItemComponent } from './search-result-item/search-result-item.component';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    WidgetSearchBarComponent,
    WidgetSearchBarButtonComponent,
    SearchResultListComponent,
    SearchResultItemComponent,
  ],
  imports: [CommonModule, SearchRoutingModule, HttpClientModule, FormsModule, MatCardModule, MatIconModule, MatMenuModule],
  exports: [WidgetSearchBarComponent, WidgetSearchBarButtonComponent],
})
export class SearchModule {}
