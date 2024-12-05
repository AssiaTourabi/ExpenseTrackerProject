using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace ExpenseTrackerAPI.Models
{
    public class Budget
    {

        [Key]
        public int Id { get; set; }

        [Required]
        public decimal MonthlyBudget { get; set; }

        public decimal CurrentTotal { get; set; }
    }
}