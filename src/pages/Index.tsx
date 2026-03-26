import { useNavigate } from "react-router-dom";
import { Database, AlertTriangle, Activity, BarChart3, GitBranch, Brain } from "lucide-react";

const sections = [
  { path: "/sample-data", title: "Sample Data & Predictors", desc: "View sample dataset and predictor classification", icon: Database, gradient: "gradient-primary" },
  { path: "/missing-values", title: "Missing Value Handling", desc: "Impute missing medical readings with mean values", icon: AlertTriangle, gradient: "gradient-warm" },
  { path: "/risk-score", title: "Risk Score Calculation", desc: "Compute patient risk using weighted formula", icon: Activity, gradient: "gradient-danger" },
  { path: "/binning", title: "Binning (Age & BMI)", desc: "Categorize continuous variables into discrete bins", icon: BarChart3, gradient: "gradient-purple" },
  { path: "/data-splitting", title: "Data Splitting & SMOTE", desc: "Train-test split with class balancing", icon: GitBranch, gradient: "gradient-accent" },
  { path: "/model-accuracy", title: "Model Accuracy & Tuning", desc: "Random Forest with GridSearchCV tuning", icon: Brain, gradient: "gradient-primary" },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border glass">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow-primary">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">Healthcare Patient Data Pre-processing</h1>
              <p className="text-sm text-muted-foreground">Interactive data analysis & ML pipeline dashboard</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, i) => (
            <button
              key={section.path}
              onClick={() => navigate(section.path)}
              className="group bg-card border border-border rounded-xl p-6 text-left hover:border-primary/40 transition-all duration-300 shadow-card hover:shadow-glow-primary animate-fade-in"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
            >
              <div className={`w-12 h-12 rounded-xl ${section.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <section.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h2 className="text-base font-semibold text-foreground mb-1">{section.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{section.desc}</p>
              <div className="mt-4 text-xs font-medium text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Open section →
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
