import { XMLNode } from '../xml-node';
import { BufferBuilder } from '../buffer-builder';

export default class EmphasizedNode extends XMLNode {

  constructor(node: any) {
    super(node);
  }

  public open(bufferBuilder: BufferBuilder): BufferBuilder {
    bufferBuilder.emphasizedMode();
    return bufferBuilder;
  }

  public close(bufferBuilder: BufferBuilder): BufferBuilder {
    bufferBuilder.endEmphasizedMode();
    return bufferBuilder;
  }
}
