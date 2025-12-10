import { Injectable } from '@angular/core';
import { DashboardItem } from '../interfaces/dashboard-item';
import { NavigationItem } from '../interfaces/navigation-item';
import { ContactItem } from '../interfaces/contact-item';
import { AnsiColorItems } from '../interfaces/ansi-color-item';

import * as dashboardData from '../../assets/data/dashboard.json';
import * as navData from '../../assets/data/navigation.json';
import * as contactData from '../../assets/data/contact.json';
import * as ansiColorsData from '../../assets/data/ansi-colors.json';

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

  public getAnsiColors(): AnsiColorItems {
    return {
      basic: ansiColorsData.basic,
      special: ansiColorsData.special
    }
  }
}
