export default interface ISettings {
  timeFormat?: string;
  dateFormat?: string;
  language?: { id: number; name: string; isoCode: string };
  appearance?: { id: number; name: string };
  reduceMotion?: boolean;
  appointmentLength?: number;
  workingHoursStart?: string;
  workingHoursEnd?: string;
}
