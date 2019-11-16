import GenericSerice from "./GenericService";

class DummyService extends GenericSerice {}

describe("GenericSerice", () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  describe("extended by a class", () => {
    let instance;
    beforeAll(() => {
      instance = new DummyService();
    });

    describe("method get", () => {
      describe("with path given", () => {
        const mockPath = "/pa/th";

        describe("receiving sucessful response", () => {
          let result;
          const mockData = { key: "mock value" };
          beforeAll(async () => {
            global.fetch.mockClear();
            global.fetch.mockResolvedValue({
              ok: true,
              json: jest.fn().mockResolvedValue(mockData)
            });
            result = await instance.get(mockPath);
          });

          it("should return data", () => {
            expect(result).toEqual(mockData);
          });

          it("should request the correct URL", () => {
            expect(global.fetch).toHaveBeenCalledWith(
              "http://localhost/undefined/pa/th",
              {
                method: "GET"
              }
            );
          });
        });

        describe("receiving unsuccessful response", () => {
          let result;
          beforeAll(() => {
            global.fetch.mockClear();
            global.fetch.mockResolvedValue({
              ok: false
            });
          });

          it("should throw error", async () => {
            await expect(instance.get(mockPath)).rejects.toThrow(
              "Runtime error: Error: Network response was not ok: [object Object]"
            );
          });

          it("should request the correct URL", () => {
            expect(global.fetch).toHaveBeenCalledWith(
              "http://localhost/undefined/pa/th/pa/th",
              {
                method: "GET"
              }
            );
          });
        });
      });

      describe("without path given", () => {
        describe("receiving sucessful response", () => {
          let result;
          const mockData = { key: "mock value" };
          beforeAll(async () => {
            global.fetch.mockClear();
            global.fetch.mockResolvedValue({
              ok: true,
              json: jest.fn().mockResolvedValue(mockData)
            });
            result = await instance.get();
          });

          it("should return data", () => {
            expect(result).toEqual(mockData);
          });

          it("should request the correct URL", () => {
            expect(global.fetch).toHaveBeenCalledWith(
              "http://localhost/undefined/pa/th/pa/th",
              {
                method: "GET"
              }
            );
          });
        });
      });
    });
  });
});
