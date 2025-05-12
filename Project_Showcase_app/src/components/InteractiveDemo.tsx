import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Button,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import type { CodeExample } from "../types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015, docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

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

const DemoContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(8),
}));

const CodePaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(3),
  overflow: "hidden",
  borderRadius: theme.shape.borderRadius,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 4px 20px rgba(0, 0, 0, 0.4)"
      : "0 4px 20px rgba(0, 0, 0, 0.1)",
}));

const LiveDemo = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(3),
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[900]
      : theme.palette.grey[100],
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

interface InteractiveDemoProps {
  codeExamples: CodeExample[];
}

const InteractiveDemo: React.FC<InteractiveDemoProps> = ({ codeExamples }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string | false>(
    codeExamples[0]?.id || false
  );
  const [visibleCode, setVisibleCode] = useState<Record<string, boolean>>({});

  const handleAccordionChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const toggleCodeView = (id: string) => {
    setVisibleCode((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderDemo = (id: string) => {
    if (id === "1") {
      return (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
          }}>
          <Button sx={buttonStyle.primary}>Primary Button</Button>
          <Button sx={buttonStyle.secondary}>Secondary Button</Button>
          <Button sx={buttonStyle.small}>Small Button</Button>
          <Button sx={buttonStyle.large}>Large Button</Button>
        </Box>
      );
    } else if (id === "2") {
      return (
        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            alert("This would open a modal in a real implementation")
          }>
          Open Demo Modal
        </Button>
      );
    }
    return null;
  };

  return (
    <Container maxWidth="lg">
      <DemoContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <SectionTitle variant="h4" gutterBottom>
              Interactive Component Demo
            </SectionTitle>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 700, mx: "auto" }}>
              Explore reusable React components with custom styling and
              animations
            </Typography>
          </Box>

          {codeExamples.map((example) => (
            <Accordion
              key={example.id}
              expanded={expanded === example.id}
              onChange={handleAccordionChange(example.id)}
              sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{example.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  {example.description}
                </Typography>

                <LiveDemo>{renderDemo(example.id)}</LiveDemo>

                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => toggleCodeView(example.id)}>
                    {visibleCode[example.id] ? "Hide Code" : "Show Code"}
                  </Button>
                </Box>

                {visibleCode[example.id] && (
                  <CodePaper>
                    <SyntaxHighlighter
                      language={example.language}
                      style={theme.palette.mode === "dark" ? vs2015 : docco}
                      showLineNumbers
                      customStyle={{
                        margin: 0,
                        padding: "16px",
                        borderRadius: "4px",
                        fontSize: "14px",
                      }}>
                      {example.code}
                    </SyntaxHighlighter>
                  </CodePaper>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </motion.div>
      </DemoContainer>
    </Container>
  );
};

const buttonStyle = {
  primary: {
    backgroundColor: "#6200ea",
    color: "white",
    border: "2px solid #6200ea",
    borderRadius: "4px",
    padding: "12px 20px",
    fontWeight: 500,
    fontSize: "16px",
    "&:hover": {
      opacity: 0.9,
      transform: "translateY(-2px)",
    },
  },
  secondary: {
    backgroundColor: "white",
    color: "#6200ea",
    border: "2px solid #6200ea",
    borderRadius: "4px",
    padding: "12px 20px",
    fontWeight: 500,
    fontSize: "16px",
    "&:hover": {
      opacity: 0.9,
      transform: "translateY(-2px)",
    },
  },
  small: {
    backgroundColor: "#6200ea",
    color: "white",
    border: "2px solid #6200ea",
    borderRadius: "4px",
    padding: "8px 16px",
    fontWeight: 500,
    fontSize: "14px",
    "&:hover": {
      opacity: 0.9,
      transform: "translateY(-2px)",
    },
  },
  large: {
    backgroundColor: "#6200ea",
    color: "white",
    border: "2px solid #6200ea",
    borderRadius: "4px",
    padding: "16px 24px",
    fontWeight: 500,
    fontSize: "18px",
    "&:hover": {
      opacity: 0.9,
      transform: "translateY(-2px)",
    },
  },
};

export default InteractiveDemo;
