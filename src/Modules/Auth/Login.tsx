import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Stack
} from "@mui/material";


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../API/api";


interface LoginForm {

    email: string;

    password: string;

}



const Login = () => {


    const navigate = useNavigate();


    const [form, setForm] = useState<LoginForm>({

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


            const response = await api.post(
                "/users",
                form
            );


            localStorage.setItem(
                "token",
                response.data.token
            );


            navigate("/dashboard");


        }

        catch (error) {

            console.log(error);

            alert("Invalid credentials");

        }


    };




    return (

        <Box

            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f5f5f5"
            }}

        >


            <Paper

                elevation={5}

                sx={{
                    width: 400,
                    p: 4,
                    borderRadius: 3
                }}

            >


                <Stack spacing={3}>


                    <Typography

                        variant="h4"

                        textAlign="center"

                        fontWeight={700}

                    >

                        Login

                    </Typography>



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

                        Login

                    </Button>



                    <Button

                        onClick={() => navigate("/signup")}

                    >

                        Create new account

                    </Button>


                </Stack>


            </Paper>


        </Box>

    );


}


export default Login;