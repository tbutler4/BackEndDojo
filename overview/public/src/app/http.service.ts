import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()

export class HttpService {
    constructor(private _http: HttpClient){
    	this.getPeople();
    }

    getPeople(){
    // our http response is an Observable, store it in a variable
    // let tempObservable = this._http.get('/people');
    // 
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    // tempObservable.subscribe(data => console.log("Got our tasks!", data));
 	// }

 	// getPeople(){
 		return this._http.get('/people');
 	// }
// 
	}

}