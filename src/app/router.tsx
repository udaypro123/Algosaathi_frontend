import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import DashboardLayout from "../layOut/DashboardLayout";

import ProtectedRoute from "../routes/ProtectedRoute";
import PublicRoute from "../routes/PublicRoute";


const Home = lazy(() => import("../Modules/Home/Home"));
const Login = lazy(() => import("../Modules/Auth/Login"));
const Signup = lazy(() => import("../Modules/Auth/Signup"));


export const router = createBrowserRouter([


    // Login / Signup

    {
        element: <PublicRoute />,

        children: [

            {
                path: "/login",
                element: <Login />
            },

            {
                path: "/signup",
                element: <Signup />
            }

        ]
    },



    // Dashboard

    {
        element: <ProtectedRoute />,

        children: [

            {
                path: "/",
                element: <DashboardLayout />,

                children: [

                    {
                        index: true,
                        element: <Navigate to="/home" replace />
                    },

                    {
                        path: "home",
                        element: <Home />
                    }

                ]

            }

        ]

    },


    // fallback

    {
        path: "*",
        element: <Navigate to="/login" replace />
    }


]);