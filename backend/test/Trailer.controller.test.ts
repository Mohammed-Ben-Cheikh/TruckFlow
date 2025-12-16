const mockSave = jest.fn();
const mockDeleteOne = jest.fn();
const MockTrailer: any = function (this: any, init: any) {
  Object.assign(this, init);
  this.save = mockSave;
  this.deleteOne = mockDeleteOne;
};
MockTrailer.find = jest.fn();
MockTrailer.findOne = jest.fn();

jest.mock("../src/app/models/Trailer", () => MockTrailer);

import TrailerController from "../src/app/Http/Controllers/Trailer.controller";

const makeRes = () => {
  const res: any = {};
  res.error = jest.fn().mockReturnValue(res);
  res.success = jest.fn().mockReturnValue(res);
  return res;
};

describe("TrailerController", () => {
  beforeEach(() => jest.clearAllMocks());

  test("findTrailer -> slug missing", async () => {
    const res = makeRes();
    const result = await TrailerController.findTrailer("", res as any);
    expect(res.error).toHaveBeenCalledWith("Slug manquant", 400);
    expect(result).toBeNull();
  });

  test("getTrailers -> none found", async () => {
    (MockTrailer.find as jest.Mock).mockResolvedValue([]);
    const res = makeRes();
    await TrailerController.getTrailers({} as any, res as any, jest.fn());
    expect(res.error).toHaveBeenCalledWith("Aucune remorque trouvée", 404);
  });

  test("createTrailer -> validation error", async () => {
    const res = makeRes();
    const req: any = { body: { registration: "", brand: "" }, file: undefined };
    await TrailerController.createTrailer(req, res as any, jest.fn());
    expect(res.error).toHaveBeenCalledWith(
      "Matricule, marque et type sont requis",
      400
    );
  });

  test("createTrailer -> success", async () => {
    mockSave.mockResolvedValueOnce(undefined);
    const req: any = {
      body: { registration: "R1", brand: "B", type: "T" },
      file: undefined,
    };
    const res = makeRes();
    await TrailerController.createTrailer(req, res as any, jest.fn());
    expect(mockSave).toHaveBeenCalled();
    expect(res.success).toHaveBeenCalledWith(
      expect.objectContaining({ trailer: expect.any(Object) }),
      "remorque créée avec succès",
      201
    );
  });

  test("getTrailer -> returns trailer when found", async () => {
    const trailerObj: any = { slug: "tr-1" };
    (MockTrailer.findOne as jest.Mock).mockResolvedValue(trailerObj);
    const res = makeRes();
    await TrailerController.getTrailer(
      { params: { slug: "tr-1" } } as any,
      res as any,
      jest.fn()
    );
    expect(res.success).toHaveBeenCalledWith(
      { trailer: trailerObj },
      "remorque récupérée avec succès"
    );
  });

  test("updateTrailer -> updates and saves", async () => {
    const trailerObj: any = {
      slug: "tr-2",
      save: jest.fn().mockResolvedValue(undefined),
    };
    (MockTrailer.findOne as jest.Mock).mockResolvedValue(trailerObj);
    const req: any = { params: { slug: "tr-2" }, body: { brand: "New" } };
    const res = makeRes();
    await TrailerController.updateTrailer(req as any, res as any, jest.fn());
    expect(trailerObj.save).toHaveBeenCalled();
    expect(res.success).toHaveBeenCalledWith(
      { trailer: trailerObj },
      "remorque mise à jour avec succès"
    );
  });

  test("deleteTrailer -> deletes when found", async () => {
    const trailerObj: any = {
      slug: "tr-3",
      deleteOne: jest.fn().mockResolvedValue(undefined),
    };
    (MockTrailer.findOne as jest.Mock).mockResolvedValue(trailerObj);
    const res = makeRes();
    await TrailerController.deleteTrailer(
      { params: { slug: "tr-3" } } as any,
      res as any,
      jest.fn()
    );
    expect(trailerObj.deleteOne).toHaveBeenCalled();
    expect(res.success).toHaveBeenCalledWith(
      { trailer: trailerObj },
      "remorque supprimée avec succès"
    );
  });
});
