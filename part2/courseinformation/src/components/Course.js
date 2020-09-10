import React from 'react';
import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({courses, title}) => {
    return(
      <div>
        <h1>{title}</h1>
        {courses.map((course, i) => {
          return (
            <div key={i}>
              <Header course={course} />
              <Content course={course} />
              <Total course={course} />
            </div>  
          )
        })}
      </div>
    )
  }

export default Course;