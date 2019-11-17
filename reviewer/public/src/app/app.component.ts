import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{ //add implenents OnInit if OnInit is a thing
	title = 'Squishy tomatoes';
	movies = [];
	movie = {};
	newMovie = {};
	error = [];
	mode = "display";

	constructor(private _httpService: HttpService){
	}
	//constructor invokes the ngOnInit function... must import OnInit at top portion alongside component
	ngOnInit(){
		// this.movie = {title: " ", description: " "}
    	this.getMoviesFromService();
  	}

	getMoviesFromService(){
		let observable = this._httpService.getMovies();
		observable.subscribe(data => {
		  // console.log("Got our movies!", data);
		  this.movies = data['documents'];
		  console.log("bladadadadadd", data)
		});
	}

	getOneMovie(_id){
	    let observable = this._httpService.getMovie(_id);
	    observable.subscribe(data => {
	      this.movie = data['documents'];
	      console.log("vladadadadadd", data)
	    });
  	}

	createMovie(data:NgForm){
		let observable = this._httpService.addMovie(this.newMovie);
		observable.subscribe(data => {
			if(data['message'] == 'success'){
			  this.newMovie = {};
			  this.mode = 'display';
			}else{
				if(data['error']){
		  		this.error = (data['error']['message']);
		  	}

		  }

		});
	}

	createReview(data:NgForm){
		console.log("the review is", this.movie);
		let observable = this._httpService.addReview(this.movie);
		observable.subscribe(data => {
		  if(data['message'] == 'success'){
			  console.log(data, "yeeeeeeeeeeeeeeee");	  	
		  }else{
		  	if(data['error']){
		  		this.error = (data['error']['message']);
		  	}
		  }
		}); 
		  this.getMoviesFromService();
		  this.mode = 'display';
	}

	updateMovie(_id){
		console.log("the movie is now", _id, this.movie);
		let observable = this._httpService.editMovie(_id, this.movie);
		observable.subscribe(data => {
		  console.log(data, "heeeeerrreee");
		  this.mode = 'display';
		  this.getMoviesFromService();
		});
	}

	changeMode(val){
		this.mode = val;
	}

	editMovie(_id){
		this.mode = 'edit';
		this.getOneMovie(_id);
		console.log("here*******", _id)
	}

	deleteMovie(_id){
		let observable = this._httpService.deleteMovie(_id);
		observable.subscribe(data => {
		  	console.log(data);
		  	this.getMoviesFromService();
			this.mode = 'display';
		});
	}
	rateMovie(_id){
		this.mode = 'review';
		this.getOneMovie(_id);
		console.log("omgeesus*******", _id)
	}

	displayMovies(){

		this.getMoviesFromService();
		console.log("displaying mufasa")
	}

}