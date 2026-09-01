export interface TemplateItem {
  _id?: string;
  id?: string;
  title: string;
  category: string;
  description: string;
  tags?: string[];
  icon?: string;
  gradient?: string;
  images?: string[];
  url?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TemplateFormData {
  title: string;
  category: string;
  description: string;
  tags: string;
  icon: string;
  gradient: string;
  url: string;
  images: Array<string | File>;
}

export interface TemplateApiResponse {
  data?: TemplateItem[];
  templates?: TemplateItem[];
  message?: string;
}
