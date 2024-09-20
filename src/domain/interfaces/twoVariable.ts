export interface twoVariable {
    messaging_product: "whatsapp";
    to: string;
    type: "template";
    template: Template;
  }
  
   interface Template  {
      name: string,
      language: {
        code: "es_MX",
      },"components": [{
        type: string,
        text: string
      },
      {
        type: string,
        text: string
      }
    ]
  };
  
  