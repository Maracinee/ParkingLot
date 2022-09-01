export class Cars {
    idCar: number;
    brandName: string;
    typeName: string;
    registrationNumber: string;

    constructor(IdCar: number, BrandName: string, TypeName: string, RegistrationNumber: string){
        this.idCar = IdCar;
        this.brandName = BrandName;
        this.typeName = TypeName;
        this.registrationNumber = RegistrationNumber;
    }
}

export class CarPost {
    idCar: number;
    idCarBrand: number;
    idCarType: number;
    registrationNumber: string;

    constructor(IdCar: number, IdBrand: number, IdType: number, RegistrationNumber: string){
        this.idCar = IdCar;
        this.idCarBrand = IdBrand;
        this.idCarType = IdType;
        this.registrationNumber = RegistrationNumber;
    }
}