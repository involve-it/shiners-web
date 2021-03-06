﻿using Jurassic;
using Jurassic.Library;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Shiners.WebApp.Renderers
{
    public class UnderscoreRenderer
    {

        protected ScriptEngine Engine { get; private set; }
        protected IDictionary<string, UserDefinedFunction> CompiledTemplates { get; private set; }
        public delegate string RenderDelegate(params object[] args);

        private string _render(params object[] args)
        {
            string path = args[0].ToString();
            object data = args.Length > 1 && args[1] != null && !(args[1] is Jurassic.Null)&&!(args[1] is Jurassic.Undefined) ? args[1] : null;
            string tagName = args.Length > 2? (args[2] != null && !(args[2] is Jurassic.Null) && !(args[2] is Jurassic.Undefined) ? args[2].ToString():null) : "div";
            string htmlAttrs = args.Length > 3 && args[3] != null ? args[3].ToString() : null;

            var result = data != null ? CompiledTemplates[path].Call(Engine.Global, data) : CompiledTemplates[path].Call(Engine.Global);
            if (tagName != null)
                result = "<" + tagName+ (htmlAttrs != null?" "+ htmlAttrs : null) + ">" + result + "</" + tagName + ">";
            return result.ToString();
        }

        private string _renderCollection(params object[] args)
        {
            string path = args[0].ToString();
            ObjectInstance data = args.Length > 1 && args[1] != null ? args[1] as ObjectInstance : null;
            string tagName = args.Length > 2 ? (args[2] != null ? args[2].ToString() : null) : "div";
            string htmlAttrs = args.Length > 3 && args[3] != null ? args[3].ToString() : null;
            var collection = data?["items"] as ArrayInstance;
            var itemTagName = (data?["tagName"] as string)??"li";
            var itemHtmlAttrs = data?["attrs"] as string;
            string result = "";
            foreach (var model in (collection?.ElementValues)??new List<object>())
            {
                data["model"] = model;
                result += "<" + itemTagName + (itemHtmlAttrs != null ? " " + itemHtmlAttrs : null) + ">" + CompiledTemplates[path].Call(Engine.Global, data) + "</" + itemTagName + ">";
            }
            return tagName != null ? "<" + tagName + (htmlAttrs != null ? " " + htmlAttrs : null) + ">" + result + "</" + tagName + ">" : result;
        }
        public UnderscoreRenderer(string root,params string[] entryPoints)
        {         
            CompiledTemplates = new Dictionary<string, UserDefinedFunction>();
            Engine = new ScriptEngine();
            Engine.ExecuteFile(Path.Combine(root, "./lib/underscore/underscore-min.js"));
            Engine.ExecuteFile(Path.Combine(root,"./lib/moment/moment-with-locales.min.js"));
            Engine.ExecuteFile( Path.Combine(root,"./serverRenderConfig.js"));
            //Engine.SetGlobalValue("isServer",true);
            Engine.SetGlobalFunction("serverRender", new RenderDelegate(_render));
            Engine.SetGlobalFunction("serverRenderCollection", new RenderDelegate(_renderCollection));
            var _ = Engine.GetGlobalValue<ObjectInstance>("_");
            foreach (var dirPath in entryPoints)
            {
                DirectoryInfo dir = new DirectoryInfo(Path.Combine(root, dirPath));
                foreach (FileInfo file in dir.GetFiles("*.html", SearchOption.AllDirectories))
                {
                    string key = Util.VirtualPath.GetVirtualPath(root, file.FullName);
                    string fileContent = File.ReadAllText(file.FullName).Replace("\r\n","");
                    UserDefinedFunction tmpl = _.CallMemberFunction("template", fileContent) as UserDefinedFunction;
                    CompiledTemplates.Add(key, tmpl);
                }
            }
        }

        public string Render(string template, object data,string tagName=null,string htmlAttrs=null)
        {            
            var jObj = "(" + GetViewData(data) + ")";
            return Engine.CallGlobalFunction<string>("serverRender", template, Engine.Evaluate<ObjectInstance>(jObj), tagName, htmlAttrs);
        }

        public JObject GetViewData(object attributes)
        {
            if(attributes is JObject || attributes is JToken)
                return attributes as JObject;
            var jobject = new JObject();
            object value;
            if (attributes != null)
                foreach (var prop in attributes.GetType().GetProperties())
                {
                    value = prop.GetValue(attributes);
                    if (value != null)
                        jobject.Add(prop.Name, JToken.FromObject(value));
                }
            return attributes != null ? jobject : null;
        }
    }
}
