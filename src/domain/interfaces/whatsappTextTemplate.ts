export interface textTemplate{
    messaging_product: string;
    to: string;
    type: 'template',
    template: template
  }

  interface template {
    name: string;
    language: {
      code: string;
    };
  }