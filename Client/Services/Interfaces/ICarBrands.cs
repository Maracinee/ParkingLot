using ParkingLot.Shared.Models;

namespace ParkingLot.Client.Services.Interfaces
{
    public interface ICarBrands
    {
        Task<List<CarBrand>> GetAllCarBrands();
        Task<CarBrand> GetCarBrandById(int id);
        Task<CarBrand> CreateNewCarBrand(CarBrand carBrand);
        Task<CarBrand> DeleteCarBrandById(int id);
    }
}
