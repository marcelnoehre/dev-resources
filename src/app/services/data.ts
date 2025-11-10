import { Injectable } from '@angular/core';
import { DashboardItem } from '../interfaces/dashboard-item';

import * as dashboardData from '../../assets/data/dashboard.json';

@Injectable({
  providedIn: 'root'
})
export class Data {
  
  public getDashboardItems(): DashboardItem[] {
    return dashboardData.apps;
  }
  
}
