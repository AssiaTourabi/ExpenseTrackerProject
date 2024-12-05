using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ExpenseTrackerAPI.Models;

namespace ExpenseTrackerAPI.Services
{
    public class BudgetService : IBudgetService
    {
        private readonly AppDbContext _context;

        public BudgetService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Budget?> GetBudget()
        {
            return await _context.Budgets.FirstOrDefaultAsync();
        }

        public async Task<bool> UpdateBudget(Budget budget)
        {
            var existingBudget = await _context.Budgets.FindAsync(budget.Id);
            if (existingBudget == null)
                return false;

            existingBudget.MonthlyBudget = budget.MonthlyBudget;
            existingBudget.CurrentTotal = budget.CurrentTotal;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Budget> CreateBudget(Budget budget)
        {
            _context.Budgets.Add(budget);
            await _context.SaveChangesAsync();
            return budget;
        }

        public async Task<bool> DeleteBudget(int id)
        {
            var budget = await _context.Budgets.FindAsync(id);
            if (budget == null)
                return false;

            _context.Budgets.Remove(budget);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
