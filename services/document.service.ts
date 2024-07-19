import axios from "axios";
import { ExternalData, StudentData } from "../interfaces";
import { ApiResponse, Status, ErrorResponse } from "../interfaces/api.type";
import { DocumentData } from "../interfaces/document-data.type";
import { RequestDocumentDto } from "../dtos/request/request-document-dto";
import { Signatory } from "../models/signatory";
import { SignatoryUtils } from "../utils/signatory.service";

axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.TOKEN}`;

export class DocumentService {
  private async getStudentId(email: string): Promise<string> {
    try {
      const response = await axios.get<ApiResponse<StudentData>>(
        `https://ext.edusign.fr/v1/student/by-email/${email}`
      );

      if (response.data.status === Status.Error) {
        throw new Error((response.data as ErrorResponse).message);
      }

      return response.data.result.id;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private async getIntervenantsIds(emails: string[]): Promise<string[]> {
    const intervenantsPromises = emails.map(async (email) => {
      const response = await axios.get<ApiResponse<ExternalData>>(
        `https://ext.edusign.fr/v1/externals/by-email/${email}`
      );

      if (response.data.status === Status.Error) {
        throw new Error((response.data as ErrorResponse).message);
      }
      return response.data.result.ID;
    });

    return Promise.all(intervenantsPromises);
  }

  public async sendDocuments(
    payload: RequestDocumentDto
  ): Promise<ApiResponse<DocumentData>> {
    const studentId = await this.getStudentId(payload.studentEmail);
    console.log(studentId);
    const externalsIds = await this.getIntervenantsIds(payload.externalEmails);

    const signatories = SignatoryUtils.generateSignatories(
      studentId,
      externalsIds
    );

    const response = await axios.post<ApiResponse<StudentData>>(
      "https://ext.edusign.fr/v1/document/v2/send-base64",
      {
        user_id: process.env.USER_ID,
        document: {
          name: "consigne",
          base64: payload.file,
        },
        signatories,
        sendDocumentToRecipients: true,
        emailReminder: {
          subject: "",
          message: "",
          amount: 0,
          interval: 0,
        },
        directoryId: "",
      }
    );

    if (response.data.status === Status.Error) {
      throw new Error((response.data as ErrorResponse).message);
    }

    return {
      status: Status.Success,
      result: {
        documentsSuccess: 1,
        documents: [payload.file],
      },
    };
  }
}
