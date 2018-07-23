import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/Map';

@Injectable()
export class RankingService {
    private rankUrl: string = "https://statdata.pgatour.com/r/stats/2018/186.json"
    private tournIdUrl: string = "https://statdata.pgatour.com/r/current/message.json";

    constructor(public http: Http) {
    }

    getRankings(): Observable<any> {
        return this.http.get(this.rankUrl).map(res => res.json());
    }

    getTournId(): Observable<any> {
        return this.http.get(this.tournIdUrl).map(res => res.json());
    }

    getLeaderboard(tid: string): Observable<any> {
        let tournUrl = `https://statdata.pgatour.com/r/${tid}/leaderboard-v2mini.json`;
        return this.http.get(tournUrl).map(res => res.json());
    } 

}