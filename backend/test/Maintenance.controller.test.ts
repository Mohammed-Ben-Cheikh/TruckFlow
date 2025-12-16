const mockSave = jest.fn();
const mockDeleteOne = jest.fn();
const MockMaintenance: any = function (this: any, init: any) {
  Object.assign(this, init);
  this.save = mockSave;
  this.deleteOne = mockDeleteOne;
};
MockMaintenance.find = jest.fn();
MockMaintenance.findOne = jest.fn();

jest.mock("../src/app/models/Maintenance", () => MockMaintenance);

import MaintenanceController from "../src/app/Http/Controllers/Maintenance.controller";

const makeRes = () => {
  const res: any = {};
  res.error = jest.fn().mockReturnValue(res);
  res.success = jest.fn().mockReturnValue(res);
  return res;
};

describe("MaintenanceController", () => {
  beforeEach(() => jest.clearAllMocks());

  test("create -> validation missing fields", async () => {
    const req: any = {
      body: { vehicleType: "", vehicle: "", type: "" },
      user: {},
    };
    const res = makeRes();
    await MaintenanceController.create(req, res as any, jest.fn());
    expect(res.error).toHaveBeenCalledWith(
      "Type de véhicule, identifiant et type sont requis",
      400
    );
  });

  test("list -> none found", async () => {
    (MockMaintenance.find as jest.Mock).mockImplementation(() => ({
      populate: () => ({ sort: () => Promise.resolve([]) }),
    }));
    const res = makeRes();
    await MaintenanceController.list({} as any, res as any, jest.fn());
    expect(res.error).toHaveBeenCalledWith("Aucune maintenance trouvée", 404);
  });

  test("create -> success when valid", async () => {
    mockSave.mockResolvedValueOnce(undefined);
    const req: any = {
      body: {
        vehicleType: "truck",
        vehicle: "v1",
        type: "oil",
        description: "d",
      },
      user: { userId: "u1" },
    };
    const res = makeRes();
    await MaintenanceController.create(req, res as any, jest.fn());
    expect(mockSave).toHaveBeenCalled();
    expect(res.success).toHaveBeenCalledWith(
      expect.objectContaining({ maintenance: expect.any(Object) }),
      "Maintenance créée",
      201
    );
  });

  test("get -> returns maintenance when found", async () => {
    const maintenanceObj: any = { slug: "m-1" };
    (MockMaintenance.findOne as jest.Mock).mockImplementation(() => ({
      populate: () => Promise.resolve(maintenanceObj),
    }));
    const res = makeRes();
    await MaintenanceController.get(
      { params: { slug: "m-1" } } as any,
      res as any,
      jest.fn()
    );
    expect(res.success).toHaveBeenCalledWith(
      { maintenance: maintenanceObj },
      "Maintenance récupérée"
    );
  });

  test("update -> updates and saves maintenance", async () => {
    const maintenanceObj: any = {
      slug: "m-2",
      save: jest.fn().mockResolvedValue(undefined),
    };
    (MockMaintenance.findOne as jest.Mock).mockImplementation(() => ({
      populate: () => Promise.resolve(maintenanceObj),
    }));
    const req: any = {
      params: { slug: "m-2" },
      body: { type: "brakes", status: "done" },
    };
    const res = makeRes();
    await MaintenanceController.update(req as any, res as any, jest.fn());
    expect(maintenanceObj.save).toHaveBeenCalled();
    expect(res.success).toHaveBeenCalledWith(
      { maintenance: maintenanceObj },
      "Maintenance mise à jour"
    );
  });

  test("delete -> deletes maintenance when found", async () => {
    const maintenanceObj: any = {
      slug: "m-3",
      deleteOne: jest.fn().mockResolvedValue(undefined),
    };
    (MockMaintenance.findOne as jest.Mock).mockImplementation(() => ({
      populate: () => Promise.resolve(maintenanceObj),
    }));
    const res = makeRes();
    await MaintenanceController.delete(
      { params: { slug: "m-3" } } as any,
      res as any,
      jest.fn()
    );
    expect(maintenanceObj.deleteOne).toHaveBeenCalled();
    expect(res.success).toHaveBeenCalledWith(
      { maintenance: maintenanceObj },
      "Maintenance supprimée"
    );
  });
});
