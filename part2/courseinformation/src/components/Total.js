import React from 'react';

const Total= ({course}) => {
    return(
      <div>
        <h4>Total of{" "}
          {course.parts.reduce((sum, cour) => sum+cour.exercises, 0 )}
          {" "}exercises
        </h4>
      </div>
    )
  }

export default Total;