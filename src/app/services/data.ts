import { Injectable } from '@angular/core';
import { DashboardItem } from '../interfaces/dashboard-item';

@Injectable({
  providedIn: 'root'
})
export class Data {
  public getDashboardItems(): DashboardItem[] {
    return [
      { title: 'ANSI Colors', icon: 'palette', url: '/ansi-colors' },
      { title: 'Compare Text', icon: 'compare', url: '/compare-text' },
      { title: 'Text Formatter', icon: 'text_fields', url: '/text-formatter' }
    ];
  }
  
}
