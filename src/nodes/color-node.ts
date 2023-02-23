import { XMLNode } from '../xml-node';
import { BufferBuilder, COLOR } from '../buffer-builder';

export default class ColorNode extends XMLNode {

  constructor(node: any) {
    super(node);
  }

  public open(bufferBuilder: BufferBuilder): BufferBuilder {
    bufferBuilder.setColor(COLOR.SECONDARY);
    return bufferBuilder;
  }

  public close(bufferBuilder: BufferBuilder): BufferBuilder {
    bufferBuilder.setColor(COLOR.PRIMARY);
    return bufferBuilder;
  }
}
