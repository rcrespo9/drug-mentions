interface DrugReference {
  drugName: string;
  referenceCount: number;
  isStreetName: boolean;
  drugTypes?: string[];
}

export default DrugReference;
