import React from "react";
import { Box, Typography, Container, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { motion } from "framer-motion";
import type { SkillData } from "../types";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

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

const SkillContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const RadarContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 600,
  margin: "0 auto",
  padding: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));

interface SkillsRadarProps {
  skills: SkillData[];
}

const SkillsRadar: React.FC<SkillsRadarProps> = ({ skills }) => {
  const theme = useTheme();

  const data = {
    labels: skills.map((skill) => skill.category),
    datasets: [
      {
        label: "Skill Level",
        data: skills.map((skill) => skill.level),
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(187, 134, 252, 0.2)"
            : "rgba(98, 0, 234, 0.2)",
        borderColor:
          theme.palette.mode === "dark"
            ? "rgb(187, 134, 252)"
            : "rgb(98, 0, 234)",
        borderWidth: 2,
        pointBackgroundColor: skills.map((skill) => skill.color),
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: theme.palette.primary.main,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          backdropColor: "transparent",
          color: theme.palette.text.secondary,
        },
        pointLabels: {
          font: {
            size: 14,
            weight: "bold" as const,
          },
          color: theme.palette.text.primary,
        },
        grid: {
          color:
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)",
        },
        angleLines: {
          color:
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(30, 30, 30, 0.8)"
            : "rgba(255, 255, 255, 0.8)",
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.primary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function (context: any) {
            return `${context.label}: ${context.raw}%`;
          },
        },
      },
    },
    maintainAspectRatio: true,
  };

  return (
    <Container maxWidth="lg">
      <SkillContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: "100%" }}>
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <SectionTitle variant="h4" gutterBottom>
              Technical Skills
            </SectionTitle>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 700, mx: "auto" }}>
              A visual representation of my frontend development skills and
              proficiency levels
            </Typography>
          </Box>

          <RadarContainer>
            <Radar data={data} options={options} />
          </RadarContainer>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 2,
              mt: 4,
            }}>
            {skills.map((skill) => (
              <Box
                key={skill.category}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.05)",
                  borderRadius: 2,
                  padding: 1,
                  px: 2,
                }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: skill.color,
                  }}
                />
                <Typography variant="body2">
                  {skill.category}: {skill.level}%
                </Typography>
              </Box>
            ))}
          </Box>
        </motion.div>
      </SkillContainer>
    </Container>
  );
};

export default SkillsRadar;
