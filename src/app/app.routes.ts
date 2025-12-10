import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { AnsiColors } from './pages/ansi-colors/ansi-colors';

export const routes: Routes = [
    { path: '', component: Dashboard },
    { path: 'ansi-colors', component: AnsiColors }
];