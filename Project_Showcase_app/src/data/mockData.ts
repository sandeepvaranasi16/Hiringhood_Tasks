import type { FrontendProject, SkillData, CodeExample } from "../types";

export const projects: FrontendProject[] = [
  {
    id: "1",
    title: "E-Commerce Dashboard",
    description:
      "A responsive admin dashboard with real-time analytics and inventory management for e-commerce businesses.",
    techStack: ["React", "TypeScript", "Material UI", "Redux"],
    liveDemoUrl: "https://example.com/ecommerce-dashboard",
    githubUrl: "https://github.com/example/ecom-dashboard",
    features: [
      "Real-time sales analytics",
      "Inventory management system",
      "Order processing workflow",
      "Customer relationship management",
    ],
    challenges: [
      "Complex state management across multiple components",
      "Real-time data synchronization",
      "Performance optimization for large datasets",
    ],
    solutions: [
      "Implemented Redux for centralized state management",
      "Used WebSockets for real-time updates",
      "Applied virtualization for large data tables",
    ],
    screenshots: [
      "https://images.pexels.com/photos/6956800/pexels-photo-6956800.jpeg",
      "https://images.pexels.com/photos/6956795/pexels-photo-6956795.jpeg",
    ],
  },
  {
    id: "2",
    title: "Social Media Platform",
    description:
      "A modern social networking application with real-time messaging and content sharing capabilities.",
    techStack: ["Next.js", "TypeScript", "Styled Components", "GraphQL"],
    liveDemoUrl: "https://example.com/social-platform",
    githubUrl: "https://github.com/example/social-platform",
    features: [
      "Real-time messaging",
      "Content sharing & discovery",
      "User profiles & authentication",
      "Notification system",
    ],
    challenges: [
      "Building a responsive and intuitive UI",
      "Implementing efficient real-time features",
      "Managing complex user permissions",
    ],
    solutions: [
      "Used Styled Components for consistent, theme-based UI",
      "Implemented GraphQL subscriptions for real-time updates",
      "Created a robust permission system with role-based access",
    ],
    screenshots: [
      "https://images.pexels.com/photos/5717479/pexels-photo-5717479.jpeg",
      "https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg",
    ],
  },
  {
    id: "3",
    title: "Weather Visualization App",
    description:
      "An interactive weather application with beautiful visualizations and forecasting capabilities.",
    techStack: ["React", "D3.js", "CSS Animations", "Weather API"],
    liveDemoUrl: "https://example.com/weather-app",
    githubUrl: "https://github.com/example/weather-visualization",
    features: [
      "Interactive weather maps",
      "5-day forecast with hourly breakdown",
      "Location-based weather alerts",
      "Historical weather data comparison",
    ],
    challenges: [
      "Creating intuitive data visualizations",
      "Handling large datasets efficiently",
      "Ensuring cross-browser compatibility",
    ],
    solutions: [
      "Leveraged D3.js for custom, interactive visualizations",
      "Implemented data caching and lazy loading",
      "Used feature detection and polyfills for cross-browser support",
    ],
    screenshots: [
      "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg",
      "https://images.pexels.com/photos/1463530/pexels-photo-1463530.jpeg",
    ],
  },
  {
    id: "4",
    title: "Task Management System",
    description:
      "A productivity application for teams to manage projects, tasks, and deadlines efficiently.",
    techStack: ["React", "Firebase", "Material UI", "React DnD"],
    liveDemoUrl: "https://example.com/task-management",
    githubUrl: "https://github.com/example/task-management",
    features: [
      "Kanban board with drag-and-drop",
      "Task assignment and tracking",
      "Project timelines and milestones",
      "Team collaboration tools",
    ],
    challenges: [
      "Creating an intuitive drag-and-drop interface",
      "Synchronizing data across multiple users",
      "Optimizing for mobile devices",
    ],
    solutions: [
      "Implemented React DnD for smooth drag-and-drop",
      "Used Firebase Realtime Database for sync",
      "Created responsive design with breakpoints for all devices",
    ],
    screenshots: [
      "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
      "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg",
    ],
  },
];

export const skills: SkillData[] = [
  { category: "React", level: 90, color: "#61DAFB" },
  { category: "TypeScript", level: 85, color: "#3178C6" },
  { category: "CSS/SCSS", level: 80, color: "#CC6699" },
  { category: "JavaScript", level: 95, color: "#F7DF1E" },
  { category: "Redux", level: 75, color: "#764ABC" },
  { category: "Next.js", level: 70, color: "#000000" },
  { category: "Material UI", level: 85, color: "#0081CB" },
  { category: "GraphQL", level: 65, color: "#E535AB" },
];

export const codeExamples: CodeExample[] = [
  {
    id: "1",
    name: "Custom Button Component",
    description:
      "A reusable button component with various states and animations",
    language: "jsx",
    code: `import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ButtonProps {
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
}

const StyledButton = styled(motion.button)<{ primary?: boolean; size?: string }>\`
  background-color: \${props => props.primary ? '#6200ea' : 'white'};
  color: \${props => props.primary ? 'white' : '#6200ea'};
  border: 2px solid #6200ea;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  
  padding: \${props => {
    switch(props.size) {
      case 'small': return '8px 16px';
      case 'large': return '16px 24px';
      default: return '12px 20px';
    }
  }};
  
  font-size: \${props => {
    switch(props.size) {
      case 'small': return '14px';
      case 'large': return '18px';
      default: return '16px';
    }
  }};
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
\`;

export const Button: React.FC<ButtonProps> = ({
  primary = false,
  size = 'medium',
  label,
  onClick,
}) => {
  return (
    <StyledButton 
      primary={primary}
      size={size}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </StyledButton>
  );
};
`,
  },
  {
    id: "2",
    name: "Modal Dialog Component",
    description: "A customizable modal dialog with animations",
    language: "jsx",
    code: `import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Overlay = styled(motion.div)\`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
\`;

const ModalContainer = styled(motion.div)\`
  background: white;
  border-radius: 8px;
  padding: 24px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
\`;

const ModalHeader = styled.div\`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
\`;

const Title = styled.h2\`
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  color: #333;
\`;

const CloseButton = styled.button\`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
\`;

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContainer
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <Title>{title}</Title>
              <CloseButton onClick={onClose}>×</CloseButton>
            </ModalHeader>
            {children}
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};
`,
  },
];
