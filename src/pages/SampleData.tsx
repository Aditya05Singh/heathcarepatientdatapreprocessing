import { Database } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import DataTable from "@/components/DataTable";
import { sampleDataset, patientHeaders, patientToRow } from "@/lib/sampleData";

const SampleData = () => {
  return (
    <PageLayout title="Sample Data & Predictor Classification" subtitle="View sample dataset and predictor types" icon={<Database className="w-4 h-4 text-primary-foreground" />}>
      <div className="space-y-6">
        <DataTable
          title="Sample Patient Dataset (10 Records)"
          headers={patientHeaders}
          rows={sampleDataset.map(patientToRow)}
        />

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-xl p-5 shadow-card">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full gradient-primary" />
              Individual Predictors
            </h3>
            <ul className="space-y-2">
              {["Age", "Gender"].map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 shadow-card">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full gradient-accent" />
              Multiple Predictors
            </h3>
            <ul className="space-y-2">
              {["Blood Pressure", "Cholesterol", "BMI"].map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SampleData;
