import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent {
  public registers_per_load: number; // Number of registers to show before of display link to show more
  public error_msg: string = ""; // Error message
  public user_id: string = ""; // User id
  public limit: number ; // Limit of register to return
  public skip: number = 0; // Skip registers before of resquest
  public toggle_dropdown: boolean = false; // To know if dropdown is open or closed
  public oranges: any[] = [] // Data to filter
  public oranges_displayed: any[] = []; // Data to display in html template

  constructor(private admin_service: AdminService, private router: Router, private auth_service: AuthService, private translate_s: TranslateService) {
    if (window.screen.width >= 768){ // PC VERSION
      this.registers_per_load=9999
      this.limit=9999
    }else{ // MOBILE VERSION
      this.registers_per_load=10
      this.limit=10
    }
  }

  ngOnInit(): void {
    let user = localStorage.getItem("user_jc") // Get user...
    let token =localStorage.getItem("token_jc"); // Get token
    
    // Check if user is logged and token isn't expired
    if (token == "" || token == undefined || !user) {
      this.router.navigate(["sign-in"]);
    } else {
      this.user_id = JSON.parse(user||'').id;

      this.auth_service.me(token).subscribe(data=>{
        this.getOranges()
      }, err => {
        
        this.error_msg = "popup_error_400_me";
        
        setTimeout(()=>{
          this.error_msg = "";
          this.router.navigate(["sign-in"]);
        },3000)
      })
    }

    this.translate_s.use(localStorage.getItem("lang_jc") || 'en'); // Get lang...

  }

  // Group registers per day 
  groupDays(array: any[], unshift:boolean) {
    let oranges_displayed = this.oranges_displayed;
    array.forEach((or:any) => {
      let date = or.date.split(" ")[0];
      let day_found = false;

      if (oranges_displayed.length == 0) {
        oranges_displayed.push({date:date, content: [ or ]})

      } else {
        oranges_displayed.forEach(or_d => {
          if (date == or_d.date) { // For sort array
            if (unshift) or_d.content.unshift(or);
            if (!unshift) or_d.content.push(or);
            day_found = true
          }
        })

        if (!day_found){ // For sort array
          if (unshift) oranges_displayed.unshift({date:date, content: [ or ]})
          if (!unshift) oranges_displayed.push({date:date, content: [ or ]})
          
        }
      }
    })

    return oranges_displayed;

  }

  // Get oranges by id (limit, skip)
  getOranges() {
    this.admin_service.getLimitSkipOranges(this.user_id, this.limit, this.skip).subscribe(data => {
      this.oranges = data

      this.limit += this.registers_per_load;
      this.skip += this.registers_per_load;

      this.oranges_displayed = this.groupDays(this.oranges, false);

    }, err => { // To show error un popup
        this.error_msg = "popup_error_400_admin_home";
        
        setTimeout(()=>{
          this.error_msg = "";
        },3000)    
      })
  }

  // Add register
  addOrange(isLight:boolean) {
    let orange_to_add = {
      isLight: isLight,
      idUser: this.user_id
    }

    this.admin_service.addOrange(orange_to_add).subscribe(data => {
      this.toggleDropwdown(false); // Close dropdown

      this.oranges_displayed = this.groupDays([data.data], true); // group days of array to display
    }, err => {
      this.error_msg = "popup_error_500";
        
        setTimeout(()=>{
          this.error_msg = "";
        },3000) 
      })
  }

  deleteOrange(id:string) {
    this.admin_service.delOrange(id).subscribe(data => {
      let oranges_displayed = this.oranges_displayed;
      
      oranges_displayed.forEach((or, i, obj) => {
        or.content = or.content.filter((or_c:any) => {
          return or_c._id != data.orange._id;
        })

        if (or.content.length == 0)
          obj.splice(i, 1)
        
      })

      this.oranges_displayed = oranges_displayed;
    }, err => {
      this.error_msg = "popup_error_500";
        
      setTimeout(()=>{
        this.error_msg = "";
      },3000) 
    });
  }

  toggleDropwdown(isOpen: any) {
    if(isOpen==undefined) {
      this.toggle_dropdown = !this.toggle_dropdown  
    }else {
      this.toggle_dropdown = isOpen;
    }
    
  }
}
