export interface FourVariable {
    messaging_product: "whatsapp";
    to: string;
    type: "template";
    template: Template;
  }
  
   interface Template  {
      name: string,
      language: {
        code: "es_MX",
      },"components": [
      {
      type: "body",
      "parameters": [
        {
          type: "text",
          text: string
        },
        {
          type: "text",
          text: string
        },
        {
          type: "text",
          text: string
        },
        {
          type: "text",
          text: string
        }
      ]
    }
  ]
  };