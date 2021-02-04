import {Component, OnInit} from '@angular/core';

import {StatisticsService} from "../service/statistics.service";

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.css']
})
export class LeaderboardsComponent implements OnInit {
  jsonMap: Map<string, number> = new Map<string, number>();
  map: Map<string, number> = new Map<string, number>();
  displayedColumns: string[] = ['position', 'player', 'rating'];

  constructor(private statisticsService: StatisticsService) {
  }

  async ngOnInit() {
    this.jsonMap = await this.getTotalPercentAllPlayers();
    for (let value in this.jsonMap) {
      this.map.set(value, this.jsonMap[value])
    }
  }

  getTotalPercentAllPlayers(): Promise<Map<string, number>> {
    return this.statisticsService.getTotalPercentAllPlayers().toPromise();
  }
}
