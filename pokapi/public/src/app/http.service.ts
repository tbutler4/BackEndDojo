import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()

export class HttpService {
    constructor(private _http: HttpClient){
    	this.getPokemon();
    }

    getPokemon(){
    // our http response is an Observable, store it in a variable
    let tempObservable = this._http.get('https://pokeapi.co/api/v2/pokemon/1/');
    // 
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    tempObservable.subscribe(data => console.log("Gotta catch 'em all!", data.name));
 	}

 	getShared(){
 		return this._http.get('https://pokeapi.co/api/v2/pokemon/1/');
 	}
}
