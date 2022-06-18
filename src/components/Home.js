import React from 'react'
import { Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'

const Home = (props) => {
    // let Incomingdata = useSelector((state) => state.data)
    return (
        <>
            <div className='navbar'>
                {/* <div><Link className='link' to='/home'>Home</Link></div> */}
                <div>Home</div>
                <div>
                    <span className='margin-x'><Link className='link' to='/login'>Login</Link></span>
                    <span className='margin-x'><Link className='link' to='/data'>Data</Link></span>
                    <span className='margin-x'><Link className='link' to='/signup'>Signup</Link></span>
                </div>
            </div>
            <div>
                {props.children}
            </div>
        </>
    )
}

export default Home