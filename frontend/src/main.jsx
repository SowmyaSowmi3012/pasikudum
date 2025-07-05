import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import ErrorPage from "./components/Errorpage.jsx";
import CategoryPage from "./pages/category/CategoryPage.jsx";
import Search from "./pages/Search.jsx";
import SingleProduct from "./pages/products/SingleProduct.jsx";
import Recipes from "./pages/products/Recipes.jsx"
import Resources from "./pages/resources/Resources.jsx";
import About from "./pages/about/About.jsx";
import Contact from "./pages/contact/Contact.jsx";
import KitchenBasics from "./pages/resources/KitchenBasics.jsx";
import CookingTips from "./pages/resources/CookingTips.jsx";
import BeginnersGuide from "./pages/resources/BeginnersGuide.jsx";
import Glossary from "./pages/resources/Glossary.jsx";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";
import Dashboard from "./pages/dashboard/DashBoard.jsx";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import SavedRecipes from "./pages/dashboard/SavedRecipes.jsx";
import SubmitRecipe from "./pages/dashboard/SubmitRecipe.jsx";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import UsersPage from "./pages/admin/UsersPage.jsx";
import SubmittedRecipes from "./pages/admin/SubmittedRecipes.jsx";
import AnalyticsPage from "./pages/admin/AnalyticsPage.jsx";
import AllRecipesAdmin from "./pages/admin/AllRecipesAdmin.jsx";
import ProfileSettings from "./pages/dashboard/ProfileSettings.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/categories/:category",
        element: <CategoryPage />,
      },
      {
        path: "/search",
        element: <Search />,
      },
       {
        path:'/items/:id',
        element:<SingleProduct></SingleProduct>,
       loader: ({ params }) =>
          fetch(`http://localhost:5000/api/items/${params.id}`),
      },
      {
        path:'/recipes',
        element:<Recipes></Recipes>
      },
       {
        path:'/resources',
        element:<Resources></Resources>
      },
       {
        path: "/about",
        element: <About />,
      },
       {
        path: "/contact",
        element: <Contact />,
      },
      {
        path:"/resources/kitchen-basics",
        element:< KitchenBasics/>
      },
      {
        path:"/resources/cooking-tips",
        element:<CookingTips/>
      },
      {
        path:"/resources/beginners-guide",
        element:<BeginnersGuide/>
      },
      {
        path:"/resources/glossary",
        element:<Glossary/>
            },
            {
              path:"/login",
              element:<Login/>
            },
            {
              path:"/signup",
              element:<Signup/>
            },{
              path:"/dashboard",
              element:<Dashboard/>
            },
            {
               path: "/saved",
               element: <SavedRecipes />
              },
              {
                path:"/submit",
                element:<SubmitRecipe/>
              },
              {
                path:"/profile",
                element:<ProfileSettings/>
              },
              {
  path: "/admin/recipes",
  element: (
    <AdminRoute>
      <AllRecipesAdmin />
    </AdminRoute>
  ),
},
           {
        path: "/admin-dashboard", // ✅ this must match your <Link to="/admin-dashboard">
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
  path: "/admin/users",
  element: <AdminRoute><UsersPage /></AdminRoute>
},
{
  path: "/admin/submissions",
  element: <AdminRoute><SubmittedRecipes /></AdminRoute>
},
{
  path: "/admin/analytics",
  element: <AdminRoute><AnalyticsPage /></AdminRoute>
},
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
    {/* ✅ Wrap everything inside AuthProvider */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);