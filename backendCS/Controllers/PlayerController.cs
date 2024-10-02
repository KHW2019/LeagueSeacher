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
        public async Task<ActionResult<Account?>> GetPlayer(string region, string playerName, string tagLine)
        {
            if (string.IsNullOrEmpty(playerName) || string.IsNullOrEmpty(tagLine))
            {
                return BadRequest("PlayerName and TagLine are required.");
            }

           var player =  await _riotApiService.GetPlayerAsync(region, playerName, tagLine);
           if(player == null)
           {
             return NotFound();
           }
           
           return Ok(player);
        }
    }
}
