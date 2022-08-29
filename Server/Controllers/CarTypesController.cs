using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ParkingLot.Server.Data;
using ParkingLot.Shared.Models;

namespace ParkingLot.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarTypesController : ControllerBase
    {
        private readonly ParkingLotContext _context;

        public CarTypesController(ParkingLotContext context)
        {
            _context = context;
        }

        // GET: api/CarTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarType>>> GetCarTypes()
        {
          if (_context.CarTypes == null)
          {
              return NotFound();
          }
            return await _context.CarTypes.ToListAsync();
        }

        // GET: api/CarTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CarType>> GetCarType(int id)
        {
          if (_context.CarTypes == null)
          {
              return NotFound();
          }
            var carType = await _context.CarTypes.FindAsync(id);

            if (carType == null)
            {
                return NotFound();
            }

            return carType;
        }

        // PUT: api/CarTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCarType(int id, CarType carType)
        {
            if (id != carType.IdCarType)
            {
                return BadRequest();
            }

            _context.Entry(carType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarTypeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CarTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CarType>> PostCarType(CarType carType)
        {
          if (_context.CarTypes == null)
          {
              return Problem("Entity set 'ParkingLotContext.CarTypes'  is null.");
          }
            _context.CarTypes.Add(carType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCarType", new { id = carType.IdCarType }, carType);
        }

        // DELETE: api/CarTypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCarType(int id)
        {
            if (_context.CarTypes == null)
            {
                return NotFound();
            }
            var carType = await _context.CarTypes.FindAsync(id);
            if (carType == null)
            {
                return NotFound();
            }

            _context.Procedures.DeleteCarTypesAsync(carType.IdCarType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CarTypeExists(int id)
        {
            return (_context.CarTypes?.Any(e => e.IdCarType == id)).GetValueOrDefault();
        }
    }
}
