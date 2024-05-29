// import { AuthService } from "../services/auth.service";
import { ApiResponse } from "../models/ApiResponse";
import { Request, Response } from "express";
import Employee from "../models/Employee";
import RoleMaster from "../models/RoleMaster";
import AccessMaster, { IAccessMaster } from "../models/AccessMaster";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT } from "../config/api.config";
import { registerSchema, loginSchema, resetPasswordSchema, forgotPasswordSchema } from "../helpers/validationSchema";
import { sendMail } from "../util/sendEmail";
import { AuthService } from "../services/auth.service";
import { createArray } from "../services/employeeDocs.service";
import EmployeeDocs from "../models/EmployeeDocs";
import EmployeeRight from "../models/EmployeeRight";

import EmployeeGeneral from "../models/EmployeeGeneral";
import EmployeePayroll from "../models/EmployeePayroll";
import EmployeePayslip from "../models/EmployeePayslip";
// import EmployeeGeneral from "../models/EmployeeGeneral";
import EmployeeContract from "../models/EmployeeContract";
import EmployeeStatus from "../models/EmployeeStatus";
import { S3Service } from "../services/s3.service";

export const checkAuthentication = (req: Request, res: Response): void => {
  const response = new ApiResponse();
  response.status = { code: 200, message: "success" };
  response.data = "API is authenticated.";
  res.status(200).send(response);
};

export const employeeRegister = async (req: Request, res: Response): Promise<void> => {
  console.log("Register employee calleddd ****************");
  const response = new ApiResponse();
  const authservice = new AuthService();
  try {
    const employee = await Employee.findOne({ email: req.body.email });
    // const result = await registerSchema.validateAsync(req.body);

    if (employee) {
      response.status = { code: 400, message: "Employee with this email already exist!" };
      res.status(400).send(response);
      return;
    }

    const newEmployee = await authservice.createEmployee(req.body);
    console.log("new employee service");
    console.log(newEmployee);
    newEmployee
      .save()
      .then((employee: Object) => {
        response.data = "Registration successful";
        res.status(200).send(response);
      })
      .catch((err: any) => console.log(err));
  } catch (error: any) {
    if (error.isJoi) {
      response.status = { code: 422, message: error.message };
      res.status(422).send(response);
      return;
    }

    response.status = { code: 500, message: "Server Error" };
    res.status(500).send(response);
  }
};

