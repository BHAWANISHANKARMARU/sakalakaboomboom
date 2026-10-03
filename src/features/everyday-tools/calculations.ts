const finite = (value: number) => Number.isFinite(value);
const round = (value: number, digits = 2) => Number(value.toFixed(digits));

export function calculateAge(birth: string, on: string) {
  const start = new Date(`${birth}T00:00:00`);
  const end = new Date(`${on}T00:00:00`);
  if (
    Number.isNaN(start.valueOf()) ||
    Number.isNaN(end.valueOf()) ||
    start > end
  )
    return null;
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();
  if (days < 0) {
    months--;
    days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  return { years, months, days };
}

export function calculateEmi(
  principal: number,
  annualRate: number,
  months: number,
) {
  if (
    ![principal, annualRate, months].every(finite) ||
    principal <= 0 ||
    annualRate < 0 ||
    months <= 0
  )
    return null;
  if (annualRate === 0) return round(principal / months);
  const rate = annualRate / 1200;
  const factor = (1 + rate) ** months;
  return round((principal * rate * factor) / (factor - 1));
}

export function calculateGst(amount: number, rate: number, inclusive: boolean) {
  if (![amount, rate].every(finite) || amount < 0 || rate < 0) return null;
  const tax = inclusive
    ? amount - amount / (1 + rate / 100)
    : (amount * rate) / 100;
  return { tax: round(tax), total: round(inclusive ? amount : amount + tax) };
}

export function calculatePercentage(part: number, whole: number) {
  if (![part, whole].every(finite) || whole === 0) return null;
  return round((part / whole) * 100);
}

const units: Record<string, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344,
};
export function convertUnit(value: number, from: string, to: string) {
  if (!finite(value) || !units[from] || !units[to]) return null;
  return round((value * units[from]) / units[to], 6);
}

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(value);
