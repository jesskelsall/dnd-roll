// Converts a 10 roll into a 0
export const tenIsZero = (number: number): number => (number === 10 ? 0 : number)

// Always treat "00" as 0
// Always treat "0" as 10
// e.g. "90" + "0" = 100, "00" + "0" = 10
export const getConsistentPercentileValue = (
  tensRoll: number,
  unitsRoll: number,
): number => tenIsZero(tensRoll) * 10 + unitsRoll

// Typically treat "00" as 0
// Typically treat "0" as 0
// "00" together with "0" means 100 (exception)
// e.g. "90" + "0" = 90, "00" + "0" = 100
export const getExceptionPercentileValue = (
  tensRoll: number,
  unitsRoll: number,
): number => {
  if (tensRoll === 10 && unitsRoll === 10) return 100
  return tenIsZero(tensRoll) * 10 + tenIsZero(unitsRoll)
}

export default {
  consistent: getConsistentPercentileValue,
  exception: getExceptionPercentileValue,
}
