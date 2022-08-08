using Blazored.Localisation;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using MudBlazor.Services;
using ParkingLot.Client;
using ParkingLot.Client.Services;
using ParkingLot.Client.Services.Interfaces;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri("https://localhost:7135/api/") });
builder.Services.AddScoped<ICarBrands, CarBrands>();
builder.Services.AddScoped<ICarTypes,CarTypes>();
builder.Services.AddMudServices();
builder.Services.AddBlazoredLocalisation();

await builder.Build().RunAsync();
