import lazyWithRetry from "../utils/lazyWithRetry";
import { createBrowserRouter, Navigate } from "react-router-dom";
import DashboardLayout from "../layOut/DashboardLayout";
import ProtectedRoute from "../routes/ProtectedRoute";
import PublicRoute from "../routes/PublicRoute";
import AuthLayout from "../Modules/Auth/AuthLayOut";
import { Roles } from "../redux/auth/authTypes";



const Dashboard = lazyWithRetry(() => import("../Modules/Dashboards/container/Dashboard"));

// const Signup = lazy(() => import("../Modules/Auth/Signup"));

const AdminTemplateManager = lazyWithRetry(() => import("../Modules/Templates/container/AdminTemplateManager"));
const OurClient = lazyWithRetry(() => import("../Modules/AdminPannel/container/OurClient"));
const AddNews = lazyWithRetry(() => import("../Modules/News/AddNews"));
const Feature = lazyWithRetry(() => import("../Modules/Feature/Feature"));
const Courses = lazyWithRetry(() => import("../Modules/Courses/Courses"));
const Contact = lazyWithRetry(() => import("../Modules/Contact/Contact"));
const News = lazyWithRetry(() => import("../Modules/News/News"));
const Profile = lazyWithRetry(() => import("../Modules/Profile/Profile"));
const YoutubePost = lazyWithRetry(() => import("../Modules/AdminPannel/container/YoutubePost"));
const SendQuery = lazyWithRetry(() => import("../common/SendQuery"));
const AdminSurveyPage = lazyWithRetry(() => import("../Modules/AdminPannel/container/AdminSurveyPage"));
const CreateComplaint = lazyWithRetry(() => import("../Modules/ComplaintGOV_PRIVATE/CreateComplaint"));
const TemplateLibrary = lazyWithRetry(() => import("../Modules/Templates/container/TemplateLibrary"));
const Home = lazyWithRetry(() => import("../Modules/Home/Home"));
const Footer = lazyWithRetry(() => import("../common/Footer"));
const SEO = lazyWithRetry(() => import("../seo/SEO"));
const PublicHeader = lazyWithRetry(() => import("../common/PublicHeader"));


