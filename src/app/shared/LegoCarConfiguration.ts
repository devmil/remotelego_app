import { Utils } from './Utils'  

export enum DataField {
    Name,
    MaxSteeringAnglePositive,
    MaxSteeringAngleNegative,
    SteeringOffset
}

export class ValidationError {
    private m_Field : DataField;
    private m_Message : String;

    public constructor(field : DataField, message : String) {
        this.m_Field = field;
        this.m_Message = message;
    }

    public get field() : DataField{
        return this.m_Field;
    }

    public get message() : String {
        return this.m_Message;
    }
}

export class LegoCarConfiguration {
    private m_IsSteeringInverted : boolean;
    private m_MaxSteeringAnglePositive : number;
    private m_MaxSteeringAngleNegative : number;
    private m_SteeringOffset : number;

    private m_Name : String;

    private m_HasMovingFrontLights : boolean = false;
    private m_HasTrunk : boolean = false;
    private m_CanBlink : boolean = false;

    private m_IsDataInitialized : boolean = false;
    private m_IsNameInitialized : boolean = false;

    public static get NAME_LENGTH() { return 20; }

    public constructor() {
    }

    public clone() : LegoCarConfiguration {
        var result : LegoCarConfiguration = new LegoCarConfiguration();

        result.m_CanBlink = this.m_CanBlink;
        result.m_HasMovingFrontLights = this.m_HasMovingFrontLights;
        result.m_HasTrunk = this.m_HasTrunk;
        result.m_IsDataInitialized = this.m_IsDataInitialized;
        result.m_IsNameInitialized = this.m_IsNameInitialized;
        result.m_IsSteeringInverted = this.m_IsSteeringInverted;
        result.m_MaxSteeringAngleNegative = this.m_MaxSteeringAngleNegative;
        result.m_MaxSteeringAnglePositive = this.m_MaxSteeringAnglePositive;
        result.m_Name = this.m_Name;
        result.m_SteeringOffset = this.m_SteeringOffset;

        return result;
    }

    public dataEquals(other : LegoCarConfiguration) : boolean {
        if(other == null) {
            return false;
        }
        return this.m_CanBlink == other.m_CanBlink
            && this.m_HasMovingFrontLights == other.m_HasMovingFrontLights
            && this.m_HasTrunk == other.m_HasTrunk
            && this.m_IsDataInitialized == other.m_IsDataInitialized
            && this.m_IsSteeringInverted == other.m_IsSteeringInverted
            && this.m_MaxSteeringAngleNegative == other.m_MaxSteeringAngleNegative
            && this.m_MaxSteeringAnglePositive == other.m_MaxSteeringAnglePositive
            && this.m_SteeringOffset == other.m_SteeringOffset;
    }

    public takeDataFrom(other : LegoCarConfiguration) {
        this.m_CanBlink = other.m_CanBlink;
        this.m_HasMovingFrontLights = other.m_HasMovingFrontLights;
        this.m_HasTrunk = other.m_HasTrunk;
        this.m_IsDataInitialized = other.m_IsDataInitialized;
        this.m_IsSteeringInverted = other.m_IsSteeringInverted;
        this.m_MaxSteeringAngleNegative = other.m_MaxSteeringAngleNegative;
        this.m_MaxSteeringAnglePositive = other.m_MaxSteeringAnglePositive;
        this.m_SteeringOffset = other.m_SteeringOffset;
    }

    public nameEquals(other : LegoCarConfiguration) : boolean {
        if(other == null) {
            return false;
        }
        return this.m_Name == other.m_Name;
    }

    public takeNameFrom(other : LegoCarConfiguration) {
        this.m_IsNameInitialized = other.m_IsNameInitialized;
        this.m_Name = other.m_Name;
    }

    public get isSteeringInverted() : boolean {
        return this.m_IsSteeringInverted;
    }

    public set isSteeringInverted(isInverted : boolean) {
        this.m_IsSteeringInverted = isInverted;
    }

    public get maxSteeringAnglePositive() : number {
        return this.m_MaxSteeringAnglePositive;
    }

    public set maxSteeringAnglePositive(maxSteeringAnglePositive : number) {
        this.m_MaxSteeringAnglePositive = maxSteeringAnglePositive;
    }

    public get maxSteeringAngleNegative() : number {
        return this.m_MaxSteeringAngleNegative;
    }

    public set maxSteeringAngleNegative(maxSteeringAngleNegative : number) {
        this.m_MaxSteeringAngleNegative = maxSteeringAngleNegative;
    }

    public get steeringOffset() : number {
        return this.m_SteeringOffset;
    }

    public set steeringOffset(steeringOffset : number) {
        this.m_SteeringOffset = steeringOffset;
    }

    public get name() : String {
        return this.m_Name;
    }

