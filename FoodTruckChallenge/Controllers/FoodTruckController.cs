using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class FoodTrucksController : ControllerBase
{
    private readonly IFoodTruckService _service;

    public FoodTrucksController(IFoodTruckService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var trucks = await _service.GetAllAsync();
        return Ok(trucks);
    }
}