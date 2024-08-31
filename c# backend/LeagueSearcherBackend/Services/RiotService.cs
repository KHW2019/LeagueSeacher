using LeagueSearcherBackend.DTO;
using LeagueSearcherBackend.Options;
using Microsoft.Extensions.Options;

namespace LeagueSearcherBackend.Services
{
    public class RiotService
    {
        private readonly RiotOptions _riotOptions;
        private readonly HttpClient _httpClient;
        public RiotService(IOptions<RiotOptions> riotOptions)
        {
            _riotOptions = riotOptions.Value;
            _httpClient = new HttpClient();
            _httpClient.DefaultRequestHeaders.Add("X-Riot-Token", _riotOptions.APIKey);
        }

        public async Task<Account?> FindPlayerAsync(string region, string gameName, string tagLine)
        {
            try
            {
                region = region ?? _riotOptions.DefaultServer;
                var apiURL = $"https://{region}{_riotOptions.BaseUrlSuffix}/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}";
                var test = await _httpClient.GetAsync(apiURL);
                return await test.Content.ReadFromJsonAsync<Account>();
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
