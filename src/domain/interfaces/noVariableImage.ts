export interface NoVariableImage {
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
        type: "header",
        "parameters": [
          {
            type: "image",
            "image":{
                "link": string    
            }
          }
        ]
      }
    ]
  };
  