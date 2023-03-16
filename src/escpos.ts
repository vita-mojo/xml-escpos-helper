import { TemplateParser, HandlebarsHelpers, HandlebarsOptions } from './template-parser';
import { XMLParser } from './xml-parser';
import { BufferBuilder } from './buffer-builder';

export class EscPos {
  templateParser: TemplateParser;

  constructor(handlebarsHelpers: HandlebarsHelpers = [], options?: HandlebarsOptions) {
    this.templateParser = new TemplateParser(handlebarsHelpers, options);
  }

  public getBufferFromTemplate(template: string, data: any): number[] {
    return this.templateParser.parser(template, data).build();
  }

  public static getBufferFromXML(xml: string): number[] {
    let xmlParser = new XMLParser();
    return xmlParser.parser(xml).build();
  }

  public static getBufferBuilder(): BufferBuilder {
    return new BufferBuilder();
  }

}
