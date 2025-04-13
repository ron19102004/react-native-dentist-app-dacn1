export interface ApiResponse<T> {
  code: number;
  message: StringDecoder;
  data: T | null;
  responseTime: string;
}
export interface DataNone {}
export enum Role {
  ADMIN = "ADMIN",
  DENTIST = "DENTIST",
  STAFF = "STAFF",
  PATIENT = "PATIENT",
}
export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}
export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  username: string;
  gender: Gender;
  active: boolean;
  role: Role;
  otpcode: string;
  otpexpiredAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Expertise {
  id: number;
  name: string;
  slugify: string;
  description: string;
  image?: string;
}

export interface MedicineCategory {
  id: number;
  name: string;
  description: string;
  image?: string;
}
export interface MedicineCategory {
  id: number;
  name: string;
  description: string;
  image?: string;
}

export interface Medicine {
  id: number;
  name: string;
  quantity: number;
  supplier: string;
  pricePerUnit: number;
  image?: string;
  expiryDate: string;
  medicineCategory: Pick<MedicineCategory, "id" | "name">;
}

export interface SystemInfoData {
  systemName: string;
  systemVersion: string;
  systemDescription: string;
  systemAuthor: string;
  systemAuthorEmail: string;
  systemAuthorPhone: string;
  systemAuthorWebsite: string;
  systemMapURL: string;
  systemAddress: string;
  systemFacebookURL: string;
  systemTwitterURL: string;
  systemInstagramURL: string;
  systemLinkedinURL: string;
}
interface MedicineCategory {
  id: number;
  name: string;
  description: string;
  imageURL: string;
  createdAt: string;
  updatedAt: string;
}

interface Expertise {
  id: number;
  name: string;
  slugify: string;
  description: string;
  image: string;
  createdAt: string; // hoặc Date nếu muốn parse
  updatedAt: string; // hoặc Date nếu muốn parse
}
export enum WorkStatus {
  DOING = "DOING",
  RETIRED = "RETIRED",
  PERSONAL_LEAVE = "PERSONAL_LEAVE",
}

export interface Expertise {
  id: number;
  name: string;
  slugify: string;
  description: string;
  image: string;
  createdAt: string; // hoặc Date nếu bạn muốn parse
  updatedAt: string; // hoặc Date nếu bạn muốn parse
}

export enum MedicineUnit {
  TABLET = "TABLET", // Viên nén
  CAPSULE = "CAPSULE", // Viên nang
  VIAL = "VIAL", // Lọ nhỏ (ống tiêm)
  BOTTLE = "BOTTLE", // Chai
  BOX = "BOX", // Hộp
  SACHET = "SACHET", // Gói
  TUBE = "TUBE", // Tuýp
  IMPULSE = "IMPULSE", // Ống
  ML = "ML", // Milliliter
  MG = "MG", // Milligram
  G = "G", // Gram
  DROP = "DROP", // Giọt
}
export interface Medicine {
  id: number;
  name: string;
  pricePerUnit: number;
  quantity: number;
  supplier: string;
  image: string;
  expiryDate: string; // hoặc Date nếu bạn muốn parse
  medicineUnit: MedicineUnit;
  createdAt: string; // hoặc Date
  updatedAt: string; // hoặc Date
  medicineCategory: MedicineCategory;
}

export interface DentalService {
  id: number;
  name: string;
  slugify: string;
  description: string;
  priceOrigin: number;
  priceCurrent: number;
  discount: number;
  createdAt: string; // hoặc Date nếu bạn xử lý dữ liệu ngày giờ
  updatedAt: string;
}
export interface Dentist {
  createdAt: string;
  updatedAt: string;
  id: number;
  dateStart: string; // yyyy-MM-dd
  workStatus: WorkStatus;
  active: boolean;
  user: User;
}
export interface DentistResponse {
  dateStart: string; // yyyy-MM-dd
  workStatus: WorkStatus;
  expertise: Expertise;
  fullName: string;
  email: string;
  phone: string;
}
export enum AppointmentStatus {
  WAITING = "WAITING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  FINISHED = "FINISHED",
}
export interface MedicineUsed {
  id: number;
  quantity: number;
  guide: string;
  name: string;
  pricePerUnit: number;
  unit: MedicineUnit;
}
export interface TreatmentRecordService {
  id: number;
  dentalService: DentalService;
  priceCurrent: number;
  note: string;
  createdAt: string;
}
export enum PaymentMethod {
  CASH = "CASH",
  TRANSFER = "TRANSFER",
  INSTALLMENT = "INSTALLMENT",
}

export interface Invoice {
  createdAt: string;
  updatedAt: string;
  id: number;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  paymentDate: string;
  collectorName: string;
}
export interface TreatmentRecord {
  id: number;
  treatment: string;
  diagnosis: string;
  updatedAt: string;
  treatmentRecordServices?: TreatmentRecordService[];
  invoice?: Invoice | null;
  medicineUseds?: MedicineUsed[];
}

export const textToGender = (value: string): Gender => {
  if (value.toUpperCase() === "MALE") return Gender.MALE;
  return Gender.FEMALE;
};
