import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormatterMode } from '../../enums/formatter-mode';
import { Snackbar } from '../../services/snackbar';
import { Contact } from '../../components/contact/contact';
import { Navigation } from '../../components/navigation/navigation';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../../components/dialog/dialog';

@Component({
  selector: 'app-latex-formatter',
  imports: [FormsModule, MatButtonToggleModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, Navigation, Contact],
  templateUrl: './latex-formatter.html',
  styleUrl: './latex-formatter.scss'
})
export class LatexFormatter {
  inputText = '';
  outputText = '';
  mode: FormatterMode.SPLIT | FormatterMode.JOIN = FormatterMode.SPLIT;
  charKey = 'latex-formatter-chars';
  chars: number = 100;

  constructor(
    private _snackbar: Snackbar,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (window.localStorage.getItem(this.charKey)) {
      this.chars = Number(window.localStorage.getItem(this.charKey) || '120');
    }
  }

  onCharsChange(value: number): void {
    window.localStorage.setItem(this.charKey, value.toString());
  }

  processText() {
    const paragraphs = this.inputText.split(/\n{2,}/); // Split into paragraphs by 2+ newlines

    if (this.mode === FormatterMode.SPLIT) {
      this.outputText = paragraphs
        .map(paragraph => this.wrapText(paragraph, this.chars))
        .join('\n\n');
    } else if (this.mode === FormatterMode.JOIN) {
      this.outputText = paragraphs
        .map(paragraph => this.joinText(paragraph))
        .join('\n\n');
    } else {
      this.outputText = this.inputText;
    }
  }

  wrapText(text: string, max: number): string {
    const res: string[] = [];
    let tmp = '';

    // tokenize words and math snippets
    const tokens = text.match(/\\\([\s\S]*?\\\)|[^\s]+/g) || [];

    tokens.forEach((token) => {
      if ((tmp + ' ' + token).trim().length > max) {
        if (tmp.trim()) res.push(tmp.trim());
        tmp = token;
      } else {
        tmp += (tmp === '' ? '' : ' ') + token;
      }
    });

    if (tmp.trim()) res.push(tmp.trim());
    return res.join('\n');
  }

  joinText(text: string): string {
    return text.replace(/\s*\n\s*/g, ' ').replace(/\s+/g, ' ').trim();
  }

  copy() {
    navigator.clipboard.writeText(this.outputText).then(() => {
      this._snackbar.open('Copied to clipboard');
    }).catch((err) => {
      this._snackbar.open('Failed to copy');
    });
  }

  public openInfo() {
      this._dialog.open(Dialog, {
        data: {
          title: 'LaTex Formatter Information',
          content: [
            'Easily manage long strings with custom character-level line breaks, or reformat split lines back into a single string for a clean overview. To maintain code integrity, the formatter ensures that no breaks occur within math mode segments.',
            'Enable Math Simplification to replace math mode parts with custom strings, allowing you to focus entirely on the core text. You can fully customize and edit your list of replacement strings at any time to suit your project.'
          ],
          action: 'OK'
        }
      });
    }
}
