import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PatientForm, { type PatientData } from "@/components/PatientForm";
import { sampleDataset } from "@/lib/sampleData";

const MissingValues = () => {
  const [result, setResult] = useState<{ original: PatientData; processed: PatientData; imputedFields: string[] } | null>(null);
  const [formKey, setFormKey] = useState(0);

  const handleSubmit = (data: PatientData) => {
    const numericFields: (keyof PatientData)[] = ["age", "bloodPressure", "cholesterol", "bmi"];
    const processed = { ...data };
    const imputedFields: string[] = [];

    numericFields.forEach((field) => {
      if (processed[field] === null) {
        const values = sampleDataset.map((d) => d[field] as number);
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        (processed as any)[field] = Math.round(mean * 10) / 10;
        imputedFields.push(field);
      }
    });

    setResult({ original: data, processed, imputedFields });
    setFormKey((k) => k + 1);
  };

  const headers = ["Age", "Gender", "Blood Pressure", "Cholesterol", "BMI", "Diagnosis"];
  const fieldKeys: (keyof PatientData)[] = ["age", "gender", "bloodPressure", "cholesterol", "bmi", "diagnosis"];

  const renderTable = (title: string, patient: PatientData, highlightImputed = false) => (
    <div className="bg-card border border-border rounded-xl p-5 shadow-card">
      <h3 className="text-sm font-semibold text-foreground mb-3">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              {headers.map((h) => (
                <th key={h} className="px-3 py-2 text-left text-xs font-medium text-muted-foreground border-b border-border">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {fieldKeys.map((key) => {
                const val = patient[key];
                const isImputed = highlightImputed && result?.imputedFields.includes(key);
                const isMissing = !highlightImputed && val === null;
                return (
                  <td
                    key={key}
                    className={`px-3 py-2 border-b border-border ${
                      isImputed ? "text-emerald-400 font-semibold bg-emerald-500/10 rounded" : 
                      isMissing ? "text-red-400 italic" : "text-foreground"
                    }`}
                  >
                    {val === null ? "NaN (Missing)" : val}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

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
          <PatientForm key={formKey} onSubmit={handleSubmit} allowEmpty submitLabel="Fill Missing Values" />
        </div>

        {result && (
          <>
            {result.imputedFields.length > 0 && (
              <div className="bg-accent/30 border border-accent rounded-lg p-3 text-sm text-accent-foreground">
                <span className="font-semibold">Imputed fields:</span>{" "}
                {result.imputedFields.map((f) => {
                  const label = f === "bloodPressure" ? "Blood Pressure" : f.charAt(0).toUpperCase() + f.slice(1);
                  const mean = sampleDataset.map((d) => d[f as keyof PatientData] as number).reduce((a, b) => a + b, 0) / sampleDataset.length;
                  return `${label} → ${Math.round(mean * 10) / 10}`;
                }).join(", ")}
                <span className="text-muted-foreground ml-1">(mean from sample dataset)</span>
              </div>
            )}
            <div className="grid md:grid-cols-2 gap-4">
              {renderTable("Original Input", result.original)}
              {renderTable("After Imputation", result.processed, true)}
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default MissingValues;
