import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent {
  public currency_selected: string = "";
  public currencies: string[] = [];
  public hidden_options: boolean = false;
  public error_msg: string = "";
  public success_msg: string = "";
  public currencyForm!: FormGroup;
  public dots_no: number = 0;
  public user_id: string = "";
  public paper_cost_storage: string = "";
  public joint_cost_storage: string = "";
  public cigar_cost_storage: string = "";
  public currency_storage: string = "";
  public lang_selected: string = "";
  public langs: string[] = [];
  public hidden_options_1: boolean = false;
  public confirm_del_account: boolean = false;
  public is_name_edit: boolean = false;
  public name_user: string = "";
  
  constructor(private formBuilder: FormBuilder, private admin_service: AdminService, private auth_service: AuthService, private router: Router, private translate_s: TranslateService) { 
    this.langs = ["es", "en"];
    this.currencies = ["euro", "dollar", "libra"];
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

    this.currencyForm.patchValue({
      cigar_cost: localStorage.getItem("cigar_cost_jc") || '0.25',
      paper_cost: localStorage.getItem("paper_cost_jc") || '0.05',
      joint_cost: localStorage.getItem("joint_cost_jc") || '1'
    });
    
    this.currency_selected = localStorage.getItem("currency_jc") || 'euro';

  }

  ngOnInit(): void {
    let user = localStorage.getItem("user_jc")
    let token =localStorage.getItem("token_jc");
    
    if (token == "" || token == undefined || !user) {
       this.router.navigate(["sign-in"]);

      } else {
      this.user_id = JSON.parse(user||'').id;

      this.auth_service.me(token).subscribe(data=>{
        this.getName();

      }, err => {
        
        this.error_msg = "popup_error_400_me";
        
        setTimeout(()=>{
          this.error_msg = "";
          this.router.navigate(["sign-in"]);
        },3000)
      })
    }
    
    this.selectLang(localStorage.getItem("lang_jc") || 'en');
  }

  updateName(e:any) {
    if (this.name_user.trim().length >= 6) {
      this.admin_service.updateName(this.user_id, this.name_user.trim()).subscribe(data => {
        this.name_user=data.name
        this.is_name_edit = false
        this.success_msg = "popup_success_default";
        setTimeout(()=>{
          this.success_msg = "";
        },3000)
      }, err => {
        
        if (err.status == 403) {
          this.error_msg = "popup_error_400_register";

        } else {
          this.error_msg = "popup_error_500";
        }

        setTimeout(()=>{
          this.error_msg = "";
        },3000)

      })
    }
    
  }

  getName() {
    this.admin_service.getName(this.user_id).subscribe(data=>{
      this.name_user = data[0].name
    }, err => {
      this.error_msg = "popup_error_500";
      setTimeout(()=>{
        this.error_msg = "";
      },3000)
    })
  }

  name_edited() {
    if (this.name_user.trim().length >= 6) this.is_name_edit = true
    else this.is_name_edit = false
  }

  log_out(e: any) {
    e.preventDefault()
    localStorage.removeItem("token_jc")
    this.router.navigate(["sign-in"])
  }

  delAccount() {
    this.admin_service.delUser(this.user_id).subscribe(data => {
      localStorage.removeItem("token_jc");
      localStorage.removeItem("user_jc");
      this.router.navigate(["sign-up"])
    }, err => {
      this.error_msg = "popup_error_500";
      setTimeout(()=>{
        this.error_msg = "";
      },3000)
    })
  }

  setConfirmDelAccount() {
    this.confirm_del_account = !this.confirm_del_account
  }

  selectCurrency(currency: string) {
    this.changeStatus(true);
    if (this.currencies.includes(currency)) {
      this.currency_selected = currency;
    }
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

  isANumber(event:any): any {
    
    let keycode_allowed=['46','48','49','50','51','52','53','54','55','56','57']
    if (!keycode_allowed.includes(event.keyCode.toString())){
      event.preventDefault();
      
    }else {
      if (event.keyCode == 46) {

        let value = this.currencyForm.get("" + event.target.className.split(" ")[0])?.value;
        this.dots_no = (value.match(/[.]/g) || []).length;

        if (this.dots_no > 0) {
          let last_value = value.split(".")[value.split(".").length-1]
          
          if (value.charAt(0) == "0" || value.charAt(value.length-3) == undefined || value.charAt(value.length-3) == "." || last_value.length != 3) {
            event.preventDefault();
          } else {
            
          }
          
        } else {
          if (value.length <= 0 || value.length > 3) {
            event.preventDefault();
          } else {
            
          }
        }
      }
      
    }

      
  }

  changeLang(lang:string) {
    this.selectLang(lang);
    this.changeStatus(false);
  }

  selectLang(lang: string) {
    if (this.langs.includes(lang)) {
      this.lang_selected = lang;
      localStorage.setItem("lang_jc", this.lang_selected);
      this.translate_s.use(this.lang_selected);
    }
  }

  onSubmit() {

    if (this.currencyForm.valid) {
      let currency_obj = this.currencyForm.value;
      this.auth_service.updateCurrency(this.user_id, this.currency_selected, currency_obj.cigar_cost, currency_obj.paper_cost, currency_obj.joint_cost).subscribe(data=> {
        let user = JSON.parse(localStorage.getItem("user_jc")||"");
        localStorage.setItem("currency_jc", this.currency_selected);
        localStorage.setItem("joint_cost_jc", currency_obj.joint_cost);
        localStorage.setItem("paper_cost_jc", currency_obj.paper_cost);
        localStorage.setItem("cigar_cost_jc", currency_obj.cigar_cost);
        user.cost = true;
        localStorage.setItem("user_jc", JSON.stringify(user));

        this.success_msg = "popup_success_default";
        setTimeout(()=>{
          this.success_msg = "";
        },3000)
      }, err => {
        this.error_msg = "popup_error_500";
        setTimeout(()=>{
          this.error_msg = "";
        },3000)
      });
    }
  }
}
