export interface OneVariable {
  messaging_product: "whatsapp";
  to: string;
  type: "template";
  template: Template;
}

 interface Template  {
    name: string,
    language: {
      code: "es_MX",
    },"components": TemplateComponent[]
};

interface TemplateComponent {
    type: "text",
    text: string,
}