import { XMLNode } from '../xml-node';
import { BufferBuilder, COLOR } from '../buffer-builder';

export default class PrintLogoNode extends XMLNode {

  constructor(node: any) {
    super(node);
  }

  public open(bufferBuilder: BufferBuilder): BufferBuilder {
    if (
        !this.attributes.kc1 ||
        !this.attributes.kc2
    ) {
        return;
    }

    const kc1 = Number(this.attributes.kc1);
    const kc2 = Number(this.attributes.kc2);

    if (isNaN(kc1) || isNaN(kc2)) {
        return;
    }

    const scaleWidth = this.attributes.scaleWidth === 1 || this.attributes.scaleWidth === 2
        ? this.attributes.scaleWidth
        : 0x01;

    const scaleHeight = this.attributes.scaleHeight === 1 || this.attributes.scaleHeight === 2
        ? this.attributes.scaleHeight
        : 0x01;

    return bufferBuilder.printLogo(
        kc1,
        kc2,
        scaleWidth,
        scaleHeight,
    );
  }

  public close(bufferBuilder: BufferBuilder): BufferBuilder {
    return bufferBuilder;
  }
}
