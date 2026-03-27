export interface Option {
  label: string;
  description: string;
}

export interface SubOption {
  label: string;
  description: string;
}

export interface Question {
  title: string;
  type?: 'default' | 'expandable' | 'two-step' | 'with-test' | 'info-card';
  options: Option[];
  infoText?: string;
  expandableOption?: {
    label: string;
    description: string;
    subOptions: SubOption[];
  };
  subCategories?: Record<number, { code: string; label: string; description: string }[]>;
  testModal?: {
    buttonLabel: string;
    title: string;
    instructions: string;
    results: { condition: string; result: string }[];
  };
  // If set, selecting certain options triggers a medical flag
  // 'expandable' = selecting the expandable option triggers it
  // number[] = selecting any of these option indices triggers it
  medicalTrigger?: 'expandable' | number[];
}

export interface QuestionnaireAnswer {
  optionIndex: number | null;
  subOptionIndex?: number | null;
  expandableSubIndex?: number | null;
}
