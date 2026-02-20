export const DATE_FORMATS = [
  "YYYY-MM-DD",
  "YY-MM-DD",
  "MM-DD-YYYY",
  "MM-DD-YY",
  "DD-MM-YYYY",
  "DD-MM-YY",
] as const;
export type DateFormat = (typeof DATE_FORMATS)[number];

const pad2 = (n: number) => String(n).padStart(2, "0");

const normalizeYear = (yy: number): number => {
  const currentYear = new Date().getFullYear();
  const currentCentury = Math.floor(currentYear / 100) * 100;

  let fullYear = currentCentury + yy;

  // If it's more than 50 years in the future, roll back a century
  if (fullYear - currentYear > 50) {
    fullYear -= 100;
  }

  // If it's more than 50 years in the past, roll forward a century
  if (currentYear - fullYear > 50) {
    fullYear += 100;
  }

  return fullYear;
};

export const parseToISODate = (input: string, format: DateFormat) => {
  const parts = input.split(/[-/]/);
  if (parts.length !== 3) throw new Error("Invalid Date string");

  let year: number;
  let month: number;
  let day: number;

  switch (format) {
    case "YYYY-MM-DD": {
      year = Number(parts[0]);
      month = Number(parts[1]);
      day = Number(parts[2]);
      break;
    }

    case "YY-MM-DD": {
      year = normalizeYear(Number(parts[0]));
      month = Number(parts[1]);
      day = Number(parts[2]);
      break;
    }

    case "MM-DD-YYYY": {
      month = Number(parts[0]);
      day = Number(parts[1]);
      year = Number(parts[2]);
      break;
    }

    case "MM-DD-YY": {
      month = Number(parts[0]);
      day = Number(parts[1]);
      year = normalizeYear(Number(parts[2]));
      break;
    }

    case "DD-MM-YYYY": {
      day = Number(parts[0]);
      month = Number(parts[1]);
      year = Number(parts[2]);
      break;
    }

    case "DD-MM-YY": {
      day = Number(parts[0]);
      month = Number(parts[1]);
      year = normalizeYear(Number(parts[2]));
      break;
    }

    default:
      throw new Error("Invalid Date Format");
  }

  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    throw new Error("Invalid Date string");
  }

  return `${year}-${pad2(month)}-${pad2(day)}`;
};
