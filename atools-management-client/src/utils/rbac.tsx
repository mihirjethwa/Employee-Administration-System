import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const RBAC = ({ accessModules, children }) => {
  const makeRoutes = (data) => {
    var obj = new Array();
    // console.log(data);

    data.map((k) => {
      if (k.access === true) {
        obj.push(k.name);
      }
    });

    return obj;
  };
  const allowedUserChecker = (a: string, b: Array<string>, c: Array<string>) => {
    var arr = new Array();

    return accessModules.map((m) => accessRoutes.includes(m)).includes(true);
  };
  const userData = useSelector((state: any) => state.auth);
  const accessRoutes = makeRoutes(userData.user.access);
  let access = allowedUserChecker(userData.user.role, accessModules, accessRoutes);

  if (children.key === "form" && !accessRoutes.includes("Edit_Employee_Manager")) {
    return access && <fieldset disabled>{children}</fieldset>;
  }
  if (children.key === "empty") {
    return true;
  }
  return access && children;
};

RBAC.propTypes = {
  accessModules: PropTypes.array,
  children: PropTypes.element,
};

export default RBAC;
