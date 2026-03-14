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
}

export interface QuestionnaireAnswer {
  optionIndex: number | null;
  subOptionIndex?: number | null;
  expandableSubIndex?: number | null;
}
