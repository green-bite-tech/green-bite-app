export interface ScanResultFood {
  name: string;
  confidence: number;
  estimatedWeight: number;
  co2PerKg: number;
  totalCo2: number;
  category: string;
  matchedFromDatabase?: boolean;
  databaseId?: string;
}

export interface ScanResult {
  identifiedFoods: ScanResultFood[];
  totalEstimatedCo2: number;
  scanConfidence: number;
  notes: string;
}
