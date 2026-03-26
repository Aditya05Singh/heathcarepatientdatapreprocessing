import { useState } from "react";
import { BarChart3 } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PatientForm, { type PatientData } from "@/components/PatientForm";
import ResultCard from "@/components/ResultCard";

const getAgeCategory = (age: number) => {
  if (age <= 30) return "Young";
  if (age <= 50) return "Middle";
  return "Old";
};

const getBmiCategory = (bmi: number) => {
  if (bmi < 18.5) return "Underweight";
  if (bmi <= 25) return "Normal";
  if (bmi <= 30) return "Overweight";
  return "Obese";
};

const Binning = () => {
  const [result, setResult] = useState<{ ageCategory: string; bmiCategory: string; age: number; bmi: number } | null>(null);

  const handleSubmit = (data: PatientData) => {
    if (data.age === null || data.bmi === null) return;
    setResult({
      age: data.age,
      bmi: data.bmi,
      ageCategory: getAgeCategory(data.age),
      bmiCategory: getBmiCategory(data.bmi),
    });
  };

  return (
    <PageLayout
      title="Binning (Age & BMI)"
      subtitle="Categorize continuous values into bins"
      icon={<BarChart3 className="w-4 h-4 text-primary-foreground" />}
      gradientClass="gradient-purple"
    >
      <div className="space-y-6">
        <div className="bg-card border border-border rounded-xl p-5 shadow-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Enter Patient Data</h3>
          <PatientForm onSubmit={handleSubmit} submitLabel="Apply Binning" />
        </div>

        {result && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ResultCard title="Age" value={result.age} />
            <ResultCard title="Age Category" value={result.ageCategory} subtitle={result.ageCategory} gradientClass="gradient-purple" />
            <ResultCard title="BMI" value={result.bmi} />
            <ResultCard title="BMI Category" value={result.bmiCategory} subtitle={result.bmiCategory} gradientClass="gradient-accent" />
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-xl p-5 shadow-card">
            <h3 className="text-sm font-semibold text-foreground mb-3">Age Bins</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><span className="font-mono text-primary">0–30</span> → Young</p>
              <p><span className="font-mono text-primary">31–50</span> → Middle</p>
              <p><span className="font-mono text-primary">51+</span> → Old</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 shadow-card">
            <h3 className="text-sm font-semibold text-foreground mb-3">BMI Bins</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><span className="font-mono text-accent">&lt;18.5</span> → Underweight</p>
              <p><span className="font-mono text-accent">18.5–25</span> → Normal</p>
              <p><span className="font-mono text-accent">25–30</span> → Overweight</p>
              <p><span className="font-mono text-accent">&gt;30</span> → Obese</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Binning;
