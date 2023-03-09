import { TemplateParser, HandlebarsHelpers } from './template-parser';
import { XMLParser } from './xml-parser';
import { BufferBuilder } from './buffer-builder';

export class EscPos {
  templateParser: TemplateParser;

  constructor(handlebarsHelpers: HandlebarsHelpers = []) {
    this.templateParser = new TemplateParser(handlebarsHelpers);
  }

  public async getBufferFromTemplate(template: string, data: any): Promise<number[]> {
    return (await this.templateParser.parser(template, data)).build();
  }

  public static async getBufferFromXML(xml: string): Promise<number[]> {
    let xmlParser = new XMLParser();
    return (await xmlParser.parser(xml)).build();
  }

  public static getBufferBuilder(): BufferBuilder {
    return new BufferBuilder();
  }

}
