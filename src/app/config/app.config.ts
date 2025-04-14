import { environment } from "src/environments/environment.prod";

export const AppConfig = {
    BASE_API: environment.apiBaseUrl,
    ENDPOINTS: {
      login: 'madminapi/publicApi/v1/auth/login',
      employeeAttendance: 'madminapi/private/w/v1/employeeAttendance',
      getAssignedClasses: 'madminapi/private/w/v1/classTeacher/getAssignedClasses',
      sectionId: 'madminapi/private/w/v1/academicYearWiseStudent/clasId/sectionId',
      studentAttendance :'madminapi/private/w/v1/studentAttendance',
      branchLocation :'madminapi/private/w/v1/branchLocation',
      stuAttendance  :'madminapi/private/w/v1/studentAttendance/1/0',
      totalEmployee : 'madminapi/private/r/v1/employeeAttendanceData/branchWiseData/',
      totalEmployeeList : 'madminapi/private/r/v1/employeeAttendanceData/bySingleDate',
      presentEmployee : 'madminapi/private/r/v1/employeeAttendanceData/todayData/',
      myAttendance : 'madminapi/private/w/v1/employeeAttendance',
    }
  };