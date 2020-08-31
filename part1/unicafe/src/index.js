import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({click, text}) => (
  <div>
    <button onClick={click}> {text}</button>
  </div>
)

const Statistic = ({text, value, sign}) => (
  <table>
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}{sign}</td>
      </tr>
    </tbody>   
  </table>
)


const Statistics = ({good, neutral, bad}) => {
  if (good===0 && neutral===0 && bad===0) {
    return(
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
      
    )
  }

  return(
    <div>
        <h2>Statistics</h2>
        <Statistic text='good' value={good} />
        <Statistic text='neutral' value={neutral}/>
        <Statistic text='bad' value={bad} />
        <Statistic text='all' value={good+bad+neutral}/>
        <Statistic text='average' value={(good - bad) / (good+bad+neutral)}/>
        <Statistic text='positive' value={good*100 / (good+bad+neutral)} sign='%'/>
    </div>  
)}




const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button click={() => setGood(good+1)} text='good' />
      <Button click={() => setNeutral(neutral+1)} text='neutral' />
      <Button click={() => setBad(bad+1)} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
);
