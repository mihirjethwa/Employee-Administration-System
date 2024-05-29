import fs from 'fs';
import { Request, Response } from "express";
import { S3Service, File } from "../services/s3.service";
import { ApiResponse } from "../models/ApiResponse";

export const download = async (req: Request, res: Response): Promise<void> => {
    try {

        let { s3Path } = req.params;
        if (s3Path === null || s3Path === undefined) {
            s3Path = String(req.query.s3Path)
        }

        const s3Service = new S3Service();
        const dataStream = s3Service.downloadFile(s3Path);
        dataStream.pipe(res);

    } catch (error) {

        const response = new ApiResponse();
        if (error.isJoi) {
            response.status = { code: 422, message: error.message };
            res.status(422).send(response);
            return;
        }
        response.status = { code: 500, message: "Server Error" };
        res.status(500).send(response);

    }
}

export const upload = async (req: Request, res: Response): Promise<void> => {
    const response = new ApiResponse();
    try {

        const data = req.body;
        const files = req.files;

        if (files.length !== 0 && Array.isArray(files)) {
            const fileExt = data.fileName.split('.').pop();
            const s3Key = `${data.documentType}/${data.employeeId}/${data.fieldName}.${fileExt}`
            const fileObj: File = {
                name: data.fileName,
                s3Key: s3Key,
                content: fs.createReadStream(files[0].path)
            }

            const s3Service = new S3Service();
            s3Service.uploadFile(fileObj).then(s3Path => {
                fs.unlink(files[0].path, () => {});
                response.data = { s3Path: s3Path }
                response.status = { code: 200, message: "File uploaded successfully" };
                res.status(200).send(response);
            });
        } else {
            response.status = { code: 200, message: "File not found!" };
            res.status(200).send(response);
        }

    } catch (error) {

        if (error.isJoi) {
            response.status = { code: 422, message: error.message };
            res.status(422).send(response);
            return;
        }
        response.status = { code: 500, message: "Server Error" };
        res.status(500).send(response);

    }
}

/**
 * Upload base64 file.
 */
export const uploadBase64 = async (req: Request, res: Response): Promise<void> => {
    const response = new ApiResponse();
    try {

        const data = req.body;

        const fileExt = data.fileName.split('.').pop();
        const s3Key = `${data.documentType}/${data.employeeId}/${data.fieldName}.${fileExt}`
        const file: File = {
            name: data.fileName,
            s3Key: s3Key,
            content: Buffer.from(data.base64Content, 'base64')
        }

        const s3Service = new S3Service();
        s3Service.uploadFile(file).then(s3Path => {
            response.data = { s3Path: s3Path }
            response.status = { code: 200, message: "File uploaded successfully" };
            res.status(200).send(response);
        });

    } catch (error) {

        if (error.isJoi) {
            response.status = { code: 422, message: error.message };
            res.status(422).send(response);
            return;
        }
        response.status = { code: 500, message: "Server Error" };
        res.status(500).send(response);

    }
}

export const deleteFile = async (req: Request, res: Response): Promise<void> => {
    const response = new ApiResponse();
    try {

        let { s3Path } = req.params;
        if (s3Path === null || s3Path === undefined) {
            s3Path = String(req.query.s3Path)
        }

        const s3Service = new S3Service();
        s3Service.deleteFile(s3Path);
        response.status = { code: 200, message: "File deleted successfully" };
        res.status(200).send(response);

    } catch(error) {

        if (error.isJoi) {
            response.status = { code: 422, message: error.message };
            res.status(422).send(response);
            return;
        }
        response.status = { code: 500, message: "Server Error" };
        res.status(500).send(response);

    }
}