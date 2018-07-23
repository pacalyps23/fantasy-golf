import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { HomePage } from '../home/home';


/**
 * Generated class for the StatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
  providers: [FirebaseProvider, HomePage]
})
export class StatsPage implements OnInit{
  public stats: Array<any>;

  constructor(public navCtrl: NavController, private provider: FirebaseProvider, private home: HomePage) {
    this.stats = new Array();
    provider.getStats().subscribe(data => {
     data.map(item => {
       if(item.tournament.tid === home.getTournInfo().tid){
         item.team.map(player => {
           home.getTournInfo().leaderboard.map(leader => {

             if(player.playerId === leader.player_id){
               player.score = leader.total;
             }
           });
         
         });
         item.total = this.getTotalScore(item.team);
         this.stats.push(item);
       }
       else{
         console.log("wrong tID");
       }
     })
    });
    console.log(this.stats);
   }
  
  ngOnInit() {
  }

  getTotalScore(team: any): number{
    let total:number = 0;
    team.map(player => {
      if(player.score !== "" && player.score !== null){
        console.log(player.score);
        total = total + parseInt(player.score);
      }
    });
    return total;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatsPage');
  }

}
