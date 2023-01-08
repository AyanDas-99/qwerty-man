import arrow from '../assets/arrow.png'
import retryImg from '../assets/retry.png'
import '../assets/styles/keyboard.css'
import '../assets/styles/home.css'
import useAPI from '../custom-hook/useSentence'
import { useEffect, useState } from 'react'

export const Home = () => {

    const { data, error, isLoading } = useAPI();
    const [inputText, setInputText] = useState("");
    const [correctWords, setCorrectWords] = useState(0);
    const [text, setText] = useState("");

    useEffect(() => {
        setText(String(data));
    }, [data])

    const typed = (e) => {
        const allLetters = Array.from(document.getElementsByClassName('letter'));
        (allLetters).map(e => e.classList.remove('highLight'));
        if (e.target.value === text.substring(0, e.target.value.length)) {
            if(e.target.value.charAt(e.target.value.length-1) === ' ') {
                setText(text.substring(e.target.value.length));
                e.target.value = '';
                console.log('correct word')
            }
            for (let i = 0; i < e.target.value.length; i++) {
                allLetters[i].classList.add('highLight');
                console.log(allLetters[i])
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
            <div className='test-section'>
                <div className='sentence'>
                    <Words sentence={text} />
                </div>
                <div className='write'>
                    <input type={"text"} onChange={(e) => typed(e)} />
                </div>
                <div className='retryBtn'>
                    <img src={retryImg} alt="retry btn" />
                </div>
            </div>
        </>
    )
}

const Words = (props) => {
    const data = props.sentence;
    console.log(data)
    return (
        <p>
            {[...data].map((e, key) => <span key={key} className='letter'>{e}</span>)}
        </p>
    )
}