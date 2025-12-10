import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { AnsiColors } from './pages/ansi-colors/ansi-colors';
import { CompareText } from './pages/compare-text/compare-text';

export const routes: Routes = [
    { path: '', component: Dashboard },
    { path: 'ansi-colors', component: AnsiColors },
    { path: 'compare-text', component: CompareText }
];