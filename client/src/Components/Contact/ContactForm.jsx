import React from 'react';
import { Box, Typography,Grid,OutlinedInput,InputLabel,Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useForm } from "react-hook-form";
import emailjs from '@emailjs/browser';

const ContactForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleUserData =  async (data) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailPattern.test(data.email)){
            alert('Please provide a valid email!!');
            return;
        }
        try {

         const response = await emailjs.send("service_go8gr4u","template_iy26d4b",{
            name: data.name,
            email: data.email,
            message: data.message,
            },'sbZ4_ZBdtoGSG8K_K');
            alert(response);
        } catch (error) {
         alert(error)
      }
    }

  return (
    <Box
    component='form'
    onSubmit={handleSubmit(handleUserData)}
        sx={{
            padding:3,
            elevation:3,
            height:'100%',
        }}
    >
        <Grid container>
            <Grid item xs={12}>
                <Typography variant='h5' mb={1}></Typography>
                <strong><Typography variant='h3' mb={5} ></Typography></strong>
            </Grid>
            <Grid item xs={12}>
                <InputLabel htmlFor="Name">
                    <Typography variant='body1' mb={1} sx={{fontWeight:'bold', color:'gold'}}>Name</Typography>
                </InputLabel>
                <OutlinedInput
                    fullWidth={true}
                   
                    placeholder="what is your Name?"
                    id="Name"
                    {...register('name', { required: "Name can't be empty" })}
                />
                {errors.name ? (
                    <Typography color="error" variant="h7">
                        {errors.name.message}
                    </Typography>
                ): null}
            </Grid>
            <Grid item xs={12}>
                <InputLabel htmlFor="Email">
                    <Typography variant='body1' mb={1} mt={2} sx={{fontWeight:'bold',color:'gold'}}>Email</Typography>
                </InputLabel>
                <OutlinedInput
               
                    fullWidth={true}
                    placeholder="what is your Email?"
                    id="Email"
                    {...register('email', { required: "Email can't be empty" })}
                />
                {errors.email ? (
                    <Typography color="error" variant="h7">
                        {errors.email.message}
                    </Typography>
                ): null}
            </Grid>
            <Grid item xs={12}>
                <InputLabel htmlFor="Message">
                    <Typography variant='body1' mb={1} mt={2} sx={{fontWeight:'bold',color:'gold'}}>Your Message</Typography>
                </InputLabel>
                <OutlinedInput
               
                    fullWidth={true}
                    placeholder="what do you want to say?"
                    id="Message"
                    multiline
                    rows={4}
                    {...register('message', { required: "Message can't be empty" })}
                />
                {errors.message ? (
                    <Typography color="error" variant="h7">
                        {errors.message.message}
                    </Typography>
                ): null}
            </Grid>
        </Grid>
        <Button
            sx={{marginTop:3,}}
            variant="contained"
            // color="primary"
            
            startIcon={<SendIcon />}
            type="submit"
            
        >
            Send
        </Button>
    </Box>
  )
}

export default ContactForm