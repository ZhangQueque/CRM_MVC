using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BT.MVC.Models
{
    public class Roles
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int IsDel { get; set; }

        public int CreateID { get; set; }

        public string CreateTime { get; set; }
    }
}
