import '../assets/styles/output.css'
export const Output = (props) => {
    const netSpeed = props.correctWords / props.time;
    const grossSpeed = props.totalWords / props.time;
    const accuracy = netSpeed * 100 / grossSpeed;

    return (
        <div className='output-container'>
            <div className="output">
                <p className='speed'>{netSpeed}</p>
                <p>WPM</p>
            </div>
        </div>
    )
}