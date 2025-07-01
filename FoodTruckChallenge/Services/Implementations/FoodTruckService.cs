using System.Text.Json;

public class FoodTruckService : IFoodTruckService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public FoodTruckService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }

    public async Task<IEnumerable<FoodTruckDto>> GetAllAsync()
    {
        var url = _configuration["FoodTruckApi:BaseUrl"];
        var response = await _httpClient.GetAsync(url);

        if (!response.IsSuccessStatusCode)
            throw new ApplicationException("Error fetching food truck data.");

        var content = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<List<FoodTruckDto>>(content, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        }) ?? new List<FoodTruckDto>();
    }
}