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
    this.active_name = this.pages_allowed[0];
  }

  setActive(value: string) {
    if (this.pages_allowed.includes(value)) {
      this.active_name = value;
      this.router.navigate(["admin/" + value])
    }
  }
}
