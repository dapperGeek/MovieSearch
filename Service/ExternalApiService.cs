namespace MovieSearch.Service
{
    using System.Net.Http;
    using System.Threading.Tasks;

    public class ExternalApiService
    {
        public static string Get(string apiUrl)
        {
            using (var httpClient = new HttpClient())
            {
                var response = httpClient.GetStringAsync(apiUrl).Result;
                return response;
            }
        }
    }
}
