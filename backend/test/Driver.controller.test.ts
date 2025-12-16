const MockUser: any = {};
MockUser.find = jest.fn();
MockUser.findById = jest.fn();
const MockLine: any = {};
MockLine.find = jest.fn();

jest.mock("../src/app/models/User", () => MockUser);
jest.mock("../src/app/models/Line", () => MockLine);

import DriverController from "../src/app/Http/Controllers/Driver.controller";

const makeRes = () => {
  const res: any = {};
  res.error = jest.fn().mockReturnValue(res);
  res.success = jest.fn().mockReturnValue(res);
  return res;
};

describe("DriverController", () => {
  beforeEach(() => jest.clearAllMocks());

  test("listDrivers -> error when none", async () => {
    (MockUser.find as jest.Mock).mockImplementation(() => ({
      select: () => Promise.resolve([]),
    }));
    const res = makeRes();
    await DriverController.listDrivers({} as any, res as any, jest.fn());
    expect(res.error).toHaveBeenCalledWith("Aucun chauffeur trouvé", 404);
  });

  test("listDrivers -> success when found", async () => {
    const drivers = [{ _id: "1" }];
    (MockUser.find as jest.Mock).mockImplementation(() => ({
      select: () => Promise.resolve(drivers),
    }));
    const res = makeRes();
    await DriverController.listDrivers({} as any, res as any, jest.fn());
    expect(res.success).toHaveBeenCalledWith(
      { drivers },
      "Chauffeurs récupérés"
    );
  });

  test("getDriver -> error when not found or wrong role", async () => {
    (MockUser.findById as jest.Mock).mockImplementation(() => ({
      select: () => Promise.resolve(null),
    }));
    const res = makeRes();
    await DriverController.getDriver(
      { params: { id: "x" } } as any,
      res as any,
      jest.fn()
    );
    expect(res.error).toHaveBeenCalledWith("Chauffeur introuvable", 404);
  });

  test("getDriverLines -> error when missing id", async () => {
    const res = makeRes();
    await DriverController.getDriverLines(
      { user: {} } as any,
      res as any,
      jest.fn()
    );
    expect(res.error).toHaveBeenCalledWith("ID du chauffeur manquant", 400);
  });

  test("getDriverLines -> error when none found", async () => {
    (MockLine.find as jest.Mock).mockImplementation(() => ({
      populate: () => ({ sort: () => Promise.resolve([]) }),
    }));
    const res = makeRes();
    await DriverController.getDriverLines(
      { params: { id: "1" } } as any,
      res as any,
      jest.fn()
    );
    expect(res.error).toHaveBeenCalledWith(
      "Aucun trajet trouvé pour ce chauffeur",
      404
    );
  });
});
