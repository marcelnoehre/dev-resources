import { Injectable } from '@angular/core';
import { DashboardItem } from '../interfaces/dashboard-item';
import { NavigationItem } from '../interfaces/navigation-item';
import { ContactItem } from '../interfaces/contact-item';

import * as dashboardData from '../../assets/data/dashboard.json';
import * as navData from '../../assets/data/navigation.json';
import * as contactData from '../../assets/data/contact.json';

@Injectable({
  providedIn: 'root'
})
export class Data {
  
  public getDashboardItems(): DashboardItem[] {
    return dashboardData.apps;
  }

  public get navigation(): NavigationItem[] {
    return navData.navigation;
  }

  public get contact(): ContactItem[] {
    return contactData.socials;
  }
  
}
