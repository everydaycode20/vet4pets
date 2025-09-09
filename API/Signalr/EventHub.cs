using API.Models;
using Microsoft.AspNetCore.SignalR;

namespace API.Signalr
{
    public class EventHub : Hub
    {
        public async Task SendMessageToCaller(Appointment appointment)
        {
            await Clients.Caller.SendAsync("ReceiveMessage", "salui2");
        }
    }
}
