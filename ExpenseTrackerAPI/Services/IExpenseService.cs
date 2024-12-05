using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using ExpenseTrackerAPI.Models;

namespace ExpenseTrackerAPI.Services
{
    public interface IExpenseService
    {
        Task<IEnumerable<Expense>> GetAllExpenses();
        Task<Expense> GetExpenseById(int id);
        Task AddExpense(Expense expense);
        Task<bool> UpdateExpense(int id, Expense expense);
        Task<bool> DeleteExpense(int id);
    }
}
