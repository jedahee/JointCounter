import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  
  public active_name:string = "";
  public pages_allowed = ["home", "analytics", "profile"]
  
  constructor(private router: Router) {
    let length = this.router.url.split("/").length;
    let page = this.router.url.split("/")[length-1]
    
    if (this.pages_allowed.includes(page)) {
      this.active_name = page;
    }
  
  }

  setActive(value: string) {
    if (this.pages_allowed.includes(value)) {
      this.active_name = value;
      this.router.navigate(["admin/" + value])
    }
  }
}
