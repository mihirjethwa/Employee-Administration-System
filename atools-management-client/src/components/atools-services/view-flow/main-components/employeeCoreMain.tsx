import * as React from "react";
import EmployeeCoreSecTionOne from "../sub-components/employeeCoreSec1";
import EmployeeCoreSecTionTwo from "../sub-components/employeeCoreSec2";
import EmployeeCoreSecTionThree from "../sub-components/employeeCoreSec3";
import EmployeeCoreSecTionFour from "../sub-components/employeeCoreSec4";
import EmployeeCoreSecTionFive from "../sub-components/employeeCoreSec5";

/**
 * 1. General
 * 2. Payroll
 * 3. Summary
 * 4. Right to work
 * 5. Additional Docs
 */
function EmployeeCoreMain(props: any) {

  switch (props.ActiveSection) {
    case 1:
      return <EmployeeCoreSecTionOne selectedEmployee={props.selectedEmployee} addNew={false} handleToggle={props.handleToggle}/>;
      break;
    case 2:
      return <EmployeeCoreSecTionTwo selectedEmployee={props.selectedEmployee} addNew={false} handleToggle={props.handleToggle}/>;
      break;
    case 3:
      return <EmployeeCoreSecTionThree selectedEmployee={props.selectedEmployee} addNew={false} handleToggle={props.handleToggle}/>;
      break;
    case 4:
      return <EmployeeCoreSecTionFour selectedEmployee={props.selectedEmployee} addNew={false} handleToggle={props.handleToggle}/>;
      break;
    case 5:
      return <EmployeeCoreSecTionFive selectedEmployee={props.selectedEmployee} addNew={false} handleToggle={props.handleToggle}/>;
      break;
    default:
      return <EmployeeCoreSecTionOne selectedEmployee={props.selectedEmployee} addNew={false} handleToggle={props.handleToggle}/>;
      break;
  }
}
export default EmployeeCoreMain;