    public set name(name : String) {
        this.m_Name = name;
    }

    public get hasMovingFrontLights() : boolean {
        return this.m_HasMovingFrontLights;
    }

    public set hasMovingFrontLights(hasMovingFrontLights : boolean) {
        this.m_HasMovingFrontLights = hasMovingFrontLights;
    }

    public get hasTrunk() : boolean {
        return this.m_HasTrunk;
    }

    public set hasTrunk(hasTrunk : boolean) {
        this.m_HasTrunk = hasTrunk;
    }

    public get canBlink() : boolean {
        return this.m_CanBlink;
    }

    public set canBlink(canBlink : boolean) {
        this.m_CanBlink = canBlink;
    }

    public get isInitialized() : boolean {
        return this.m_IsDataInitialized && this.m_IsNameInitialized;
    }

    public validate() : Array<ValidationError> {
        var result  : Array<ValidationError>;
        result = new Array<ValidationError>();

        //1. angles
        if(this.m_MaxSteeringAnglePositive > 90 || this.m_MaxSteeringAnglePositive < 0) {
            result.push(new ValidationError(DataField.MaxSteeringAnglePositive, "Max positive steering angle has to be between 0 and 90"));
        }
        if(this.m_MaxSteeringAngleNegative < -90 || this.m_MaxSteeringAngleNegative > 0) {
            result.push(new ValidationError(DataField.MaxSteeringAngleNegative, "Max negative steering angle has to be between -90 and 0"));
        }
        if(this.m_SteeringOffset > 90 || this.m_SteeringOffset < -90) {
            result.push(new ValidationError(DataField.SteeringOffset, "Steering offset has to be between -90 and 0"));
        }

        //2. mName availability
        if(this.m_Name == "") {
            result.push(new ValidationError(DataField.Name, "Name can not be empty"));
        }

        //3. mName length
        var nameBytes = this.toNameBytesRaw();
        if(nameBytes.length > LegoCarConfiguration.NAME_LENGTH) {
            var len = LegoCarConfiguration.NAME_LENGTH;
            result.push(new ValidationError(DataField.Name, `Name can only be ${len} bytes long`));
        }

        return result;
    }

    public toDataBytes() : Uint8Array {
        var result : Array<number> = new Array<number>();
        
        result.push(this.m_IsSteeringInverted ? 0x01 : 0x00);
        result.push(this.m_MaxSteeringAnglePositive);
        result.push(this.m_MaxSteeringAngleNegative);
        result.push(this.m_SteeringOffset);
        result.push(this.m_HasMovingFrontLights ? 0x01 : 0x00);
        result.push(this.m_HasTrunk ? 0x01 : 0x00);
        result.push(this.m_CanBlink ? 0x01 : 0x00);

        return Uint8Array.from(result);
    }

    public toNameBytesRaw() : Uint8Array {
        return Utils.stringToUTF8Bytes(this.m_Name);
    }

    public toNameBytesForSending() : Uint8Array {
        var rawBytes = this.toNameBytesRaw();
        var result : Uint8Array = new Uint8Array(LegoCarConfiguration.NAME_LENGTH);
        for(var i : number = 0; i < result.length; i++) {
            if(rawBytes.length > i) {
                result[i] = rawBytes[i];
            } else {
                result[i] = 0x00;
            }
        }
        return result;
    }

    public setNameBytes(bytes : DataView) {
        if(bytes == null) {
            return;
        }

        if(bytes.byteLength != LegoCarConfiguration.NAME_LENGTH) {
            return;
        }

        var effectiveBytes : Array<number> = new Array<number>();
        for(var i : number = 0; i < LegoCarConfiguration.NAME_LENGTH; i++) {
            if(bytes.getInt8(i) == 0) {
                length = i;
                break;
            }
            effectiveBytes.push(bytes.getInt8(i));
        }

        this.m_Name = Utils.utf8BytesToString(Uint8Array.from(effectiveBytes));

        this.m_IsNameInitialized = true;
    }

    public setDataBytes(bytes : DataView) {
        if(bytes == null) {
            return;
        }

        var idx : number = 0;
        this.m_IsSteeringInverted = bytes.getInt8(idx) != 0;
        idx++;
        this.m_MaxSteeringAnglePositive = bytes.getInt8(idx);
        idx++;
        this.m_MaxSteeringAngleNegative = bytes.getInt8(idx);
        idx++;
        this.m_SteeringOffset = bytes.getInt8(idx);
        idx++;
        this.m_HasMovingFrontLights = bytes.getInt8(idx) != 0;
        idx++;
        this.m_HasTrunk = bytes.getInt8(idx) != 0;
        idx++;
        this.m_CanBlink = bytes.getInt8(idx) != 0;
        idx++;

        this.m_IsDataInitialized = true;
    }
}