import arrow from '../assets/arrow.png'
import './keyboard.css'

export const Home = () => {
    return (
        <>
            <div className="hero-section">
                <h1>QWERTY-MAN</h1>
                <p>The All-round Typing Practice Site.</p>
                <img src={arrow} alt='arrow' />
            </div>
            <div className='test-section'>
                <div className='sentence'>
                    <p>Lorem Ipsum is the word used everywhere to represent bogus sentence, that actually has no meaning to it</p>
                </div>
                <div className='keyboard'>
                    <div class="main-container">
                        <div class="row">
                            <div class="col">Esc</div>
                            <div class="col">F1</div>
                            <div class="col">F2</div>
                            <div class="col">F3</div>
                            <div class="col">F4</div>
                            <div class="col">F5</div>
                            <div class="col">F6</div>
                            <div class="col">F7</div>
                            <div class="col">F8</div>
                            <div class="col">F9</div>
                            <div class="col">F11</div>
                            <div class="col">F12</div>
                            <div class="col">Print <span>Screen</span></div>
                            <div class="col">Scroll <span>Lock</span></div>
                            <div class="col">Pause <span>Break</span></div>
                        </div>
                        <div class="row">
                            <div class="col symb"><span>~</span>`</div>
                            <div class="col symb"><span>!</span>1</div>
                            <div class="col symb"><span>@</span>2</div>
                            <div class="col symb"><span>#</span>3</div>
                            <div class="col symb"><span>$</span>4</div>
                            <div class="col symb"><span>%</span>5</div>
                            <div class="col symb"><span>^</span>6</div>
                            <div class="col symb"><span>&</span>7</div>
                            <div class="col symb"><span>*</span>8</div>
                            <div class="col symb"><span>(</span>9</div>
                            <div class="col symb"><span>)</span>0</div>
                            <div class="col symb"><span>_</span>-</div>
                            <div class="col symb"><span>+</span>=</div>
                            <div class="col backspace">Backspace</div>
                        </div>
                        <div class="row">
                            <div class="col  tab">Tab</div>
                            <div class="col col-key">q</div>
                            <div class="col col-key">w</div>
                            <div class="col col-key">e</div>
                            <div class="col col-key">r</div>
                            <div class="col col-key">t</div>
                            <div class="col col-key">y</div>
                            <div class="col col-key">u</div>
                            <div class="col col-key">i</div>
                            <div class="col col-key">o</div>
                            <div class="col col-key">p</div>
                            <div class="col"><span>{'{'}</span><span>[</span></div>
                            <div class="col"><span>{'}'}</span><span>]</span></div>
                            <div class="col slace"><span>|</span><span>\</span></div>
                        </div>
                        <div class="row">
                            <div class="col capsloack">caps <span>lock</span></div>
                            <div class="col col-key">a</div>
                            <div class="col col-key">s</div>
                            <div class="col col-key">d</div>
                            <div class="col col-key">f</div>
                            <div class="col col-key">g</div>
                            <div class="col col-key">h</div>
                            <div class="col col-key">j</div>
                            <div class="col col-key">k</div>
                            <div class="col col-key">l</div>
                            <div class="col"><span>:</span><span>;</span></div>
                            <div class="col"><span>"</span><span>'</span></div>
                            <div class="col enter">Enter</div>
                        </div>
                        <div class="row">
                            <div class="col shift">Shift</div>
                            <div class="col col-key">z</div>
                            <div class="col col-key">x</div>
                            <div class="col col-key">c</div>
                            <div class="col col-key">v</div>
                            <div class="col col-key">b</div>
                            <div class="col col-key">n</div>
                            <div class="col col-key">m</div>
                            <div class="col"><span>{'<'}</span><span>,</span></div>
                            <div class="col"><span>{'>'}</span><span>.</span></div>
                            <div class="col"><span>{'>'}</span><span>.</span></div>
                            <div class="col"><span>?</span><span>/</span></div>
                            <div class="col shift">Shift</div>
                        </div>
                        <div class="row">
                            <div class="col ctrl">Ctrl</div>
                            <div class="col">win</div>
                            <div class="col">Alt</div>
                            <div class="col space"></div>
                            <div class="col">Alt</div>
                            <div class="col">win</div>
                            <div class="col">
                                <div class="rightclickopt">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                            <div class="col">Ctrl</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}