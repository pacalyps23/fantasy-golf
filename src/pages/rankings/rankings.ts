import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { RankingService } from '../../services/ranking.service';

/**
 * Generated class for the RankingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rankings',
  templateUrl: 'rankings.html',
})
export class RankingsPage {
  private playerList: any;
  public roundOne: any;
  public roundTwo: any;
  public roundThree: any;

  constructor(private navCtrl: NavController, private http: Http, private rankingService: RankingService) {
    
    this.rankingService.getRankings().subscribe(data => {
        this.playerList = data.tours[0].years[0].stats[0].details;
        this.playerList = this.playerList.slice(0,100);
        this.roundOne = this.playerList.slice(0,10);
        this.roundTwo = this.playerList.slice(11,30);
        this.roundThree = this.playerList.slice(31);
    });
  }

  getRoundOne(){
    console.log(this.roundOne)
    return this.roundOne
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RankingsPage');
  }

}
