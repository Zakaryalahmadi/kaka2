import { Signatory } from "../models/signatory";

export class SignatoryUtils {
  static generateSignatories(
    studentId: string,
    externalsIds: string[]
  ): Signatory[] {
    const studentSignatory = new Signatory("student", studentId, [
      {
        type: "",
        position: { page: 1, x: 100, y: 200 },
      },
    ]);

    const externalSignatories = externalsIds.map(
      (externalId, i) =>
        new Signatory("external", externalId, [
          {
            type: "",
            position: { page: 2 + i, x: 10 * (i + 1), y: 10 * (i + 1) },
          },
        ])
    );

    return [studentSignatory, ...externalSignatories];
  }
}