export const employeeLogin = async (req: Request, res: Response): Promise<void> => {
  console.log("employee login called ***********");
  const response = new ApiResponse();
  try {
    const { email, password } = req.body;

    //const result = await loginSchema.validateAsync(req.body);

    const employee = await Employee.findOne({ email }).populate("role", { roleName: true }).populate("store", { storeName: true });
    console.log("employee from databasae with email");
    console.log(employee);
    if (!employee) {
      response.status = { code: 404, message: "Employee with this email not Found!" };
      res.status(404).send(response);
      return;
    }
    console.log(password, employee.password);
    const match = await bcrypt.compare(password, employee.password);

    if (!match) {
      response.status = { code: 400, message: "Enter valid email or password!" };
      res.status(400).send(response);
      return;
    }

    const access: any = await AccessMaster.findOne({ role: employee.role }).select("modulesAccess");

    const payload = { id: employee.id, userName: employee.userName, firstName: employee.firstName, lastName: employee.lastName, email: employee.email, role: employee.role, access: access.modulesAccess, store: employee.store };

    jwt.sign(payload, JWT.key, { expiresIn: 3600000 }, (err, token) => {
      employee.setLastLogin(employee.id, function (err: any, employee: any) {
        if (err) {
          response.status = { code: 500, message: "Server Error!" };
          res.status(500).send(response);
          return;
        }
      });
      response.data = { id: employee.id, userName: employee.userName, email: employee.email, authToken: token };
      res.status(200).send(response);
    });
  } catch (error: any) {
    if (error.isJoi) {
      response.status = { code: 422, message: error.message };
      res.status(422).send(response);
      return;
    }
    console.log(error);
    response.status = { code: 500, message: "Server Error!" };
    res.status(500).send(response);
  }
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  console.log("Forgot password called ******************");
  const response = new ApiResponse();
  try {
    const { email } = req.body;

    //const result = await forgotPasswordSchema.validateAsync(req.body);

    const employee = await Employee.findOne({ email });
    console.log("employee extracted from forgot password");
    console.log(employee);
    if (!employee) {
      response.status = { code: 404, message: "Employee with this email not Found!" };
      res.status(404).send(response);
      return;
    }

    const secret = JWT.key + employee.email;
    const payload = {
      email: employee.email,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    const link = `https://localhost:3000/reset-password?e=${email.email}&t=${token}`;

    const message = `You are receiving this email because you requested to reset your password. \n\n ${link}`;
    console.log(token);
    try {
      await sendMail({
        email: employee.email,
        subject: "Password reset",
        message,
      });

      response.data = "Password Reset link sent to your email";
      res.status(200).send(response);
    } catch (error: any) {
      console.log(error.message);
      response.status = { code: 500, message: "Email could not be sent" };
      res.status(500).send(response);
    }
  } catch (error: any) {
    if (error.isJoi) {
      response.status = { code: 422, message: error.message };
      res.status(422).send(response);
      return;
    }
    console.log(error);
    response.status = { code: 500, message: "Server Error!" };
    res.status(500).send(response);
  }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();
  try {
    const { email, passCode, password, confirmPassword } = req.body;

    const result = await resetPasswordSchema.validateAsync(req.body);

    const employee = await Employee.findOne({ email });
    if (!employee) {
      response.status = { code: 404, message: "Employee with this email not Found!" };
      res.status(404).send(response);
      return;
    }

    const secret = JWT.key + employee.email;
    try {
      const payload = jwt.verify(passCode, secret);
      if (payload) {
        const employee = await Employee.findOneAndUpdate({ email: email }, { $set: { password: password } });
        if (employee) {
          const hashedPassword = await bcrypt.hash(password, 10);
          employee.password = hashedPassword;
          employee
            .save()
            .then((employee: Object) => {
              response.data = "Password updated please login with new password!";
              res.status(200).send(response);
            })
            .catch((err: any) => console.log(err));
        } else {
          response.status = { code: 400, message: "Error occured!" };
          res.status(400).send(response);
        }
      }
    } catch (error) {
      response.status = { code: 400, message: "token expired" };
      res.status(400).send(response);
      return;
    }
  } catch (error: any) {
    if (error.isJoi) {
      response.status = { code: 422, message: error.message };
      res.status(422).send(response);
      return;
    }
    response.status = { code: 500, message: "Server Error!" };
    res.status(500).send(response);
  }
};

export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();

  try {
    const { employeeId } = req.params;

    const findEmployeeGd = await Employee.findById(employeeId);
    if (!findEmployeeGd) {
      response.status = { code: 400, message: "Employee not found!" };
      res.status(400).send(response);
      return;
    }

    const update = req.body;

    try {
      const emp = await Employee.findByIdAndUpdate(employeeId, update);
      response.data = { message: "Employee updated successfully", data: emp };
      res.status(200).send(response);
    } catch (error) {
      response.status = { code: 500, message: "Server Error" };
      res.status(500).send(response);
    }
  } catch (error: any) {
    if (error.isJoi) {
      response.status = { code: 422, message: error.message };
      res.status(422).send(response);
      return;
    }

    response.status = { code: 500, message: "Server Error" };
    res.status(500).send(response);
  }
};

export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  const response = new ApiResponse();

  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);
    if (!employee) {
      response.status = { code: 400, message: "Employee not found!" };
      res.status(400).send(response);
      return;
    }

    console.log(employee);
    const employeeDocs = await EmployeeDocs.findOne({ employeeId: id });
    const employeeRight = await EmployeeRight.findOne({ employeeId: id });

    const s3Service = new S3Service();

    if (employeeDocs) {
      const docs = createArray(employeeDocs);
      docs.forEach((element: any) => {
        s3Service.deleteFile(element.key);
      });
    }
    if (employeeRight) {
      const docs = createArray(employeeRight);
      docs.forEach((element: any) => {
        s3Service.deleteFile(element.key);
      });
    }

    try {
      const emp = await Employee.findByIdAndDelete(id);
      const employeeDoc = await EmployeeDocs.findOneAndDelete({ employeeId: id });
      const employeePayroll = await EmployeePayroll.findOneAndDelete({ employeeId: id });
      const employeeStatus = await EmployeeStatus.findOneAndDelete({ employeeId: id });
      const employeeRight = await EmployeeRight.findOneAndDelete({ employeeId: id });
      const employeeContract = await EmployeeContract.findOneAndDelete({ employeeId: id });
      const employeeGeneral = await EmployeeGeneral.findOneAndDelete({ employeeId: id });
      const employeePayslip = await EmployeePayslip.findOneAndDelete({ employeeId: id });
      response.data = { message: "Employee deleted successfully" };
      res.status(200).send(response);
    } catch (error) {
      response.status = { code: 500, message: "Server Error" };
      res.status(500).send(response);
    }
  } catch (error: any) {
    if (error.isJoi) {
      response.status = { code: 422, message: error.message };
      res.status(422).send(response);
      return;
    }

    response.status = { code: 500, message: "Server Error" };
    res.status(500).send(response);
  }
};
