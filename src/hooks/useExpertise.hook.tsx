import { useContext } from "react";
import expertiseApi, {
  CreateExpertiseRequest,
  UpdateExpertiseRequest,
} from "../apis/expertise.api";
import { AuthContext } from "../contexts/auth.context";
import { ApiResponse, Expertise } from "../apis/model.d";
import { UseAuth } from "./useAuth";

export interface ExpertiseContextType {
  createExpertise(
    data: CreateExpertiseRequest,
    success: () => void,
    errors: (error: string) => void
  ): Promise<void>;
  updateExpertise(
    data: UpdateExpertiseRequest,
    success: () => void,
    errors: (error: string) => void
  ): Promise<void>;
  getAllExpertise(
    success: (data: Array<Expertise>) => void,
    errors: (error: string) => void
  ): Promise<void>;
  getDetailsBySlug(
    slug: string,
    success: (data: Expertise | null) => void,
    errors: (error: string) => void
  ): Promise<void>;
}
const useExpertise = (): ExpertiseContextType => {
  const { ifAuthFn } = useContext<UseAuth>(AuthContext);
  const getDetailsBySlug = async (
    slug: string,
    success: (data: Expertise | null) => void,
    errors: (error: string) => void
  ) => {
    try {
      const res = await expertiseApi.getExpertiseBySlugify(slug);
      if (res.code === 200) {
        success(res.data);
      } else {
        errors(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllExpertise = async (
    success: (data: Array<Expertise>) => void,
    errors: (error: string) => void
  ) => {
    try {
      const res = await expertiseApi.getAllExpertise();
      if (res.code === 200) {
        success(res?.data ?? []);
      } else {
        errors(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const createExpertise = async (
    data: CreateExpertiseRequest,
    success: () => void,
    errors: (error: string) => void
  ) => {
    await ifAuthFn<void>(
      async (token) => {
        const res = await expertiseApi.createExpertise(data, token);
        if (res.code === 200) {
          success();
        } else {
          errors(res.message);
        }
      },
      (error) => {
        errors(error);
      }
    );
  };
  const updateExpertise = async (
    data: UpdateExpertiseRequest,
    success: () => void,
    errors: (error: string) => void
  ) => {
    await ifAuthFn(
      async (token: string) => {
        const response = await expertiseApi.updateExpertise(data, token);
        if (response.code === 200) success();
        else errors(response.message);
      },
      (error) => {
        errors(error);
      }
    );
  };
  return {
    createExpertise: createExpertise,
    updateExpertise: updateExpertise,
    getAllExpertise: getAllExpertise,
    getDetailsBySlug: getDetailsBySlug,
  };
};

export default useExpertise;
