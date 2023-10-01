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
  public month_cards: any[] = [];
  public month_cards_copy_aux: any[] = [];
  public years_range: number[] = [];
  public total_joints: number = 0;
  public total_cigarretes: number = 0;
  
  public cigar_cost: number = Number(localStorage.getItem("cigar_cost_jc")) ||  -1;
  public paper_cost: number = Number(localStorage.getItem("paper_cost_jc")) || -1;
  public joint_cost: number = Number(localStorage.getItem("joint_cost_jc")) || -1;
  public currency: string = localStorage.getItem("currency_jc") || '';
  
  constructor(private admin_service: AdminService, private router: Router, private auth_service: AuthService, private translate_s: TranslateService) {
    // CHECKING IF PRICES EXISTS (IF NOT REDIRECT TO LOGIN)
    if (this.cigar_cost == null || this.paper_cost == null || this.joint_cost == null || this.currency == null ||
      this.cigar_cost == -1 || this.paper_cost == -1 || this.joint_cost == -1 || this.currency == '')
      this.router.navigate(["sign-in"])

    // MONTHS ALLOWED (MONTH NAME IS FOR TRANSLATIONS)
    this.months=['month_1','month_2','month_3','month_4','month_5','month_6','month_7','month_8','month_9','month_10','month_11','month_12']
  }

  ngOnInit(): void {
    // CHECK USER IS LOGGED AND TOKEN ISN'T EXPIRED
    let user = localStorage.getItem("user_jc")
    let token = localStorage.getItem("token_jc");
    
    if (token == "" || token == undefined || !user) {
      this.router.navigate(["sign-in"]);
    } else {
      this.user_id = JSON.parse(user||'').id;

      this.auth_service.me(token).subscribe(data=>{
        this.loadData()
      }, err => {

        this.error_msg = "popup_error_400_me";
        
        setTimeout(()=>{
          this.error_msg = "";
          this.router.navigate(["sign-in"]);
        },3000)
      })
    }

    this.translate_s.use(localStorage.getItem("lang_jc") || 'en'); // GET LANG

  }

  // FILTER DATA BY YEAR AND MONTH
  filterData() {   
    this.month_cards = this.month_cards_copy_aux.filter(mc => {
      if (this.year_selected != "-1" && this.month_selected == "-1") return mc.year == this.year_selected 
      else if (this.year_selected == "-1" && this.month_selected != "-1") return mc.month == this.month_selected 
      else if (this.year_selected != "-1" && this.month_selected != "-1") return mc.year == this.year_selected && mc.month == this.month_selected 
      else return this.month_cards_copy_aux
    })

  }

  // GET DATA BY USER
  loadData(){
    this.admin_service.getOrangesByUser(this.user_id).subscribe(data=>{
      data.forEach((or:any)=>{
        let year = Number(or.date.split(" ")[0].split("-")[0]) // YEAR
        let month = or.date.split(" ")[0].split("-")[1] // MONTH
        let registerExists = false
        

        // Split number "0X" to "X" Ex. "09" -> "9" (if the number is less than 10)
        if (Number(month.split("")[0]) == 0)
          month = month.split("")[1];


        // FILL YEAR DROPDOWN
        if (!this.years_range.includes(year)) {
          this.years_range.push(year)
        }

        // CHECK IF THIS MONTH DATA EXISTS, IF EXISTS, SUM 1 TO JOINT OR CIGAR, IF NOT, CREATE THIS MONTH DATA
        if (this.month_cards.length == 0) {
          this.month_cards.unshift({
            month: "month_"+month,
            year: year,
            cigarretes: or.isLight ? 1 : 0,
            joints: !or.isLight ? 1 : 0
          })
        } else {
          this.month_cards.forEach(mc =>{
            if (mc.month == "month_"+month && mc.year == year){ 
              if(or.isLight) mc.cigarretes+=1
              if(!or.isLight) mc.joints+=1
              

              registerExists = true;
            }
            
          })

          if (!registerExists) {
            this.month_cards.unshift({
              month: "month_"+month,
              year: year,
              cigarretes: or.isLight ? 1 : 0,
              joints: !or.isLight ? 1 : 0
            })
          }
        }

      })

      console.log(this.month_cards)
      
      // CALCULATE TOTAL JOINTS AND CIGARRETES
      this.month_cards.forEach(mc=>{
        this.total_cigarretes += mc.cigarretes
        this.total_joints += mc.joints
      })

      // SORT YEARS
      this.years_range.sort()
      this.month_cards_copy_aux = this.month_cards;
    }, err => {
      this.error_msg = "popup_error_500";
        
      setTimeout(()=>{
        this.error_msg = "";
        this.router.navigate(["sign-in"]);
      },3000)
    })
  }

  // CHANGE YEAR
  selectYear(year:number) {
    this.year_selected=year.toString();
    this.changeStatus(true)
    this.filterData()
  }

  // HIDE/SHOW DROPDOWN
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

  // SELECT MONTH
  selectMonth(value:string) {
    if (this.months.includes(value)) {
      this.month_selected = value;
      this.changeStatus(false)
      this.filterData()
    }
  }
}
