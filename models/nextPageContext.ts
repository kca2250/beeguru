import { NextPageContext } from "next";

export interface ParamsNextPageContext extends NextPageContext {
  params: {
    id: string;
  };
}
