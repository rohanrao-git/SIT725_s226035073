function calculateTotalPrice(basePrice, taxRate) {
  if (!Number.isFinite(basePrice) || !Number.isFinite(taxRate)) {
    throw new TypeError("basePrice and taxRate must be valid numbers");
  }

  if (basePrice < 0 || taxRate < 0) {
    throw new RangeError("basePrice and taxRate cannot be negative");
  }

  return Number((basePrice * (1 + taxRate)).toFixed(2));
}

module.exports = { calculateTotalPrice };
