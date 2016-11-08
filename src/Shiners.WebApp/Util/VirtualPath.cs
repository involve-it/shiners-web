using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shiners.WebApp.Util
{
    public static class VirtualPath
    {
        public static string GetVirtualPath(string rootPath, string physicalPath)
        {
            var path = physicalPath.Replace(rootPath, "");
            path = path.Replace("\\", "/");
            return "~" + path;
        }
    }
}
