using Microsoft.AspNetCore.Mvc;
using LeagueSearcherBackend.Services;
using LeagueSearcherBackend.DTO;

namespace LeagueSearcherBackend.Controllers
{
    public class PlayerController : ControllerBase
    {
        private readonly RiotApiService _riotApiService;

        public PlayerController(RiotApiService riotApiService)
        {
            _riotApiService = riotApiService;
        }

        [HttpGet]
        [Route("/api/riot/player/{region}/{playerName}/{tagLine}")]
        public async Task<Account?> GetPlayer(string region, string playerName, string tagLine)
        {
           return await _riotApiService.GetPlayerAsync(region, playerName, tagLine);
        }
    }
}
