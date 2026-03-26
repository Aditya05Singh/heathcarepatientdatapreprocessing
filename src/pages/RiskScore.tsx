import { useState } from "react";
import { Activity } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PatientForm, { type PatientData } from "@/components/PatientForm";
import ResultCard from "@/components/ResultCard";

const RiskScore = () => {
  const [result, setResult] = useState<{ score: number; level: string } | null>(null);

  const handleSubmit = (data: PatientData) => {
    const score = 0.3 * (data.bloodPressure ?? 0) + 0.3 * (data.cholesterol ?? 0) + 0.4 * (data.bmi ?? 0);
    const rounded = Math.round(score * 100) / 100;
    const level = rounded > 120 ? "High Risk" : rounded > 80 ? "Medium Risk" : "Low Risk";
    setResult({ score: rounded, level });
  };

  return (
    <PageLayout
      title="Risk Score Calculation"
      subtitle="0.3×BP + 0.3×Cholesterol + 0.4×BMI"
      icon={<Activity className="w-4 h-4 text-primary-foreground" />}
      gradientClass="gradient-danger"
    >
      <div className="space-y-6">
        <div className="bg-card border border-border rounded-xl p-5 shadow-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Enter Patient Data</h3>
          <PatientForm onSubmit={handleSubmit} submitLabel="Calculate Risk Score" />
        </div>

        {result && (
          <div className="grid grid-cols-2 gap-4">
            <ResultCard title="Risk Score" value={result.score} />
            <ResultCard
              title="Risk Level"
              value={result.level}
              gradientClass={result.level === "High Risk" ? "gradient-danger" : result.level === "Medium Risk" ? "gradient-warm" : "gradient-accent"}
            />
          </div>
        )}

        <div className="bg-card border border-border rounded-xl p-5 shadow-card">
          <h3 className="text-sm font-semibold text-foreground mb-3">Formula</h3>
          <code className="font-mono text-sm text-primary">
            Risk Score = 0.3 × Blood Pressure + 0.3 × Cholesterol + 0.4 × BMI
          </code>
        </div>
      </div>
    </PageLayout>
  );
};

export default RiskScore;
