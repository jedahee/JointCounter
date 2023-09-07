import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent {
  public error_msg: string = "";
  public user_id: string = "";
  public toggle_dropdown: boolean = false;
  constructor(private router: Router, private auth_service: AuthService, private translate_s: TranslateService) {
  }

  ngOnInit(): void {
    let user = localStorage.getItem("user_jc")
    let token =localStorage.getItem("token_jc");
    
    if (token == "" || token == undefined || !user) {
      this.router.navigate(["sign-in"]);
    } else {
      this.user_id = JSON.parse(user||'').id;

      this.auth_service.me(token).subscribe(data=>{

      }, err => {
        
        this.error_msg = "popup_error_400_me";
        
        setTimeout(()=>{
          this.error_msg = "";
          this.router.navigate(["sign-in"]);
        },3000)
      })
    }

    this.translate_s.use(localStorage.getItem("lang_jc") || 'en');

  }

  toggleDropwdown(isOpen: any) {
    if(isOpen==undefined) {
      this.toggle_dropdown = !this.toggle_dropdown  
    }else {
      this.toggle_dropdown = isOpen;
    }
    
  }
}
