export interface TwoVariableDocument {
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
            type: "document",
            "document":{
                "link": string    
            }
          }
        ]
      },
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
          }
        ]
      }
    ]
  };