export const router = createBrowserRouter([

    {
        element: <PublicRoute />,
        children: [
            {
                path: "/home",
                element: (
                    <>
                        <SEO
                            title="Welcome to AlgoSaathi"
                            description="Start your learning journey with AlgoSaathi and unlock coding, AI, and career-focused growth resources."
                            canonical="https://algosaathi.com/algosaathi"
                        />
                        <PublicHeader />
                        <Home />
                        <Footer />
                    </>
                )
            },
            {
                path: "/login",
                element: (
                    <>
                        <SEO
                            title="Login"
                            description="Log in to your AlgoSaathi account to continue learning and tracking your development progress."
                            canonical="https://algosaathi.com/login"
                        />
                        <AuthLayout />
                    </>
                )
            },
            {
                path: "/sendquery",
                element: (
                    <>
                        <SEO
                            title="Send Query"
                            description="Contact AlgoSaathi for collaborations, learning support, or project opportunities."
                            canonical="https://algosaathi.com/sendquery"
                        />
                        <PublicHeader />
                        <SendQuery />
                        <Footer />
                    </>
                )
            },
            {
                path: "/signup",
                element: (
                    <>
                        <SEO
                            title="Sign Up"
                            description="Create your AlgoSaathi account and begin your journey in coding, AI, and modern software engineering."
                            canonical="https://algosaathi.com/signup"
                        />
                        <AuthLayout />
                    </>
                )
            },
            {
                path: "/news",
                element: (
                    <>
                        <SEO
                            title="News & Insights"
                            description="Explore developer news, AI trends, cloud updates, and software engineering stories from AlgoSaathi."
                            canonical="https://algosaathi.com/news"
                        />
                        <PublicHeader />
                        <News />
                        <Footer />
                    </>
                )
            },
            {
                path: "/contact",
                element: (
                    <>
                        <SEO
                            title="Contact"
                            description="Connect with AlgoSaathi for collaborations, freelance opportunities, and software engineering conversations."
                            canonical="https://algosaathi.com/contact"
                        />
                        <PublicHeader />
                        <Contact />
                        <Footer />
                    </>
                )
            },

            {
                path: "/templates",
                element: (
                    <>
                        <SEO
                            title="Templates"
                            description="Explore our collection of professionally designed templates for various industries and use cases."
                            canonical="https://algosaathi.com/templates"
                        />
                        <PublicHeader />
                        <TemplateLibrary />
                        <Footer />
                    </>
                )
            },
        ]
    },

    {
        element: <ProtectedRoute allowedRoles={[Roles.USERS, Roles.ADMIN, Roles.STUDENT]} />,
        children: [
            {
                element: <DashboardLayout />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="/dashboard" replace />
                    },
                    {
                        path: "dashboard",
                        element: (
                            <>
                                <SEO
                                    title="Dashboard"
                                    description="Track your learning progress, coding streaks, and skill growth on AlgoSaathi."
                                    canonical="https://algosaathi.com/dashboard"
                                />
                                <Dashboard />

                            </>
                        )
                    },
                    {
                        path: "features",
                        element: (
                            <>
                                <SEO
                                    title="Features"
                                    description="Discover the features of AlgoSaathi: coding courses, AI learning, real project work, and career-focused resources."
                                    canonical="https://algosaathi.com/features"
                                />
                                <Feature />
                            </>
                        )
                    },
                    {
                        path: "courses",
                        element: (
                            <>
                                <SEO
                                    title="Courses"
                                    description="Explore upcoming courses in JavaScript, React.js, Node.js, system design, DSA, TypeScript, and career-ready development skills."
                                    canonical="https://algosaathi.com/courses"
                                />
                                <Courses />
                            </>
                        )
                    },
                    {
                        path: "contact",
                        element: (
                            <>
                                <SEO
                                    title="Contact"
                                    description="Connect with AlgoSaathi for collaborations, freelance opportunities, and software engineering conversations."
                                    canonical="https://algosaathi.com/contact"
                                />
                                <Contact />
                            </>
                        )
                    },
                    {
                        path: "profile",
                        element: (
                            <>
                                <SEO
                                    title="Profile"
                                    description="View your AlgoSaathi profile and learning journey."
                                    canonical="https://algosaathi.com/profile"
                                />
                                <Profile />
                            </>
                        )
                    },
                    {
                        path: "youtubepost",
                        element: (
                            <>
                                <SEO
                                    title="YouTube Content"
                                    description="Access learning videos and content created for AlgoSaathi students."
                                    canonical="https://algosaathi.com/youtubepost"
                                />
                                <YoutubePost />
                            </>
                        )
                    },
                    {
                        path: "users-survey",
                        element: (
                            <>
                                <SEO
                                    title="User Survey"
                                    description="Review user survey insights and platform feedback for AlgoSaathi."
                                    canonical="https://algosaathi.com/users-survey"
                                />
                                <AdminSurveyPage />
                            </>
                        )
                    },
                    {
                        path: "complaint",
                        element: (
                            <>
                                <SEO
                                    title="User Survey"
                                    description="Review user survey insights and platform feedback for AlgoSaathi."
                                    canonical="https://algosaathi.com/users-survey"
                                />
                                <CreateComplaint />
                            </>
                        )
                    },
                    {
                        path: "ourclient",
                        element: (
                            <>
                                <SEO
                                    title="User Survey"
                                    description="Review user survey insights and platform feedback for AlgoSaathi."
                                    canonical="https://algosaathi.com/users-survey"
                                />
                                <OurClient />
                            </>
                        )
                    },

                ]
            }
        ]
    },
    {
        element: <ProtectedRoute allowedRoles={[Roles.ADMIN]} />,
        children: [
            {
                element: <DashboardLayout />,
                children: [
                    {
                        path: "admin/templates",
                        element: (
                            <>
                                <SEO
                                    title="Admin Templates"
                                    description="Manage and publish all Algosaathi templates from the admin dashboard."
                                    canonical="https://algosaathi.com/admin/templates"
                                />
                                <AdminTemplateManager />
                            </>
                        )
                    },
                    {
                        path: "addNews",
                        element: (
                            <>
                                <SEO
                                    title="User Survey"
                                    description="Review user survey insights and platform feedback for AlgoSaathi."
                                    canonical="https://algosaathi.com/users-survey"
                                />
                                <AddNews />
                            </>
                        )
                    },
                ]
            }
        ]
    },

    {
        path: "*",
        element: <Navigate to="/" replace />
    }
]);