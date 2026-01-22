import { Component, Input, OnInit } from '@angular/core';
import { Screen } from '../../services/screen';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NavigationItem } from '../../interfaces/navigation-item';
import { Data } from '../../services/data';
import { Theme } from '../../services/theme';

@Component({
  selector: 'app-navigation',
  imports: [MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss'
})
export class Navigation implements OnInit {
  @Input() home: boolean = false;
  protected width: number = 0;
  protected name: Array<string> = ['M', 'a', 'r', 'c', 'e', 'l', '&nbsp;', 'N', 'ö', 'h', 'r', 'e'];
  protected navigation: NavigationItem[] = [];
  protected path: string = '';
  protected themeIcon: string = '';
  protected basePath: string = 'https://marcel-noehre.de/'

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _screen: Screen,
    private _theme: Theme,
    private _data: Data
  ) { }

  ngOnInit() {
    this._screen.width$.subscribe(w => this.width = w);
    this.navigation = this._data.navigation;
    this.path = '/' + this._route.snapshot.routeConfig?.path;
    this.themeIcon = this._theme.isDarkMode() ? 'light_mode' : 'dark_mode';
  }

  protected redirect(route: string | undefined): void {
    if (route == '/') {
      this._router.navigate([route]).then(() => {
          window.scrollTo(0, 0)
      });
    } else if (route) {
      window.location.href = this.basePath + route
    } else {
      window.scrollTo({
        top: window.document.body.scrollHeight,
        behavior: 'smooth'
      });
    }
  }

  toggleTheme() {
    this._theme.toggleTheme();
    this.themeIcon = this._theme.isDarkMode() ? 'light_mode' : 'dark_mode';
  }

}