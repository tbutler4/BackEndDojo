import { Component } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'anything';
  shared = [];

  constructor(private _httpService: HttpService){
  }

  ngOnInit(){
  	this.getShared();
  }
// shows up in html side
  getShared(){
  	let observable = this._httpService.getShared();
  	observable.subscribe(shared => {
  		console.log("this is", shared);
  		this.shared = shared['abilities'];
  	});
  }
}
