// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const pdfGeneratorContract = (data: any) => {
    const today = new Date();
    const DOB = new Date(data.dateOfBirth);
	const StartDate = new Date(data.startDate)
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
			  Date of Birth: ${`${DOB.getDate()}. ${DOB.getMonth() + 1}.${DOB.getFullYear()}.`}
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
			<div class="page" >
		
				  <p class="p21 ft3">STATEMENT OF MAIN TERMS OF EMPLOYMENT</p>
				  <p class="p22 ft4">
					BETWEEN: MDJ Investments Limited, Dominos Orpington (28109), 296 High
					Street, Orpington, Kent, BR6 0NF Limited T/A Domino's Pizza (THE
					COMPANY)
				  </p>
				  <p class="p23 ft4">AND</p>
				  <p class="p23 ft4">
					Name of Employee: ${`${data.firstName} ${data.lastName}`} (YOU)
				  </p>
				  <p class="p24 ft4">
					Date:${`${today.getDate()}. ${today.getMonth() + 1}.
					${today.getFullYear()}.`}
				  </p>
				  <p class="p25 ft1">
					This Statement, together with the Employee Handbook, sets out
					particulars of your employment with the Company as at the date hereof
					which are required to be issued to you under Section 1 of the Employment
					Rights Act 1996. This document forms part of your Contract of Employment
					(except where the contrary is expressly stated) and sets out particulars
					of the main terms on which you are employed.
				  </p>
				  <p class="p26 ft4">COMMENCEMENT OF EMPLOYMENT</p>
				  <p class="p27 ft1">Your employment commenced on :${`${StartDate.getDate()}. ${StartDate.getMonth() + 1}.
				  ${StartDate.getFullYear()}.`}</p>
				  <p class="p28 ft1">Your continuous employment commenced on ${`${StartDate.getDate()}. ${StartDate.getMonth() + 1}.
				  ${StartDate.getFullYear()}.`}</p>
				  <p class="p27 ft1">
					No previous employment with any other company counts as part of your
					period of continuous employment.
				  </p>
				  <p class="p27 ft4">PROBATIONARY PERIOD</p>
				  <p class="p29 ft1">
					It is a condition of your employment that the first 6 months are a
					probationary period, at the end of which or during which your employment
					may be terminated. The Company reserves the right to extend this initial
					period up to a further 6 months should your performance be considered
					unsatisfactory.
				  </p>
				  <p class="p28 ft4">JOB TITLE</p>
				  <p class="p30 ft1">
					You are employed as a Team Member. You are responsible to and will
					report to the <nobr>on-duty</nobr> store manager or any other manager
					who may be nominated by the Company from time to time.
				  </p>
				  <p class="p30 ft1">
					Your main duties will entail all those duties necessary for the general
					running of the store to include but not limited to:-
				  </p>
				  <p class="p28 ft1">
					<span class="ft1">-</span><span class="ft5">food preparation;</span>
				  </p>
				  <p class="p31 ft1">
					<span class="ft1">-</span><span class="ft5">deliveries;</span>
				  </p>
				  <p class="p32 ft1">
					<span class="ft1">-</span
					><span class="ft5">answering the telephone;</span>
				  </p>
				  <p class="p32 ft1">
					<span class="ft1">-</span
					><span class="ft5">dealing with customers;</span>
				  </p>
				  <p class="p31 ft1">
					<span class="ft1">-</span><span class="ft5">cleaning the store;</span>
				  </p>
				  <p class="p32 ft1">
					<span class="ft1">-</span
					><span class="ft5"
					  >participating in any training required by the Company;</span
					>
				  </p>
				  <p class="p33 ft1">
					<span class="ft1">-</span
					><span class="ft6"
					  >acting in accordance with the instructions given to you by your
					  Manager or such person as may be nominated by your Manager;</span
					>
				  </p>
				  <p class="p32 ft1">
					<span class="ft1">-</span
					><span class="ft5"
					  >complying with all of Domino's rules with respect to the running of
					  the store and to general food preparation;</span
					>
				  </p>
				  <p class="p34 ft1">
					<span class="ft1">-</span
					><span class="ft6"
					  >observing and complying with any law relevant to the Company's
					  business and with the Company's policies, procedures and operating
					  manuals, details of which are provided in the Handbook.</span
					>
				  </p>
				  <p class="p35 ft1">
					For avoidance of doubt, if you work as a Delivery Driver, whilst your
					main duties will obviously be to deliver food to customers, you
					acknowledge that the Company reserves the absolute right to require you
					at any time and from time to time to perform any of the duties listed
					above.
				  </p>
				  <p class="p28 ft4">PLACE OF WORK</p>
				  <p class="p37 ft1">
				  You will normally be required to work at the Orpington store, or such
				  other place as the Company may reasonably require. You will not be
				  required to work outside the United Kingdom.
				</p>
				<p class="p28 ft4">HOURS OF WORK</p>
				<p class="p38 ft1">
				  You will be required to work on a shift basis as set out in the weekly
				  working rota decided by your Manager. There are no fixed daily or weekly
				  normal working hours, and you will be required to work at varying times
				  throughout the working week (which is defined as being Monday to Sunday)
				  and which will include evenings and Bank Holidays. It is a requirement
				  of your employment that your hours of work are, and shall remain,
				  flexible and subject to change on a regular basis. In certain
				  circumstances, it may be necessary to adjust or exceed your normal
				  working hours in order to meet the needs of the Company's or an
				  Associate's business.
				</p>
				<p class="p39 ft4">REST ENTITLEMENT</p>
				<p class="p40 ft1">
				  You will receive an unpaid meal break with such additional hours of work
				  may be reasonably be required for the proper performance of your duties
				  and this has been taken into consideration in determining your salary
				  and conditions of employment. Where possible employees are required to
				  take their rest entitlements during the quiet periods throughout the
				  day.
				</p>
				<p class="p41 ft1">
				  You will be required to work overtime in addition to your normal hours
				  if necessary, for the proper performance of your duties without
				  additional premium rate pay.
				</p>
				<p class="p42 ft1">
				  You will be required to work weekend days on Friday, Saturday and
				  Sunday. This may include all 3 weekend days.
				</p>
				<p class="p43 ft1">
				  You may be required, on some occasions, to work in excess of the
				  <nobr>48-hour</nobr> maximum weekly limit imposed by law. If this
				  applies to you, and you are over the 18 years of age, the Company will
				  ask you to sign a separate Opt Out Agreement confirming your agreement
				  to disapply this maximum limit.
				</p>
				<p class="p28 ft4">REMUNERATION</p>
				<p class="p44 ft1">
				  Your wage will be £8.91 per Hour payable in excess of by credit transfer
				  as detailed on your pay statement. [Overtime is payable at the rate of £
				  0.00 per hour.]
				</p>
				<p class="p45 ft1">
				  In order to make payment to you, you are required (by no later than 5
				  days after commencement of employment) to provide the Company with
				  details of your bank account, into which you wish payment to be made.
				</p>
				<p class="p28 ft4">Bonus - Managers Only</p>
				<p class="p46 ft1">
				  You may be entitled to participate in the Company's performance related
				  bonus scheme. There is no contractual right to participate in the scheme
				  and this decision remains the sole discretion of the Company. If a
				  decision is made to permit you to participate in the scheme, the amount
				  and timing of any bonus is entirely at the discretion of the Company.
				  The details of the scheme will be communicated to you separately, as
				  appropriate. It is a condition of any bonus payment that you continue to
				  be employed by the Company and are not under notice at the date on which
				  any bonus is payable.
				</p>
				<p class="p39 ft4">Delivery Allowance - Owner Drivers Only</p>
				<p class="p47 ft1">
				  You will receive an allowance for each delivery made. This allowance
				  will contribute to the wear and tear on your vehicle and the cost of
				  fuel. The current rates for delivery will be supplied to you separately.
				</p>
				<p class="p48 ft1">
				  There may be occasions where a customer offers you a tip for the service
				  that you have delivered. A tip is an uncalled for and spontaneous cash
				  payment offered by a customer. If customers give cash tips directly to
				  you then it is your responsibility to advise HMRC of the amounts of
				  monies received.
				</p>
				<p class="p21 ft4">DRIVING OFFENCES</p>
				<p class="p50 ft1">
				  During the course of your employment if you incur any driving offences
				  during working hours or outside working hours you must immediately
				  report the offence to the Management. Depending on the seriousness of
				  the offence disciplinary action may be taken or your contract of
				  employment may be reviewed. For further information refer to the
				  employee handbook. You will be personally responsible for any fines that
				  may be imposed.
				</p>
				<p class="p51 ft4">DUTIES</p>
				<p class="p52 ft1">
				  You will observe and comply with all lawful and proper orders and
				  directions which may be given to you in connection with your employment
				  and with any statutory requirements or other regulations to the time
				  being in force at the place of your employment.
				</p>
				<p class="p53 ft1">
				  You will faithfully and diligently perform such duties and job functions
				  in accordance with your post and may be instructed and should always use
				  your best endeavours to further the business of the Company. The Company
				  reserves the right to require you to carry out duties of a different
				  nature that are additional to or instead of those specified in your
				  letter of appointment/job description provided you are capable of
				  performing the same and are consistent with the status of your position.
				</p>
				<p class="p51 ft4">Occasional business use insurance - Drivers Only</p>
				<p class="p54 ft1">
				  If you make a delivery at any time, you need to have appropriate and
				  valid insurance to do so. All insurance claim excesses will be your
				  responsibility and you will be liable for the cost to the Company. This
				  is a <nobr>third-party</nobr> business policy only.
				</p>
				<p class="p55 ft1">
				  You should refer to the Employee Handbook which outlines the
				  circumstances where this would apply and the procedures to be followed
				  to reclaim the costs involved.
				</p>
				<p class="p28 ft1">Excess amount:</p>
				<p class="p56 ft1">Over 21 years old - £250</p>
				<p class="p57 ft1">Under 21 years old - £750</p>
				<p class="p27 ft4">PENSION AND PENSION SCHEME</p>
				<p class="p58 ft1">
				  There is a stakeholder pension scheme applicable to your employment when
				  you have completed 3 months' service. Further details are available from
				  Management. A <nobr>contracting-out</nobr> certificate is not in force
				  in respect of your employment.
				</p>
				<p class="p28 ft4">DEDUCTIONS FROM WAGES</p>
				<p class="p29 ft1">
				  The Company reserves the right in its absolute discretion to deduct from
				  your pay any sums which you may owe to the Company including, without
				  limitation, any overpayment (including but not limited to overpayment of
				  holiday and wages), advance of wages or loans made to you, loss or
				  damage to Company property, non return of Company property or equipment,
				  cash shortages or stock deficiency for which the Company may reasonably
				  hold you responsible. You should also refer to the Employee Handbook
				  which sets out other circumstances in which deductions may be made from
				  your pay and the process that needs to be followed in these
				  circumstances. You confirm your acceptance of any such deductions by
				  signing and returning this Statement.
				</p>
				<p class="p59 ft1">
				  If you are not able to return your uniform or it is returned in an
				  unreasonable condition when and if you leave the Company, a deduction
				  will be made from your final salary.
				</p>
				<p class="p28 ft4">COLLECTIVE AGREEMENTS</p>
				<p class="p27 ft1">
				  No collective agreements directly affect your terms and conditions of
				  employment.
				</p>
				<p class="p21 ft4">ANNUAL HOLIDAYS</p>
				<p class="p61 ft1">
				  Your holiday year begins on 1st January and ends on 31st December each
				  year, during which you will receive a paid holiday entitlement of 5.6
				  weeks inclusive of any public/bank holidays which may be taken. For part
				  years of service your entitlement will be calculated as 1/46.4 of the
				  annual entitlement for each completed week of service during that
				  holiday year.
				</p>
				<p class="p51 ft1">
				  Where your hours vary, your holiday pay will be based on your average
				  earnings over the previous 12 weeks.
				</p>
				<p class="p50 ft1">
				  You may be restricted from taking your holiday until such time as this
				  has accrued or you may be restricted on when you may take your holidays
				  during the busy season. Further conditions relating to the taking of
				  holidays are shown in the Employee Handbook to which you should refer.
				</p>
				<p class="p62 ft1">
				  Under no circumstances (except upon termination of employment) will
				  payment be made for holiday not taken. In the event of termination of
				  your employment, you may be asked to take any accrued but untaken
				  holiday during your notice period.
				</p>
				<p class="p28 ft4">PUBLIC/BANK HOLIDAYS</p>
				<p class="p45 ft1">
				  Because of the nature of the business, you may be required to work on
				  any of the public/bank holidays listed below according to your roster,
				  and it is a condition of employment that you work on these days when
				  required to do so. The public/bank holidays each year are: -
				</p>
				<p class="p28 ft1">New Year's Day</p>
				<p class="p32 ft1">The last Monday in May</p>
				<p class="p32 ft1">Good Friday</p>
				<p class="p31 ft1">The last Monday in August</p>
				<p class="p32 ft1">Easter Monday</p>
				<p class="p32 ft1">Christmas Day</p>
				<p class="p31 ft1">The first Monday in May</p>
				<p class="p32 ft1">Boxing Day</p>
				<p class="p40 ft1">
				  In the event of a shutdown occurring on a public/bank holiday that you
				  would normally have worked, alternative hours will, wherever possible,
				  be provided for you during that week in order that you do not suffer any
				  loss due to the closure.
				</p>
				<p class="p26 ft4">SICKNESS PAY AND CONDITIONS</p>
				<p class="p63 ft1">
				  There is no contractual sickness/injury payments scheme in addition to
				  Statutory Sick Pay (SSP). Further conditions relating to the reporting
				  and management of absence can be found in the Employee Handbook to which
				  you should refer.
				</p>
				<p class="p26 ft4">NOTIFICATION OF ABSENCE</p>
				<p class="p64 ft1">
				  You must obtain prior authorisation from your Manager and complete an
				  absence report form prior to all periods of absence other than sickness
				  and injury.
				</p>
				<p class="p65 ft1">
				  If you are unable to come to work for any reason, and your absence has
				  not been previously authorised by the Company, you must comply with the
				  notification procedures and other rules relating to absence set out in
				  he Employee Handbook.
				</p>
				<p class="p53 ft1">
				  If you fail to follow the above procedures, unreasonable refuse to
				  <nobr>co-operate</nobr> with the Company if the Company finds
				  explanation for your absence unsatisfactory the Company is entitled to
				  treat the absence as unauthorised. The Company may take disciplinary
				  action against you which may lead to your dismissal.
				</p>
				<p class="p21 ft4">MEDICAL EXAMINATIONS</p>
				<p class="p66 ft1">
				  In the event of reasonable concerns about your health and the ability to
				  carry out your work, the Company reserves the right to ask you to submit
				  to a medical examination at any time, the cost of which will be borne by
				  the organisation at the Company's expense and carried out by a doctor of
				  the Company's choice. The Company will adhere to all statutory
				  requirements in making such a request. Further information can be found
				  in the Employee Handbook.
				</p>
				<p class="p51 ft4">PROCEDURES FOR DEALING WITH CAPABILITY ISSUES</p>
				<p class="p43 ft1">
				  The procedures that will apply when dealing with capability issues that
				  may arise during the course of your employment, including dismissal on
				  the grounds of capability, are shown under the heading "Capability and
				  Capability Dismissal Procedures" in the Employee Handbook, to which you
				  should refer. Such procedures do not have contractual effect. For the
				  avoidance of doubt, these procedures will also incorporate (on a
				  <nobr>non-contractual</nobr> basis) the procedures shown under the
				  heading "General Dismissal and Appeal Procedures" where legally
				  required.
				</p>
				<p class="p67 ft4">DISCIPLINARY AND DISCIPLINARY DISMISSAL PROCEDURES</p>
				<p class="p30 ft1">
				  The disciplinary rules that form part of your contract of employment and
				  the <nobr>non-contractual</nobr> procedures that apply when dealing with
				  disciplinary issues and disciplinary dismissals are shown under the
				  heading "Disciplinary and Disciplinary Dismissal Procedures" in the
				  Employee Handbook, to which you should refer. For the avoidance of
				  doubt, these procedures will also incorporate (on a
				  <nobr>non-contractual</nobr> basis) the procedures shown under the
				  heading "General Dismissal and Appeal Procedures" where legally
				  required.
				</p>
				<p class="p51 ft4">CAPABILITY/DISCIPLINARY APPEAL PROCEDURE</p>
				<p class="p46 ft1">
				  Should you be dissatisfied with any decision to take action or dismiss
				  you on capability/disciplinary grounds, you should apply, either
				  verbally or in writing, to the Company within five working days of the
				  decision you are appealing against. Further information can be found in
				  the Employee Handbook under the heading "Capability/Disciplinary Appeal
				  Procedure" to which you should refer.
				</p>
				<p class="p26 ft4">GENERAL DISMISSAL AND APPEAL PROCEDURES</p>
				<p class="p68 ft1">
				  The procedures that will apply, where legally required, when dealing
				  with dismissals other than capability/disciplinary dismissals, are shown
				  under the heading "General Dismissal and Appeal Procedures" in the
				  Employee Handbook, to which you should refer. These procedures are set
				  down by statute and do not form part of your Contract of Employment.
				  Should there be any change to the relevant statutory procedures or to
				  the circumstances in which they apply then such changes will be taken
				  into account. Additional procedures may be followed where appropriate to
				  the circumstances of any particular case.
				</p>
				<p class="p51 ft4">GRIEVANCE PROCEDURE</p>
				<p class="p65 ft1">
				  Should you feel aggrieved at any matter relating to your employment, you
				  should raise the grievance with your Manager, either verbally or in
				  writing. However, you should be aware that in order to avail yourself of
				  certain statutory rights, you must set out your grievance and the basis
				  for it in writing. Further details of the grievance procedure (which is
				  <nobr>non-contractual)</nobr> can be found in the Employee Handbook.
				</p>
				<p class="p26 ft4">DISCRIMINATION/HARASSMENT/BULLYING/STRESS</p>
				<p class="p69 ft1">
				  All discrimination, harassment, bullying and stress policies are
				  outlined in the Employee Company Handbook. It is your responsibility to
				  familiarise yourself with the procedure.
				</p>
				<p class="p28 ft4">LEAVE AND SPECIAL LEAVE</p>
				<p class="p70 ft1">
				The company will grant leave and special leave in individual
				circumstances. Further details can be obtained from Management and the
				Employee Handbook.
			  </p>
			  <p class="p28 ft4">NOTICE OF TERMINATION TO BE GIVEN BY EMPLOYER</p>
			  <p class="p27 ft1">During Probationary Period:</p>
			  <p class="p71 ft1">Under 1 month's service - Nil</p>
			  <p class="p71 ft1">Thereafter during probationary period - 1 week</p>
			  <p class="p27 ft1">After successful completion of probationary period:</p>
			  <p class="p71 ft1">
				1 week for each completed year of service up to a maximum of 12 weeks.
			  </p>
			  <p class="p72 ft1">
				Nothing in this Statement prevents the Company from terminating your
				employment without notice or payment in lieu of notice in the event of
				serious breach by you of the terms of your employment or in the event of
				any act or acts of gross misconduct by you.
			  </p>
			  <p class="p26 ft4">NOTICE OF TERMINATION TO BE GIVEN BY EMPLOYEE</p>
			  <p class="p27 ft1">Under 1 month's service - Nil</p>
			  <p class="p32 ft1">1 month's service or more - 1 week</p>
			  <p class="p27 ft4">PAY IN LIEU OF NOTICE</p>
			  <p class="p73 ft1">
				The Company reserves the right (but is not obliged) to elect to make
				payment of salary/wages in lieu of notice upon termination of an
				employee's contract. A payment in lieu of notice is restricted to basic
				salary only. This provision may be applied whether notice is given by
				the employee or the Company.
			  </p>
			  <p class="p26 ft4">SHORT TIME WORKING AND LAY OFFS</p>
			  <p class="p74 ft1">
				The Company reserves the right to introduce
				<nobr>short-time</nobr> working or a period of temporary lay off without
				pay where this is necessary to avoid redundancies or where there is a
				shortage of work. The Company will comply with any statutory guaranteed
				minimum payment obligations.
			  </p>
			  <p class="p26 ft4">RIGHT TO SEARCH</p>
			  <p class="p75 ft1">
				The Company reserves the right to carry out searches of employees and
				their property. This also extends to vehicles that may or may not be on
				Company premises. These searches will be random and do not imply
				suspicion in relation to any individual concerned.
			  </p>
			  <p class="p76 ft1">
				Whilst you have the right to refuse to be searched, refusal by you to
				agree to being searched will be deemed to constitute a breach of
				contract, which could result in your dismissal.
			  </p>
			  <p class="p28 ft4">CONFIDENTIALITY</p>
			  <p class="p77 ft1">
				During the course of your employment, you may have access to
				confidential information about the Company. You must not (other than in
				the proper course of your duties or with the prior written consent of
				the Company) either during your employment or after its termination, use
				or disclose to anyone any confidential information. Confidential
				information includes, but is not limited to, all information (whether or
				not recorded) relating to the business, products, affairs and finances
				of the Company which is confidential to the Company, and trade secrets
				including technical data and <nobr>know-how</nobr> relating to the
				business of the Company or any of its business contacts.
			  </p>
			  <p class="p39 ft4">DISCLOSURE OF INFORMATION</p>
			  <p class="p78 ft1">
				If you disclose any information, which in the view of the Company is
				prejudicial to the Company or its directors, disciplinary action will
				result, this is subject to statutory rights and exceptions.
			  </p>
			  <p class="p21 ft4">DATA PROTECTION</p>
			  <p class="p66 ft1">
				You agree by signing this Statement that the Company or its agents
				(including but not limited to Domino's Pizza Group Ltd) may hold
				personal data relating to you. This may include sensitive personal data
				as defined by the Data Protection Act 1998. You further agree that the
				Company and its agents may process personal data relating to you for
				personnel administration and management purposes and may, when
				necessary, for those purposes, make such data available to its advisors,
				to parties providing products and/or services to the Company, to
				regulatory authorities and as required by law. Processing includes, but
				is not limited to, obtaining, recording, using and holding data and
				includes the transfer of data to any country either inside or outside
				the EEA.
			  </p>
			  <p class="p80 ft4">CHANGES TO YOUR STATEMENT OF TERMS & CONDITIONS</p>
			  <p class="p38 ft1">
				The Company reserves the right to make reasonable changes to any of your
				terms and conditions of employment, whether contained in this Statement
				or the Employee Handbook. The Company will notify you in writing of any
				substantive changes at the earliest opportunity. The changes will be
				deemed to be accepted unless you notify the Company of any objection in
				writing within one month of receiving such notification.
			  </p>
			  <p class="p26 ft4">MISCELLANEOUS TERMS</p>
			  <p class="p28 ft1">
				There are no collective agreements relevant to your employment.
			  </p>
			  <p class="p64 ft1">
				Termination of your contract of employment for whatever reason shall not
				affect any terms and conditions which are intended to operate after
				termination.
			  </p>
			  <p class="p29 ft1">
				If any provision of the Statement or the Handbook is held by any
				competent authority to be invalid or unenforceable in whole or in part
				the validity of the other provisions and the remainder of the provision
				in question shall not be affected.
			  </p>
			  <p class="p81 ft1">
				This statement, together with any documents referred to in it, sets out
				the whole agreement between you and the Company relating to, and cancels
				all previous agreements, representations and arrangements in connection
				with your employment with the Company.
			  </p>
			  <p class="p43 ft1">
				You should also read the information contained in the Employee Handbook,
				as it forms part of your contract of employment (except where the
				contrary is expressly stated). Please discuss any queries you may have
				with your Manager.
			  </p>
			  <table cellpadding="0" cellspacing="0" class="t0">
				<tr>
				  <td class="tr0 td0">
					<p class="p82 ft7">
					  ................................................................................
					</p>
				  </td>
				  <td class="tr0 td1">
					<p class="p83 ft7">..............................</p>
				  </td>
				</tr>
				<tr>
				  <td class="tr1 td0">
					<p class="p82 ft1">For on behalf of the Employer</p>
				  </td>
				  <td class="tr1 td1"><p class="p83 ft1">Date</p></td>
				</tr>
			  </table>
			  <p class="p84 ft1">
				I acknowledge receipt of this Section 1 Employment Rights Act 1996
				written statement of Main Terms of Employment and confirm that I have
				read and understood the current Employee Handbook. I accept that it
				forms part of my Contract of Employment except where the contrary is
				expressly stated and I will keep myself informed of its contents.
			  </p>
			  <table cellpadding="0" cellspacing="0" class="t0">
				<tr>
				  <td class="tr0 td0">
					<p class="p82 ft7">
					  ................................................................................
					</p>
				  </td>
				  <td class="tr0 td1">
					<p class="p83 ft7">..............................</p>
				  </td>
				</tr>
				<tr>
				  <td class="tr1 td0"><p class="p82 ft1">Employee</p></td>
				  <td class="tr1 td1"><p class="p83 ft1">Date</p></td>
				</tr>
			  </table>
			  <p class="p86 ft1">
			  This is an important document, and you should therefore return this form
			  within 7 days of receipt so that you can be set up on the payroll
			  system.
			</p>
			<p class="p88 ft4">
			Working Time Regulations 1998 Employee Opt Out Form
		  </p>
		  <p class="p89 ft1">
			If you are not over the age of 18 please do not sign this form but
			contact your line manager so your working hour's restrictions can be
			explained.
		  </p>
		  <p class="p90 ft1">
			The Working Time Regulations 1998 which came into effect on October
			1st 1998 are government legislation designed to safeguard the health,
			safety and welfare of workers. The Regulations impose a limit on the
			working week of 48 hours (including overtime) averaged over 17 weeks.
			There is an opportunity to opt out of this by signing the waiver
			below. If you wish to exercise this right you must sign this form and
			return a copy to your Manager as soon as possible.
		  </p>
		  <p class="p91 ft1">
			It is necessary for Domino's Pizza Ltd to have written confirmation
			that you have no objection if you are asked to work extra hours which
			could mean that you work more than 48 hours per week on average.
		  </p>
		  <p class="p92 ft1">
			Opting out of the Regulations means that you will not be forced to
			work additional hours to those that you normally work. It will,
			however, allow Domino's Pizza Group to offer you additional hours in
			excess of 48 hours per week.
		  </p>
		  <p class="p92 ft1">
			It is your choice whether or not you wish to opt out of the
			<nobr>48-hour</nobr> maximum week. Should you wish to opt out, you can
			opt back in by giving 3 months notice in writing to your Line Manager.
		  </p>
		  <p class="p93 ft1">
			Please complete the information below and return this form to the HR
			Department.
		  </p>
		  <p class="p93 ft1">Please tick one box only</p>
		  <p class="p88 ft1">
			( ) Opt in (I do not wish to opt out of the maximum average 48 hour
			week)
		  </p>
		  <p class="p94 ft1">
			( X ) Opt out (I wish to opt out of the maximum working hours as
			specified in the regulations)
		  </p>
		  <table cellpadding="0" cellspacing="0" class="t1">
			<tr>
			  <td class="tr2 td0">
				<p class="p82 ft7">
				  ................................................................................
				</p>
			  </td>
			  <td class="tr2 td1">
				<p class="p83 ft7">..............................</p>
			  </td>
			</tr>
			<tr>
			  <td class="tr1 td0"><p class="p82 ft1">(Worker)</p></td>
			  <td class="tr1 td1"><p class="p83 ft1">Date</p></td>
			</tr>
		  </table>
		  <p class="p95 ft1">
			In accordance with the Working Time Regulations, regardless of
			employees' ages, it is the employer's responsibility to monitor the
			amount of hours all employees work per week, regardless which employer
			this is for.
		  </p>
		  <p class="p93 ft1">I hold other positions Yes / No</p>
		  <p class="p94 ft1">
			(If yes, please complete and sign the table below, if no simply sign
			below)
		  </p>
		</div>
		<div id="id10_2">
		  <div id="id10_2_1">
			<p class="p88 ft1">Job</p>
		  </div>
		  <div id="id10_2_2">
			<p class="p88 ft1">Employer</p>
		  </div>
		  <div id="id10_2_3">
			<p class="p88 ft1">
			  No. of hours contracted to work a week in this position
			</p>
		  </div>
		</div>
		<div id="id10_3">
		  <table cellpadding="0" cellspacing="0" class="t2">
			<tr>
			  <td class="tr0 td0">
				<p class="p82 ft7">
				  ................................................................................
				</p>
			  </td>
			  <td class="tr0 td1">
				<p class="p83 ft7">..............................</p>
			  </td>
			</tr>
			<tr>
			  <td class="tr1 td0"><p class="p82 ft1">(Worker)</p></td>
			  <td class="tr1 td1"><p class="p83 ft1">Date</p></td>
			</tr>
		  </table>

	  </div>
	</body>
  </html>
  
    `);
};