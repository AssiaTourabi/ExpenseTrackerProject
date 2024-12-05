import { Component, OnInit } from '@angular/core';
import { BudgetService, Budget } from '../budget.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SideBarComponent } from '../side-bar/side-bar.component';



@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule,HttpClientTestingModule,SideBarComponent],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})
export class BudgetComponent implements OnInit{

  budget: Budget | null = null;
  errorMessage: string = '';


  monthlyBudget: number = 0;
  currentTotal: number = 0;

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.loadBudget();
  }

  loadBudget(): void {
    this.budgetService.getBudget().subscribe(
      (data) => {
        this.budget = data;
        this.monthlyBudget = data.monthlyBudget;
        this.currentTotal = data.currentTotal;
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la récupération du budget.';
      }
    );
  }


  onDelete(): void {
    this.budgetService.deleteBudget().subscribe(
      () => {
        this.budget = null;
        this.errorMessage = 'Budget supprimé.';
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la suppression du budget.';
      }
    );
  }

  onSave(): void {
    if (this.budget) {
      const updatedBudget = {
        ...this.budget,
        monthlyBudget: this.monthlyBudget,
        currentTotal: this.currentTotal
      };

      this.budgetService.updateBudget(updatedBudget).subscribe(
        () => {
          this.loadBudget();
        },
        (error) => {
          this.errorMessage = 'Erreur lors de la mise à jour du budget.';
        }
      );
  }


}

isFormVisible: boolean = false;

toggleForm(): void {
  this.isFormVisible = !this.isFormVisible;
}

}
