import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent {
  
  public lang_selected: string = "";
  public langs: string[] = [];
  public hidden_options: boolean = false;

  constructor(private router: Router, private translate_s: TranslateService) { 
    this.langs = ["es", "en"]; // LANG ALLOWED
  }

  ngOnInit(): void {
    // CHECK IF USER WAS LOGGED BEFORE
    if (localStorage.getItem("user_jc")) {
      this.router.navigate(["sign-in"]);
    }
    this.selectLang(localStorage.getItem("lang_jc") || 'en'); // GET LANG
  }

  // SHOW/HIDE DROPDOWN OPTIONS
  changeStatus() {
    this.hidden_options = !this.hidden_options;
  }

  // CALL SELECT LANG AND HIDE OPTIONS DROWDOWN
  changeLang(lang:string) {
    this.selectLang(lang);
    this.changeStatus();
  }

  // CHANGE LANG TO DISPLAY
  selectLang(lang: string) {
    if (this.langs.includes(lang)) {
      this.lang_selected = lang;
      localStorage.setItem("lang_jc", this.lang_selected);
      this.translate_s.use(this.lang_selected);
    }
  }
}
