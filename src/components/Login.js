import useInput from '../hooks/useInput'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { dataActions } from '../store/dataSlice'


const Login = () => {
    const dispatch = useDispatch()
    useEffect(
        () => {
            const getData = async () => {

                const response = await fetch('https://auth-7fa28-default-rtdb.firebaseio.com/users.json');
                const data = await response.json()
                const userdata = []
                for (const key in data) {

                    userdata.push({
                        id: data[key].id,
                        firstName: data[key].firstNameValue,
                        lastName: data[key].lastNameValue,
                        email: data[key].emailValue,
                        password: data[key].passwordValue,
                        confirmPassword: data[key].confirmPasswordValue,
                    })
                }
                dispatch(dataActions.storeData(userdata))
                console.log('App', userdata);
            }
            getData()
        }, [dispatch])


    // const dispatch = useDispatch();
    let Incomingdata = useSelector((state) => state.data)
    const [matchedData, setMatchedData] = useState()
    const navigate = useNavigate()
    //first name
    const {
        value: userName,
        isValid: userNameIsValid,
        hasError: userNameHasError,
        valueChangeHandler: userNameChangeHandler,
        inputBlurHandler: userNameBlurHandler,
        reset: userNameReset
    } = useInput((value) => value.trim() !== '')
    // last name
    const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: passwordReset
    } = useInput((value) => value.trim() !== '')

    let formIsValid = false
    if (userNameIsValid && passwordIsValid) {
        formIsValid = true
    }
    const formSubmitter = (e) => {
        e.preventDefault();

        if (Incomingdata[0].find(obj => obj.email === userName && obj.password === passwordValue)) {
            let user = Incomingdata[0].find(obj => obj.email === userName)
            setMatchedData(user)
        }
        else {
            console.log('no match');
        }

        // const loginUser = async () => {
        //     try {
        //         const response = await fetch('https://auth-7fa28-default-rtdb.firebaseio.com/users.json')

        //         if (!response.ok) {
        //             const data = await response.json();
        //             let errorMessage = data.error.message
        //             throw new Error(errorMessage)
        //         } else {
        //             console.log(response);
        //             //    let match =  Incomingdata.find( )
        //             //  setMatchedData(  ) 
        //             navigate('/')
        //         }
        //     }

        //     catch (error) {
        //         console.log(error);
        //     }   }

        userNameReset()
        passwordReset()
        // loginUser()
    }
    console.log('data matched is', matchedData);

    return (<>
        <form onSubmit={formSubmitter} >
            <div className={userNameHasError ? 'form-control invalid' : 'form-control'}>
                <label htmlFor="firstName">Email</label>
                <input type="email" id='firstName' value={userName}
                    onChange={userNameChangeHandler}
                    onBlur={userNameBlurHandler} />
                {userNameHasError && <p className='error-text'> Email should not be empty </p>}
            </div>

            <div className={passwordHasError ? 'form-control invalid' : 'form-control'
            }>
                <label htmlFor="lastName">Password</label>
                <input type="password" id='lastName' value={passwordValue}
                    onChange={passwordChangeHandler}
                    onBlur={passwordBlurHandler} />
                {passwordHasError && <p className='error-text'>password should not be empty </p>}
            </div>
            <button type='submit' disabled={!formIsValid} >Submit</button>
        </form>
        {matchedData && <p> Welcome Back {matchedData.firstName} {matchedData.lastName} </p>}
    </>
    )
}

export default Login