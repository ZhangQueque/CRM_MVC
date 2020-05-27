using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using BT.MVC.Models;
using System.Net.Http;
using AspNetCore.Http.Extensions;

namespace BT.MVC.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly HttpClient httpClient;
        public HomeController(ILogger<HomeController> logger, IHttpClientFactory httpClientFactory)
        {
            _logger = logger;
            this.httpClient = httpClientFactory.CreateClient("api");
        }

        /// <summary>
        /// 首页
        /// </summary>
        /// <param name="active">激活名</param>
        /// <param name="inverted">统计图的</param>
        /// <param name="polar">统计图的</param>
        /// <returns></returns>
        public IActionResult Index(string active = "仪表盘", bool inverted = false, bool polar = false)
        {
            ViewBag.Active = active;
            ViewBag.Inverted = inverted;
            ViewBag.Polar = polar;
            var token = Request.Cookies["token"];
            if (token == null)
            {
                return RedirectToAction("Login");
            }

            if (token == "null")
            {
                return RedirectToAction("Login");
            }
            return View();
        }

        public IActionResult Login()
        {
            return View();
        }


        /// <summary>
        /// 潜在客户页面
        /// </summary>
        /// <param name="active"></param>
        /// <returns></returns>
        public IActionResult NewCustomer(string active)
        {
            ViewBag.Active = active;
            var token = Request.Cookies["token"];
            if (token == null)
            {
                return RedirectToAction("Login");
            }

            if (token == "null")
            {
                return RedirectToAction("Login");
            }
            return View();
        }


        /// <summary>
        /// 客户修改页面
        /// </summary>
        /// <param name="customerID"></param>
        /// <returns></returns>
        public async Task<IActionResult> CustomerEdit(string customerID)
        {
            ViewBag.CustomerID = customerID;
            var token = Request.Cookies["token"];
            if (token == null)
            {
                return RedirectToAction("Login");
            }

            if (token == "null")
            {
                return RedirectToAction("Login");
            }
            Customers customers = new Customers();
            httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer",token);
            var response =await httpClient.GetAsync($"/api/customers/{customerID}");

            if (response.IsSuccessStatusCode)
            {
                customers =await response.Content.ReadAsJsonAsync<Customers>();
            }
            return View(customers);
        }

        

        /// <summary>
        /// 客户页面
        /// </summary>
        /// <param name="active"></param>
        /// <returns></returns>
        public IActionResult Customer(string active)
        {
            ViewBag.Active = active;
            var token = Request.Cookies["token"];
            if (token == null)
            {
                return RedirectToAction("Login");
            }

            if (token == "null")
            {
                return RedirectToAction("Login");
            }
            return View();
        }


        /// <summary>
        /// 权限页面（张浩东）
        /// </summary>
        /// <param name="active"></param>
        /// <returns></returns>
        public IActionResult Permission(string active)
        {
            ViewBag.Active = active;
            var token = Request.Cookies["token"];
            if (token == null)
            {
                return RedirectToAction("Login");
            }

            if (token == "null")
            {
                return RedirectToAction("Login");
            }
            return View();
        }




        #region 周洁
        /// <summary>
        /// 添加员工
        /// </summary>
        /// <param name="active"></param>
        /// <returns></returns>
        public IActionResult AddEmployee(string active)
        {
            ViewBag.Active = active;
            var token = Request.Cookies["token"];
            if (token == null)
            {
                return RedirectToAction("Login");
            }

            if (token == "null")
            {
                return RedirectToAction("Login");
            }
            return View();
        }



        /// <summary>
        /// 所有员工
        /// </summary>
        /// <param name="active"></param>
        /// <returns></returns>
        public IActionResult Employees(string active)
        {
            ViewBag.Active = active;
            var token = Request.Cookies["token"];
            if (token == null)
            {
                return RedirectToAction("Login");
            }

            if (token == "null")
            {
                return RedirectToAction("Login");
            }
            return View();
        }
        #endregion



        #region 高紫健

        /// <summary>
        /// 角色分配
        /// </summary>
        /// <param name="active"></param>
        /// <returns></returns>
        public IActionResult Employees_Roles(string active)
        {
            ViewBag.Active = active;
            var token = Request.Cookies["token"];
            if (token == null)
            {
                return RedirectToAction("Login");
            }

            if (token == "null")
            {
                return RedirectToAction("Login");
            }
            return View();
        }
        #endregion




        #region 范耀辉
        /// <summary>
        /// 角色 
        /// </summary>
        /// <param name="active"></param>
        /// <returns></returns>
        public IActionResult Roles(string active)
        {
            ViewBag.Active = active;
            var token = Request.Cookies["token"];
            if (token == null)
            {
                return RedirectToAction("Login");
            }

            if (token == "null")
            {
                return RedirectToAction("Login");
            }
            return View();
        }
        #endregion





        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
