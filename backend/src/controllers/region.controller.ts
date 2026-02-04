import { Request, Response } from "express";
import response from "../utils/response";
import RegionModel from "../models/region.model";

export default {
  async findByCity(req: Request, res: Response) {
    const { name } = req.query;

    try {
      const region = await RegionModel.findByCity(`${name}`);
      if (!(region.length > 0)) {
        return response.notFound(res, "region not found", region);
      }
      response.success(res, region, "success get region by city name");
    } catch (error) {
      response.error(res, error, "failed to get region by city name");
    }
  },

  async getAllProvinces(req: Request, res: Response) {
    try {
      const provinces = await RegionModel.getAllProvinces();
      if (!(provinces.length > 0)) {
        return response.notFound(res, "provinces not found", provinces);
      }

      response.success(res, provinces, "success get all provinces");
    } catch (error) {
      response.error(res, error, "failed to get all provinces");
    }
  },

  async getProvince(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    try {
      const province = await RegionModel.getProvince(Number(id));
      if (!(province.length > 0)) {
        return response.notFound(res, "province not found", province);
      }

      response.success(res, province, "success get a province with regencies");
    } catch (error) {
      response.error(res, error, "failed to get province");
    }
  },

  async getRegency(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    try {
      const regency = await RegionModel.getRegency(Number(id));
      if (!(regency.length > 0)) {
        return response.notFound(res, "regency not found", regency);
      }

      response.success(res, regency, "success get regency with districts");
    } catch (error) {
      response.error(res, error, "failed to get regency");
    }
  },

  async getDistrict(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    try {
      const district = await RegionModel.getDistrict(Number(id));
      if (!(district.length > 0)) {
        return response.notFound(res, "district not found", district);
      }

      response.success(res, district, "success get district with villages");
    } catch (error) {
      response.error(res, error, "failed to get district");
    }
  },

  async getVillage(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    try {
      const village = await RegionModel.getVillage(Number(id));
      if (!(village.length > 0)) {
        return response.notFound(res, "village not found", village);
      }

      response.success(res, village, "success get village");
    } catch (error) {
      response.error(res, error, "failed to get village");
    }
  },
};
