import {useState} from 'react'
import {Wrap, Form, Text, ForEmail, ForPassword, Circle, Email, Password, Circle2, Btn1, Btn2}  from '../styled'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

const Index = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleLogin = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const {data} = await axios.post('http://localhost:8080/api/v1/user/login', {
                email: inputs.email, password: inputs.password
            })
            if(data.success){
                localStorage.setItem('token', data.token);
                localStorage.setItem('userID', data?.user._id);
            toast.success('Login Successfully', {
                position: toast.POSITION.BOTTOM_LEFT,
                className: 'foo-bar'
            })
                navigate('/')
            }
        } catch (error) {
            console.log(error)
            toast.error('email not found!', {
                position: toast.POSITION.BOTTOM_LEFT,
                className: 'foo-bar'
            })
        }
        // console.log(inputs)
    }

    const handleSignup = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const {data} = await axios.post('http://localhost:8080/api/v1/user/signup', {
                email: inputs.email, password: inputs.password
            })
            if(data.success){
                navigate('/')
            }
        } catch (error) {
            console.log(error)
            toast.error('email already used!', {
                position: toast.POSITION.BOTTOM_LEFT,
                className: 'foo-bar'
            })
        }
        console.log(inputs)
    }
    return (
        <Wrap>
            <ToastContainer/>
            <Form>
            <Text>
                    Sign up or Login
            </Text>
            <ForEmail>
                <Circle/>
                <Email type='email' id='email' required value={inputs.email} placeholder='E-Mail' name='email' onChange={handleChange}/>
            </ForEmail>
            <ForPassword>
                <Circle2/>
                <Password type='password' id='password' required value={inputs.password} placeholder='Password' name='password' onChange={handleChange}/>
            </ForPassword>
            <Btn1 onClick={handleLogin}>Log in</Btn1>
            <Btn2 onClick={handleSignup}>Sign up</Btn2>
            </Form>
        </Wrap>
    )
}

export default Index