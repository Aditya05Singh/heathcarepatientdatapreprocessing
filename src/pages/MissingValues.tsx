import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PatientForm, { type PatientData } from "@/components/PatientForm";
import DataTable from "@/components/DataTable";
import { sampleDataset } from "@/lib/sampleData";

const MissingValues = () => {
  const [result, setResult] = useState<{ original: PatientData; processed: PatientData } | null>(null);

  const handleSubmit = (data: PatientData) => {
    const numericFields: (keyof PatientData)[] = ["age", "bloodPressure", "cholesterol", "bmi"];
    const processed = { ...data };

    numericFields.forEach((field) => {
      if (processed[field] === null) {
        const values = sampleDataset.map((d) => d[field] as number);
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        (processed as any)[field] = Math.round(mean * 10) / 10;
      }
    });

    setResult({ original: data, processed });
  };

  const toRow = (p: PatientData) => [p.age, p.gender, p.bloodPressure, p.cholesterol, p.bmi, p.diagnosis];
  const headers = ["Age", "Gender", "BP", "Cholesterol", "BMI", "Diagnosis"];

  return (
    <PageLayout
      title="Handle Missing Medical Readings"
      subtitle="Replace missing values with dataset mean"
      icon={<AlertTriangle className="w-4 h-4 text-primary-foreground" />}
      gradientClass="gradient-warm"
    >
      <div className="space-y-6">
        <div className="bg-card border border-border rounded-xl p-5 shadow-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Enter Patient Data (leave fields empty to simulate missing values)</h3>
          <PatientForm onSubmit={handleSubmit} allowEmpty submitLabel="Fill Missing Values" />
        </div>

        {result && (
          <div className="grid md:grid-cols-2 gap-4">
            <DataTable title="Original Input" headers={headers} rows={[toRow(result.original)]} />
            <DataTable title="After Imputation" headers={headers} rows={[toRow(result.processed)]} />
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default MissingValues;
