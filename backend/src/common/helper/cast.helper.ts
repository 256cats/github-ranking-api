interface ToNumberOptions {
  default?: number;
  min?: number;
  max?: number;
}

export function toLowerCase(value: string): string {
  return value.toLowerCase();
}

export function toDate(value: string): Date {
  return new Date(value);
}

export function toNumber(value: string, opts: ToNumberOptions = {}): number {
  let newValue: number = Number.parseInt(value || String(opts.default), 10);

  if (Number.isNaN(newValue)) {
    return newValue; // validation will throw
  }

  if (opts.min) {
    newValue = Math.max(newValue, opts.min);
  }

  if (opts.max) {
    newValue = Math.min(newValue, opts.max);
  }

  return newValue;
}
