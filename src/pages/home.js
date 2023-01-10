import arrow from '../assets/arrow.png'
import retryImg from '../assets/retry.png'
import '../assets/styles/home.css'
import useAPI from '../custom-hook/useSentence'
// import useTimer from '../custom-hook/useTimer'
import { useEffect, useState } from 'react'
import { Output } from './output'

export const Home = () => {

    const { data, error, isLoading } = useAPI();
    const [totalWords, setTotalWords] = useState(0);
    const [correctWords, setCorrectWords] = useState(0);
    const [wrongWords, setWrongWords] = useState(0);
    const [text, setText] = useState([]);
    const [seconds, setSeconds] = useState(60);
    const [testFinished, setTestFinished] = useState(false);
    const [hasRun, setHasRun] = useState(false);


    const runTimer = () => {
        const timer = setInterval(() => {
            setSeconds((seconds) => {
                // console.log(seconds);
                if (seconds === 1) {
                    clearInterval(timer);
                    setTestFinished(true);
                    return 0;
                }
                return seconds - 1;
            });
        }, 1000)
    }

    useEffect(() => {
        setText([...String(data)].filter(e => e !== '\n'));
    }, [data])

    useEffect(() => {
        if (hasRun) runTimer();
    }, [hasRun])

    const typed = (e) => {
        // set hasRun true to know when to start timer
        setHasRun(true);
        // spans array
        const letters = Array.from(document.getElementsByClassName('letter'));


        // removing previous white color
        letters.map(e => e.classList.remove('highLight', 'wrongLetter'))

        // Checking if correct
        for (let i = 0; i < e.target.value.length; i++) {
            if (e.target.value.charAt(i) === letters[i].textContent) {
                letters[i].classList.add('highLight');
            }
            else {
                letters[i].classList.add('wrongLetter');
            }

            if (letters[i].textContent === ' ') {
                setTotalWords(totalWords + 1);
                if (text.slice(0, e.target.value.length).join("") === e.target.value) setCorrectWords(correctWords + 1)
                else setWrongWords(wrongWords + 1)
                // console.log(correctWords + " correct words and " + wrongWords + " wrong words")
                setText(text.splice(e.target.value.length));
                e.target.value = '';
                letters.map(e => e.classList.remove('highLight', 'wrongLetter'))
            }
        }
    }

    return (
        <>
            <div className="hero-section">
                <h1>QWERTY-MAN</h1>
                <p>The All-round Typing Practice Site.</p>
                <img src={arrow} alt='arrow' />
            </div>

            {!testFinished ?
                <div className='test-section'>

                    <div className='sentence'>
                        <Words sentence={text} />
                    </div>

                    <div className='write'>
                        <input type={"text"} onChange={(e) => typed(e)} />
                        <div>{correctWords}</div>
                    </div>

                    <div className='retryBtn'>
                        {seconds}<br /><br />
                        <img src={retryImg} alt="retry btn" />
                    </div>
                </div>
                :
                <Output correctWords={correctWords} totalWords={totalWords} time={60} wrongWords={wrongWords} />
            }
        </>
    )
}

const Words = (props) => {
    const data = props.sentence
    return (
        <p>
            {data.map((e, key) => <span key={key} className='letter'>{e}</span>)}
        </p>
    )
}
