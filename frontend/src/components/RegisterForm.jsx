import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import useUser from "../hooks/useUser";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const { login, user, register } = useUser();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    //Check if passwords are the same
    if (confirmPassword !== password) {
      return toast.error("Passwords don't mantch");
    }

    await register(firstName, lastName, email, password, username);
  };
  return (
    <div className='mx-auto max-w-2xl py-8 px-6 border-2 border-black rounded-lg my-12'>
      <div className='py-6 text-center'>
        <h1 className='text-3xl font-bold text-center mb-4'>Register</h1>
        <Link to='/login' className='text-sm'>
          Already have an account? Login
        </Link>
      </div>
      <form className='flex flex-col gap-4' onSubmit={handleRegister}>
        <div>
          <div className='flex flex-row w-full space-x-4'>
            <div className='w-1/2'>
              <div className='mb-2'>
                <Label htmlFor='first_name' value='First name' />
              </div>
              <TextInput
                id='first_name'
                type='text'
                placeholder='First name'
                onChange={(e) => setFirstName(e.currentTarget.value)}
                required={true}
                shadow={true}
              />
            </div>
            <div className='w-1/2'>
              <div className='mb-2'>
                <Label htmlFor='last_name' value='Last name' />
              </div>
              <TextInput
                id='last_name'
                type='text'
                placeholder='Last name'
                onChange={(e) => setLastName(e.currentTarget.value)}
                required={true}
                shadow={true}
              />
            </div>
          </div>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='username' value='Username' />
          </div>
          <TextInput
            id='username'
            type='text'
            addon='localhost:3000/'
            placeholder='username'
            onChange={(e) => setUsername(e.currentTarget.value)}
            required={true}
            shadow={true}
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='email' value='Email' />
          </div>
          <TextInput
            id='email'
            type='email'
            placeholder='example@email.com'
            onChange={(e) => setEmail(e.currentTarget.value)}
            required={true}
            shadow={true}
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='password2' value='Password' />
          </div>
          <TextInput
            id='password2'
            type='password'
            required={true}
            onChange={(e) => setPassword(e.currentTarget.value)}
            shadow={true}
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='repeat-password' value='Repeat password' />
          </div>
          <TextInput
            id='repeat-password'
            type='password'
            required={true}
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
            shadow={true}
          />
        </div>
        <Button type='submit'>Register new account</Button>
      </form>
    </div>
  );
}
