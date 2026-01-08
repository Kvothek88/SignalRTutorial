using Microsoft.AspNetCore.SignalR;

namespace SignalRTutorial.Hubs;

public class UserHub : Hub
{
    public static int TotalViews { get; set; } = 0; // Test
    public static int TotalUsers { get; set; } = 0;

    public override Task OnConnectedAsync()
    {
        TotalUsers++;
        Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        TotalUsers--;
        Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
        return base.OnDisconnectedAsync(exception);
    }

    public async Task<string> NewWindowLoaded(string name, string machine)
    {
        TotalViews++;
        await Clients.All.SendAsync("updateTotalViews", TotalViews);
        return $"total views from {name}'s {machine}: {TotalViews}";
    }
}
