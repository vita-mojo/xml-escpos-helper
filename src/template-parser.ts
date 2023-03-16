import Handlebars from 'handlebars';
import { XMLParser } from './xml-parser';
import { BufferBuilder } from './buffer-builder';

export type HandlebarsHelpers = Array<{
  name: string,
  delegate: (...args: Array<unknown>) => string
}>;

export type HandlebarsOptions = {
  acceptHash?: boolean
};

export class TemplateParser {
  private handlebars: typeof Handlebars;

  static parseArgs = (name: string, args: Array<unknown> = []) =>
    args.map((arg) => (typeof arg === 'object' && arg?.['name'] === name ? undefined : arg));

  constructor(handlebarsHelpers?: HandlebarsHelpers, options?: HandlebarsOptions) {
    this.handlebars = Handlebars;
    if (handlebarsHelpers) {
      this.handlebars.registerHelper(
        handlebarsHelpers.reduce(
          (acc, helper) => (
            acc[helper.name] = options?.acceptHash
              ? helper.delegate
              : (...args: unknown[]) => helper.delegate(...(TemplateParser.parseArgs(helper.name, args))),
            acc
          ),
          {}
        )
      );
    }
  }

  public parser<T>(template: string, scope: T): BufferBuilder {
    const compiledTemplate = this.handlebars.compile<T>(template);
    const xml = compiledTemplate(scope);
    return new XMLParser().parser(xml);
  }
}
