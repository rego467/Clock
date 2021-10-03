import React from 'react'
import './App.css';
import ButtonCLock from './ButtonCLock';

const audio = document.getElementById('beep')

class App extends React.Component {
 
  state = {
    breakCount : 5,
    sessionCount : 25,
    clockCount : 25 * 60,
    currentTimer :'Session',
    isPlaying : false,
  }

  constructor(props){
    super(props);
    this.loop = undefined
  }

  componentWillUnmount(){
    clearInterval(this.loop)
  }

  playStart = () =>{
    const {isPlaying} = this.state

    if(isPlaying){
      clearInterval(this.loop);

      this.setState({
        isPlaying: false
      })
    }else{
      this.setState({
        isPlaying: true
      })
      this.loop = setInterval(()=>{
        const {clockCount, currentTimer, breakCount, sessionCount} = this.state

        if(clockCount === 0){
          this.setState({
            currentTimer : (currentTimer === 'Session') ? 'Break' : 'Session',
            clockCount : (currentTimer === 'Session') ? (breakCount * 60) : (sessionCount * 60)
          });
          audio.play();
        }else{
          this.setState({
            clockCount: clockCount - 1
          })
        }
      },1000)
    }
  }

  handleRefresh = () =>{
    this.setState({
      breakCount : 5,
      sessionCount : 25,
      clockCount : 25 * 60,
      currentTimer :'Session',
      isPlaying : false
    })
    clearInterval(this.loop);

    audio.pause();
    audio.currentTime = 0;
  }

  convertToTime = (count) => {
    let minutes = Math.floor(count / 60);
    let seconds = count % 60;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return(
      `${minutes}:${seconds}`
    ) 
  }

  clickBreakIncrement = () =>{
    const {breakCount, isPlaying, currentTimer} = this.state;
    if(breakCount < 60){
      if(!isPlaying && currentTimer === 'Break'){
        this.setState({
          breakCount : breakCount + 1,
          clockCount : (breakCount + 1) * 60
        })
      }else{
        this.setState({
          breakCount : breakCount + 1
        })
      }
    }
  };

  clickBreakDecrement = () => {
    const {breakCount, isPlaying, currentTimer} = this.state;
    if(breakCount > 1 ){
      if(!isPlaying && currentTimer === 'Break'){
        this.setState({
          breakCount : breakCount - 1,
          clockCount : (breakCount - 1) * 60
        })
      }else{
        this.setState({
          breakCount : breakCount - 1
        })
      }
    }
  };

  clickSessionIncrement = () => {
    const {sessionCount, isPlaying, currentTimer} = this.state;
    if(sessionCount < 60){
      if(!isPlaying && currentTimer === 'Session'){
        this.setState({
          sessionCount : sessionCount + 1,
          clockCount : (sessionCount + 1) * 60
        })
      }else{
        this.setState({
          sessionCount : sessionCount + 1
        })
      }
    }
   
  };

  clickSessionDecrement = () => {
    const {sessionCount, isPlaying, currentTimer} = this.state;
    
    if(sessionCount > 1){
      if(!isPlaying && currentTimer === 'Session'){
        this.setState({
          sessionCount : sessionCount - 1,
          clockCount : (sessionCount - 1) * 60
        })
      }else{
        this.setState({
          sessionCount : sessionCount - 1
        })
      }
    }
  
  }

  render(){
    const {breakCount, sessionCount, clockCount, isPlaying, currentTimer} = this.state;

    const defaultProps = {
      title : 'Break Length',
      count : breakCount,
      id: 'break-length',
      ids: 'break-label',
      idUp : 'break-increment',
      idDown : 'break-decrement',
      clickUp: this.clickBreakIncrement,
      clickDown: this.clickBreakDecrement,
    }
  
    const finishProps = {
      title : 'Session Length',
      count : sessionCount,
      id : 'session-length',
      ids: 'session-label',
      idUp : 'session-increment',
      idDown : 'session-decrement',
      clickUp: this.clickSessionIncrement,
      clickDown: this.clickSessionDecrement,
    }

    return (
      <div className="App">
        <h1>25 + 5 Clock</h1>
        <div className="container-button">
          <ButtonCLock {...defaultProps} />
          <ButtonCLock {...finishProps} />
        </div>
        <div className="start-clock">
          <h2 id="timer-label">{currentTimer}</h2>
          <span id="time-left">{this.convertToTime(clockCount)}</span>
          <div>
            <button className="btn btn-danger" id="start_stop" onClick={this.playStart}>
            <i class={`bi bi-${isPlaying ? 'pause' : 'play'}`}></i>
            </button>
            <button className="btn btn-danger" id="reset" onClick={this.handleRefresh}>
            <i class="bi bi-arrow-repeat"></i>
            </button>
          </div>
        </div>
      </div>
    ) 
  }

}

export default App;
