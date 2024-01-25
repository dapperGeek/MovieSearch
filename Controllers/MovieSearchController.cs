using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieSearch.Model;
using MovieSearch.Service;
using Newtonsoft.Json;

namespace MovieSearch.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieSearchController : ControllerBase
    {
        private static List<string> lastSearches = new List<string>();

        [HttpGet("/search")]
        public ActionResult<IEnumerable<Movie>> searchMovies([FromQuery] string title)
        {
            // Save the last 5 searches
            lastSearches.Insert(0, title);
            lastSearches = lastSearches.Take(5).ToList();

            // Fetch data from external API
            var apiKey = "fca58acf";
            var apiUrl = $"https://www.omdbapi.com/?t={title}&apikey={apiKey}";
            var response = ExternalApiService.Get(apiUrl);

            // Deserialize the response and return
            //var movies = JsonConvert.DeserializeObject<IEnumerable<Movie>>(response);
            return Ok(response);
        }
    }
}
