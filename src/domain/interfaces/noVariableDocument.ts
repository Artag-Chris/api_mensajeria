export interface NoVariableDocument {
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
                "filename": string   
            }
          }
        ]
      }
    ]
  };
  