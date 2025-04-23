import { environment } from 'src/environments/environment.prod';

export const AppConfig = {
  APP_VERSION: "v 0.13",
  BASE_API: environment.apiBaseUrl,
  ENDPOINTS: {
    login: 'madminapi/publicApi/v1/auth/login',
    employeeAttendance: 'madminapi/private/w/v1/employeeAttendance',
    getAssignedClasses:
      'madminapi/private/w/v1/classTeacher/getAssignedClasses',
    sectionId:
      'madminapi/private/w/v1/academicYearWiseStudent/clasId/sectionId',
    studentAttendance: 'madminapi/private/w/v1/studentAttendance',
    branchLocation: 'madminapi/private/w/v1/branchLocation',
    stuAttendance: 'madminapi/private/w/v1/studentAttendance/1/0',
    totalEmployee:
      'madminapi/private/r/v1/employeeAttendanceData/branchWiseData/',
    totalEmployeeList:
      'madminapi/private/r/v1/employeeAttendanceData/bySingleDate',
    presentEmployee: 'madminapi/private/r/v1/employeeAttendanceData/todayData/',
    myAttendance: 'madminapi/private/w/v1/employeeAttendance',
    studentList: 'madminapi/private/w/v1/studentAttendance',
    classList: 'madminapi/private/r/v1/classTeacherData/getAssignedClasses',
    geotaggedLocation: 'madminapi/private/w/v1/branchLocation',
    getGeotaggedLocation:
      'madminapi/private/w/v1/branchLocation/bySchoolBranch',
    uploadHomework: 'madminapi/private/v1/homework',
    faculityWiseClass: 'madminapi/private/v1/facultyData/facultyAssignedClass',
    getSubjectByClassId:
      'madminapi/private/v1/facultyData/facultyAssignedSubjects',
    uploadClassWork: 'madminapi/private/v1/classwork',
  },
};
