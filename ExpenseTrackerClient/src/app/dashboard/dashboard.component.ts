import { Component, OnInit } from '@angular/core';
import { ExpenseService, Expense } from '../expense.service';
import { ChartOptions, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  expenses: Expense[] = [];
  expenseCategories: { [key: string]: number } = {};
  chartLabels: string[] = [];
  chartData: number[] = [];
  chartType: ChartType = 'pie';
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: $${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe((expenses) => {
      this.expenses = expenses;
      this.categorizeExpenses();
      this.prepareChartData();
    });
  }

  categorizeExpenses(): void {
    this.expenseCategories = {};
    this.expenses.forEach((expense) => {
      if (this.expenseCategories[expense.category]) {
        this.expenseCategories[expense.category] += expense.amount;
      } else {
        this.expenseCategories[expense.category] = expense.amount;
      }
    });
  }

  prepareChartData(): void {
    this.chartLabels = Object.keys(this.expenseCategories);
    this.chartData = Object.values(this.expenseCategories);
  }
}
