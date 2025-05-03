import { Injectable } from '@nestjs/common';
import { UpdateCourseDto } from './dto/update-course.dto';
import { courseInterFace } from './interfaces/course.interface';

@Injectable()
export class CourseService {
  private readonly courses: courseInterFace[] = [];
  create(createCourseDto: any) {
    createCourseDto.id = Math.floor(Math.random() * 1000);
    this.courses.push(createCourseDto);
    return createCourseDto;
  }

  search(query: any) {
    console.log(query);

    return this.courses.filter(
      (ele) =>
        ele.teacherName == query.name && ele.price == (query.price as number),
    );
  }

  findAll() {
    return this.courses;
  }

  findOne(id: number) {
    return this.courses.find((ele) => ele.id === id);
  }

  update(id: number) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
