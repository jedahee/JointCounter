import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-currency',
  templateUrl: './update-currency.component.html',
  styleUrls: ['./update-currency.component.scss']
})
export class UpdateCurrencyComponent {
  public currency_selected: string = "";
  public currencies: string[] = [];
  public hidden_options: boolean = false;
  public error_msg: string = "";
  public currencyForm!: FormGroup;

  constructor( private formBuilder: FormBuilder, private auth_service: AuthService, private router: Router, private translate_s: TranslateService) {
    this.currencies = ["euro", "dollar", "libra"];
    this.currency_selected = "euro";
    this.currencyForm = this.formBuilder.group({
      cigar_cost: new FormControl('', [
        Validators.required,
      ]),
      paper_cost: new FormControl('', [
        Validators.required,
                
      ]),
      joint_cost: new FormControl('', [
        Validators.required,
                
      ])
    });
  }

  ngOnInit(): void {
    let token =localStorage.getItem("token_jc");
    if (token == "" || token == undefined) {
       this.router.navigate(["sign-in"]);
    } else {
      this.auth_service.me(token).subscribe(data=>{
        if (JSON.parse(localStorage.getItem("user_jc") || "").cost) {
          this.router.navigate(["admin/"]);
        }
      }, err => {
        
        this.error_msg = "popup_error_400_me";
        
        setTimeout(()=>{
          this.error_msg = "";
          this.router.navigate(["sign-in"]);
        },3000)
      })
    }
    
    let user = localStorage.getItem("user_jc");
    if (!user) this.router.navigate(["sign-in"]);

    if (JSON.parse(user||"").cost) {
      this.router.navigate(["admin/home"]);
    }
    this.translate_s.use(localStorage.getItem("lang_jc") || 'en');
  }

  selectCurrency(currency: string) {
    this.changeStatus();
    if (this.currencies.includes(currency)) {
      this.currency_selected = currency;
    }
  }

  changeStatus() {
    this.hidden_options = !this.hidden_options;
  }

  onSubmit() {
    
  }
}
