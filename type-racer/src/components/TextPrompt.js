import { useState, useEffect, useCallback } from "react"
import "../styles/textprompt.css"

// Input to TextPrompt
export const prompt = {
    text: "The quick brown fox jumps over the lazy dog",
    getWordCount: () => { return prompt.text.split(' ').length },
    getCharCount: () => { return prompt.text.replaceAll(" ", "").length }
}

const TextPrompt = (props) => {
    const [statistics, setStatistics] = useState({
        wordsPerMinute: 0,
        charPerMinute: 0,
        accuracy: 0,
    })
    const [timer, setTimer] = useState({
        started: false,
        finished: false,
        startTime: 0,
        timeElapsed: 0
    })
    const [typed, setTyped] = useState("")
    const [badKey, setBadKey] = useState(false)
    const [badKeyCount, setBadKeyCount] = useState(0)
    const [wordIndex, setWordIndex] = useState(1)


    const getTimeElapsed = useCallback(() => {
        return (timer.started) ? (new Date() - timer.startTime)/1000 : -1
    }, [timer.started, timer.startTime])

    useEffect(() => {
        if(timer.finished){
            setStatistics({
                wordsPerMinute: prompt.getWordCount()/(timer.timeElapsed/60),
                charPerMinute: prompt.getCharCount()/(timer.timeElapsed/60),
                // Not sure if this is a valid equation
                accuracy: prompt.getCharCount()/(prompt.getCharCount() + badKeyCount)
            })
        }
        
    }, [timer.finished, timer.timeElapsed, badKeyCount])

    useEffect(() => {
        if(timer.started && !timer.finished){
            const interval = setInterval(() => {
                setTimer((prevTimer) => {
                    return {
                        ...prevTimer,
                        timeElapsed: getTimeElapsed()
                    }
                })
            }, 10)

            return () => clearInterval(interval)
        }

    }, [timer.started, timer.finished, getTimeElapsed])

    const checkInputError = (input) => {
        return !(input === prompt.text.slice(0, input.length))
    }

    const handleEvent = (evt) => {
        if(timer.finished){
            return
        }

        if(!timer.started){
            setTimer((prevTimer) => {
                return {
                    ...prevTimer,
                    started: true,
                    startTime: new Date(),
                }
            })
        }

        setBadKey(checkInputError(evt.target.value))
        if(badKey){
            evt.target.value = evt.target.value.substring(0, typed.length)   
            setBadKeyCount(badKeyCount => badKeyCount + 1)
        }
        setTyped(evt.target.value)
        
        if(!badKey && evt.target.value.slice(-1)[0] === " "){
            setWordIndex(wordIndex => wordIndex + 1)
        }

        if(evt.target.value === prompt.text){
            setTimer((prevTimer) => {
                return {
                    ...prevTimer,
                    started: true,
                    finished: true,
                }
            })
        }
    }

    const discardEvent = (evt) => {
        evt.preventDefault()
        return false
    }

    return (
        <main>
            <div id="sessionStats">
                <p className="leftItem_sessionStats">{ wordIndex }</p>
                <p className="rightItem_sessionStats">{ timer.timeElapsed.toFixed(2) + "s" }</p>
            </div>
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
            <div id="finishMessage" style={{ visibility: timer.finished ? "visible" : "hidden" }}>
                <p className="item_finishMessage">WPM: { Math.trunc(statistics.wordsPerMinute) }</p>
                <p className="item_finishMessage">CPM: { Math.trunc(statistics.charPerMinute) }</p>
                <p className="item_finishMessage">ACC: { Math.trunc(statistics.accuracy * 100) }%</p>
            </div>
        </main>
    )
}

export default TextPrompt;