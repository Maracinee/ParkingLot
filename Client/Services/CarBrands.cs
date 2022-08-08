using ParkingLot.Client.Services.Interfaces;
using ParkingLot.Shared.Models;
using System.Net.Http.Json;

namespace ParkingLot.Client.Services
{
    public class CarBrands : ICarBrands
    {
        private readonly HttpClient _client;

        public CarBrands(HttpClient client)
        {
            _client = client;
        }

        public async Task<CarBrand> CreateNewCarBrand(CarBrand request)
        {
            var result = await _client.PostAsJsonAsync("api/CarBrands", request);
            return await result.Content.ReadFromJsonAsync<CarBrand>();
        }

        public async Task<CarBrand> DeleteCarBrandById(int id)
        {
            var result = await _client.DeleteAsync($"api/CarBrands/{id}");
            return await result.Content.ReadFromJsonAsync<CarBrand>();
        }

        public async Task<CarBrand> GetCarBrandById(int id)
        {
            var result = await _client.GetAsync($"api/CarBrands/{id}");
            if (result.StatusCode != System.Net.HttpStatusCode.OK)
            {
                var message = await result.Content.ReadAsStringAsync();
                Console.WriteLine(message);
                return new CarBrand { BrandName = message };
            }
            else
            {
                return await result.Content.ReadFromJsonAsync<CarBrand>();
            }
        }

        public async Task<List<CarBrand>> GetAllCarBrands()
        {
            //return await _client.GetFromJsonAsync<List<CarBrand>>("api/CarBrands");
            HttpResponseMessage response = await _client.GetAsync("GetCarBrands");
            if (response.IsSuccessStatusCode)
            {
                // Only deserialize when we did not have an API failure
                return await response.Content.ReadFromJsonAsync<List<CarBrand>>();
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
