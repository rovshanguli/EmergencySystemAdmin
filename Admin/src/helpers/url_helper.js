
let base = "https://localhost:44495/"
// let base = "http://emeergencyapp.us-east-1.elasticbeanstalk.com/"


//LOGIN
export const POST_FAKE_LOGIN = base + "api/Account/Login"
export const SOCIAL_LOGIN = base + "api/Account/Login"


//Appeal 
export const GET_APPEAL = base + "api/Appeal/GetAll"
export const GET_APPEAL_BY_ID = base + "api/Appeal/Get/"
export const GET_APPEAL_PAGINATE = base + "api/Appeal/GetAllPaginate?"
export const CREATE_TICKET = base + "api/Ticket/Create"
export const GET_APPEALS_LOCATION = base + "api/Appeal/GetAppealsLocation"


//AppealType
export const GET_APPEALTYPE = base + "api/AppealType/GetAll"
export const CREATE_APPEALTYPE = base + "api/AppealType/Create"
export const UPDATE_APPEALTYPE = base + "api/AppealType/Update"
export const DELETE_APPEALTYPE = base + "api/AppealType/Delete/"
export const GET_APPEALTYPE_BY_ID = base + "api/AppealType/Get/"




//Brigade
export const GET_BRIGADE = base + "api/Brigade/GetAllBrigadesWithWokringStatus"
export const REGISTER_BRIGADE = base + "api/Account/RegisterBrigade"

// Language
export const GET_LANGUAGE = base + "api/Language/GetAll"


//Ticket
export const GET_TICKET_PAGINATE = base + "api/Ticket/GetAllPaginate/"
export const GET_TICKET_BY_ID = base + "api/Ticket/GetWithAppeals/"

//Ticket Status
export const GET_TICKETSTATUS = base + "api/TicketStatus/GetAllLevel"

//Dashboard
export const GET_APPEA_STATISTICS = base + "api/Dashboard/GetAppealStatistics"