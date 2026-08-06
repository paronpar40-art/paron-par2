namespace ArmoredManagement.Domain.Entities;

public class ArmoredVehicle
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string VehicleCode { get; set; } = string.Empty;
    public string VehicleType { get; set; } = string.Empty;
    public string Model { get; set; } = string.Empty;
    public string ReadinessStatus { get; set; } = "OPERATIONAL";
    public int FuelLevel { get; set; } = 100;
    public string AmmoStatus { get; set; } = "FULL";
    public DateTime? LastMaintenanceDate { get; set; }
}
