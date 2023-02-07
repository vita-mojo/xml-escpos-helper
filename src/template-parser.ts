import Handlebars from 'handlebars';
import { XMLParser } from './xml-parser';
import { BufferBuilder } from './buffer-builder';

export class TemplateParser {
  private handlebars: typeof Handlebars;

  constructor() {
    this.handlebars = Handlebars;
  }

  public parser<T>(template: string, scope: T): BufferBuilder {
    const compiledTemplate = this.handlebars.compile<T>(template);
    const xml = compiledTemplate(scope);
    return new XMLParser().parser(xml);
  }
}
