using System.Threading.Tasks;
using ExpenseTrackerAPI.Models;
using ExpenseTrackerAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BudgetsController : ControllerBase
    {
        private readonly IBudgetService _budgetService;

        public BudgetsController(IBudgetService budgetService)
        {
            _budgetService = budgetService;
        }


        [HttpGet]
        public async Task<IActionResult> GetBudget()
        {
            var budget = await _budgetService.GetBudget();
            if (budget == null)
                return NotFound("Budget not found.");

            return Ok(budget);
        }


        [HttpPost]
        public async Task<IActionResult> CreateBudget([FromBody] Budget budget)
        {
            if (budget == null)
                return BadRequest("Invalid budget data.");

            var createdBudget = await _budgetService.CreateBudget(budget);
            return CreatedAtAction(nameof(GetBudget), new { id = createdBudget.Id }, createdBudget);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateBudget([FromBody] Budget budget)
        {
            if (budget == null)
                return BadRequest("Invalid budget data.");

            var updated = await _budgetService.UpdateBudget(budget);
            if (!updated)
                return NotFound("Budget not found.");

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBudget(int id)
        {
            var deleted = await _budgetService.DeleteBudget(id);
            if (!deleted)
                return NotFound("Budget not found.");

            return NoContent();
        }
    }
}
