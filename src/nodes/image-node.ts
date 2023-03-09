import { XMLNode } from "../xml-node";
import { BufferBuilder, RASTER_MODE } from "../buffer-builder";
// import ndarray from "ndarray";
// import Image from "../image";
import Canvas, { createCanvas } from 'canvas';
import { monoImage } from "../monoImage";
// import { PNG } from "pngjs";

export default class ImageNode extends XMLNode {
  constructor(node: any) {
    super(node);
  }

  public async open(bufferBuilder: BufferBuilder): Promise<BufferBuilder> {
    const image = new Image();
    image.src = this.content.replace(/&#x2F/g, '/');
    return new Promise((resolve, reject) => {
      image.onload = () => {
        const canvas = createCanvas(544, 104);
        const context = canvas.getContext('2d');
        context.drawImage(<Canvas.Image><unknown>image, 0, 0, image.width, image.height);
        const imageData = context.getImageData(0, 0, image.width, image.height);
        const rasterImage = monoImage(imageData, 0);
  
        let mode;
        switch (this.attributes.mode) {
          case 'NORMAL':
            mode = RASTER_MODE.NORMAL; break;
          case 'DW':
            mode = RASTER_MODE.DOUBLE_WIDTH; break;
          case 'DH':
            mode = RASTER_MODE.DOUBLE_HEIGHT; break;
          case 'DWH':
            mode = RASTER_MODE.DOUBLE_WIDTH_HEIGHT; break;
          default:
            mode = RASTER_MODE.NORMAL;
        }

        bufferBuilder.storeImage(rasterImage, mode, imageData.width, imageData.height);
        resolve(bufferBuilder);
      };
    })

    // const img_data = PNG.sync.read(
    //   Buffer.from(this.content.replace(/&#x2F/g, '/').slice("data:image/png;base64,".length), "base64")
    // );

    // const pixels = ndarray(
    //   new Uint8Array(img_data.data),
    //   [img_data.width | 0, img_data.height | 0, 4],
    //   [4, (4 * img_data.width) | 0, 1],
    //   0
    // );
  }

  public close(bufferBuilder: BufferBuilder): BufferBuilder {
    bufferBuilder.printImage();
    return bufferBuilder;
  }
}
