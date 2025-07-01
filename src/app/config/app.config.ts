import { environment } from 'src/environments/environment.prod';

export const AppConfig = {
  APP_VERSION: "v 0.18",
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
    updateAssignment: 'madminapi/private/v1/assignment',
    uploadAssignment: 'madminapi/private/v1/assignment',
    faculityWiseClass: 'madminapi/private/v1/facultyData/facultyAssignedClass',
    getSubjectByClassId:
      'madminapi/private/v1/facultyData/facultyAssignedSubjects',
    uploadClassWork: 'madminapi/private/v1/classwork',
    getSeeClasswork: 'madminapi/private/v1/r/classworkData',
    getSeeHomework: 'madminapi/private/v1/r/homeworkData',
    assignmentData: 'madminapi/private/v1/r/assignmentData',
    getRecentAssignment: 'madminapi/private/v1/r/assignmentData/getRecentAssignment',
    getRecentHomeWork: 'madminapi/private/v1/r/homeworkData/getRecentHomeWork',
  	getRecentClassWork: 'madminapi/private/v1/r/classworkData/getRecentClassWork',
    getBranchListByOwner: 'madminapi/private/v1/r/schoolBranches/getBranchesBySchoolId',
    branchWiseEmployee: 'madminapi/private/r/v1/employeeData/branchWiseEmployee',
    uploadEvent: 'madminapi/private/v1/events',
    getEvent: 'madminapi/private/v1/events'
  },
};
