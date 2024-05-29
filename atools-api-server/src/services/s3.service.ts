import AmazonS3URI from "amazon-s3-uri";
import { S3 } from "aws-sdk";
import { ReadStream } from "fs";
import { Stream } from "stream";

export interface File {
    name: string,
    s3Key: string,
    content: ArrayBuffer | Stream
}

export class S3Service {

    private s3Config: any;
    private client: S3;
    private readonly bucketName;

    constructor() {
        this.s3Config = {
            bucketName: String(process.env.AWS_S3_BUCKET),
            defaultRegion: String(process.env.DEFAULT_REGION),
            accessKey: String(process.env.AWS_ACCESS_KEY_ID),
            secretKey: String(process.env.AWS_SECRET_KEY_ID),
        };

        this.bucketName = this.s3Config.bucketName
        this.client = new S3({
            region: this.s3Config.defaultRegion,
            credentials: {
                accessKeyId: this.s3Config.accessKey,
                secretAccessKey: this.s3Config.secretKey
            }
        });
    }

    /**
     * @description: upload file to S3 
     * @returns: S3Path of the file.
     */
    public async uploadFile(file: File): Promise<string> {
        this.client.putObject({
            Bucket: this.bucketName,
            Key: file.s3Key,
            Body: file.content
        }).promise();

        // return `https://${this.bucketName}.s3.${this.s3Config.defaultRegion}.amazonaws.com/${file.s3Key}`;
        return `s3://${this.bucketName}/${file.s3Key}`;
    }

    /**
     * @param s3Path: s3Path needs to download the file. eg.: s3://my-bucket/key
     * @returns 
     */
    public downloadFile(s3Path: string): Stream {
        const s3Uri = AmazonS3URI(s3Path);
        return this.client.getObject({
            Bucket: s3Uri.bucket || this.bucketName,
            Key: s3Uri.key || ""
        }).createReadStream()
    }

    /**
     * @param s3Path: s3Path needs to download the file. eg.: s3://my-bucket/key
     */
    public async deleteFile(s3Path: string) {
        const s3Uri = AmazonS3URI(s3Path);
        const response = this.client.deleteObject({
            Bucket: s3Uri.bucket || this.bucketName,
            Key: s3Uri.key || ""
        }).promise();
    }

}