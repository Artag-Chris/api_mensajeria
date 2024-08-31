import { TemplateComponentDTO } from "./template-component.dto";

export interface WhatsappTemplateDto {
  id: string;
  name: string;
  components: TemplateComponentDTO[];
  status: string;
  category: string;
}