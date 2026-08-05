import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Stack,
    
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../API/api";


interface SignupForm {
    name: string;
    email: string;
    password: string;
}


const Signup = () => {


    const navigate = useNavigate();


    const [form, setForm] = useState<SignupForm>({
        name: "",
        email: "",
        password: ""
    });



    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };



    const handleSubmit = async () => {

        try {

            await api.post("/users", form);

            navigate("/login");

        } catch (error) {

            console.log(error);

        }

    };



    return (

        <Box

            sx={{
                minHeight:"100vh",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                background:"#f5f5f5"
            }}

        >

            <Paper

                elevation={5}

                sx={{
                    width:400,
                    p:4,
                    borderRadius:3
                }}

            >

                <Stack spacing={3}>


                    <Typography
                        variant="h4"
                        textAlign="center"
                        fontWeight={700}
                    >
                        Create Account
                    </Typography>



                    <TextField

                        label="Full Name"

                        name="name"

                        value={form.name}

                        onChange={handleChange}

                        fullWidth

                    />



                    <TextField

                        label="Email"

                        name="email"

                        value={form.email}

                        onChange={handleChange}

                        fullWidth

                    />



                    <TextField

                        label="Password"

                        name="password"

                        type="password"

                        value={form.password}

                        onChange={handleChange}

                        fullWidth

                    />



                    <Button

                        variant="contained"

                        size="large"

                        onClick={handleSubmit}

                    >

                        Signup

                    </Button>



                    <Button

                        onClick={()=>navigate("/login")}

                    >

                        Already have account? Login

                    </Button>


                </Stack>


            </Paper>


        </Box>

    );

};


export default Signup;