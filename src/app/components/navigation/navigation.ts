import { Component, Input, OnInit } from '@angular/core';
import { Screen } from '../../services/screen';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

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
  protected items: Array<{ route: string, title: string }> = [
    { route: '/publications', title: 'Publications' },
    { route: '/projects', title: 'Projects' },
    { route: '/cv', title: 'CV' },
    { route: '/contact', title: 'Contact' },
    { route: '/impressum', title: 'Impressum' }
  ];

  constructor(
    private _router: Router,
    private _screen: Screen
  ) { }

  ngOnInit() {
    this._screen.width$.subscribe(w => this.width = w);
  }

  protected redirect(route: string): void {
    this._router.navigate([route]);
  }

}