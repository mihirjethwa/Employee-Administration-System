import { count } from "console";
import Employee, { IEmployee } from "../models/Employee";
var mongoose = require("mongoose");

export const searchEmployee = async (regex: any, page: any, limit: any, skip: any, sort: any, store: any, role: any, empStatus: any): Promise<any> => {
  var allUsers;
  var users;
  // const users = await EmployeeGeneral.find(JSON.parse(queryStr)).skip(skip).limit(limit);
  const ObjectId = mongoose.Types.ObjectId;

  if (store.length > 0 && role.length > 0) {
    const find = {
      $and: [
        {
          $or: [{ userName: regex }, { firstName: regex }, { lastName: regex }, { phoneNumber: regex }, { email: regex }],
        },
        { "store._id": ObjectId(store) },
        { "role._id": ObjectId(role) },
        { "employeeStatus.status": empStatus },
        // { empStatus: empStatus },
      ],
    };
    allUsers = await Employee.aggregate([
      {
        $lookup: {
          from: "storeMaster",
          localField: "store",
          foreignField: "_id",
          as: "store",
        },
      },
      {
        $lookup: {
          from: "roleMaster",
          localField: "role",
          foreignField: "_id",
          as: "role",
        },
      },
      {
        $lookup: {
          from: "employeeStatus",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeStatus",
        },
      },
      { $match: find },
    ]).count("count");

    // users = await Employee.find({
    //   $and: [
    //     {
    //       $or: [{ userName: regex }, { firstName: regex }, { lastName: regex }, { phoneNumber: regex }, { email: regex }],
    //     },
    //     { store: store },
    //     { role: role },
    //     { empStatus: empStatus },
    //   ],
    // })
    //   .populate({
    //     path: "role",
    //     model: "RoleMaster",
    //   })
    //   .populate({
    //     path: "store",
    //     model: "StoreMaster",
    //   })
    //   .sort(sort)
    //   .skip(skip)
    //   .limit(limit);

    users = await Employee.aggregate([
      {
        $lookup: {
          from: "employeeDocs",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeDocs",
        },
      },
      {
        $lookup: {
          from: "storeMaster",
          localField: "store",
          foreignField: "_id",
          as: "store",
        },
      },
      {
        $lookup: {
          from: "roleMaster",
          localField: "role",
          foreignField: "_id",
          as: "role",
        },
      },
      {
        $lookup: {
          from: "employeeStatus",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeStatus",
        },
      },
      { $match: find },
      { $skip: skip },
      { $limit: limit },
      { $unwind: "$store" },
      { $unwind: "$role" },
      { $unwind: { path: "$employeeStatus", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$employeeDocs", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: { $toString: "$_id" },
          firstName: 1,
          lastName: 1,
          email: 1,
          dateOfBirth: 1,
          empStatus: 1,
          phoneNumber: 1,
           formCompleted: 1,
          pageStatus:1,
          "store.storeName": 1,
          "store._id": 1,
          "store.storeLocation": 1,
          "role.roleName": 1,
          "role._id": 1,
          "employeeDocs.documents": 1,
        },
      },
    ]).exec();
  } else if (store.length > 0 && role.length === 0) {
    const find = {
      $and: [
        {
          $or: [{ userName: regex }, { firstName: regex }, { lastName: regex }, { phoneNumber: regex }, { email: regex }],
        },
        { "employeeStatus.status": empStatus },
        // { empStatus: empStatus },
        // { store: store },
        { "store._id": ObjectId(store) },
      ],
    };
    allUsers = await Employee.aggregate([
      {
        $lookup: {
          from: "storeMaster",
          localField: "store",
          foreignField: "_id",
          as: "store",
        },
      },
      {
        $lookup: {
          from: "employeeStatus",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeStatus",
        },
      },
      { $match: find },
    ]).count("count");

    users = await Employee.aggregate([
      {
        $lookup: {
          from: "employeeDocs",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeDocs",
        },
      },
      {
        $lookup: {
          from: "storeMaster",
          localField: "store",
          foreignField: "_id",
          as: "store",
        },
      },
      {
        $lookup: {
          from: "roleMaster",
          localField: "role",
          foreignField: "_id",
          as: "role",
        },
      },
      {
        $lookup: {
          from: "employeeStatus",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeStatus",
        },
      },
      { $match: find },
      { $skip: skip },
      { $limit: limit },
      { $unwind: "$store" },
      { $unwind: "$role" },
      { $unwind: { path: "$employeeStatus", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$employeeDocs", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: { $toString: "$_id" },
          firstName: 1,
          lastName: 1,
          email: 1,
          dateOfBirth: 1,
          empStatus: 1,
          phoneNumber: 1,
           formCompleted: 1,
          pageStatus:1,
          "store.storeName": 1,
          "store._id": 1,
          "store.storeLocation": 1,
          "role.roleName": 1,
          "role._id": 1,
          "employeeDocs.documents": 1,
        },
      },
    ]);
  } else if (store.length === 0 && role.length > 0) {
    const find = {
      $and: [
        {
          $or: [{ userName: regex }, { firstName: regex }, { lastName: regex }, { phoneNumber: regex }, { email: regex }],
        },
        // { empStatus: empStatus },
        { "employeeStatus.status": empStatus },

        { "role._id": ObjectId(role) },
      ],
    };
    allUsers = await Employee.aggregate([
      {
        $lookup: {
          from: "storeMaster",
          localField: "store",
          foreignField: "_id",
          as: "store",
        },
      },
      {
        $lookup: {
          from: "roleMaster",
          localField: "role",
          foreignField: "_id",
          as: "role",
        },
      },
      {
        $lookup: {
          from: "employeeStatus",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeStatus",
        },
      },
      { $match: find },
    ]).count("count");

    users = await Employee.aggregate([
      {
        $lookup: {
          from: "employeeDocs",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeDocs",
        },
      },
      {
        $lookup: {
          from: "storeMaster",
          localField: "store",
          foreignField: "_id",
          as: "store",
        },
      },
      {
        $lookup: {
          from: "roleMaster",
          localField: "role",
          foreignField: "_id",
          as: "role",
        },
      },
      {
        $lookup: {
          from: "employeeStatus",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeStatus",
        },
      },
      {
        $lookup: {
          from: "employeeStatus",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeStatus",
        },
      },
      { $match: find },
      { $skip: skip },
      { $limit: limit },
      { $unwind: "$store" },
      { $unwind: "$role" },
      { $unwind: { path: "$employeeDocs", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$employeeStatus", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: { $toString: "$_id" },
          firstName: 1,
          lastName: 1,
          email: 1,
          dateOfBirth: 1,
          empStatus: 1,
          phoneNumber: 1,
           formCompleted: 1,
          pageStatus:1,
          "store.storeName": 1,
          "store._id": 1,
          "store.storeLocation": 1,
          "role.roleName": 1,
          "role._id": 1,
          "employeeDocs.documents": 1,
          "employeeStatus.status": 1,
        },
      },
    ]).exec();
  } else {
    const find = {
      $and: [
        {
          $or: [{ userName: regex }, { firstName: regex }, { lastName: regex }, { phoneNumber: regex }, { email: regex }],
        },
        { "employeeStatus.status": empStatus },
        // { empStatus: empStatus },
      ],
    };

    allUsers = await Employee.aggregate([
      {
        $lookup: {
          from: "employeeStatus",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeStatus",
        },
      },
      { $match: find },
    ]).count("count");

    users = await Employee.aggregate([
      {
        $lookup: {
          from: "employeeDocs",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeDocs",
        },
      },
      {
        $lookup: {
          from: "storeMaster",
          localField: "store",
          foreignField: "_id",
          as: "store",
        },
      },
      {
        $lookup: {
          from: "roleMaster",
          localField: "role",
          foreignField: "_id",
          as: "role",
        },
      },
      {
        $lookup: {
          from: "employeeStatus",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeStatus",
        },
      },
      { $match: find },
      { $skip: skip },
      { $limit: limit },
      { $unwind: "$store" },
      { $unwind: "$role" },
      { $unwind: { path: "$employeeStatus", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$employeeDocs", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: { $toString: "$_id" },
          firstName: 1,
          lastName: 1,
          email: 1,
          dateOfBirth: 1,
          empStatus: 1,
          phoneNumber: 1,
           formCompleted: 1,
          pageStatus:1,
          "store.storeName": 1,
          "store._id": 1,
          "store.storeLocation": 1,
          "role.roleName": 1,
          "role._id": 1,
          "employeeDocs.documents": 1,
        },
      },
    ]).exec();
  }

  for (let user of users) {
    const test = user?.employeeDocs?.documents;
    // console.log(test);
    user.isDocExpired = false;
    user.isDocExpiringInThree = false;
    if (test !== undefined) {
      test.forEach((element: any) => {
        // console.log(element);
        if (element.expiryDate !== "" && element.expiryDate !== undefined) {
          const currentDate = new Date();
          const docDate = new Date(element.expiryDate);
          const months = monthDiff(currentDate, docDate);
          if (months <= 3) {
            user.isDocExpiringInThree = true;
          }
          if (currentDate > docDate) {
            user.isDocExpired = true;
            user.isDocExpiringInThree = false;
          }
        }
      });
    }
  }

  function monthDiff(d1: any, d2: any) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  const employees = {
    count: allUsers,
    data: users,
  };

  return employees;
};
