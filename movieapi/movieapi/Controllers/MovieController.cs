using movieapi.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace movieapi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class MovieController : ApiController
    {
        private movieapiContext db = new movieapiContext();

        [HttpGet]
        [Route("api/movie/getmustwatch")]
        public IEnumerable<Movie> GetAllMustWatchMovies()
        {
            return db.Movie.Where(x => !x.IsArchived).ToList();
        }

        [HttpGet]
        [Route("api/movie/getarchived")]
        public IEnumerable<Movie> GetAllArchivedMovies()
        {
            return db.Movie.Where(x => x.IsArchived).ToList();
        }

        public IHttpActionResult GetMovie(int id)
        {
            var movie = db.Movie.FirstOrDefault(x => x.MovieId == id);
            if (movie == null)
            {
                return NotFound();
            }

            return Ok(movie);
        }

        [HttpPost]
        public IHttpActionResult PostMovie([FromBody] Movie movie)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Movie.Add(movie);
            db.SaveChanges();

            return Ok();
        }

        [HttpPut]
        [Route("api/movie/setArchived/{imdbid}")]
        public IHttpActionResult SetArchived(string imdbid)
        {

            var updateMovie = db.Movie.FirstOrDefault(x => x.ImdbId==imdbid);
            updateMovie.IsArchived = true;

            db.Entry(updateMovie).State = EntityState.Modified;
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);

        }

        [HttpPut]
        [Route("api/movie/setMustWatch/{imdbid}")]
        public IHttpActionResult SetMustWatch(string imdbid)
        {

            var updateMovie = db.Movie.FirstOrDefault(x => x.ImdbId == imdbid);
            updateMovie.IsArchived = false;

            db.Entry(updateMovie).State = EntityState.Modified;
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);

        }

        [HttpDelete]
        [Route("api/movie/delete/{imdbid}")]
        public IHttpActionResult DeleteMovie(string imdbid)
        {

            var deleteMovie = db.Movie.FirstOrDefault(x => x.ImdbId == imdbid);

            db.Entry(deleteMovie).State = EntityState.Deleted;
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);

        }

    }
}
