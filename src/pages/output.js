import '../assets/styles/output.css'
import retryBtn from '../assets/retry.png'

export const Output = (props) => {
    const netSpeed = Number(props.correctWords) / (Number(props.time) / 60);
    const grossSpeed = props.totalWords / (props.time / 60);
    const accuracy = netSpeed * 100 / grossSpeed;
    console.log(`Correct words: ${props.correctWords}\nWrong words: ${props.wrongWords}\nnet speed: ${netSpeed}\nGross speed: ${grossSpeed}\nAccuracy: ${accuracy}`)
    console.log((props.time), typeof props.time)

    const reload = () => {
        window.navigation.reload();
    }
    return (
        <div className='output-container'>
            <div className='main-data'>
                <div className="speed-div">
                    <p className='speed'>{netSpeed}</p>
                    <p>WPM</p>
                </div>
                <div className='additional'>
                    <Info type="Accuracy" data={accuracy.toFixed(2)} extension="%" />
                    <Info type={'Raw Speed'} data={grossSpeed} extension={"WPM"} />
                    <Info type={'Correct Words'} data={props.correctWords} extension={""} />
                    <Info type={'Wrong Words'} data={props.wrongWords} extension={""} />
                </div>
            </div>
            <div className='controls'>
                <button onClick={() => reload()}>New Test <img src={retryBtn} alt="retry button" /></button>
            </div>
        </div>
    )
}


const Info = (props) => {
    console.log(props.extension)
    return (
        <div className='additional-info-container'>
            <div className='type'>{props.type}</div>
            <div className='data'>{props.data} {props.extension}</div>
        </div>
    )
}