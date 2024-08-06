export interface AircraftResponse {
  ident: string;
  type: string;
  economySeats: number;
  base: string;
}

export interface FlightResponse {
  ident: string;
  departuretime: number;
  arrivaltime: number;
  readable_departure: string;
  readable_arrival: string;
  origin: string;
  destination: string;
}

export interface Flight extends FlightResponse {
  assignedToAircraft: boolean;
  aircraftIndent: string | null;
}

export interface Aircraft extends AircraftResponse {
  utilised: number;
  rotation: Flight[];
}

export interface ScheduleState {
  date: string;
  aircraft: Aircraft[];
  flights: Flight[];
  selectedAircraftIdent: string | null;
  error: string | null;
}
