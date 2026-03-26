import { useState } from "react";
import { GitBranch } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PatientForm, { type PatientData } from "@/components/PatientForm";
import DataTable from "@/components/DataTable";
import ResultCard from "@/components/ResultCard";
import { sampleDataset, patientHeaders, patientToRow } from "@/lib/sampleData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const DataSplitting = () => {
  const [dataset, setDataset] = useState<PatientData[]>([...sampleDataset]);
  const [splitResult, setSplitResult] = useState<{
    train: PatientData[];
    test: PatientData[];
    beforeDist: { name: string; count: number }[];
    afterDist: { name: string; count: number }[];
  } | null>(null);

  const handleAdd = (data: PatientData) => {
    setDataset((prev) => [...prev, data]);
  };

  const handleSplit = () => {
    const shuffled = [...dataset].sort(() => Math.random() - 0.5);
    const splitIdx = Math.floor(shuffled.length * 0.7);
    const train = shuffled.slice(0, splitIdx);
    const test = shuffled.slice(splitIdx);

    const countClasses = (arr: PatientData[]) => {
      const healthy = arr.filter((d) => d.diagnosis === "Healthy").length;
      const heart = arr.filter((d) => d.diagnosis === "Heart").length;
      return [
        { name: "Healthy", count: healthy },
        { name: "Heart", count: heart },
      ];
    };

    const beforeDist = countClasses(train);

    // Simple SMOTE simulation: duplicate minority class samples
    const healthyTrain = train.filter((d) => d.diagnosis === "Healthy");
    const heartTrain = train.filter((d) => d.diagnosis === "Heart");
    const majority = healthyTrain.length >= heartTrain.length ? healthyTrain : heartTrain;
    const minority = healthyTrain.length < heartTrain.length ? healthyTrain : heartTrain;

    const balanced = [...majority];
    while (balanced.length > minority.length) {
      // Duplicate random minority samples with slight noise
      const sample = { ...minority[Math.floor(Math.random() * minority.length)] };
      if (sample.age !== null) sample.age = sample.age + Math.floor(Math.random() * 5 - 2);
      if (sample.bmi !== null) sample.bmi = Math.round((sample.bmi + (Math.random() * 2 - 1)) * 10) / 10;
      minority.push(sample);
    }

    const afterDist = [
      { name: "Healthy", count: healthyTrain.length >= heartTrain.length ? majority.length : minority.length },
      { name: "Heart", count: healthyTrain.length < heartTrain.length ? majority.length : minority.length },
    ];

    setSplitResult({ train, test, beforeDist, afterDist });
  };

  const chartColors = ["hsl(160, 84%, 39%)", "hsl(0, 72%, 51%)"];

  return (
    <PageLayout
      title="Data Splitting & Resampling"
      subtitle="Train-test split with SMOTE balancing"
      icon={<GitBranch className="w-4 h-4 text-primary-foreground" />}
      gradientClass="gradient-accent"
    >
      <div className="space-y-6">
        <div className="bg-card border border-border rounded-xl p-5 shadow-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Add Patient to Dataset ({dataset.length} records)</h3>
          <PatientForm onSubmit={handleAdd} submitLabel="Add to Dataset" />
        </div>

        <div className="flex gap-3">
          <button onClick={handleSplit} className="gradient-accent text-accent-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition shadow-glow-accent">
            Perform 70/30 Split + SMOTE
          </button>
          <button onClick={() => setDataset([...sampleDataset])} className="bg-secondary text-secondary-foreground px-6 py-2.5 rounded-lg text-sm font-medium hover:opacity-80 transition">
            Reset Dataset
          </button>
        </div>

        <DataTable title={`Current Dataset (${dataset.length} records)`} headers={patientHeaders} rows={dataset.map(patientToRow)} />

        {splitResult && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ResultCard title="Training Set" value={splitResult.train.length} subtitle="70%" gradientClass="gradient-accent" />
              <ResultCard title="Test Set" value={splitResult.test.length} subtitle="30%" gradientClass="gradient-primary" />
              <ResultCard title="Before SMOTE" value={`${splitResult.beforeDist[0].count}/${splitResult.beforeDist[1].count}`} />
              <ResultCard title="After SMOTE" value={`${splitResult.afterDist[0].count}/${splitResult.afterDist[1].count}`} subtitle="Balanced" gradientClass="gradient-accent" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[{ title: "Before Balancing", data: splitResult.beforeDist }, { title: "After SMOTE Balancing", data: splitResult.afterDist }].map((chart) => (
                <div key={chart.title} className="bg-card border border-border rounded-xl p-5 shadow-card">
                  <h3 className="text-sm font-semibold text-foreground mb-3">{chart.title}</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={chart.data}>
                      <XAxis dataKey="name" tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} />
                      <YAxis tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 12 }} />
                      <Tooltip contentStyle={{ background: "hsl(220, 18%, 14%)", border: "1px solid hsl(220, 14%, 22%)", borderRadius: 8, color: "hsl(210, 20%, 92%)" }} />
                      <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                        {chart.data.map((_, i) => (
                          <Cell key={i} fill={chartColors[i]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default DataSplitting;
