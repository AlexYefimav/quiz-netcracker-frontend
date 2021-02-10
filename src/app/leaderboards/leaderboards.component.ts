import {Component, OnInit} from '@angular/core';

import {StatisticsService} from "../service/statistics.service";

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.css', '../app.component.css']
})
export class LeaderboardsComponent implements OnInit {
  jsonMap: Map<string, number> = new Map<string, number>();
  map: Map<string, number> = new Map<string, number>();
  displayedColumns: string[] = ['position', 'player', 'rating'];
  isLoading = true;

  constructor(private statisticsService: StatisticsService) {
  }

  ngOnInit():void {
    this.statisticsService.getTotalPercentAllPlayers().subscribe(jsonMap=>{
      this.jsonMap = jsonMap;
      for (let value in this.jsonMap) {
        this.map.set(value, this.jsonMap[value])
      }
      this.isLoading = false;
    });
  }
}
