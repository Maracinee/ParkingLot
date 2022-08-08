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
    public class EntriesController : ControllerBase
    {
        private readonly ParkingLotContext _context;

        public EntriesController(ParkingLotContext context)
        {
            _context = context;
        }

        // GET: api/Entries
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Entry>>> GetEntries()
        //{
        //  if (_context.Entries == null)
        //  {
        //      return NotFound();
        //  }
        //    return await _context.Entries.ToListAsync();
        //}

        // GET: api/Entries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Entry>> GetEntry(int id)
        {
          if (_context.Entries == null)
          {
              return NotFound();
          }
            var entry = await _context.Entries.FindAsync(id);

            if (entry == null)
            {
                return NotFound();
            }

            return entry;
        }

        // PUT: api/Entries/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEntry(int id, Entry entry)
        {
            if (id != entry.IdEntry)
            {
                return BadRequest();
            }

            _context.Entry(entry).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EntryExists(id))
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

        // POST: api/Entries
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Entry>> PostEntry(Entry entry)
        {
          if (_context.Entries == null)
          {
              return Problem("Entity set 'ParkingLotContext.Entries'  is null.");
          }
            _context.Entries.Add(entry);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEntry", new { id = entry.IdEntry }, entry);
        }

        // DELETE: api/Entries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEntry(int id)
        {
            if (_context.Entries == null)
            {
                return NotFound();
            }
            var entry = await _context.Entries.FindAsync(id);
            if (entry == null)
            {
                return NotFound();
            }

            _context.Entries.Remove(entry);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EntryExists(int id)
        {
            return (_context.Entries?.Any(e => e.IdEntry == id)).GetValueOrDefault();
        }

        //GET: api/Entries
       [HttpGet]
        public async Task<ActionResult<IEnumerable<SelectCarsInParkingLotResult>>> GetCarsInParkingLot()
        {
            if (_context.Entries == null)
            {
                return NotFound();
            }
            return await _context.Procedures.SelectCarsInParkingLotAsync();
        }
    }
}
