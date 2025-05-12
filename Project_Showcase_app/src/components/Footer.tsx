import React from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Link,
  Grid,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { GitHub, LinkedIn, Twitter, Mail, CodeSharp } from "@mui/icons-material";

const FooterWrapper = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[900]
      : theme.palette.grey[100],
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  marginTop: "auto",
}));

const FooterLogo = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color:
    theme.palette.mode === "dark"
      ? theme.palette.grey[400]
      : theme.palette.grey[700],
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Box sx={{ mb: 2 }}>
              <FooterLogo variant="h6">
                <CodeSharp />
                The Expose
              </FooterLogo>
            </Box>
            <Typography variant="body2" color="text.secondary">
              A showcase of modern frontend projects built with React,
              TypeScript, and other cutting-edge technologies.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <SocialIcon aria-label="GitHub">
                <GitHub />
              </SocialIcon>
              <SocialIcon aria-label="LinkedIn">
                <LinkedIn />
              </SocialIcon>
              <SocialIcon aria-label="Twitter">
                <Twitter />
              </SocialIcon>
              <SocialIcon aria-label="Email">
                <Mail />
              </SocialIcon>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h6" gutterBottom>
              Resources
            </Typography>
            <Link
              href="https://react.dev"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              display="block"
              sx={{ mb: 1 }}>
              React Documentation
            </Link>
            <Link
              href="https://mui.com"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              display="block"
              sx={{ mb: 1 }}>
              Material UI
            </Link>
            <Link
              href="https://www.framer.com/motion"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              display="block"
              sx={{ mb: 1 }}>
              Framer Motion
            </Link>
            <Link
              href="https://www.typescriptlang.org"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              display="block">
              TypeScript
            </Link>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}>
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} Frontend Showcase. All rights
            reserved.
          </Typography>
          <Box flexDirection={"row"} display="flex" alignItems="center">
            <Link href="#" color="inherit" sx={{ ml: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Privacy Policy
              </Typography>
            </Link>
            <Link href="#" color="inherit" sx={{ ml: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Terms of Service
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
