using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Shiners.WebApp.Util
{
    public class UnderscoreActionResult:IActionResult
    {
        protected string Layout { get; set; }
        protected string RazorCOntainer { get; set; }

        public UnderscoreActionResult(string viewPath,object data)
        {
            
        }

        public Task ExecuteResultAsync(ActionContext context)
        {



            return Task.FromResult<int>(0);
        }
    }
}
