import type { Player } from '../types';

export const mockFantasyData: Player[] = [
  // Top tier drivers
  { id: 'd1', name: 'Max Verstappen', team: 'Red Bull Racing', cost: 30.5, type: 'driver' },
  { id: 'd2', name: 'Charles Leclerc', team: 'Ferrari', cost: 21.0, type: 'driver' },
  { id: 'd3', name: 'Lando Norris', team: 'McLaren', cost: 20.5, type: 'driver' },
  { id: 'd4', name: 'Oscar Piastri', team: 'McLaren', cost: 19.0, type: 'driver' },
  { id: 'd5', name: 'George Russell', team: 'Mercedes', cost: 18.5, type: 'driver' },
  
  // Mid-tier drivers
  { id: 'd6', name: 'Carlos Sainz', team: 'Williams', cost: 18.0, type: 'driver' },
  { id: 'd7', name: 'Lewis Hamilton', team: 'Ferrari', cost: 20.0, type: 'driver' },
  { id: 'd8', name: 'Fernando Alonso', team: 'Aston Martin', cost: 15.5, type: 'driver' },
  { id: 'd9', name: 'Yuki Tsunoda', team: 'RB', cost: 10.0, type: 'driver' },
  { id: 'd10', name: 'Lance Stroll', team: 'Aston Martin', cost: 9.5, type: 'driver' },
  
  // Lower-tier / rookie drivers
  { id: 'd11', name: 'Alexander Albon', team: 'Williams', cost: 8.5, type: 'driver' },
  { id: 'd12', name: 'Daniel Ricciardo', team: 'RB', cost: 9.0, type: 'driver' },
  { id: 'd13', name: 'Pierre Gasly', team: 'Alpine', cost: 8.0, type: 'driver' },
  { id: 'd14', name: 'Esteban Ocon', team: 'Alpine', cost: 8.2, type: 'driver' },
  { id: 'd15', name: 'Nico Hulkenberg', team: 'Sauber', cost: 7.0, type: 'driver' },
  { id: 'd16', name: 'Valtteri Bottas', team: 'Sauber', cost: 6.5, type: 'driver' },
  { id: 'd17', name: 'Kevin Magnussen', team: 'Haas F1 Team', cost: 6.0, type: 'driver' },
  { id: 'd18', name: 'Oliver Bearman', team: 'Haas F1 Team', cost: 6.3, type: 'driver' },
  { id: 'd19', name: 'Isack Hadjar', team: 'RB', cost: 7.5, type: 'driver'},
  { id: 'd20', name: 'Kimi Antonelli', team: 'Mercedes', cost: 9.0, type: 'driver' },
  
  // Constructors
  { id: 'c1', name: 'Red Bull Racing', cost: 28.0, type: 'constructor' },
  { id: 'c2', name: 'Ferrari', cost: 22.5, type: 'constructor' },
  { id: 'c3', name: 'McLaren', cost: 22.0, type: 'constructor' },
  { id: 'c4', name: 'Mercedes', cost: 19.5, type: 'constructor' },
  { id: 'c5', name: 'Aston Martin', cost: 14.0, type: 'constructor' },
  { id: 'c6', name: 'RB', cost: 11.0, type: 'constructor' },
  { id: 'c7', name: 'Williams', cost: 9.0, type: 'constructor' },
  { id: 'c8', name: 'Alpine', cost: 8.5, type: 'constructor' },
  { id: 'c9', name: 'Sauber', cost: 7.0, type: 'constructor' },
  { id: 'c10', name: 'Haas F1 Team', cost: 6.5, type: 'constructor' },
];
