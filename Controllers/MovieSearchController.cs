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
        public ActionResult<IEnumerable<Movie>> searchMovies([FromQuery] string title, [FromQuery] string page)
        {
            // Save the last 5 searches
            lastSearches.Insert(0, title);
            lastSearches = lastSearches.Take(5).ToList();

            // Fetch data from external API
            var apiKey = "fca58acf";
            var baseUrl = "https://www.omdbapi.com/";
            var apiUrl = $"{baseUrl}?apikey={apiKey}&s={title}&type=movie&page={page}";
            var response = new ExternalApiService().Get(apiUrl);

            // Deserialize the response into SearchResponse object
            var searchResponse = JsonConvert.DeserializeObject<SearchResponse>(response);

            return Ok(searchResponse);

            //// Deserialize the response into a single Movie object
            //var movie = JsonConvert.DeserializeObject<Movie>(response);

            //// Return a single-item list
            //return Ok(new List<Movie> { movie });
        }

        [HttpGet("lastSearches")]
        public ActionResult<IEnumerable<string>> GetLastSearches()
        {
            return Ok(lastSearches);
        }
    }
    public class SearchResponse
    {
        public List<Movie> Search { get; set; }
        public string TotalResults { get; set; }
        public string Response { get; set; }
    }
}
