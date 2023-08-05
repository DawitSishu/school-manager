import { Grid, Typography } from '@mui/material';
import React from 'react'

const Classes = ({teacher}) => {
  console.log(teacher);
  return (
    <Grid>
      <Grid container>
        <Typography variant='h5'>The classes you Teach.</Typography>
      </Grid>
    </Grid>
  )
}

export default Classes