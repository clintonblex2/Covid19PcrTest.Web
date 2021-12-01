import { LoanStatus, TransactionMode, TransactionStatus, ApprovalStatus, JobStatus } from './models/enums';


export class ColorSchemes{
  public colors = {
		gray: {
			100: '#f6f9fc',
			200: '#e9ecef',
			300: '#dee2e6',
			400: '#ced4da',
			500: '#adb5bd',
			600: '#8898aa',
			700: '#525f7f',
			800: '#32325d',
			900: '#212529'
		},
		theme: {
			'default': '#172b4d',
			'primary': '#5e72e4',
			'secondary': '#f4f5f7',
			'info': '#11cdef',
			'success': '#2dce89',
			'danger': '#f5365c',
			'warning': '#fb6340'
		},
		black: '#12263F',
		white: '#FFFFFF',
		transparent: 'transparent',
  };

  public static LoanStatusColor(status: LoanStatus, suffix:string = 'bg'){
    switch(status){
      case LoanStatus.Active | LoanStatus.Approved:
        return  `${suffix}-primary`;
        case LoanStatus.PendingApproval :
          return `${suffix}-info`;
          case LoanStatus.Rejected | LoanStatus.RejectedByUser:
            return  `${suffix}-danger`;

            case LoanStatus.Completed:
              return `${suffix}-success`;
            default:
              return `${suffix}-default`;
    }
  }

  public static JobStatusColor(status: JobStatus, suffix:string = 'bg'){
    switch(status){
      case JobStatus.InProgress:
        return  `${suffix}-primary`;
        case JobStatus.Pending :
          return `${suffix}-info`;
          case JobStatus.Rejected:
            return  `${suffix}-danger`;

            case JobStatus.Approved:
              return `${suffix}-success`;
            default:
              return `${suffix}-default`;
    }
  }
  public static transactionColorStatus(status: TransactionStatus, suffix = 'badge'){
    if(status == TransactionStatus.Successful){
      return `${suffix}-success`;
    }
   else if(status == TransactionStatus.Pending){
    return `${suffix}-danger`;
   }
   return `${suffix}-primary`;
  }

  public static ApprovalStatus(status: ApprovalStatus, suffix = 'badge'){
    if(status == ApprovalStatus.Approved){
      return `${suffix}-success`;
    }
     return `${suffix}-danger`;

  }
}
