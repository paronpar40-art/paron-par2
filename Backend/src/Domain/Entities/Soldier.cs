namespace ArmoredManagement.Domain.Entities;

public class Soldier
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string MilitaryNumber { get; set; } = string.Empty;
    public string Rank { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string UnitCompany { get; set; } = string.Empty;
    public string? Platoon { get; set; }
    public string Status { get; set; } = "PRESENT";
    public string Role { get; set; } = "SOLDIER";
    public string? PhoneNumber { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
