const { expect } = require("chai");
const { calculateTotalPrice } = require("../utils/calculateTotalPrice");

describe("calculateTotalPrice", () => {
  it("calculates total price with tax for valid numbers", () => {
    const result = calculateTotalPrice(100000, 0.1);
    expect(result).to.equal(110000);
  });

  it("handles zero values as an edge case", () => {
    const result = calculateTotalPrice(0, 0);
    expect(result).to.equal(0);
  });

  it("throws TypeError when inputs are not numbers", () => {
    expect(() => calculateTotalPrice("100000", 0.1)).to.throw(TypeError);
  });

  it("throws RangeError when values are negative", () => {
    expect(() => calculateTotalPrice(-10, 0.1)).to.throw(RangeError);
  });
});
