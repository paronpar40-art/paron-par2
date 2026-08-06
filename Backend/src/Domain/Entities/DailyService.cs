namespace ArmoredManagement.Domain.Entities;

public class DailyService
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime ServiceDate { get; set; }
    public Guid DutyOfficerId { get; set; }
    public Guid AssistantDutyOfficerId { get; set; }
    public Guid GateGuardCommanderId { get; set; }
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
