import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...props }: any) => {
  const userData = useSelector((state: any) => state.auth);

  if (!userData.isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: {
            from: props.location,
          },
        }}
      />
    );
  }
  // else if (userData.isAuthenticated && !access) {
  //   return (
  //     <Redirect
  //       to={{
  //         pathname: "/login",
  //         state: {
  //           from: props.location,
  //         },
  //       }}
  //     />
  //   );
  // }

  const makeRoutes = (data) => {
    var obj = new Array();
    console.log(data);

    data.map((k) => {
      if (k.access === true) {
        obj.push(k.name);
      }
    });

    return obj;
  };

  const allowedUserChecker = (a: string, b: Array<string>, c: Object) => {
    return props.accessModules.map((m) => accessRoutes.includes(m)).includes(true);
  };

  const accessRoutes = makeRoutes(userData.user.access);
  let access = allowedUserChecker(userData.user.role, props.accessModules, accessRoutes);

  return <Route {...props} render={(routeProps) => <Component {...routeProps} />} />;
};

export default ProtectedRoute;
