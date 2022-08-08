using ParkingLot.Client.Services.Interfaces;
using ParkingLot.Shared.Models;
using System.Net.Http.Json;

namespace ParkingLot.Client.Services
{
    public class CarTypes : ICarTypes
    {
        private readonly HttpClient _client;

        public CarTypes(HttpClient client)
        {
            _client = client;
        }

        public async Task<CarType> CreateNewCarType(CarType request)
        {
            var result = await _client.PostAsJsonAsync("api/CarTypes", request);
            return await result.Content.ReadFromJsonAsync<CarType>();
        }

        public async Task<CarType> DeleteCarTypeById(int id)
        {
            var result = await _client.DeleteAsync($"api/CarTypes/{id}");
            return await result.Content.ReadFromJsonAsync<CarType>();
        }

        public async Task<CarType> GetCarTypeById(int id)
        {
            var result = await _client.GetAsync($"api/CarTypes/{id}");
            if (result.StatusCode != System.Net.HttpStatusCode.OK)
            {
                var message = await result.Content.ReadAsStringAsync();
                Console.WriteLine(message);
                return new CarType { TypeName = message };
            }
            else
            {
                return await result.Content.ReadFromJsonAsync<CarType>();
            }
        }

        public async Task<List<CarType>> GetAllCarTypes()
        {
            //return await _client.GetFromJsonAsync<List<CarType>>("api/CarTypes");
            HttpResponseMessage response = await _client.GetAsync("GetCarTypes");
            if (response.IsSuccessStatusCode)
            {
                // Only deserialize when we did not have an API failure
                return await response.Content.ReadFromJsonAsync<List<CarType>>();
            }
            else
            {
                // Otherwise treat the response as an error message
                string errMsg = await response.Content.ReadAsStringAsync();
                Console.WriteLine(errMsg);
                throw new Exception(errMsg);
            }
        }
    }
}
