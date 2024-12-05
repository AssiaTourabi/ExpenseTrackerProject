// src/app/budget.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Budget {
  id: number;
  monthlyBudget: number;
  currentTotal: number;
}

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private apiUrl = 'http://localhost:5029/api/budgets';  // URL de votre API

  constructor(private http: HttpClient) {}

  // Récupérer le budget
  getBudget(): Observable<Budget> {
    return this.http.get<Budget>(this.apiUrl);
  }

  // Mettre à jour le budget
  updateBudget(budget: Budget): Observable<void> {
    return this.http.put<void>(this.apiUrl, budget);
  }

  // Supprimer le budget
  deleteBudget(): Observable<void> {
    return this.http.delete<void>(this.apiUrl);
  }
}
