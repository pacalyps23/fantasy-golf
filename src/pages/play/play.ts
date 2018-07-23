import { Component } from '@angular/core';
import { RankingService } from '../../services/ranking.service'
import { AuthService } from '../../services/auth.service'
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { HomePage } from '../home/home';

/**
 * Generated class for the PlayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-play',
  templateUrl: 'play.html',
  providers: [RankingService, HomePage]
})
export class PlayPage {
  private roundOne: any;
  private roundTwo: any;
  private roundThree: any;
  private player: any;
  private myTeam: Array<any>;
  private show: boolean = false;
  private showOne: boolean = true;
  private showTwo: boolean = false;
  private showThree: boolean = false;
  private finished: boolean = false;
  private pickedTeam: boolean = false;

  constructor(public rankService: RankingService, public auth: AuthService, public navCtrl: NavController,
    public afd: AngularFireDatabase, public home: HomePage) {
    this.myTeam = new Array();  
    this.getRoundOne();
  }

  getRoundThree(){
    this.rankService.getRankings()
      .subscribe(data=> {
        this.roundThree = data.tours[0].years[0].stats[0].details.slice(31,100);
      });
      this.showTwo = false;
      this.showThree = true;
  }

  getRoundTwo(){
    this.rankService.getRankings()
    .subscribe(data => {
      this.roundTwo = data.tours[0].years[0].stats[0].details.slice(11,30);
      });
      this.showTwo = true;
  }


  getRoundOne(){ 
    this.rankService.getRankings()
    .subscribe(data => {
      this.roundOne = data.tours[0].years[0].stats[0].details.slice(0,10);
    });
  }

  addRoundOne(addPlayer){
    this.player = new Object();
    if(this.myTeam[0] == "" || this.myTeam[0] == undefined){
      this.player.firstName = addPlayer.plrName.first;
      this.player.lastName = addPlayer.plrName.last;
      this.player.playerId = addPlayer.plrNum;
      this.player.score = "";
      this.myTeam[0] = this.player;
      this.show = true;
      this.showOne = false;
    }
    this.getRoundTwo();

  }

  addRoundTwo(addPlayer){
    this.player = new Object();
    if(this.myTeam[1] == "" || this.myTeam[1] == undefined){
      this.player.firstName = addPlayer.plrName.first;
      this.player.lastName = addPlayer.plrName.last;
      this.player.playerId = addPlayer.plrNum;
      this.player.score = "";
      this.myTeam[1] = this.player;
    }
    else if(this.myTeam[2] == "" || this.myTeam[2] == undefined){
      this.player.firstName = addPlayer.plrName.first;
      this.player.lastName = addPlayer.plrName.last;
      this.player.playerId = addPlayer.plrNum;
      this.player.score = "";
      this.myTeam[2] = this.player;
      this.getRoundThree();
    }
    else{
      console.log("Can't add any more");
    }
  }

  addRoundThree(addPlayer){
    this.player = new Object();
    if(this.myTeam[3] == "" || this.myTeam[3] == undefined){
      this.player.firstName = addPlayer.plrName.first;
      this.player.lastName = addPlayer.plrName.last;
      this.player.playerId = addPlayer.plrNum;
      this.player.score = "";
      this.myTeam[3] = this.player;
    }
    else if(this.myTeam[4] == "" || this.myTeam[4] == undefined){
      this.player.firstName = addPlayer.plrName.first;
      this.player.lastName = addPlayer.plrName.last;
      this.player.playerId = addPlayer.plrNum;
      this.player.score = "";
      this.myTeam[4] = this.player;
      this.showThree = false;
      this.pickedTeam = true;
    }
    else{
      console.log("Can't add any more");
    }


  }

  confirmTeam(){
    console.log(this.home.getTournInfo());
    let userInfo = {
      team: this.myTeam,
      email: this.auth.getEmail(),
      tournament: this.home.getTournInfo()
    }
    this.afd.list("userEntry").push(userInfo);
    this.show = false;
    this.finished = true;
  }

  goToLogin(){
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayPage');
  }



}
