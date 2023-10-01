import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  
  public active_name:string = ""; // ACTIVE PAGE
  public pages_allowed = ["home", "analytics", "profile"] // PAGE ALLOWED
  
  constructor(private router: Router) {
    // CHECK THE PAGE NAME AND APPLY THE CORRECT VALUE FOR SCSS STYLES
    let length = this.router.url.split("/").length;
    let page = this.router.url.split("/")[length-1]
    let page_detailed = this.router.url.split("/")[length-3]
    
    if (this.pages_allowed.includes(page)) {
      this.active_name = page;
    } else {
      if (this.pages_allowed.includes(page_detailed))
        this.active_name = page_detailed;
    }
  
  }

  // SET THE PAGE NAME AND REDIRECT
  setActive(value: string) {
    if (this.pages_allowed.includes(value)) {
      this.active_name = value;
      this.router.navigate(["admin/" + value])
    }
  }
}
