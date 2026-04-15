const request = require("supertest");
const { expect } = require("chai");
const { app, setCarsCollectionForTesting } = require("../server");

describe("GET /api/cars", () => {
  it("returns cars when collection query succeeds", async () => {
    const mockCars = [
      { name: "McLaren 720S", brand: "McLaren", year: 2023 },
      { name: "Porsche 911 GT3", brand: "Porsche", year: 2024 },
    ];

    setCarsCollectionForTesting({
      find: () => ({
        toArray: async () => mockCars,
      }),
    });

    const response = await request(app).get("/api/cars");

    expect(response.status).to.equal(200);
    expect(response.body.statusCode).to.equal(200);
    expect(response.body.message).to.equal("Cars fetched successfully");
    expect(response.body.data).to.deep.equal(mockCars);
  });

  it("returns 500 when collection query fails", async () => {
    const originalConsoleError = console.error;
    try {
      console.error = () => {};

      setCarsCollectionForTesting({
        find: () => ({
          toArray: async () => {
            throw new Error("Database query failed");
          },
        }),
      });

      const response = await request(app).get("/api/cars");

      expect(response.status).to.equal(500);
      expect(response.body.statusCode).to.equal(500);
      expect(response.body.data).to.deep.equal([]);
      expect(response.body.message).to.equal("Failed to fetch cars");
    } finally {
      console.error = originalConsoleError;
    }
  });
});
