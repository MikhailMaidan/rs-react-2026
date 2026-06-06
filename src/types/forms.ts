export type FormType = 'Uncontrolled' | 'React Hook Form';

export interface BasicFormValues {
  name: string;
  age: number;
  email: string;
  gender: string;
  acceptedTerms: boolean;
}

export interface FormSubmission extends BasicFormValues {
  id: string;
  formType: FormType;
  createdAt: string;
}
