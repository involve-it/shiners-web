using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace Shiners.WebApp.Controllers
{
    public class LegalController : Controller
    {
        [Route("[controller]/user-agreement")]
        public IActionResult UserAgreement()
        {
            return View("../Home/Index");
        }

        [Route("[controller]/Confidential")]
        public IActionResult Confidential()
        {
            return View("../Home/Index");
        }

        [Route("[controller]/post-publishing-rules")]
        public IActionResult PostPublishingRules()
        {
            return View("../Home/Index");
        }
    }
}
