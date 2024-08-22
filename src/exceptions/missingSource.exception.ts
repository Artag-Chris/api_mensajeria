import createError from 'http-errors';
import { IncomingTemplateMessageEnduro } from 'src/whatsapp/dto';

export class MissingSourceException extends createError.HttpError {
  public artifact: IncomingTemplateMessageEnduro;

  constructor(artifact: IncomingTemplateMessageEnduro) {
    super(`No se ha proporcionado un origen desde donde enviar el mensaje a ${artifact.destination}`);
    this.artifact = artifact;
  }
}