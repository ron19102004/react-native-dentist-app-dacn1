import dentalServiceApi from "../apis/dental-service.api";
import { ApiResponse, DentalService } from "../apis/model";

export interface DentalServiceContextType {
  getDentalServices(
    success: (data: Array<DentalService>) => void,
    errors: (err: string) => void,
    page?: number,
    size?: number
  ): Promise<void>;
  getDentalServiceBySlug(
    slug: string,
    success: (data: DentalService | null) => void,
    errors: (error: string) => void
  ): Promise<void>;
}

const useDentalService = (): DentalServiceContextType => {
  const getDentalServices = async (
    success: (data: Array<DentalService>) => void,
    errors: (err: string) => void,
    page?: number,
    size?: number
  ) => {
    const res = await dentalServiceApi.getDentalServices(page, size);
    if (res.code === 200) {
      success(res.data ?? []);
      return;
    }
    errors(res.message);
  };
  const getDentalServiceBySlug = async (
    slug: string,
    success: (data: DentalService | null) => void,
    errors: (error: string) => void
  ) => {
    const res = await dentalServiceApi.getDentalServiceDetails({ slug: slug });
    if (res.code === 200) {
      success(res.data);
      return;
    }
    errors(res.message);
  };
  return {
    getDentalServices: getDentalServices,
    getDentalServiceBySlug: getDentalServiceBySlug,
  };
};

export default useDentalService;
