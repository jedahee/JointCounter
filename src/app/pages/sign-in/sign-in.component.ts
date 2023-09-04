import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
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
        Validators.maxLength(50)          //Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
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
      
      this.auth_service.login(user).subscribe(data => {
        this.router.navigate(["admin/home"])
      }, (err) => {
        console.log(err);
        
        this.error_msg = "popup_error_500";
        setTimeout(()=>{
          this.error_msg = "";
        },3000)
        
      });    
    }
  
  }
}

