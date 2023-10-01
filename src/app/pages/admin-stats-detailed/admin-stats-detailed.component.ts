import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-stats-detailed',
  templateUrl: './admin-stats-detailed.component.html',
  styleUrls: ['./admin-stats-detailed.component.scss']
})
export class AdminStatsDetailedComponent {
  public graphic_selected: string = "joint";
  public graphics: string[] = [];
  public joints_graphic: any[] = [  ];
  public cigar_graphic: any[] = [];
  public hidden_options: boolean = false;
  public isLarge: boolean = false;
  public error_msg: string = "";
  public months: string[] = [];
  public user_id: string = "";
  public year: string = "";
  public month: string = "";
  public cigar_cost: number = Number(localStorage.getItem("cigar_cost_jc")) ||  -1;
  public paper_cost: number = Number(localStorage.getItem("paper_cost_jc")) || -1;
  public joint_cost: number = Number(localStorage.getItem("joint_cost_jc")) || -1;
  public currency: string = localStorage.getItem("currency_jc") || '';
  public days_no_month = 0;
  public max_joints: number = 0;
  public max_cigar: number = 0;

  constructor(private admin_service: AdminService, private router: Router, private auth_service: AuthService, private translate_s: TranslateService) {
    // CHECKING IF PRICES EXISTS (IF NOT REDIRECT TO LOGIN)
    if (this.cigar_cost == null || this.paper_cost == null || this.joint_cost == null || this.currency == null ||
      this.cigar_cost == -1 || this.paper_cost == -1 || this.joint_cost == -1 || this.currency == '')
      this.router.navigate(["sign-in"])

    // MONTHS ALLOWED (MONTH NAME IS FOR TRANSLATIONS)
    this.months=['month_1','month_2','month_3','month_4','month_5','month_6','month_7','month_8','month_9','month_10','month_11','month_12']
    // GRAPHICS NAME ALLOWED
    this.graphics = ['joint', 'cigar'];
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
        this.loadData();
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

  // CHANGE HEIGHT OF GRAPHIC  
  setLarge() {
   this.isLarge = !this.isLarge 
  }

  // GET DATA BY USER, YEAR AND MONTH
  loadData() {

    this.loadTitle();
    this.loadDaysMonth();
    
    let length_router = this.router.url.split("/").length - 1

    this.admin_service.getOrangesByUserYearMonth(this.user_id, this.year, this.router.url.split("/")[length_router]).subscribe(data =>{
      data.oranges.forEach((or:any)=>{
        let length = or.date.split(" ")[0].split("-").length
        let day = or.date.split(" ")[0].split("-")[length-1]

        if (or.isLight) this.cigar_graphic=this.filterOranges(day, this.cigar_graphic)
        else this.joints_graphic=this.filterOranges(day, this.joints_graphic)
        
      })
    
      this.calculateMax();

    }, err=>{
      this.error_msg = "popup_error_500";
        
      setTimeout(()=>{
        this.error_msg = "";
        this.router.navigate(["sign-in"]);
      },3000)
    })
  }

  // CALCULATE MAX AND MIN NUMBER OF JOINTS/CIGARS
  calculateMax() {
    this.joints_graphic.forEach(jc =>{
      this.max_joints += Number(jc.quantity)
    });
    this.cigar_graphic.forEach(jc =>{
      this.max_cigar += Number(jc.quantity)
    });
  }

  // GROUP REGISTER PER DAY
  filterOranges(day:string,array:any[]) {
    
    array.forEach(cg => {
      if (cg.day == day) {
        cg.quantity+=1
      }
    })
    
    return array
  }

  // GET NUMBER OF DAYS OF MONTH AND FILL IT WITH A OBJECT PER DAY
  loadDaysMonth() {
    let length_router = this.router.url.split("/").length - 1
    this.days_no_month = new Date(Number(this.year), Number(this.router.url.split("/")[length_router]), 0).getDate()

    for (let i=1; i<=this.days_no_month;i++) {
      this.joints_graphic.push({
        "day":i,
        "quantity": 0
      })
      this.cigar_graphic.push({
        "day":i,
        "quantity": 0
      })
    }
  }

  // GET MONTH AND YEAR AND DISPLAY IT
  loadTitle() {
    let length_router = this.router.url.split("/").length - 1
    this.year = this.router.url.split("/")[length_router - 1]
    this.month =  "month_"+(Number(this.router.url.split("/")[length_router]))
  }

  // HIDE/SHOW OPTIONS OF DROPDOWNS
  changeStatus() {
    this.hidden_options = !this.hidden_options;
  }

  // CALL SELECT GRAPHIC AND HIDE OPTIONS DROWDOWN
  changeGraphic(gr:string) {
    this.selectGraphic(gr);
    this.changeStatus();
  }

  // SELECT THE GRAPHIC TO DISPLAY
  selectGraphic(gr: string) {
    if (this.graphics.includes(gr))
      this.graphic_selected = gr;
    
  }

}
