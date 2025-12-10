import { Component, OnInit } from '@angular/core';
import { Data } from '../../services/data';
import { AnsiColorItems } from '../../interfaces/ansi-color-item';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Navigation } from '../../components/navigation/navigation';
import { Contact } from '../../components/contact/contact';

@Component({
  selector: 'app-ansi-colors',
  imports: [MatTableModule, MatButtonModule, MatIconModule, ClipboardModule, Navigation, Contact],
  templateUrl: './ansi-colors.html',
  styleUrl: './ansi-colors.scss'
})
export class AnsiColors implements OnInit {
  colors: AnsiColorItems = { basic: [], special: [] };

  constructor(private _data: Data) { }

  ngOnInit() {
    this.colors = this._data.getAnsiColors();
  }

}
