using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace movieapi.Models
{
    public class Movie
    {
        public int MovieId { get; set; }
        public string ImdbId { get; set; }
        public string Title { get; set; }
        public string Year { get; set; }
        public string Runtime { get; set; }
        public string Genre { get; set; }
        public string Plot { get; set; }
        public bool IsArchived { get; set; }

    }
}