import type { PatientData } from "@/components/PatientForm";

export const sampleDataset: PatientData[] = [
  { age: 45, gender: "Male", bloodPressure: 130, cholesterol: 220, bmi: 27.5, diagnosis: "Heart" },
  { age: 32, gender: "Female", bloodPressure: 110, cholesterol: 180, bmi: 22.1, diagnosis: "Healthy" },
  { age: 58, gender: "Male", bloodPressure: 145, cholesterol: 260, bmi: 31.2, diagnosis: "Heart" },
  { age: 29, gender: "Female", bloodPressure: 105, cholesterol: 170, bmi: 19.8, diagnosis: "Healthy" },
  { age: 51, gender: "Male", bloodPressure: 138, cholesterol: 240, bmi: 28.9, diagnosis: "Heart" },
  { age: 40, gender: "Female", bloodPressure: 118, cholesterol: 195, bmi: 23.4, diagnosis: "Healthy" },
  { age: 63, gender: "Male", bloodPressure: 155, cholesterol: 280, bmi: 32.1, diagnosis: "Heart" },
  { age: 35, gender: "Female", bloodPressure: 112, cholesterol: 185, bmi: 21.5, diagnosis: "Healthy" },
  { age: 48, gender: "Male", bloodPressure: 128, cholesterol: 210, bmi: 26.3, diagnosis: "Heart" },
  { age: 27, gender: "Female", bloodPressure: 100, cholesterol: 165, bmi: 20.2, diagnosis: "Healthy" },
];

export const patientToRow = (p: PatientData): (string | number | null)[] => [
  p.age, p.gender, p.bloodPressure, p.cholesterol, p.bmi, p.diagnosis,
];

export const patientHeaders = ["Age", "Gender", "Blood Pressure", "Cholesterol", "BMI", "Diagnosis"];
