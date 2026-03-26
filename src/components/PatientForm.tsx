import { useState } from "react";

export interface PatientData {
  age: number | null;
  gender: string;
  bloodPressure: number | null;
  cholesterol: number | null;
  bmi: number | null;
  diagnosis: string;
}

const emptyPatient: PatientData = {
  age: null,
  gender: "Male",
  bloodPressure: null,
  cholesterol: null,
  bmi: null,
  diagnosis: "Healthy",
};

interface PatientFormProps {
  onSubmit: (data: PatientData) => void;
  allowEmpty?: boolean;
  submitLabel?: string;
}

const PatientForm = ({ onSubmit, allowEmpty = false, submitLabel = "Process Data" }: PatientFormProps) => {
  const [form, setForm] = useState<PatientData>({ ...emptyPatient });

  const handleChange = (field: keyof PatientData, value: string) => {
    if (["age", "bloodPressure", "cholesterol", "bmi"].includes(field)) {
      setForm((f) => ({ ...f, [field]: value === "" ? null : Number(value) }));
    } else {
      setForm((f) => ({ ...f, [field]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allowEmpty) {
      if (form.age === null || form.bloodPressure === null || form.cholesterol === null || form.bmi === null) return;
    }
    onSubmit(form);
  };

  const inputClass =
    "w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition";
  const labelClass = "block text-xs font-medium text-muted-foreground mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div>
        <label className={labelClass}>Age</label>
        <input
          type="number"
          className={inputClass}
          placeholder={allowEmpty ? "Optional" : "e.g. 45"}
          value={form.age ?? ""}
          onChange={(e) => handleChange("age", e.target.value)}
        />
      </div>
      <div>
        <label className={labelClass}>Gender</label>
        <select className={inputClass} value={form.gender} onChange={(e) => handleChange("gender", e.target.value)}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div>
        <label className={labelClass}>Blood Pressure</label>
        <input
          type="number"
          className={inputClass}
          placeholder={allowEmpty ? "Optional" : "e.g. 120"}
          value={form.bloodPressure ?? ""}
          onChange={(e) => handleChange("bloodPressure", e.target.value)}
        />
      </div>
      <div>
        <label className={labelClass}>Cholesterol</label>
        <input
          type="number"
          className={inputClass}
          placeholder={allowEmpty ? "Optional" : "e.g. 200"}
          value={form.cholesterol ?? ""}
          onChange={(e) => handleChange("cholesterol", e.target.value)}
        />
      </div>
      <div>
        <label className={labelClass}>BMI</label>
        <input
          type="number"
          step="0.1"
          className={inputClass}
          placeholder={allowEmpty ? "Optional" : "e.g. 24.5"}
          value={form.bmi ?? ""}
          onChange={(e) => handleChange("bmi", e.target.value)}
        />
      </div>
      <div>
        <label className={labelClass}>Diagnosis</label>
        <select className={inputClass} value={form.diagnosis} onChange={(e) => handleChange("diagnosis", e.target.value)}>
          <option value="Healthy">Healthy</option>
          <option value="Heart">Heart Disease</option>
        </select>
      </div>
      <div className="col-span-2 md:col-span-3">
        <button
          type="submit"
          className="gradient-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition shadow-glow-primary"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default PatientForm;
export { emptyPatient };
