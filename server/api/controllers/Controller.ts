import { Router } from "express";

export default interface Controller {
  getRootRoute: () => string;
  getRouter: () => Router;
}
