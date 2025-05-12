import React, { useState } from "react";
import {
  Grid,
  Typography,
  Container,
  TextField,
  InputAdornment,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Search } from "@mui/icons-material";
import type { FrontendProject } from "../types";
import ProjectCard from "./ProjectCard";
import ProjectDetails from "./ProjectDetails";
import { motion } from "framer-motion";

const SearchField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[800]
        : theme.palette.common.white,
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 2px 8px rgba(0, 0, 0, 0.3)"
        : "0 2px 8px rgba(0, 0, 0, 0.05)",
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(1),
  position: "relative",
  display: "inline-block",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -4,
    left: 0,
    width: 40,
    height: 4,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 2,
  },
}));

interface ProjectShowcaseProps {
  projects: FrontendProject[];
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] =
    useState<FrontendProject | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleViewDetails = (project: FrontendProject) => {
    setSelectedProject(project);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.techStack.some((tech) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}>
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Frontend Project Showcase
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: "auto" }}>
            A collection of responsive, interactive frontend projects built with
            modern technologies
          </Typography>
        </Box>
      </motion.div>

      <SearchField
        fullWidth
        placeholder="Search projects by name, description, or technology..."
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      <SectionTitle variant="h4" gutterBottom sx={{ mb: 4 }}>
        Featured Projects
      </SectionTitle>

      <Grid container spacing={3}>
        {filteredProjects.map((project, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.1 }}>
              <ProjectCard
                project={project}
                onViewDetails={handleViewDetails}
              />
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {filteredProjects.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No projects found matching your search criteria.
          </Typography>
        </Box>
      )}

      <ProjectDetails
        project={selectedProject}
        open={detailsOpen}
        onClose={handleCloseDetails}
      />
    </Container>
  );
};

export default ProjectShowcase;
