declare type WurflFormFactor = (
  'Desktop' | 'App' | 'Tablet' | 'Smartphone' | 'Feature Phone' | 'Smart-TV' |
  'Robot' | 'Other non-Mobile' | 'Other Mobile'
);

declare interface Wurfl {
  is_mobile: boolean;
  complete_device_name: string;
  form_factor: WurflFormFactor;
}

declare const WURFL: Wurfl;
