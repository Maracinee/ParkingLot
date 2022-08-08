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
    public class GatesController : ControllerBase
    {
        private readonly ParkingLotContext _context;

        public GatesController(ParkingLotContext context)
        {
            _context = context;
        }

        // GET: api/Gates
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Gate>>> GetGates()
        {
          if (_context.Gates == null)
          {
              return NotFound();
          }
            return await _context.Gates.ToListAsync();
        }

        // GET: api/Gates/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Gate>> GetGate(int id)
        {
          if (_context.Gates == null)
          {
              return NotFound();
          }
            var gate = await _context.Gates.FindAsync(id);

            if (gate == null)
            {
                return NotFound();
            }

            return gate;
        }

        // PUT: api/Gates/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGate(int id, Gate gate)
        {
            if (id != gate.IdGate)
            {
                return BadRequest();
            }

            _context.Entry(gate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GateExists(id))
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

        // POST: api/Gates
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Gate>> PostGate(Gate gate)
        {
          if (_context.Gates == null)
          {
              return Problem("Entity set 'ParkingLotContext.Gates'  is null.");
          }
            _context.Gates.Add(gate);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGate", new { id = gate.IdGate }, gate);
        }

        // DELETE: api/Gates/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGate(int id)
        {
            if (_context.Gates == null)
            {
                return NotFound();
            }
            var gate = await _context.Gates.FindAsync(id);
            if (gate == null)
            {
                return NotFound();
            }

            _context.Gates.Remove(gate);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GateExists(int id)
        {
            return (_context.Gates?.Any(e => e.IdGate == id)).GetValueOrDefault();
        }
    }
}
