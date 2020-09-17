import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component  {
    constructor(props) {
        super(props);
        this.loop = undefined;
    }
    state = {
        breakCount: 5,
        sessionCount: 25,
        clockCount: 25 * 60,
        currentTimer: 'Session',
        isPlaying: false, 
        loop: undefined
    }

    handlePlayPause = ()=> {
        const { isPlaying } = this.state;

        if(isPlaying) {
            clearInterval(this.loop);

            this.setState({
                isPlaying: false
            });
        } else {
            this.setState({
                isPlaying: true
            })

            this.loop = setInterval(() => {}, 1000);
    }
}

    componentWillUnmount() {
        clearInterval(this.loop);
    }
    convertToTime = (count) => {
        const minutes = Math.floor(count / 60);
        let seconds = count % 60;
        
        seconds = seconds <10 ? ('0'+seconds) : seconds;

        return `${minutes}:${seconds}`
    }
    render() {
        const { 
            breakCount, 
            sessionCount, 
            clockCount,
            currentTimer
        }  = this.state;
        
        const breakProps = {
            title: "Break Length",
            count: breakCount, 
            handleDecrease: this.handleBreakDecrease,
            handleIncrease: this.handleBreakIncrease
        }
        const sessionProps = {
            title: "Session Length",
            count: sessionCount, 
            handleDecrease: this.handleSessionDecrease,
            handleIncrease: this.handleSessionIncrease
        }
        return (
            <div>
                <div className="flex">
                    <SetTimer {...breakProps}/>
                    <SetTimer {...sessionProps}/>
                </div>
                <div className="clock-container">
                    <h1>{currentTimer}</h1>
                    <span>{this.convertToTime(clockCount)}</span>
                    <div className="flex">
                        <button onClick={this.handlePlayPause}>
                            <i></i>
                        </button>
                        <button onClick={this.handleReset}>
                            <i></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
let SetTimer = (props) => (
    <div className="timer-container">
        <h1>{props.title}</h1>
        <div>
            <button onClick={props.handleDecrease}> 
                <p>-</p>
            </button>
            <span>{props.count}</span>
            <button onClick={props.handleIncrease}>
                <p>+</p>
            </button>
        </div>
    </div>  
)

ReactDOM.render(<App/>, 
    document.getElementById('root'));

    export default App