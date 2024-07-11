import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3({ signatureVersion: 'v4' });
const textract = new AWS.Textract();
const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
@Injectable()
export class AwsService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<{ key: string; file_name: string }> {
    const date_folder = `${Date.now()}`;
    const file_name = file.originalname;
    const params = {
      Bucket: AWS_S3_BUCKET_NAME,
      Key: `invoices/${date_folder}-${file_name}`,
      Body: file.buffer,
      ContentType: 'image/jpeg',
    };
    const uploadResult = await s3.upload(params).promise();
    return { key: uploadResult.Key, file_name };
  }

  async processImage(
    imageUrl: string,
  ): Promise<AWS.Textract.ExpenseFieldList[]> {
    const params: AWS.Textract.AnalyzeExpenseRequest = {
      Document: {
        S3Object: { Bucket: AWS_S3_BUCKET_NAME, Name: imageUrl },
      },
    };
    const textractResult: AWS.Textract.AnalyzeExpenseResponse = await textract
      .analyzeExpense(params)
      .promise();
    return this.parseExpenseResponse(textractResult);
  }

  private parseExpenseResponse(
    textractResult: AWS.Textract.AnalyzeExpenseResponse,
  ): AWS.Textract.ExpenseFieldList[] {
    return textractResult.ExpenseDocuments?.map((e) => {
      e.SummaryFields = e.SummaryFields?.map((s) => {
        delete s.GroupProperties;
        delete s.LabelDetection?.Geometry;
        delete s.ValueDetection?.Geometry;
        return s;
      });
      return e.SummaryFields;
    });
  }
}

export { s3, textract };
