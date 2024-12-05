import { Routes } from '@angular/router';
import { BudgetComponent } from './budget/budget.component';
import { HelloComponent } from './hello/hello.component';
import { ExpenseComponent } from './expense/expense.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'budget', component: BudgetComponent },
  { path: 'expense', component: ExpenseComponent },
  { path: 'dash', component: DashboardComponent },
];
