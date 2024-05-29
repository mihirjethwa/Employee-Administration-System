import React from "react";

const data = [
  {
    modulesAccess: ["Module 3", "Module 5", "Module 6", "Module 4"],
    _id: "6059fb2c64a61041d854f2db",
    roleName: "Supervisor",
    createdAt: "2021-03-23T14:29:00.690Z",
    __v: 0,
  },
  {
    modulesAccess: ["Module 1", "Module 3"],
    _id: "6059fb3f64a61041d854f2dc",
    roleName: "Manager",
    createdAt: "2021-03-23T14:29:19.498Z",
    __v: 0,
  },
  {
    modulesAccess: ["Module 1", "Module 3", "Module 5"],
    _id: "608327db0872151164d8e30d",
    roleName: "Driver",
    createdBy: {
      _id: "6047566f8e41265af8215a1b",
      name: "Mihir Jethwa",
    },
    createdAt: "2021-04-23T20:02:35.793Z",
    __v: 0,
  },
];

const makeRoutes = () => {
  var obj = {
    roles: [],
  };
  // data.map(m => {m.modulesAccess.map(k => {
  //   obj.roles.push(m.roleName);
  //   k = obj
  // } ) } )
};

// module.exports = {
//   View_Employee_Manager: {
//     roles: ["ROLE_ADMIN", "ROLE_MANAGER"],
//   },
//   employeeManager: {
//     roles: ["ROLE_ADMIN", "ROLE_MANAGER"],
//   },
//   Master: {
//     roles: ["ROLE_ADMIN", "ROLE_MANAGER"],
//   },
// };
