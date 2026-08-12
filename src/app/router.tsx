import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import DashboardLayout from "../layOut/DashboardLayout";

import ProtectedRoute from "../routes/ProtectedRoute";
import PublicRoute from "../routes/PublicRoute";
import AuthLayout from "../Modules/Auth/AuthLayOut";
import { Roles } from "../redux/auth/authTypes";


const Home = lazy(() => import("../Modules/Home/Home"));

// const Signup = lazy(() => import("../Modules/Auth/Signup"));
const LoginPageContent = lazy(() => import("../Modules/Auth/LoginPageContent"));
const Feature = lazy(() => import("../Modules/Feature/Feature"));
const Courses = lazy(() => import("../Modules/Courses/Courses"));
const Contact = lazy(() => import("../Modules/Contact/Contact"));
const News = lazy(() => import("../Modules/News/News"));
const Profile = lazy(() => import("../Modules/Profile/Profile"));


export const router = createBrowserRouter([
    {
        path: "/news",
        element: <News />
    },


    // Login / Signup

    {
        element: <PublicRoute />,

        children: [

            {
                path: "/algosaathi",
                element: <LoginPageContent />
            },

            {
                path: "/login",
                element: <AuthLayout />
            },

            {
                path: "/signup",
                element: <AuthLayout />
            }

        ]
    },



    // Dashboard

    {
        element: <ProtectedRoute allowedRoles={[Roles.USERS, Roles.ADMIN]} />,

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
                    },
                    {
                        path: "features",
                        element: <Feature />
                    },
                    {
                        path: "courses",
                        element: <Courses />
                    },
                    {
                        path: "contact",
                        element: <Contact />
                    },
                    {
                        path: "profile",
                        element: <Profile />
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