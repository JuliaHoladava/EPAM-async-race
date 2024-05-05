export interface PropsCar {
  id: number;
  name?: string;
  color?: string;
  engineStatus?: 'idle' | 'started' | 'stopped' | 'driving' | 'error';
  velocity?: number;
}
