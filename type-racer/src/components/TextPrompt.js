import React from "react"
import "../styles/textprompt.css" 


/*
Need to add valid check on input for occurrences of bad keys pressed
that do not match the prompt ...
*/

export const prompt = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. In nulla posueresollicitudin aliquam ultrices sagittis. Nisi quis eleifend quamadipiscing vitae proin sagittis. A iaculis at erat pellentesqueadipiscing commodo elit at imperdiet. Amet commodo nulla facilisi nullamvehicula ipsum a arcu. Et tortor at risus viverra adipiscing at.Condimentum vitae sapien pellentesque habitant. Praesent elementumfacilisis leo vel fringilla est ullamcorper eget nulla. Auctor auguemauris augue neque gravida in fermentum et. Leo vel orci porta nonpulvinar neque laoreet suspendisse interdum. Quis varius quam quisque iddiam vel quam elementum. Etiam sit amet nisl purus. Habitant morbitristique senectus et netus et malesuada fames. Eget nunc scelerisqueviverra mauris in aliquam. Sed risus pretium quam vulputate dignissimsuspendisse in est ante. Nec ullamcorper sit amet risus nullam. Quisenim lobortis scelerisque fermentum dui faucibus in ornare. Sed risuspretium quam vulputate dignissim suspendisse in."
const wordCount = prompt.split(' ').length
const charCount = prompt.replace(" ", "").length

class TextPrompt extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            typed: "",
            started: false,
            startTime: 0,
            wrongKeyPressed: false,
            wrongKeyCount: 0,
            lastGoodKey: 0
        };
    }

    // Returns milliseconds
    getTimeElapsed = () => {
        return new Date() - this.state.startTime
    }

    handleInput = (evt) => {
        if(!this.state.started){
            console.log("Starting timer!")
            this.setState({
                started: true,
                startTime: new Date()
            })
        }

        this.setState({
            typed: evt.target.value
        })
    }

    discardEvent = (evt) => {
        evt.preventDefault()
    }

    render(){
        return (
            <main>
                <p id="startMessage">Start typing ...</p>
                <div id="textWrapper">
                    <div id="promptOutput" style={{ color: this.state.wrongKeyPressed ? "red" : "white" }}>
                        { this.state.typed }
                    </div>
                    <div id="promptSilhouette">
                        { prompt }
                    </div>
                    <div id="container_promptInput">
                        <textarea id="promptInput"
                            type="text"
                            autoComplete="off"
                            onPaste={this.discardEvent}
                            onCut={this.discardEvent}
                            onCopy={this.discardEvent}
                            onChange={this.handleInput}
                        />
                    </div>
                </div>
            </main>
        );
    }
}

export default TextPrompt;