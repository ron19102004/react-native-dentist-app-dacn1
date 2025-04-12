import { useContext } from "react";
import medicineCategoryApi, {
  CreateMedicineCategoryRequest,
} from "../apis/medicine-category.api";
import { AuthContext } from "../contexts/auth.context";
import { ApiResponse, MedicineCategory } from "../apis/model.d";

export interface MedicineContextType {
  createMedicineCategory(
    data: CreateMedicineCategoryRequest,
    success: () => void,
    errors: (error: string) => void
  ): Promise<void>;
  getMedicineCategories(): Promise<MedicineCategory[]>;
}
const useMedicineCategory = (): MedicineContextType => {
  const { ifAuthFn } = useContext(AuthContext);
  const createMedicineCategory = async (
    data: CreateMedicineCategoryRequest,
    success: () => void,
    errors: (error: string) => void
  ) => {
    await ifAuthFn(
      async (token) => {
        await medicineCategoryApi.createMedicineCategory(data, token);
        success();
      },
      (error) => {
        errors(error);
      }
    );
  };

  const getMedicineCategories = async () => {
    const res = await ifAuthFn<ApiResponse<Array<MedicineCategory>>>(
      async (token) => {
        return await medicineCategoryApi.getAllMedicineCategory(token);
      },
      (error) => {
        console.log(error);
      }
    );
    if(res?.code === 200){
      return res.data ?? []
    }
    return []
  };

  return {
    createMedicineCategory: createMedicineCategory,
    getMedicineCategories: getMedicineCategories,
  };
};

export default useMedicineCategory;
