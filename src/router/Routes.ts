import { ComponentType, JSXElementConstructor } from "react";
import { routesPath } from "../constant/routesPath";
import Page404 from "../pages/404";
import AuthPage from "../pages/auth";
import ContactsPage from "../pages/contacts";

interface IRoutes {
  path: string,
  Component: ComponentType
}


export const publicRoutes: IRoutes[] = [
  {
    path: routesPath.AUTH_ROUTE,
    Component: AuthPage
  },
  {
    path: routesPath.ROUTE_404,
    Component: Page404
  },
]

export const privateRoutes: IRoutes[] = [
  {
    path: routesPath.CONTACT_ROUTE,
    Component: ContactsPage
  }
]