import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CompareTextItem } from '../../interfaces/compare-text';
import { ComparisonMode } from '../../enums/comparison-mode';
import { Snackbar } from '../../services/snackbar';
import { Data } from '../../services/data';
import { Dialog } from '../../components/dialog/dialog';
import { Navigation } from '../../components/navigation/navigation';
import { Contact } from '../../components/contact/contact';

@Component({
  selector: 'app-compare-text',
  imports: [FormsModule, MatButtonToggleModule, MatButtonModule, MatIconModule, Navigation, Contact],
  templateUrl: './compare-text.html',
  styleUrl: './compare-text.scss'
})
export class CompareText {
  comparisonMode: ComparisonMode = ComparisonMode.WORDS;
  textLeft = '';
  textRight = '';
  result: any = [];

  constructor(
    private _snackbar: Snackbar, 
    private _data: Data,
    private _dialog: MatDialog
  ) { }

  public compareTexts() {
    this.result = [];
    switch (this.comparisonMode) {
      case ComparisonMode.LINES:
        this.compareLines();
        break;
      case ComparisonMode.WORDS:
        this.compareWords();
        break;
      default:
        this._snackbar.open('Invalid comparison mode');
        break;
    }
  }

  public reset() {
    this.textLeft = '';
    this.textRight = '';
    this.result = [];
  }

  public isArray(item: any): boolean {
    return Array.isArray(item);
  }

  public openInfo() {
    this._dialog.open(Dialog, {
      data: {
        title: 'Compare Text Information',
        content: [
          'The CompareText application offers two ways to compare text. The Line Comparison method is fast, as it simply checks whether entire lines are identical. This makes it ideal for quick comparisons when only full-line differences matter.', 
          'For a more detailed analysis, the Word Comparison method uses an algorithm based on the Longest Common Subsequence (LCS) concept. This identifies matching sequences and highlights word-level differences, providing deeper insight into how the texts vary.'
        ],
        action: 'OK'
      }
    });
  }

  private compareLines() {
    for (let i = 0; i < Math.max(this.textLeft.split('\n').length, this.textRight.split('\n').length); i++) {
      const sides = [this.textLeft.split('\n')[i] ?? '', this.textRight.split('\n')[i] ?? ''];
      const match: boolean = sides[0] === sides[1];
      this.result.push([{ value: sides[0], bg: match ? '#FED' : '#FCA' }, { value: sides[1], bg: match ? '#DEF' : '#ACF' }]);
    }
  }
  
  private compareWords() {
    for (let i = 0; i < Math.max(this.textLeft.split('\n').length, this.textRight.split('\n').length); i++) {
      const sides = [this.textLeft.split('\n')[i] ?? '', this.textRight.split('\n')[i] ?? ''];
      const match: boolean = sides[0] === sides[1];
      if (match) this.result.push([{ value: sides[0], bg: '#FED' }, { value: sides[1], bg: '#DEF' }]);
      else this.result.push(this.handleLCS(sides[0].split(' '), sides[1].split(' ')));
    }
  }

  private lcs(seq1: string[], seq2: string[]): string[] {
    const [m, n] = [seq1.length, seq2.length];
    const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) {
      if (seq1[i - 1] === seq2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }

    const lcs: string[] = [];
    let i = m, j = n;

    while (i > 0 && j > 0) {
      if (seq1[i - 1] === seq2[j - 1]) {
        lcs.unshift(seq1[i - 1]);
        i--; j--;
      } else if (dp[i - 1][j] >= dp[i][j - 1]) i--;
      else j--;
    }

    return lcs;
  }

  private handleLCS(seq1: string[], seq2: string[]): [CompareTextItem[], CompareTextItem[]] {
    const lcs: string[] = this.lcs(seq1, seq2);
    const [pairs1, pairs2]: [CompareTextItem[], CompareTextItem[]] = [[], []];
    let [i, j, lcsIndex] = [0, 0, 0];

    while (i < seq1.length || j < seq2.length) {
      if (lcsIndex < lcs.length && seq1[i] === lcs[lcsIndex] && seq2[j] === lcs[lcsIndex]) {
        pairs1.push({ value: seq1[i], bg: '#FED' });
        pairs2.push({ value: seq2[j], bg: '#DEF' });
        i++; j++; lcsIndex++;
      } else {
        if (i < seq1.length && (lcsIndex >= lcs.length || seq1[i] !== lcs[lcsIndex])) {
          pairs1.push({ value: seq1[i], bg: '#FCA' });
          pairs2.push({ value: '', bg: '#ACF' });
          i++;
        }
        if (j < seq2.length && (lcsIndex >= lcs.length || seq2[j] !== lcs[lcsIndex])) {
          pairs1.push({ value: '', bg: '#FCA' });
          pairs2.push({ value: seq2[j], bg: '#ACF' });
          j++;
        }
      }
    }
    return [pairs1, pairs2];
  }
}
