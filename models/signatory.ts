import { SignatoryElementData } from "./interfaces/signatory.type";

export class Signatory {
  type: string;
  id: string;
  elements: SignatoryElementData[];

  constructor(type: string, id: string, elements: SignatoryElementData[]) {
    this.type = type;
    this.id = id;
    this.elements = elements;
  }
}
