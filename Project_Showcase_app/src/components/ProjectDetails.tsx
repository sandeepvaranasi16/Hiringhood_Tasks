import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  IconButton,
  Grid,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";
import { FaTools } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import { Close as CloseIcon, GitHub, ShareRounded } from "@mui/icons-material";
import type { FrontendProject } from "../types";
import { motion, AnimatePresence } from "framer-motion";
import { techIcons } from "../utils/techIcons";
const FullScreenDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    margin: 0,
    maxWidth: "100%",
    [theme.breakpoints.up("md")]: {
      width: "80vw",
      maxHeight: "90vh",
    },
    [theme.breakpoints.down("md")]: {
      width: "100vw",
      maxHeight: "100vh",
      borderRadius: 0,
    },
  },
}));

const ImageGallery = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  overflowX: "auto",
  padding: theme.spacing(1),
  "&::-webkit-scrollbar": {
    height: 8,
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[200],
    borderRadius: 4,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[600]
        : theme.palette.grey[400],
    borderRadius: 4,
  },
}));

const ProjectImage = styled("img")(({ theme }) => ({
  height: 250,
  objectFit: "cover",
  borderRadius: theme.shape.borderRadius,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 4px 12px rgba(0, 0, 0, 0.5)"
      : "0 4px 12px rgba(0, 0, 0, 0.1)",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.primary.main,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
}));

interface ProjectDetailsProps {
  project: FrontendProject | null;
  open: boolean;
  onClose: () => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  project,
  open,
  onClose,
}) => {
  const theme = useTheme();

  if (!project) return null;

  return (
    <AnimatePresence>
      {open && (
        <FullScreenDialog
          open={open}
          onClose={onClose}
          aria-labelledby="project-details-title"
          maxWidth="lg"
          fullWidth>
          <DialogTitle
            id="project-details-title"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}>
              <Typography variant="h4">{project.title}</Typography>
            </motion.div>
            <IconButton aria-label="close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 }}>
              <Box sx={{ mb: 3, mt: 2 }}>
                <Typography variant="body1" paragraph>
                  {project.description}
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                  {project.techStack.map((tech, index) => {
                    const Icon = techIcons[tech];
                    return (
                      <Chip
                        key={index}
                        label={tech}
                        icon={Icon ? <Icon size={18} /> : <FaTools size={20} />}
                        color="primary"
                        variant="outlined"
                      />
                    );
                  })}
                </Box>
              </Box>

              <SectionTitle variant="h5">Screenshots</SectionTitle>
              <ImageGallery>
                {project.screenshots.map((screenshot, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}>
                    <ProjectImage
                      src={screenshot}
                      alt={`${project.title} screenshot ${index + 1}`}
                    />
                  </motion.div>
                ))}
              </ImageGallery>

              <Grid container spacing={4}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <SectionTitle variant="h5">Key Features</SectionTitle>
                  <List>
                    {project.features.map((feature, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <SectionTitle variant="h5">
                    Challenges & Solutions
                  </SectionTitle>
                  {project.challenges.map((challenge, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        color="text.primary"
                        fontWeight={500}>
                        Challenge:
                      </Typography>
                      <Typography variant="body2" paragraph>
                        {challenge}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.primary"
                        fontWeight={500}>
                        Solution:
                      </Typography>
                      <Typography variant="body2">
                        {project.solutions[index]}
                      </Typography>
                    </Box>
                  ))}
                </Grid>
              </Grid>
            </motion.div>
          </DialogContent>

          <DialogActions
            sx={{
              padding: 2,
              borderTop: `1px solid ${theme.palette.divider}`,
            }}>
            <Button
              startIcon={<ShareRounded />}
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined">
              Live Demo
            </Button>

            <Button
              startIcon={<GitHub />}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined">
              View Code on GitHub
            </Button>

            <Button onClick={onClose} color="primary" variant="contained">
              Close
            </Button>
          </DialogActions>
        </FullScreenDialog>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetails;
