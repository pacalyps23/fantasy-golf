import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { RankingService } from '../../services/ranking.service';
import { List } from 'ionic-angular/umd';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [RankingService]
})


export class HomePage {
  public tournInfo: any = {
    tid: String,
    tname: String,
    leaderboard: String
  }
  constructor(rankingService: RankingService, public http: HttpClient) {
    this.tournInfo = new Object();
    rankingService.getTournId().subscribe(data => {
      let temp = "100";
      this.tournInfo.tid = "0101";
      rankingService.getLeaderboard(temp).subscribe( data => {
        this.tournInfo.tname = data.leaderboard.tournament_name;
        this.tournInfo.leaderboard = data.leaderboard.players;
      });
    });
  }

  getTournInfo():any{
    return this.tournInfo;
  }

}
