import { BufferBuilder } from './buffer-builder';

export abstract class XMLNode {

  protected attributes: any;
  protected content: string;
  protected children: XMLNode[];

  constructor(node: any) {
    this.attributes = node.attributes || {};
    this.content = node.content;
    this.children = [];
  }

  public addChild(child: XMLNode) {
    if (child)
      this.children.push(child);
  }

  protected getContent(): string {
    return this.content;
  }

  public abstract open(bufferBuilder: BufferBuilder): BufferBuilder | Promise<BufferBuilder>;

  public abstract close(bufferBuilder: BufferBuilder): BufferBuilder;

  public async draw(bufferBuilder: BufferBuilder): Promise<BufferBuilder> {

    // open tag
    await this.open(bufferBuilder);

    for (const child of this.children) {
      await child.draw(bufferBuilder);
    }

    // close tag
    this.close(bufferBuilder);

    return bufferBuilder;
  }

}
