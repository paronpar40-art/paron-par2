using Microsoft.AspNetCore.Mvc;
using ArmoredManagement.Domain.Entities;
using System.Collections.Generic;

namespace ArmoredManagement.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class SoldiersController : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<Soldier>> GetSoldiers([FromQuery] string? status)
    {
        var soldiers = new List<Soldier>
        {
            new Soldier { MilitaryNumber = "MIL-10294", Rank = "", FullName = "", UnitCompany = "السرية الأولى مدرعات", Role = "COMMANDER", Status = "PRESENT" },
            new Soldier { MilitaryNumber = "MIL-20481", Rank = "", FullName = "", UnitCompany = "السرية الثانية إمداد", Role = "SUPERVISOR", Status = "DUTY_OFFICER" },
            new Soldier { MilitaryNumber = "MIL-30912", Rank = "", FullName = "", UnitCompany = "سرية القيادة والسيطرة", Role = "SOLDIER", Status = "LEAVE" }
        };

        return Ok(soldiers);
    }

    [HttpGet("{id}")]
    public ActionResult<Soldier> GetById(Guid id)
    {
        return Ok(new Soldier { Id = id, MilitaryNumber = "MIL-10294", Rank = "", FullName = "" });
    }
}
