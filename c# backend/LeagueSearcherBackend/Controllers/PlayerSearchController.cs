using LeagueSearcherBackend.DTO;
using LeagueSearcherBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace LeagueSearcherBackend.Controllers
{
    public class PlayerSearchController : Controller
    {
        private readonly RiotService _riotService;
        public PlayerSearchController(RiotService riotService)
        {
            _riotService = riotService;
        }

        [HttpGet]
        [Route("/api/riot/player/{region}/{gameName}/{tagLine}")]
        public async Task<Account?> GetPlayer(string region, string gameName, string tagLine)
        {
            return await _riotService.FindPlayerAsync(region, gameName, tagLine);
        }
    }
}
