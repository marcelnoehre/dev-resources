import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DashboardItem } from '../../interfaces/dashboard-item';
import { RouterModule } from '@angular/router';
import { Data } from '../../services/data';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, MatCardModule, MatIconModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  protected items: DashboardItem[] = [];

  constructor(private _data: Data) {}

  ngOnInit(): void {
    this.items = this._data.getDashboardItems();
  }

}
