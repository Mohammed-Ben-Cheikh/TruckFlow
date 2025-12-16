const mockSave = jest.fn();
const mockDeleteOne = jest.fn();
const MockLine: any = function (this: any, init: any) {
  Object.assign(this, init);
  this.save = mockSave;
  this.deleteOne = mockDeleteOne;
};
MockLine.find = jest.fn();
MockLine.findOne = jest.fn();

jest.mock("../src/app/models/Line", () => MockLine);

import LineController from "../src/app/Http/Controllers/Line.controller";

const makeRes = () => {
  const res: any = {};
  res.error = jest.fn().mockReturnValue(res);
  res.success = jest.fn().mockReturnValue(res);
  return res;
};

describe("LineController", () => {
  beforeEach(() => jest.clearAllMocks());

  test("createLine -> validation missing fields", async () => {
    const req: any = { body: { code: "", truck: "", driver: "" } };
    const res = makeRes();
    await LineController.createLine(req, res as any, jest.fn());
    expect(res.error).toHaveBeenCalledWith(
      "Code, camion et chauffeur sont requis",
      400
    );
  });

  test("getLines -> none found", async () => {
    (MockLine.find as jest.Mock).mockImplementation(() => ({
      populate: () => ({ sort: () => Promise.resolve([]) }),
    }));
    const res = makeRes();
    await LineController.getLines({} as any, res as any, jest.fn());
    expect(res.error).toHaveBeenCalledWith("Aucune ligne trouvée", 404);
  });

  test("createLine -> success when valid", async () => {
    mockSave.mockResolvedValueOnce(undefined);
    const req: any = {
      body: {
        code: "L1",
        truck: "t1",
        driver: "d1",
        departLocation: "a",
        arriveLocation: "b",
      },
      file: undefined,
    };
    const res = makeRes();
    await LineController.createLine(req, res as any, jest.fn());
    expect(mockSave).toHaveBeenCalled();
    expect(res.success).toHaveBeenCalledWith(
      expect.objectContaining({ line: expect.any(Object) }),
      "ligne créée avec succès",
      201
    );
  });

  test("getLine -> returns line when found and access allowed", async () => {
    const lineObj: any = { slug: "l-1", driver: { _id: "d1" } };
    (MockLine.findOne as jest.Mock).mockImplementation(() => ({
      populate: () => Promise.resolve(lineObj),
    }));
    const res = makeRes();
    await LineController.getLine(
      { params: { slug: "l-1" }, user: { role: "admin" } } as any,
      res as any,
      jest.fn()
    );
    expect(res.success).toHaveBeenCalledWith(
      { line: lineObj },
      "ligne récupérée avec succès"
    );
  });

  test("updateLine -> updates fields and saves", async () => {
    const lineObj: any = {
      slug: "l-2",
      save: jest.fn().mockResolvedValue(undefined),
    };
    (MockLine.findOne as jest.Mock).mockImplementation(() => ({
      populate: () => Promise.resolve(lineObj),
    }));
    const req: any = {
      params: { slug: "l-2" },
      body: { code: "NEW", kilometrageDepart: 100 },
    };
    const res = makeRes();
    await LineController.updateLine(req as any, res as any, jest.fn());
    expect(lineObj.save).toHaveBeenCalled();
    expect(res.success).toHaveBeenCalledWith(
      { line: lineObj },
      "ligne mise à jour avec succès"
    );
  });

  test("deleteLine -> deletes when found", async () => {
    const lineObj: any = {
      slug: "l-3",
      deleteOne: jest.fn().mockResolvedValue(undefined),
    };
    (MockLine.findOne as jest.Mock).mockImplementation(() => ({
      populate: () => Promise.resolve(lineObj),
    }));
    const res = makeRes();
    await LineController.deleteLine(
      { params: { slug: "l-3" } } as any,
      res as any,
      jest.fn()
    );
    expect(lineObj.deleteOne).toHaveBeenCalled();
    expect(res.success).toHaveBeenCalledWith(
      { line: lineObj },
      "ligne supprimée avec succès"
    );
  });
});
