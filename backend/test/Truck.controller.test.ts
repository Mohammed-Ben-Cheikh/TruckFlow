// Mock the Truck model: make it callable as a constructor and provide static methods
const mockSave = jest.fn();
const mockDeleteOne = jest.fn();
const MockTruck: any = function (this: any, init: any) {
  Object.assign(this, init);
  this.save = mockSave;
  this.deleteOne = mockDeleteOne;
};
MockTruck.find = jest.fn();
MockTruck.findOne = jest.fn();

jest.mock("../src/app/models/Truck", () => MockTruck);

import TruckController from "../src/app/Http/Controllers/Truck.controller";

const makeRes = () => {
  const res: any = {};
  res.error = jest.fn().mockReturnValue(res);
  res.success = jest.fn().mockReturnValue(res);
  return res;
};

describe("TruckController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("findTruck", () => {
    test("returns null and calls res.error when slug missing", async () => {
      const res = makeRes();
      const result = await TruckController.findTruck("", res as any);
      expect(res.error).toHaveBeenCalledWith("Slug manquant", 400);
      expect(result).toBeNull();
    });

    test("calls res.error when truck not found", async () => {
      (MockTruck.findOne as jest.Mock).mockResolvedValue(null);
      const res = makeRes();
      const result = await TruckController.findTruck("t-123", res as any);
      expect(MockTruck.findOne).toHaveBeenCalledWith({ slug: "t-123" });
      expect(res.error).toHaveBeenCalledWith("Camion introuvable", 404);
      expect(result).toBeNull();
    });

    test("returns truck when found", async () => {
      const truckObj = { slug: "t-123" };
      (MockTruck.findOne as jest.Mock).mockResolvedValue(truckObj);
      const res = makeRes();
      const result = await TruckController.findTruck("t-123", res as any);
      expect(result).toEqual(truckObj);
      expect(res.error).not.toHaveBeenCalled();
    });
  });

  describe("getTrucks", () => {
    test("calls res.error when none found", async () => {
      (MockTruck.find as jest.Mock).mockResolvedValue([]);
      const res = makeRes();
      await TruckController.getTrucks({} as any, res as any, jest.fn());
      expect(res.error).toHaveBeenCalledWith("Aucun camion trouvé", 404);
    });

    test("calls res.success when found", async () => {
      const trucks = [{ slug: "t1" }];
      (MockTruck.find as jest.Mock).mockResolvedValue(trucks);
      const res = makeRes();
      await TruckController.getTrucks({} as any, res as any, jest.fn());
      expect(res.success).toHaveBeenCalledWith(
        { trucks },
        "camions récupérés avec succès"
      );
    });
  });

  describe("createTruck", () => {
    test("validates required fields", async () => {
      const res = makeRes();
      const req: any = { body: { brand: "B", model: "M" }, file: undefined };
      await TruckController.createTruck(req, res as any, jest.fn());
      expect(res.error).toHaveBeenCalledWith(
        "Matricule, marque et modèle sont requis",
        400
      );
    });

    test("creates and saves truck successfully", async () => {
      mockSave.mockResolvedValueOnce(undefined);
      const req: any = {
        body: { registration: "R1", brand: "B", model: "M" },
        file: undefined,
      };
      const res = makeRes();
      await TruckController.createTruck(req, res as any, jest.fn());
      expect(mockSave).toHaveBeenCalled();
      expect(res.success).toHaveBeenCalled();
    });
  });

  describe("updateTruck", () => {
    test("updates and saves truck", async () => {
      const truckObj: any = {
        slug: "t-2",
        save: jest.fn().mockResolvedValue(undefined),
      };
      (MockTruck.findOne as jest.Mock).mockResolvedValue(truckObj);
      const req: any = { params: { slug: "t-2" }, body: { model: "New" } };
      const res = makeRes();
      await TruckController.updateTruck(req as any, res as any, jest.fn());
      expect(truckObj.save).toHaveBeenCalled();
      expect(res.success).toHaveBeenCalledWith(
        { truck: truckObj },
        "camion mis à jour avec succès"
      );
    });
  });

  describe("deleteTruck", () => {
    test("deletes truck when found", async () => {
      const truckObj: any = {
        slug: "t-3",
        deleteOne: jest.fn().mockResolvedValue(undefined),
      };
      (MockTruck.findOne as jest.Mock).mockResolvedValue(truckObj);
      const res = makeRes();
      await TruckController.deleteTruck(
        { params: { slug: "t-3" } } as any,
        res as any,
        jest.fn()
      );
      expect(truckObj.deleteOne).toHaveBeenCalled();
      expect(res.success).toHaveBeenCalledWith(
        { truck: truckObj },
        "camion supprimé avec succès"
      );
    });
  });
});
