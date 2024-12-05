using System.Threading.Tasks;
using ExpenseTrackerAPI.Models;

namespace ExpenseTrackerAPI.Services
{
    public interface IBudgetService
    {
        Task<Budget?> GetBudget();
        Task<bool> UpdateBudget(Budget budget);
        Task<Budget> CreateBudget(Budget budget);
        Task<bool> DeleteBudget(int id);
    }
}
