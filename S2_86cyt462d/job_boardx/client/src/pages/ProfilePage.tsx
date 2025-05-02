import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  Stack,
  Typography,
  CircularProgress,
  Link,
} from "@mui/material";
import * as Yup from "yup";
import { fetchMyProfile, updateProfile } from "../services/profileService";
import { Profile } from "../types/profile";

interface ProfileFormValues {
  fullName: string;
  bio: string;
  skills: string;
  experience: string;
  resumeLink: string;
}

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  bio: Yup.string().required("Bio is required"),
  skills: Yup.string().required("At least one skill is required"),
  experience: Yup.string().required("Experience is required"),
  resumeLink: Yup.string()
    .url("Enter a valid URL")
    .required("Resume link is required"),
});

const ProfilePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState<ProfileFormValues | null>(null);

  const formik = useFormik({
    initialValues: profile || {
      fullName: "",
      bio: "",
      skills: "",
      experience: "",
      resumeLink: "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      const updatedProfile: Profile = {
        fullName: values.fullName,
        bio: values.bio,
        experience: values.experience,
        resumeLink: values.resumeLink,
        skills: values.skills.split(",").map((s) => s.trim()),
      };

      try {
        await updateProfile(updatedProfile);
        setEditMode(false);
        setProfile(values); // keep in sync
      } catch (err) {
        console.error("Profile update failed:", err);
        alert("Failed to update profile.");
      }
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchMyProfile();
        setProfile({
          fullName: data.fullName || "",
          bio: data.bio || "",
          skills: Array.isArray(data.skills) ? data.skills.join(", ") : "",
          experience: data.experience || "",
          resumeLink: data.resumeLink || "",
        });
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return <CircularProgress sx={{ mx: "auto", mt: 4, display: "block" }} />;

  if (!profile) return <Typography>Profile not found</Typography>;

  return (
    <Stack spacing={3} sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h4">My Profile</Typography>

      {editMode ? (
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Full Name"
              {...formik.getFieldProps("fullName")}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
            <TextField
              label="Bio"
              multiline
              minRows={3}
              {...formik.getFieldProps("bio")}
              error={formik.touched.bio && Boolean(formik.errors.bio)}
              helperText={formik.touched.bio && formik.errors.bio}
            />
            <TextField
              label="Skills (comma-separated)"
              {...formik.getFieldProps("skills")}
              error={formik.touched.skills && Boolean(formik.errors.skills)}
              helperText={formik.touched.skills && formik.errors.skills}
            />
            <TextField
              label="Experience"
              {...formik.getFieldProps("experience")}
              error={
                formik.touched.experience && Boolean(formik.errors.experience)
              }
              helperText={formik.touched.experience && formik.errors.experience}
            />
            <TextField
              label="Resume Link"
              {...formik.getFieldProps("resumeLink")}
              error={
                formik.touched.resumeLink && Boolean(formik.errors.resumeLink)
              }
              helperText={formik.touched.resumeLink && formik.errors.resumeLink}
            />
            <Stack direction="row" spacing={2}>
              <Button type="submit" variant="contained" color="primary">
                Save Profile
              </Button>
              <Button
                type="button"
                variant="outlined"
                onClick={() => setEditMode(false)}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        </form>
      ) : (
        <Stack spacing={2}>
          <Typography>
            <strong>Name:</strong> {profile.fullName}
          </Typography>
          <Typography>
            <strong>Bio:</strong> {profile.bio}
          </Typography>
          <Typography>
            <strong>Skills:</strong> {profile.skills}
          </Typography>
          <Typography>
            <strong>Experience:</strong> {profile.experience}
          </Typography>
          <Typography>
            <strong>Resume:</strong>{" "}
            <Link href={profile.resumeLink} target="_blank" rel="noopener">
              View Resume
            </Link>
          </Typography>
          <Button variant="contained" onClick={() => setEditMode(true)}>
            Edit Profile
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default ProfilePage;
