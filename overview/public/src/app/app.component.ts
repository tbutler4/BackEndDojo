import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{ //add implenents OnInit if OnInit is a thing
  title = 'anything';
  people = [];

  constructor(private _httpService: HttpService){
  }
    //constructor invokes the ngOnInit function... must import OnInit at top portion alongside component
  ngOnInit(){
  	this.getPeople();
  }
// shows up in html side
  getPeople(){
  	let observable = this._httpService.getPeople();
  	observable.subscribe(data => {
  		console.log("Got our people",data);
  		this.people = data['docoments'];
  	});
  }

}
