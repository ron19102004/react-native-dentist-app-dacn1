import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";
import medicineApi, { CreateMedicineRequest } from "../apis/medicine.api";

export interface MedicineContextType {
  createMedicine(
    data: CreateMedicineRequest,
    success: () => void,
    errors: (error: string) => void
  ): Promise<void>;
}
const useMedicine = (): MedicineContextType => {
  const { ifAuthFn } = useContext(AuthContext);
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
  };
};

export default useMedicine;
