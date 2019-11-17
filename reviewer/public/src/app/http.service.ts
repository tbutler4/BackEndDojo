import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

	movies = {};

    constructor(private _http: HttpClient){
    	// this.getMovies();
    }

    getMovies(){
 		return this._http.get('/movies');
 		
	}

	getMovie(_id){
    return this._http.get(`/movies/${_id}`);
  	}

	addMovie(movie){
		console.log('the movie is', movie);
    	return this._http.post('/movie', movie);
	}

	addReview(movie){
	console.log('the review is', movie);
	return this._http.put('/movie/change/${_id}', movie);
	}

	editMovie(_id, movie){
		console.log("updating the movie with _id:", _id);
    	return this._http.put(`/movies/update/${_id}`, movie);
  	}
	deleteMovie(_id){
		console.log("deleting movie with _id:", _id);
	    return this._http.delete(`/movies/remove/${_id}`);
	}}


