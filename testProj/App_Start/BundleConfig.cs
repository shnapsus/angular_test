using System.Web.Optimization;

namespace testProj
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/css").Include("~/css/bootstrap.css", "~/css/main.css"));
            bundles.Add(new ScriptBundle("~/js")
                .Include("~/libraries/angular/angular.js", "~/libraries/bootstrap/ui-bootstrap-tpls-0.12.0.js")
                .IncludeDirectory("~/ng-test-app/", "*.js", true));

            BundleTable.EnableOptimizations = false;
        }
    }
}