import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import SampleData from "./pages/SampleData";
import MissingValues from "./pages/MissingValues";
import RiskScore from "./pages/RiskScore";
import Binning from "./pages/Binning";
import DataSplitting from "./pages/DataSplitting";
import ModelAccuracy from "./pages/ModelAccuracy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sample-data" element={<SampleData />} />
          <Route path="/missing-values" element={<MissingValues />} />
          <Route path="/risk-score" element={<RiskScore />} />
          <Route path="/binning" element={<Binning />} />
          <Route path="/data-splitting" element={<DataSplitting />} />
          <Route path="/model-accuracy" element={<ModelAccuracy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
