using LeagueSearcherBackend.DTO;
using LeagueSearcherBackend.Options;
using Microsoft.Extensions.Options;

namespace LeagueSearcherBackend.Services
{
    public class RiotApiService
    {
        private readonly HttpClient _httpClient;
        private readonly RiotOptions _riotOptions;

        public RiotApiService(IOptions<RiotOptions> riotOptions)
        {
            _riotOptions = riotOptions.Value;

             if (string.IsNullOrEmpty(_riotOptions.APIKey))
            {
                throw new ArgumentException("API Key is missing in the configuration.");
            }
            if (string.IsNullOrEmpty(_riotOptions.BaseUrlSuffix))
            {
                throw new ArgumentException("Base URL suffix is missing in the configuration.");
            }
            if (string.IsNullOrEmpty(_riotOptions.DefaultServer))
            {
                throw new ArgumentException("Default server is missing in the configuration.");
            }

            _httpClient = new HttpClient();

            _httpClient.DefaultRequestHeaders.Add("X-Riot-Token", _riotOptions.APIKey);
        }

        public async Task<Account?> GetPlayerAsync(string region, string gameName, string tagLine)
        {
            if (string.IsNullOrEmpty(gameName) || string.IsNullOrEmpty(tagLine))
            {
                throw new ArgumentException("GameName and TagLine must be provided.");
            }
            
            try
            {
                region = region ?? _riotOptions.DefaultServer;
                var apiURL = $"https://{region}{_riotOptions.BaseUrlSuffix}/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}";
                var response = await _httpClient.GetAsync(apiURL);

                if(!response.IsSuccessStatusCode)
                {
                    return null;
                }

                return await response.Content.ReadFromJsonAsync<Account>();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                return null;
            }
        }
    }
}
