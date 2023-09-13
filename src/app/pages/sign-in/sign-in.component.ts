import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  public loginForm!: FormGroup;
  public isSubmitted: boolean = false;
  public error_msg: string = "";

  constructor(private router: Router, private auth_service: AuthService, private formBuilder: FormBuilder, private translate_s: TranslateService) {
    this.loginForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50)        
      ])
    });
  }

  ngOnInit(): void {
    this.translate_s.use(localStorage.getItem("lang_jc") || 'en');
  }

  onSubmit() {
    if(this.loginForm.valid){
      this.isSubmitted = true;      

      let user = this.loginForm.value;
      let paper_cost = localStorage.getItem("paper_cost_jc")
      let cigar_cost = localStorage.getItem("cigar_cost_jc")
      let joint_cost = localStorage.getItem("joint_cost_jc")
      let currency = localStorage.getItem("currency_jc")

      this.auth_service.login(user).subscribe(data => {
        if(paper_cost == null || cigar_cost == null || joint_cost == null || currency == undefined) {
          if (data.user.paper_cost != "" && data.user.joint_cost != "" && data.user.cigar_cost != "" && data.user.currency != "") {
            localStorage.setItem("currency_jc", data.user.currency);
            localStorage.setItem("joint_cost_jc", data.user.joint_cost);
            localStorage.setItem("paper_cost_jc", data.user.paper_cost);
            localStorage.setItem("cigar_cost_jc", data.user.cigar_cost);
          }

        }
        if (localStorage.getItem("user_jc") && JSON.parse(localStorage.getItem("user_jc") || "").cost != undefined && JSON.parse(localStorage.getItem("user_jc") || "").cost != null)
          localStorage.setItem('user_jc', JSON.stringify({"id": data.user._id, "cost": true }));
        else
          localStorage.setItem('user_jc', JSON.stringify({"id": data.user._id, "cost": false}));
        
        localStorage.setItem('token_jc', data.data.token);
        this.router.navigate(["admin/currency"])
      }, (err) => {
        if (err.status==400) {
          this.error_msg = "popup_error_400_login";
        }else{
          this.error_msg = "popup_error_500";
        }
        
        
        setTimeout(()=>{
          this.error_msg = "";
        },3000)
        
      });    
    }
  
  }
}

