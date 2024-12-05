import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ExpenseService, Expense } from '../expense.service';
import { BudgetService, Budget } from '../budget.service';
import { SideBarComponent } from '../side-bar/side-bar.component';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, HttpClientTestingModule, SideBarComponent],
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
})
export class ExpenseComponent implements OnInit {
  expenses: Expense[] = [];
  totalExpenses: number = 0;
  monthlyBudget: number = 0;
  notification: string | null = null;
  diffenceBudget: string | null = null;
  currentTotal: number = 0;
  remainingBudget: number = 0;
  progressBarWidth: number = 0;
  newExpense: Expense = {
    title: '',
    description: '',
    amount: 0,
    date: new Date(),
    hour: '00:00:00',
    category: '',
  };
  editExpense: Expense | null = null;
  isEditing = false;

  categories = ['Food', 'Transport', 'Health', 'Entertainment', 'Other'];
  customCategory: string = '';

  isFormVisible: boolean = false;

  constructor(private expenseService: ExpenseService, private budgetService: BudgetService) {}

  ngOnInit(): void {
    this.loadExpenses();
    this.loadBudget();
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  addExpense(): void {

    if (this.newExpense.category === 'Other' && this.customCategory.trim() !== '') {
      this.newExpense.category = this.customCategory;
    }

    const formattedExpense: Expense = {
      ...this.newExpense,
      date: this.newExpense.date instanceof Date
        ? this.newExpense.date.toISOString().split('T')[0]
        : this.newExpense.date,
      hour: this.newExpense.hour,
    };

    this.expenseService.addExpense(formattedExpense).subscribe({
      next: (response) => {
        console.log('Expense added successfully', response);
        this.loadExpenses();
        this.resetForm();
      },
      error: (err) => {
        console.error('Error adding expense', err);
      },
    });
  }

  resetForm(): void {
    this.newExpense = {
      title: '',
      description: '',
      amount: 0,
      date: new Date(),
      hour: '00:00:00',
      category: '',
    };
  }

  startEditing(expense: Expense): void {
    this.editExpense = { ...expense };
    this.isEditing = true;
  }

  updateExpense(): void {
    if (this.editExpense) {
      const formattedExpense = {
        ...this.editExpense,
        date: this.editExpense.date instanceof Date
          ? this.editExpense.date.toISOString().split('T')[0]
          : this.editExpense.date,
        hour: this.editExpense.hour,
      };

      this.expenseService.updateExpense(formattedExpense.id!, formattedExpense).subscribe(() => {
        this.editExpense = null;
        this.isEditing = false;
        this.loadExpenses();
      });
    }
  }

  deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id).subscribe(() => {
      this.loadExpenses();
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editExpense = null;
  }

  loadBudget(): void {
    this.budgetService.getBudget().subscribe({
      next: (budget) => {
        this.monthlyBudget = budget.monthlyBudget;
        this.remainingBudget = this.monthlyBudget - this.totalExpenses;
        this.checkBudgetExceedance();
        this.calculateProgressBar();
      },
      error: (err) => {
        console.error('Error loading budget', err);
      },
    });
  }

  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe({
      next: (data) => {
        this.expenses = data;
        this.totalExpenses = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
        this.remainingBudget = this.monthlyBudget - this.totalExpenses;
        this.checkBudgetExceedance();
        this.calculateProgressBar();
      },
      error: (err) => {
        console.error('Error loading expenses', err);
      },
    });
  }

  checkBudgetExceedance(): void {
    const diffenceBudget = this.monthlyBudget - this.totalExpenses;
    if (this.monthlyBudget > 0 && this.totalExpenses > this.monthlyBudget) {
      this.notification = `Warning: You have exceeded your monthly budget by ${diffenceBudget}!`;
    } else {
      this.notification = null;
    }
  }

  calculateProgressBar(): void {
    const progress = (this.totalExpenses / this.monthlyBudget) * 100;
    this.progressBarWidth = progress > 100 ? 100 : progress;
  }
}
