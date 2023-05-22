import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login, user } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(user);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };
  return (
    <div className='mx-auto max-w-2xl py-8 px-6 border-2 border-black rounded-lg my-12'>
      <div className='py-6 text-center'>
        <h1 className='text-3xl font-bold text-center mb-4'>Login</h1>
        <Link to='/register' className='text-sm'>
          Don't have an account? Register
        </Link>
      </div>
      <form className='flex flex-col gap-4' onSubmit={handleLogin}>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='email1' value='Your email' />
          </div>
          <TextInput
            id='email1'
            type='email'
            placeholder='example@email.com'
            required={true}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='password1' value='Your password' />
          </div>
          <TextInput
            id='password1'
            type='password'
            required={true}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox id='remember' />
          <Label htmlFor='remember'>Remember me</Label>
        </div>
        <Button type='submit'>Submit</Button>
      </form>
    </div>
  );
}
