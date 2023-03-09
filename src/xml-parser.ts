import parser from 'xml-parser';
import { BufferBuilder } from './buffer-builder';
import { XMLNode } from './xml-node';
import { NodeFactory } from './node-factory';

export class XMLParser {

  public async parser(xml: string): Promise<BufferBuilder> {
    let parsedXML = parser(xml);
    return this.compile(parsedXML);
  }

  private async compile(parsedXML: any): Promise<BufferBuilder> {
    let bufferBuilder = new BufferBuilder();
    let rootNode = this.adapter(parsedXML.root, null);
    return rootNode.draw(bufferBuilder);
  }

  private adapter(node: any, parentNode): XMLNode {
    let xmlNode: XMLNode = NodeFactory.create(node.name, node);
    if (parentNode) parentNode.addChild(xmlNode);
    if (node.children.length > 0) {
      node.children.forEach(child => {
        this.adapter(child, xmlNode);
      });
    }
    return xmlNode;
  }

}
