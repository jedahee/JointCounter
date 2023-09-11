import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-stats',
  templateUrl: './admin-stats.component.html',
  styleUrls: ['./admin-stats.component.scss']
})
export class AdminStatsComponent {
  public error_msg: string = "";
  public year_selected: string = "-1";
  public month_selected: string = "-1";
  public user_id: string = "";
  public hidden_options: boolean = false;
  public hidden_options_1: boolean = false;
  public months: string[] = [];
  
  constructor(private admin_service: AdminService, private router: Router, private auth_service: AuthService, private translate_s: TranslateService) {
    this.months=[
      'month_1',
      'month_2',
      'month_3',
      'month_4',
      'month_5',
      'month_6',
      'month_7',
      'month_8',
      'month_9',
      'month_10',
      'month_11',
      'month_12',
    ]
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

  changeStatus(isHidden1:boolean) {

    if (!isHidden1){
      this.hidden_options = !this.hidden_options;
      
      if (this.hidden_options_1)
        this.hidden_options_1 = false;
    }else{    
      this.hidden_options_1 = !this.hidden_options_1;
      if (this.hidden_options)
        this.hidden_options = false;
    }
  }

  selectMonth(value:string) {
    if (this.months.includes(value)) {
      this.month_selected = value;
      this.changeStatus(false)
    }
  }
}
