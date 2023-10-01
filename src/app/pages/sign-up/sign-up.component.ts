import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  public registerForm!: FormGroup;
  public isSubmitted: boolean = false;
  public error_msg: string = "";

  constructor(private router: Router, private auth_service: AuthService, private formBuilder: FormBuilder, private translate_s: TranslateService) {
    // REGISTER FORM VALIDATIONS
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50)        
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50)        
      ])
    });
  }

  ngOnInit(): void {
    
    this.translate_s.use(localStorage.getItem("lang_jc") || 'en'); // GET LANG
  }

  // SUBMIT REGISTER
  onSubmit() {
    if(this.registerForm.valid){
      this.isSubmitted = true;      

      let user = this.registerForm.value; // GET VALUE USER

      this.auth_service.register(user).subscribe(data => {
        this.router.navigate(["sign-in"])
      }, (err) => {
        
        if (err.status==400) {
          this.error_msg = "popup_error_400_register";
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
