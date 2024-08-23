import{Template}from "./template"

export interface BodyBienvenidoTemplate {
    messaging_product: string;
    to: string;
    type: string;
    template: Template;
  }