using ParkingLot.Shared.Models;

namespace ParkingLot.Client.Services.Interfaces
{
    public interface ICarTypes
    {
        Task<List<CarType>> GetAllCarTypes();
        Task<CarType> GetCarTypeById(int id);
        Task<CarType> CreateNewCarType(CarType carBrand);
        Task<CarType> DeleteCarTypeById(int id);
    }
}
