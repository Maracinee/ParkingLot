// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ParkingLot.Shared.Models
{
    public partial class SelectCarsInParkingLotResult
    {
        public int IdEntry { get; set; }
        public DateTime EntryDate { get; set; }
        public int TicketNumber { get; set; }
        public string RegistrationNumber { get; set; }
        public int IdCar { get; set; }
    }
}
