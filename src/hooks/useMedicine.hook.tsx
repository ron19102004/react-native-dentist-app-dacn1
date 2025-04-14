import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";
import medicineApi, {
  CreateMedicineRequest,
  SearchMedicineOptions,
} from "../apis/medicine.api";
import { Medicine } from "../apis/model.d";

export interface MedicineContextType {
  createMedicine(
    data: CreateMedicineRequest,
    success: () => void,
    errors: (error: string) => void
  ): Promise<void>;
  searchMedicine(
    success: (data: Array<Medicine>) => void,
    errors: (error: string) => void,
    options?: SearchMedicineOptions | null
  ): Promise<void>;
}
const useMedicine = (): MedicineContextType => {
  const { ifAuthFn } = useContext(AuthContext);
  const searchMedicine = async (
    success: (data: Array<Medicine>) => void,
    errors: (error: string) => void,
    options?: SearchMedicineOptions | null
  ) => {
    await ifAuthFn(
      async (token) => {
        const res = await medicineApi.searchMedicines(token, options);
        if (res.code === 200) {
          success(res.data ?? []);
          return;
        }
        errors(res.message);
      },
      (error) => {
        errors(error);
      }
    );
  };
  const createMedicine = async (
    data: CreateMedicineRequest,
    success: () => void,
    errors: (error: string) => void
  ) => {
    await ifAuthFn(
      async (token) => {
        const res = await medicineApi.createMedicine(data, token);
        if (res.code === 200) success();
        else errors(res.message);
      },
      (error) => {
        errors(error);
      }
    );
  };

  return {
    createMedicine: createMedicine,
    searchMedicine: searchMedicine,
  };
};

export default useMedicine;
