import { Component, OnInit } from '@angular/core';
import { Navigation } from '../../components/navigation/navigation';
import { Contact } from '../../components/contact/contact';
import { Storage } from '../../services/storage';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { SnippetItem } from '../../interfaces/snippet-item';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-snippet-vault',
  imports: [FormsModule, MatIconModule, ClipboardModule, Navigation, Contact, MatInputModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './snippet-vault.html',
  styleUrl: './snippet-vault.scss'
})
export class SnippetVault implements OnInit {
  protected snippets: SnippetItem[] = [];
  newSnippet: SnippetItem = { title: '', content: '' };

  constructor(private _storage: Storage) {}

  ngOnInit(): void {
    this.snippets = JSON.parse(this._storage.getLocalEntry('snippets') || '[]');
  }

  createSnippet(): void {
    this.snippets.push({ ...this.newSnippet });
    this.newSnippet = { title: '', content: '' };
    this._storage.setLocalEntry('snippets', this.snippets);
  }

  removeSnippet(index: number): void {
    this.snippets.splice(index, 1);
    this._storage.setLocalEntry('snippets', this.snippets);
  }

}
