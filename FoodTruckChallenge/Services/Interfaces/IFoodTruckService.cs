public interface IFoodTruckService
{
    Task<IEnumerable<FoodTruckDto>> GetAllAsync();
}