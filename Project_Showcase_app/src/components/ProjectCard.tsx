import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  CardMedia,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ShareRounded, GitHub, RemoveRedEye } from "@mui/icons-material";
import type { FrontendProject } from "../types";
import { motion } from "framer-motion";
import { techIcons } from "../utils/techIcons";
import { FaTools } from "react-icons/fa";

const StyledCard = styled(motion.create(Card))(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 8px 32px rgba(0, 0, 0, 0.5)"
        : "0 8px 32px rgba(0, 0, 0, 0.15)",
  },
}));

const CardImageWrapper = styled(CardMedia)(() => ({
  height: 200,
  position: "relative",
  overflow: "hidden",
}));

const TechChips = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(0.5),
  marginTop: theme.spacing(2),
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[800]
      : theme.palette.grey[200],
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[700]
        : theme.palette.grey[300],
  },
}));

interface ProjectCardProps {
  project: FrontendProject;
  onViewDetails: (project: FrontendProject) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onViewDetails,
}) => {
  return (
    <StyledCard
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <CardImageWrapper image={project.screenshots[0]} title={project.title} />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {project.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" paragraph>
          {project.description}
        </Typography>

        <TechChips>
          {project.techStack.map((tech, index) => {
            const Icon = techIcons[tech];
            return (
              <StyledChip
                key={index}
                icon={Icon ? <Icon size={16} /> : <FaTools size={20} />}
                label={tech}
                size="medium"
              />
            );
          })}
        </TechChips>
      </CardContent>

      <CardActions>
        <Button
          size="small"
          startIcon={<ShareRounded />}
          href={project.liveDemoUrl}
          target="_blank"
          rel="noopener noreferrer">
          Live Demo
        </Button>

        <Button
          size="small"
          startIcon={<GitHub />}
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer">
          GitHub
        </Button>

        <Button
          size="small"
          color="primary"
          startIcon={<RemoveRedEye />}
          onClick={() => onViewDetails(project)}>
          Details
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default ProjectCard;
