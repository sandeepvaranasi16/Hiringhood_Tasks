import { Card, CardContent, Typography, Chip, Stack } from '@mui/material';
import { Task } from '../types/task';
import { useNavigate } from 'react-router-dom';

export default function TaskCard({ task }: { task: Task }) {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/task/${task.id}`)} sx={{ cursor: 'pointer' }}>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Stack direction="row" spacing={1} mt={1}>
          <Chip label={task.priority} color="primary" />
          <Chip label={task.status} color="secondary" />
          <Chip label={task.dueDate} variant="outlined" />
        </Stack>
      </CardContent>
    </Card>
  );
}