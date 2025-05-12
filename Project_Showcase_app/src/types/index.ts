export type FrontendProject = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveDemoUrl: string;
  githubUrl: string;
  features: string[];
  challenges: string[];
  solutions: string[];
  screenshots: string[];
};

export type SkillData = {
  category: string;
  level: number;
  color: string;
};

export type CodeExample = {
  id: string;
  name: string;
  description: string;
  code: string;
  language: string;
};
