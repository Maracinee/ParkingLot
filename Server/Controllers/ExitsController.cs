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
    public class ExitsController : ControllerBase
    {
        private readonly ParkingLotContext _context;

        public ExitsController(ParkingLotContext context)
        {
            _context = context;
        }

        // GET: api/Exits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Exit>>> GetExits()
        {
          if (_context.Exits == null)
          {
              return NotFound();
          }
            return await _context.Exits.ToListAsync();
        }

        // GET: api/Exits/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Exit>> GetExit(int id)
        {
          if (_context.Exits == null)
          {
              return NotFound();
          }
            var exit = await _context.Exits.FindAsync(id);

            if (exit == null)
            {
                return NotFound();
            }

            return exit;
        }

        // PUT: api/Exits/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExit(int id, Exit exit)
        {
            if (id != exit.IdExit)
            {
                return BadRequest();
            }

            _context.Entry(exit).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExitExists(id))
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

        // POST: api/Exits
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Exit>> PostExit(Exit exit)
        {
          if (_context.Exits == null)
          {
              return Problem("Entity set 'ParkingLotContext.Exits'  is null.");
          }
            _context.Exits.Add(exit);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExit", new { id = exit.IdExit }, exit);
        }

        // DELETE: api/Exits/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExit(int id)
        {
            if (_context.Exits == null)
            {
                return NotFound();
            }
            var exit = await _context.Exits.FindAsync(id);
            if (exit == null)
            {
                return NotFound();
            }

            _context.Exits.Remove(exit);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ExitExists(int id)
        {
            return (_context.Exits?.Any(e => e.IdExit == id)).GetValueOrDefault();
        }
    }
}
