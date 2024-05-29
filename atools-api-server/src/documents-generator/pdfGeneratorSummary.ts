// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const pdfGeneratorSummary = (data: any) => {
    const today = new Date();
    const DOB = new Date(data.dateOfBirth);
return ( `
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Employee Contract Pdf</title>
  <meta name="generator" content="BCL easyConverter SDK 5.0.252" />
  <meta name="author" content="DOMFD" />
  <meta name="keywords" content=" TCPDF" />
  <style type="text/css" media="all">
    body {
      font-family: "Arial"; /* replace this with your font */
    }
    @page {
      size: A4 portrait; /* can use also 'landscape' for orientation */
      margin: 1in;
      border: thin solid black;
      padding: 1em;

      @bottom-center {
        content: element(footer);
      }

      @top-center {
        content: element(header);
      }
    }

    div.pageheader {
      display: block;
      position: running(header);
    }

    div.pagefooter {
      display: block;
      position: running(footer);
    }
    
  .ft0 {
    font: bold 16px "Arial";
    line-height: 19px;
  }
  .ft1 {
    font: 13px "Arial";
    line-height: 16px;
  }
  .ft2 {
    font: 11px "Helvetica";
    color: #004000;
    line-height: 14px;
  }
  .ft3 {
    font: bold 21px "Arial";
    line-height: 24px;
  }
  .ft4 {
    font: bold 13px "Arial";
    line-height: 16px;
  }
  .ft5 {
    font: 13px "Arial";
    margin-left: 4px;
    line-height: 16px;
  }
  .ft6 {
    font: 13px "Arial";
    margin-left: 3px;
    line-height: 16px;
  }
  .ft7 {
    font: 12px "Arial";
    line-height: 15px;
  }
  .ft8 {
    font: 1px "Helvetica";
    line-height: 2px;
  }
    #pagenumber:before {
      content: counter(page);
    }

    #pagecount:before {
      content: counter(pages);
    }
    hr.solid {
border-top: 3px solid #bbb;
}
  </style>
</head>

<body>

  <div class="page" style="page-break-after: always">
      <p class="p0 ft0">
          Employee pack for ${`${data.firstName} ${data.lastName}`}
        </p>
        <p class="p1 ft1">Employee no:${data._id}</p>
        <p class="p2 ft1">Title: ${data.generalDetails.title ? data.generalDetails.title : "NA" }</p>
        <p class="p2 ft1">Name: ${data.generalDetails.firstName ? data.generalDetails.firstName : "NA"}</p>
        <p class="p2 ft1">Surname: ${data.generalDetails.lastName ? data.generalDetails.lastName : "NA"}</p>
        <p class="p3 ft1">Username: ${data.generalDetails.userName ? data.generalDetails.userName : "NA"}</p>
        <p class="p3 ft1">Gender: ${data.generalDetails.gender ? data.generalDetails.gender : "NA" }</p>
        <p class="p4 ft1">
          Marital Status: ${data.generalDetails.maritialStatus ? data.generalDetails.maritialStatus : "NA"}
        </p>
        <p class="p4 ft1">
          Location:${`${data.addressLine1} ${data.addressLine2} ${data.postCode}`
          }
        </p>
        <p class="p5 ft1">Managed by:${data.store.storeName ? data.generalDetails.storeName : "NA"}</p>
        <p class="p4 ft1">Start Date:${data.email ? data.generalDetails.email : "NA"}</p>
        <p class="p6 ft1">Email: ${data.email ? data.generalDetails.email : "NA"}</p>
        <p class="p6 ft1">Phone:${data.generalDetails.phoneNumber ? data.generalDetails.phoneNumber : "NA"}</p>
        <p class="p7 ft1">Work Phone:${data.generalDetails.workNumber ? data.generalDetails.workNumber : "NA"}</p>
        <p class="p8 ft1">Mobile Phone: ${data.generalDetails.mobileNumber ? data.generalDetails.mobileNumber : "NA"}</p>
        <p class="p9 ft1">
          Address: ${`${data.generalDetails.addressLine1 }
          ${data.generalDetails.addressLine2} ${data.generalDetails.postCode}` }
        </p>
        <p class="p10 ft1">NI Number: ${data.payrollDetails.niNumber ? data.generalDetails.niNumber : "NA"}</p>
        <p class="p10 ft1">
          NIDate of Birth: ${`${DOB.getDate().toString()}. ${(DOB.getMonth() + 1).toString()}.
          ${DOB.getFullYear().toString()}.`}
        </p>
        <p class="p11 ft1">Job Title: ${data.role.roleName ? data.generalDetails.roleName : "NA"}</p>
        <p class="p11 ft1">Rate of Pay:$${data.payrollDetails.payRate ? data.generalDetails.payRate : "NA"}</p>
        <p class="p12 ft1">Sort Code:${data.payrollDetails.sortCode ? data.generalDetails.sortCode : "NA"}</p>
        <p class="p12 ft1">
          Account Number: ${data.payrollDetails.accountNumber ? data.generalDetails.accountNumber : "NA"}
        </p>
        <p class="p12 ft1">Account Name:${data.payrollDetails.accountName ? data.generalDetails.accountName : "NA"}</p>
        <p class="p13 ft1">
          Account Reference: ${data.payrollDetails.accountRefrence ? data.generalDetails.accountRefrencerobo : "NA" }
        </p>
        <p class="p14 ft1">
          P45 Received:${data.payrollDetails.payeForm === 'P45' ? 'Yes' : 'No'}
        </p>
        <p class="p15 ft1">
          P46 letter ticked: ${data.payrollDetails.payeForm === 'P45' ? 'NA' :
          data.payrollDetails.p46letter}
        </p>
        <p class="p16 ft1">
          P46 letter D ticked: ${data.payrollDetails.p46Dletter ?
          data.payrollDetails.p46Dletter : 'NA'}
        </p>
        <p class="p17 ft1">
          Right to work selection: ${data.rightToWorkDetails.nationalityName ?
          data.rightToWorkDetails.nationalityName : 'NA'}
        </p>
        <p class="p17 ft1">Passport Number:</p>
        <p class="p18 ft1">
          Documents: ${data.rightToWorkDetails.documents.map((m:any) =>
          m.documentName)}
        </p>
        <p class="p19 ft1">Maximum Visa Hours: Not Applicable</p>
    
        </div>
</body>
</html>

    `);
};