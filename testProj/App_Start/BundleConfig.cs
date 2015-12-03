using System.Web;
using System.Web.Optimization;

namespace testProj
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {

            StyleBundle appStyles = new StyleBundle("~/css");
            appStyles.Include(
                "~/css/bootstrap.css",
                "~/css/main.css");
            bundles.Add(appStyles);

            ScriptBundle appScripts = new ScriptBundle("~/js");
            appScripts.Include(
                "~/libraries/jquery/jquery-2.1.1.js",
                "~/libraries/angular/angular.js",
                "~/libraries/angular/angular-route.js",
                "~/libraries/angular/angular-sanitize.js",
                "~/libraries/angular/angular-touch.js",
                "~/libraries/bootstrap/ui-bootstrap-tpls-0.12.0.js",
                "~/app/common/directives/tri-select/tri-select.js",
                "~/app/app.js",
                "~/app/common/directives/loader.js",
                "~/app/common/factories/httpInterceptor.js",
                "~/app/common/factories/requestExecuter.js",
                "~/app/config/appConfig.js",
                "~/app/config/providers.js",
                "~/app/config/routes.js",
                "~/app/modules/index/indexController.js");
            bundles.Add(appScripts);

            BundleTable.EnableOptimizations = false;

        }
    }
}