using Microsoft.AspNetCore.SignalR;

namespace SignalRTutorial.Hubs;

public class NotificationsHub : Hub
{
    public static List<string> Messages = [];

    public async Task SendMessage(string message)
    {
        Messages.Add(message);
        await Clients.All.SendAsync("receiveMessages", Messages);
    }

    public async Task NewWindowLoaded()
    {
        await Clients.All.SendAsync("receiveMessages", Messages);
    }
}
