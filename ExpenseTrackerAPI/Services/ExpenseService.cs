using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using ExpenseTrackerAPI.Models;

namespace ExpenseTrackerAPI.Services
{
    public class ExpenseService : IExpenseService
    {
        private readonly AppDbContext _context;

        public ExpenseService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Expense>> GetAllExpenses()
        {
            return await _context.Expenses.ToListAsync();
        }

        public async Task<Expense?> GetExpenseById(int id)
        {
            return await _context.Expenses.FindAsync(id);
        }

        public async Task AddExpense(Expense expense)
        {
            _context.Expenses.Add(expense);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateExpense(int id, Expense expense)
        {
            var existingExpense = await _context.Expenses.FindAsync(id);
            if (existingExpense == null)
                return false;

            existingExpense.Title = expense.Title;
            existingExpense.Description = expense.Description;
            existingExpense.Amount = expense.Amount;
            existingExpense.Date = expense.Date;
            existingExpense.Hour = expense.Hour;
            existingExpense.Category = expense.Category;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteExpense(int id)
        {
            var expense = await _context.Expenses.FindAsync(id);
            if (expense == null)
                return false;

            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
