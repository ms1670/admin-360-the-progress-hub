import React from 'react';
import { Typography, Container } from '@mui/material';

const Members: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Members Page
      </Typography>
      <Typography variant="body1">
        This is the Members page where you can manage and view all members.
      </Typography>
    </Container>
  );
};

export default Members;
