using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;

namespace API.Signalr
{
    [Authorize]
    public class EventHub : Hub
    {
       
    }
}
