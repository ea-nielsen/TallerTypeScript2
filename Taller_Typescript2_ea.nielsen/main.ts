import { Course } from './course.js';

import { Student } from './student.js';

import { dataCourses } from './dataCourses.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


btnfilterByName.onclick = () => applyFilterByName();

renderCoursesInTable(dataCourses);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderStudentInTable(students : Student[]):void{
    console.log('Desplegando información del estudiante');
    students.forEach((student) => {
      let trElement = document.createElement("tr");
      trElement.innerHTML = `<td>${student.cedula}</td>
                             <td>${student.codigo}</td>
                             <td>${student.direccion}</td>
                             <td>${student.edad}</td>
                             <td>${student.telefono}</td>`;
      coursesTbody.appendChild(trElement);
    });

}
 

 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function filterByCredits( min: number, max: number, courses: Course[]) : Course[]
{
    var range: Course[] = [];
    courses.forEach((course)=> 
    {
        if(course.credits>= min && course.credits<=max )
        {range.push(course);} 
    }
    );

        return range;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}