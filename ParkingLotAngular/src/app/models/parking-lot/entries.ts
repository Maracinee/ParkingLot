export class Entries {
    idEntry: number;
    idEntryGate: number;
    idCar: number;
    entryDate: Date;
    ticketNumber: number;

    constructor(IdEntry: number, IdEntryGate: number, IdCar: number, EntryDate: Date, TicketNumber: number){
        this.idEntry = IdEntry;
        this.idEntryGate = IdEntryGate;
        this.idCar = IdCar;
        this.entryDate = EntryDate;
        this.ticketNumber = TicketNumber;
    }
}

export class CarsInParkingLot{
    idEntry: number;
    entryDate: Date;
    ticketNumber: number;
    registrationNumber: string;
    idCar: number;

    constructor(IdEntry: number, EntryDate: Date, TicketNumber: number, RegistrationNumber: string, IdCar: number){
        this.idEntry = IdEntry;
        this.entryDate = EntryDate;
        this.ticketNumber = TicketNumber;
        this.registrationNumber = RegistrationNumber;
        this.idCar = IdCar;
    }
}

export class Exit{
    idExit: number;
    idExitGate: number;
    idCar: number;
    exitDate: Date;
    ticketNumber: number;

    constructor(IdExit: number, IdExitGate: number, IdCar: number, ExitDate: Date, TicketNumber: number){
        this.idExit = IdExit;
        this.idExitGate = IdExitGate;
        this.idCar = IdCar;
        this.exitDate = ExitDate;
        this.ticketNumber = TicketNumber;
    }
}