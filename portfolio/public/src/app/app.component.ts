import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Look jQuery Animation working in action!';

  public ngOnInit()
  {
	// var position = $('#bottom'); 

	// // should start at 0

	// $(window).scroll(function() {
	//     var scroll = $(window).scrollTop();
	//     if(scroll > position) {
	//         console.log('scrollDown');
	//         $('#first').slideUp();
	//         $('#first').hide();
	//     } else {
	//          console.log('scrollUp');
	//          $('#first').slideDown();
	//          $('#first').show();
	//     }
	//     position = scroll;
	// });
  }
}