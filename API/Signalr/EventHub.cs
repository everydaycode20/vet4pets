using API.Models;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;

namespace API.Signalr
{
    public class EventHub : Hub
    {
        public async Task SendMessageToCaller(AppointmentDTO appointment)
        {
            await Clients.Caller.SendAsync("ReceiveMessage", JsonConvert.SerializeObject(appointment));
        }
    }
}
