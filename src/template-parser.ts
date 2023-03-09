import Handlebars from 'handlebars';
import { XMLParser } from './xml-parser';
import { BufferBuilder } from './buffer-builder';

export type HandlebarsHelpers = Array<{
  name: string,
  delegate: (...args: Array<unknown>) => string
}>;

export class TemplateParser {
  private handlebars: typeof Handlebars;

  constructor(handlebarsHelpers?: HandlebarsHelpers) {
    this.handlebars = Handlebars;
    if (handlebarsHelpers) {
      this.handlebars.registerHelper(
        handlebarsHelpers.reduce(
          (acc, helper) => (acc[helper.name] = helper.delegate, acc),
          {}
        )
      );
    }
  }

  public async parser<T>(template: string, scope: T): Promise<BufferBuilder> {
    const compiledTemplate = this.handlebars.compile<T>(template);
    const xml = compiledTemplate(scope);
    return await new XMLParser().parser(xml);
  }
}
