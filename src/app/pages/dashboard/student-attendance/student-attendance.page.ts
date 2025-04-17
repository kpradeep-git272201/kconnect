import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';
import { IconService } from 'src/app/services/icon.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonFab, IonFabButton, IonFabList } from "@ionic/angular/standalone";

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.page.html',
  styleUrls: ['./student-attendance.page.scss'],
  standalone: true,
  imports: [IonFabList, IonFabButton, IonFab, SharedModule],
})
export class StudentAttendancePage implements OnInit {
  filteredStudent: any = [];
  studentList: any = [];
  classList:any=[];
  selectedClass:any=1;
  toggleAll: boolean = false;

  constructor(
    private commonService: CommonService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private iconService: IconService,
  ) {
    this.iconService.registerIcons();
  }

  ngOnInit() {
    this.getClassList();
    this.getStudentList();
  }

  async getClassList(){
    this.commonService.getClassList().subscribe(
      async (resp) => {
        if (resp) {
          this.classList = resp.body;
        }
      },
      async (error) => {
        this.alertService.showAlert('Alert!', 'Someting went wrong!', 'alert');
      },
    );
  }
  async getStudentList() {
    await this.loadingService.showLoading();
    const sectionId = 0;
    const classId=this.selectedClass;
    this.commonService.getStudentList(classId, sectionId).subscribe(
      async (resp) => {
        if (resp) {
          this.studentList = resp.body;
          this.filteredStudent = this.studentList.map((person) => ({
            ...person,
            bgColor: this.getRandomLightColor(),
          }));
        }
        await this.loadingService.hideLoading();
      },
      async (error) => {
        await this.loadingService.hideLoading();
        this.alertService.showAlert('Alert!', 'Someting went wrong!', 'alert');
      },
    );
  }

  onClassChange(event: any) {
    this.selectedClass = event.detail.value;
  }

  getRandomLightColor(): string {
    const hue = Math.floor(Math.random() * 360); // full color wheel
    const saturation = 70 + Math.random() * 10; // 70-80%
    const lightness = 80 + Math.random() * 10; // 80-90%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  getFilterStudent(event: any) {
    const query = event.target.value?.toLowerCase() || '';
    this.filteredStudent = this.studentList
      .filter((person) => person.studentName.toLowerCase().includes(query))
      .map((person) => ({
        ...person,
        bgColor: this.getRandomLightColor(),
      }));
  }

  onToggleAttendance(person: any) {
    console.log(`${person.studentName} is now ${person.isPresent ? 'Present' : 'Absent'}`);
  }


  async markAttendance() {
    await this.loadingService.showLoading();
    const markAttendance:any=[];
   this.filteredStudent.forEach((student)=>{
    markAttendance.push({
      "studentId": student.studentId,
      "classId": this.selectedClass,
      "isPresent": student.isPresent
    });
   });
   this.commonService.addStuAttendance(markAttendance).subscribe(async (resp)=>{
    await this.loadingService.hideLoading();
    if(resp?.body){
     
      this.getStudentList().then((res:any)=>{
        this.alertService.showAlert("Success!", "Attendance successfully added!", "success");
      });
    }
   },async ()=>{
    await this.loadingService.hideLoading();
    this.alertService.showAlert("Alert", "Mark attendance failed please try again!", "alert");
   })
  }

  toggleAllStudents(event: any) {
    this.filteredStudent.forEach(student => {
      student.isPresent = this.toggleAll;
    });
  }
}
