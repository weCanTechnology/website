// src/types.ts

export interface NavLink {
  href: string;
  text: string;
}

export interface Stat {
  number: string;
  text: string;
}

export interface Service {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface WorkItem {
  client: string;
  tags: string[];
  title: string;
  description: string;
  link: string;
  slug: string;
  heroImage: string;
  galleryImages?: string[];
}

export interface BlogPost {
  date: string;
  title: string;
  image: string;
  link: string;
}

export interface Client {
  name: string;
  logo: string;
}

export interface Tech {
  name: string;
  logo: string;
}

export interface JobPosition {
  title: string;
  description: string;
  tags: string[];
  applyLink: string;
}
