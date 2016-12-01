using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Shiners.WebApp.Util
{
    public class StreamResult : ActionResult
    {
        private Stream stream;

        public StreamResult(Stream stream)
        {
            this.stream = stream;
        }

        public async override Task ExecuteResultAsync(ActionContext actionContext)
        {
            HttpResponse httpResponse = actionContext.HttpContext.Response;

            await this.stream.CopyToAsync(httpResponse.Body);
        }
    }
}
