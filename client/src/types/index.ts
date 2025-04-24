export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  slug: string;
}

export interface Section {
  id: string;
  title: string;
  subtitle?: string;
}
