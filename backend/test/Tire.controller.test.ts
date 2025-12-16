const mockSave = jest.fn();
const mockDeleteOne = jest.fn();
const MockTire: any = function (this: any, init: any) {
  Object.assign(this, init);
  this.save = mockSave;
  this.deleteOne = mockDeleteOne;
};
MockTire.find = jest.fn();
MockTire.findOne = jest.fn();

jest.mock("../src/app/models/Tire", () => MockTire);

import TireController from "../src/app/Http/Controllers/Tire.controller";

const makeRes = () => {
  const res: any = {};
  res.error = jest.fn().mockReturnValue(res);
  res.success = jest.fn().mockReturnValue(res);
  return res;
};

describe("TireController", () => {
  beforeEach(() => jest.clearAllMocks());

  test("createTire -> used without kilometrageCurrent", async () => {
    const req: any = {
      body: { reference: "r", brand: "b", used: true },
      file: undefined,
    };
    const res = makeRes();
    await TireController.createTire(req, res as any, jest.fn());
    expect(res.error).toHaveBeenCalledWith(
      "Le kilométrage actuel est requis pour un pneu d'occasion",
      400
    );
  });

  test("getTires -> none found", async () => {
    (MockTire.find as jest.Mock).mockResolvedValue([]);
    const res = makeRes();
    await TireController.getTires({} as any, res as any, jest.fn());
    expect(res.error).toHaveBeenCalledWith("Aucun pneu trouvé", 404);
  });

  test("createTire -> success", async () => {
    mockSave.mockResolvedValueOnce(undefined);
    const req: any = {
      body: { reference: "r1", brand: "b1", used: false },
      file: undefined,
    };
    const res = makeRes();
    await TireController.createTire(req, res as any, jest.fn());
    expect(mockSave).toHaveBeenCalled();
    expect(res.success).toHaveBeenCalledWith(
      expect.objectContaining({ tire: expect.any(Object) }),
      "pneu créé avec succès",
      201
    );
  });

  test("getTire -> returns tire when found", async () => {
    const tireObj: any = { slug: "t-1" };
    (MockTire.findOne as jest.Mock).mockResolvedValue(tireObj);
    const res = makeRes();
    await TireController.getTire(
      { params: { slug: "t-1" } } as any,
      res as any,
      jest.fn()
    );
    expect(res.success).toHaveBeenCalledWith(
      { tire: tireObj },
      "pneu récupéré avec succès"
    );
  });

  test("updateTire -> updates and saves", async () => {
    const tireObj: any = {
      slug: "t-2",
      save: jest.fn().mockResolvedValue(undefined),
      inUse: false,
    };
    (MockTire.findOne as jest.Mock).mockResolvedValue(tireObj);
    const req: any = {
      params: { slug: "t-2" },
      body: { brand: "new" },
      file: undefined,
    };
    const res = makeRes();
    await TireController.updateTire(req as any, res as any, jest.fn());
    expect(tireObj.save).toHaveBeenCalled();
    expect(res.success).toHaveBeenCalledWith(
      { tire: tireObj },
      "pneu mis à jour avec succès"
    );
  });

  test("deleteTire -> deletes when not in use", async () => {
    const tireObj: any = {
      slug: "t-3",
      inUse: false,
      deleteOne: jest.fn().mockResolvedValue(undefined),
    };
    (MockTire.findOne as jest.Mock).mockResolvedValue(tireObj);
    const res = makeRes();
    await TireController.deleteTire(
      { params: { slug: "t-3" } } as any,
      res as any,
      jest.fn()
    );
    expect(tireObj.deleteOne).toHaveBeenCalled();
    expect(res.success).toHaveBeenCalledWith(
      { tire: tireObj },
      "pneu supprimé avec succès"
    );
  });
});
