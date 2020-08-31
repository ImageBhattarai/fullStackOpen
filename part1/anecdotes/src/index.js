import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const MostVotes = ({anecdote, votes}) => {
  let largest = votes.reduce((a,b) => {
    return Math.max(a,b)
  })

  const foundIndex = votes.findIndex((i) => {
    return i === largest
  })

  return(
    <div>
      <h2>Anecdote with most votes</h2>
      {anecdote[foundIndex]}
      <p>has {largest} votes</p>
    </div>
  )
}

const Display = ({anecdote, selected, votes}) => {
  return(
    <div>
      <h2>Anecdote of the day</h2>
      {anecdote[selected]}      
      <p>has {votes[selected]} votes</p>
    </div>
  )
}



const Button = ({click, text}) => (
  <button onClick={click}>{text}</button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array(6).fill(0))

  const generateAnecdote = () => {
    setSelected(Math.floor(Math.random()*6))
  }

  const increaseVote = () => {
    const voteNo = [...vote]
    voteNo[selected] += 1;
    setVote(voteNo)
  }

  return (
    <div>
      <Display anecdote={props.anecdotes} selected={selected} votes={vote}/>
      <Button click={generateAnecdote} text='Generate next'/>
      <Button click={increaseVote} text='Vote' />
      <MostVotes anecdote={props.anecdotes} votes={vote}  />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(<App anecdotes={anecdotes} />,
  document.getElementById('root')
);
