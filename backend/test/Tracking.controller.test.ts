const mockSave = jest.fn();
const mockDeleteOne = jest.fn();
const MockTracking: any = function (this: any, init: any) {
  Object.assign(this, init);
  this.save = mockSave;
  this.deleteOne = mockDeleteOne;
};
MockTracking.find = jest.fn();
MockTracking.findOne = jest.fn();
const MockLine: any = {};
MockLine.findOne = jest.fn();

jest.mock("../src/app/models/Tracking", () => MockTracking);
jest.mock("../src/app/models/Line", () => MockLine);

import TrackingController from "../src/app/Http/Controllers/Tracking.controller";

const makeRes = () => {
  const res: any = {};
  res.error = jest.fn().mockReturnValue(res);
  res.success = jest.fn().mockReturnValue(res);
  return res;
};

describe("TrackingController", () => {
  beforeEach(() => jest.clearAllMocks());

  test("create -> location or lat/lon required", async () => {
    const req: any = {
      body: { location: undefined, lat: undefined, lon: undefined },
      user: {},
    };
    const res = makeRes();
    await TrackingController.create(req, res as any, jest.fn());
    expect(res.error).toHaveBeenCalledWith("Location ou lat/lon requis", 400);
  });

  test("list -> returns empty success when none", async () => {
    (MockTracking.find as jest.Mock).mockImplementation(() => ({
      populate: () => ({ sort: () => Promise.resolve([]) }),
    }));
    const res = makeRes();
    await TrackingController.list({} as any, res as any, jest.fn());
    expect(res.success).toHaveBeenCalledWith(
      { trackings: [] },
      "Aucun point de suivi"
    );
  });

  test("create -> success when valid", async () => {
    mockSave.mockResolvedValueOnce(undefined);
    const req: any = {
      body: { location: "loc1", timestamp: Date.now() },
      user: { userId: "u1" },
    };
    const res = makeRes();
    await TrackingController.create(req, res as any, jest.fn());
    expect(mockSave).toHaveBeenCalled();
    expect(res.success).toHaveBeenCalledWith(
      expect.objectContaining({ tracking: expect.any(Object) }),
      "Point de suivi créé",
      201
    );
  });

  test("get -> returns tracking when found", async () => {
    const trackingObj: any = { slug: "tr-1" };
    (MockTracking.findOne as jest.Mock).mockImplementation(() => ({
      populate: () => Promise.resolve(trackingObj),
    }));
    const res = makeRes();
    await TrackingController.get(
      { params: { slug: "tr-1" } } as any,
      res as any,
      jest.fn()
    );
    expect(res.success).toHaveBeenCalledWith(
      { tracking: trackingObj },
      "Point récupéré"
    );
  });

  test("update -> updates and saves tracking", async () => {
    const trackingObj: any = {
      slug: "tr-2",
      save: jest.fn().mockResolvedValue(undefined),
    };
    (MockTracking.findOne as jest.Mock).mockResolvedValue(trackingObj);
    const req: any = { params: { slug: "tr-2" }, body: { location: "new" } };
    const res = makeRes();
    await TrackingController.update(req as any, res as any, jest.fn());
    expect(trackingObj.save).toHaveBeenCalled();
    expect(res.success).toHaveBeenCalledWith(
      { tracking: trackingObj },
      "Point mis à jour"
    );
  });

  test("delete -> deletes tracking when found", async () => {
    const trackingObj: any = {
      slug: "tr-3",
      deleteOne: jest.fn().mockResolvedValue(undefined),
    };
    (MockTracking.findOne as jest.Mock).mockResolvedValue(trackingObj);
    const res = makeRes();
    await TrackingController.delete(
      { params: { slug: "tr-3" } } as any,
      res as any,
      jest.fn()
    );
    expect(trackingObj.deleteOne).toHaveBeenCalled();
    expect(res.success).toHaveBeenCalledWith(
      { tracking: trackingObj },
      "Point supprimé"
    );
  });
});
