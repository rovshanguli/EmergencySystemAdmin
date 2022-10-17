import React from "react"
import { Redirect } from "react-router-dom"





//Pages
import PagesMaintenance from "../pages/Utility/pages-maintenance"
import PagesComingsoon from "../pages/Utility/pages-comingsoon"
import Pages404 from "../pages/Utility/pages-404"
import Pages500 from "../pages/Utility/pages-500"



//Dashboard
import Dashboard from "../pages/Dashboard/index"


// Info
import Info from "../pages/Info/Index"
import CreateInfo from "../pages/Info/CreateInfo"
import UpdateInfo from "../pages/Info/UpdateInfo"

// Appeal
import Appeal from "../pages/Appeal/Index"
import AppealDetail from "../pages/Appeal/AppealDetail"

// TicketStatus
import TicketStatus from "../pages/TicketStatus/Index"

// Ticket Type
import AppealType from "../pages/AppealType/Index"

//Brigades
import Brigades from "../pages/Brigades/Index"


// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

//  // Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login"
import Register1 from "../pages/AuthenticationInner/Register"
import Recoverpw from "../pages/AuthenticationInner/Recoverpw"
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

const userRoutes = [
  // Dashboard
  { path: "/dashboard", component: Dashboard },

  // //profile
  { path: "/profile", component: UserProfile },

  // //Info
  { path: "/info", component: Info },
  { path: "/createinfo", component: CreateInfo },
  { path: "/updateinfo/:id", component: UpdateInfo },

  // //TicketStatus
  { path: "/ticketstatus", component: TicketStatus },

  // //AppealType
  { path: "/appealtype", component: AppealType },

  // //Appeal
  { path: "/appeal", component: Appeal },
  { path: "/appealdetail/:id", component: AppealDetail},

  // //Brigades
  { path: "/brigade", component: Brigades },






  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const authRoutes = [

  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },

  { path: "/pages-maintenance", component: PagesMaintenance },
  { path: "/pages-comingsoon", component: PagesComingsoon },
  { path: "/pages-404", component: Pages404 },
  { path: "/pages-500", component: Pages500 },

  // Authentication Inner
  { path: "/pages-login", component: Login1 },
  { path: "/pages-register", component: Register1 },
  { path: "/page-recoverpw", component: Recoverpw },
  { path: "/auth-lock-screen", component: LockScreen },
]

export { userRoutes, authRoutes }