import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { HomePage } from '../pages/home/home';
import { RankingsPage } from '../pages/rankings/rankings';
import { PlayPage } from '../pages/play/play';
import { RulesPage } from '../pages/rules/rules';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../services/auth.service';
import { StatsPage } from '../pages/stats/stats';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
	pages: Array<any>;
	rootPage;

	private app;
	private platform;
  private menu: MenuController;

	@ViewChild(Nav) nav: Nav;

  constructor(app: App, platform: Platform, menu: MenuController, private statusBar: StatusBar,private auth: AuthService) {
		this.menu = menu;
		this.app = app;
		this.platform = platform;
    this.initializeApp();
    


    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Rankings', component: RankingsPage },
      { title: 'Play', component: PlayPage },
      { title: 'Rules', component: RulesPage },
      { title: 'Stats', component: StatsPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });

    this.auth.afAuth.authState
      .subscribe(
        user => {
          if (user) {
            this.rootPage = HomePage;
          } else {
            this.rootPage = LoginPage;
          }
        },
        () => {
          this.rootPage = LoginPage;
        }
      );
}

login() {
  this.menu.close();
  this.auth.signOut();
  this.nav.setRoot(LoginPage);
}

logout() {
  this.menu.close();
  this.auth.signOut();
  this.nav.setRoot(LoginPage);
}

openPage(page) {
this.menu.close();
this.nav.setRoot(page.component);
}

}
