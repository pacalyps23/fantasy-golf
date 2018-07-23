import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RankingsPage } from '../pages/rankings/rankings';
import { PlayPage } from '../pages/play/play';
import { RulesPage } from '../pages/rules/rules';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../services/auth.service';
import { SignupPage } from '../pages/signup/signup';
import { RankingService } from '../services/ranking.service'
import { StatsPage } from '../pages/stats/stats';



var firebaseConfig = {
  apiKey: "AIzaSyCB_CObZdrxTSuIHVwz3VDjQByRJ71rSnc",
  authDomain: "fantasygolf-a1525.firebaseapp.com",
  databaseURL: "https://fantasygolf-a1525.firebaseio.com",
  projectId: "fantasygolf-a1525",
  storageBucket: "fantasygolf-a1525.appspot.com",
  messagingSenderId: "14670598104"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RankingsPage,
    PlayPage,
    RulesPage,
    LoginPage,
    SignupPage,
    StatsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    NgxErrorsModule,
    AngularFireAuthModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RankingsPage,
    PlayPage,
    RulesPage,
    LoginPage,
    SignupPage,
    StatsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    RankingService
  ]
})



export class AppModule {}
