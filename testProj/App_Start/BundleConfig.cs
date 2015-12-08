using System;
using System.Web.Optimization;

namespace testProj
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();
            SetIgnorePatterns(bundles.IgnoreList);

            bundles.Add(new StyleBundle("~/css").Include("~/css/bootstrap.css", "~/css/main.css"));
            bundles.Add(new ScriptBundle("~/js")
                .Include(
                    "~/libraries/angular/angular.js", 
                    "~/libraries/angular/angular-route.js", 
                    "~/libraries/bootstrap/ui-bootstrap-tpls-0.12.0.js")
                .IncludeDirectory("~/ng-test-app/", "*.js", true));

            BundleTable.EnableOptimizations = false;
        }

        private static void SetIgnorePatterns(IgnoreList ignoreList)
        {
            if (ignoreList == null)
                throw new ArgumentNullException("ignoreList");

            ignoreList.Ignore("*-tests.js");
            ignoreList.Ignore("*.intellisense.js");
            ignoreList.Ignore("*-vsdoc.js");
            ignoreList.Ignore("*.debug.js", OptimizationMode.WhenEnabled);
            ignoreList.Ignore("*.min.js", OptimizationMode.WhenDisabled);
            ignoreList.Ignore("*.min.css", OptimizationMode.WhenDisabled);
        }
    }
}