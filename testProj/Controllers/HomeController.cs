using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace testProj.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

            return View();
        }

        private static List<Letter> _lettersList = new List<Letter>
        {
            new Letter {name = "A", value = 1, other = "asdf asdf5 y56yrt iu yf "},
            new Letter {name = "B", value = 2, other = "sda fasd f"},
            new Letter {name = "C", value = 3, other = "faksdhhg  fds "},
            new Letter {name = "D", value = 4, other = "fa udhf akusd jd"}
        };

        [HttpGet]
        public JsonResult GetList()
        {
            return Json(_lettersList, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetLetter(string id)
        {
            return Json(_lettersList.FirstOrDefault(l => l.name == id), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveLetter(Letter letter)
        {
            _lettersList.Add(letter);
            return new JsonResult();
        }

        [HttpDelete]
        public JsonResult DeleteLetter(string name)
        {
            var letter = _lettersList.FirstOrDefault(l => l.name == name);
            if (letter != null)
                _lettersList.Remove(letter);
            return new JsonResult();
        }
    }

    public class Letter
    {
        public string name { get; set; }
        public int value { get; set; }
        public string other { get; set; }



        public override bool Equals(object obj)
        {
            return Equals((Letter)obj);
        }

        protected bool Equals(Letter that)
        {
            return string.Equals(name, that.name) && value == that.value && string.Equals(other, that.other);
        }

        public override int GetHashCode()
        {
            unchecked
            {
                var hashCode = (name != null ? name.GetHashCode() : 0);
                hashCode = (hashCode*397) ^ value;
                hashCode = (hashCode*397) ^ (other != null ? other.GetHashCode() : 0);
                return hashCode;
            }
        }
    }
}
