declare module 'file-size' {
  function filesize(bytes: number, options?: NS.FileSizeOptions): NS.FileSize;
  namespace NS {
    export interface FileSizeOptions {
      fixed?: number;
      spacer?: string;
    }

    export type SpecOptions = 'si' | 'iec' | 'jedec';
    export type SizeUnit = 'B' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB' | 'EB' | 'ZB' | 'YB';

    export interface CalculateResult {
      suffix: string;
      magnitude: number;
      result: number;
      fixed: string;
      bits: {
        result: number;
        fixed: string;
      }
    }

    export interface FileSize {
      human(spec?: SpecOptions): string;
      to(unit: SizeUnit, spec?: SpecOptions): number;
      calculate(spec?: SpecOptions): CalculateResult;
    }
  }
  export = filesize;
}
