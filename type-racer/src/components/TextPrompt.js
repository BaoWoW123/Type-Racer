import { useState, useEffect } from "react"
import "../styles/textprompt.css"

//export const prompt = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. In nulla posueresollicitudin aliquam ultrices sagittis. Nisi quis eleifend quamadipiscing vitae proin sagittis. A iaculis at erat pellentesqueadipiscing commodo elit at imperdiet. Amet commodo nulla facilisi nullamvehicula ipsum a arcu."

//    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua.",


// Input to TextPrompt
export const prompt = {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua.",
    getWordCount: function(){ return prompt.text.split(' ').length },
    getCharCount: function(){ return prompt.text.replaceAll(" ", "").length }
}

// Output from TextPrompt
export var statistics = {
    totalTimeElapsed: 0,
    wordsPerMinute: 0,
    charPerMinute: 0,
    accuracy: 0
}

const Stats = (props) => {
    return <p style={{ fontSize: "1rem" }}>Stats go here</p>
}

const TextPrompt = (props) => {
    const [typed, setTyped] = useState("")
    const [badKey, setBadKey] = useState(false)
    const [badKeyCount, setBadKeyCount] = useState(0)
    const [timer, setTimer] = useState({
        started: false,
        finished: false,
        startTime: 0,
        totalTimeElapsed: 0,
        currentTimeElapsed: 0
    })

    useEffect(() => {
        if(timer.finished){
            statistics = {
                totalTimeElapsed: timer.totalTimeElapsed,
                wordsPerMinute: prompt.getWordCount()/(timer.totalTimeElapsed/60),
                charPerMinute: prompt.getCharCount()/(timer.totalTimeElapsed/60),
                // Not sure if this is a valid equation
                accuracy: prompt.getCharCount()/(prompt.getCharCount() + badKeyCount)
            }
            console.log(statistics)
        }
    }, [timer.finished, timer.totalTimeElapsed, badKeyCount])

    const checkInputError = (evt) => {
        return !(evt.target.value === prompt.text.slice(0, evt.target.value.length))
    }

    // Returns seconds
    const getTotalTimeElapsed = () => {
        return (new Date() - timer.startTime)/1000
    }

    const handleEvent = (evt) => {
        if(timer.finished){
            return
        }

        if(!timer.started){
            setTimer({
                started: true,
                startTime: new Date(),
                currentTimeElapsed: 0
            })
        }

        setBadKey(checkInputError(evt))
        if(badKey){
            evt.target.value = evt.target.value.slice(0, typed.length)   
            setBadKeyCount(badKeyCount => badKeyCount + 1)
        }
        setTyped(evt.target.value)

        if(evt.target.value === prompt.text){
            setTimer({
                finished: true,
                totalTimeElapsed: getTotalTimeElapsed()
            })
        }
    }

    const discardEvent = (evt) => {
        evt.preventDefault()
        return false
    }

    return (
        <main>
            <p id="startMessage">Start typing</p>
            <div id="textWrapper">
                <div id="promptOutput" style={{ color: badKey ? "red" : "black" }}>
                    { typed }
                </div>
                <div id="promptSilhouette">
                    { prompt.text }
                </div>
                <div id="container_promptInput">
                    <textarea id="promptInput"
                        type="text"
                        autoComplete="off"
                        spellCheck='false'
                        onPaste={discardEvent}
                        onCut={discardEvent}
                        onCopy={discardEvent}
                        onChange={handleEvent}
                        />
                </div>
            </div>
            <div>
                { timer.finished > 0 ? <Stats target={timer}/> : null }
            </div>
        </main>
    )
}

export default TextPrompt;