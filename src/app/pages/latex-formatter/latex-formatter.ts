import { Component, OnInit } from '@angular/core';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MathDialog } from '../../components/math-dialog/math-dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-latex-formatter',
  imports: [CommonModule, FormsModule, MatButtonToggleModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSlideToggleModule, Navigation, Contact],
  templateUrl: './latex-formatter.html',
  styleUrl: './latex-formatter.scss'
})
export class LatexFormatter implements OnInit {
  inputText = '';
  outputText = '';
  mode: FormatterMode.SPLIT | FormatterMode.JOIN = FormatterMode.SPLIT;
  charKey = 'latex-formatter-chars';
  chars: number = 100;
  replaceMathSnippets: boolean = false;
  replaceMap: { [key: string]: string } = {};
  inlinePattern = /\\\((.*?)\\\)/gs
  displayPattern = /\\\[(.*?)\\\]/gs


  constructor(
    private _snackbar: Snackbar,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (window.localStorage.getItem(this.charKey)) {
      this.chars = Number(window.localStorage.getItem(this.charKey) || '120');
    }
    this.replaceMathSnippets = (window.localStorage.getItem('replaceMathSnippets') == 'true');
    const stored = localStorage.getItem('replaceMap');
    this.replaceMap = stored ? JSON.parse(stored) : {};
  }

  onCharsChange(value: number): void {
    window.localStorage.setItem(this.charKey, value.toString());
  }

  async processText() {
    const paragraphs = this.replaceMathSnippets ? await this.replaceMath() : this.inputText.split(/\n{2,}/); 

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

    const tokens = text.match(/(?:\\\(.*?\\\)|[^\s])+/g) || [];
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
          'Easily manage long strings with custom character-level line breaks, or reformat split lines back into a single string for a clean overview.',
          ''
        ],
        action: 'OK'
      }
    });
  }

  public async replaceMath() {
    let text = this.inputText.replace(/\r\n/g, '\n');

    const inlineMatches = Array.from(text.matchAll(this.inlinePattern), m => m[1]);
    const displayMatches = Array.from(text.matchAll(this.displayPattern), m => m[1]);

    for (const match of inlineMatches) {
      if (this.replaceMap[match]) {
        const regex = new RegExp(`\\\\\\(${match.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\\\\\)`, 'g');
        text = text.replace(regex, this.replaceMap[match]);
      } else {
        const res = await this.check(match);
        if (res === '') continue;
        const regex = new RegExp(`\\\\\\(${match.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\\\\\)`, 'g');
        text = text.replace(regex, res);
      }
    }

    for (const match of displayMatches) {
      if (this.replaceMap[match]) {
        const regex = new RegExp(`\\\\\\[${match.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\\\\\]`, 'g');
        text = text.replace(regex, this.replaceMap[match]);
      } else {
        const res = await this.check(match);
        if (res === '') continue;
        const regex = new RegExp(`\\\\\\[${match.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\\\\\]`, 'g');
        text = text.replace(regex, res);
      }
    }

    text = text.replace(/\\emph\{([^}]+)\}/g, "$1"); // \emph{...} -> ...
    text = text.replace(/\\textbf\{([^}]+)\}/g, "$1"); // \textbf{...} -> ...
    text = text.replace(/\\textit\{([^}]+)\}/g, "$1"); // \textit{...} -> ...
    text = text.replace(/\\underline\{([^}]+)\}/g, "$1"); // \underline{...} -> ...
    text = text.replace(/\\textsuperscript\{([^}]+)\}/g, "$1"); // \textsuperscript{...} -> ...
    text = text.replace(/~?\\cite\{[^}]+\}/g, ""); // ~\cite{...} or \cite{...} -> ""
    text = text.replace(/~?\\cite[p|t]?\[?[^\]]*\]?\{[^}]+\}/g, "");
    text = text.replace(/~?\\footnote\{[^}]+\}/g, ""); // ~\footnote{...} or \footnote{...} -> ""
    text = text.replace(/~\\ref\{[^}]+\}/g, "~1.2"); // ~\ref{...} -> ~1.2
    text = text.replace(/~/g, " "); // ~ -> space
    text = text.replace(/\\begin\{.*?\}[\s\S]*?\\end\{.*?\}/g, ""); // remove figures, tables, etc.
    text = text.replace(/\\([^\s])/g, "$1"); // \. -> .
    text = text.replace(/``(.*?)''/g, '"$1"'); // ``...'' -> "..."

    localStorage.setItem('replaceMap', JSON.stringify(this.replaceMap));
    return text.split(/\n{2,}/);
  }

  async check(value: string): Promise<string> {
    if(/^[0-9]+$/.test(value.trim())) {
      return value.trim();
    }
    if(/^[a-zA-Z]+$/.test(value.trim())) {
      return value.trim();
    }

    try {
      const result = await this._dialog.open(MathDialog, {
        width: '400px',
        data: {
          title: 'Replacement',
          description: value,
        }
      }).afterClosed().toPromise();

      if (result) {
        this.replaceMap[value] = result;
        return result;
      } else {
        return '';
      }
    } catch (err) {
      return '';
    }
  }

  removeReplacement(key: string) {
    delete this.replaceMap[key];
    localStorage.setItem('replaceMap', JSON.stringify(this.replaceMap));
  }

  toggleReplaceMathSnippets() {
    window.localStorage.setItem('replaceMathSnippets', this.replaceMathSnippets ? 'true' : 'false')
  }
}
