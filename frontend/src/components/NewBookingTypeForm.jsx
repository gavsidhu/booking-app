import {
  Button,
  Label,
  TextInput,
  Textarea,
  ToggleSwitch,
} from "flowbite-react";
import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

export default function NewBookingTypeForm() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    payment_required: false,
    color: "#000000",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      user: user.userId,
    };

    // get csrf token from cookies
    const csrfToken = cookies.get("csrftoken");

    await axios.post(
      `${process.env.REACT_APP_BACKEND_URl}/api/booking_type/`,
      updatedFormData,
      {
        withCredentials: true,
      }
    );
    navigate("/");
  };

  return (
    <div className='max-w-full py-16 px-6'>
      <div className='py-12 text-center'>
        <h2 className='text-4xl font-bold dark:text-white'>New booking type</h2>
      </div>
      <form className='flex flex-col gap-4' onSubmit={handelSubmit}>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='Name' value='Name' />
          </div>
          <TextInput
            id='Name'
            type='text'
            placeholder='Name'
            required={true}
            name='name'
            onChange={onChange}
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='Location' value='Location' />
          </div>
          <TextInput
            id='Location'
            placeholder='Location'
            type='text'
            required={true}
            name='location'
            onChange={onChange}
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='Description' value='Description' />
          </div>
          <Textarea
            id='Description'
            placeholder='Description'
            required={true}
            name='description'
            onChange={onChange}
          />
        </div>
        {/* <div>
          <div className='mb-2 block'>
            <Label htmlFor='color' value='Color' />
          </div>
          <TextInput
            id='color'
            type='text'
            placeholder='Color Hex Code'
            required={true}
            name='color'
            onChange={onChange}
          />
        </div> */}
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='color' value='Color' />
          </div>
          <div className='md:relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
            <input
              type='text'
              placeholder='Hexcode'
              value={formData?.color}
              className='px-6 pl-14 w-full text-base h-full bg-transparent broder border-transparent'
              onChange={onChange}
              name='color'
            />
            <input
              onChange={onChange}
              id='color'
              name='color'
              type='color'
              value={formData?.color}
              className='absolute top-1/2 transform -translate-y-1/2 w-7 bg-transparent h-7 rounded-full border-none left-4 cursor-pointer'
              style={{ appearance: "none" }}
            />
          </div>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='Duration' value='Duration' />
          </div>
          <TextInput
            id='Duration'
            type='number'
            placeholder='Duration'
            required={true}
            min={0}
            name='duration'
            onChange={onChange}
          />
        </div>
        <div className='flex items-center gap-2'>
          <ToggleSwitch
            checked={formData.payment_required}
            label='Require payment?'
            onChange={(e) => {
              setFormData({ ...formData, payment_required: e });
            }}
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='Price' value='Price' />
          </div>
          <TextInput
            id='Price'
            type='number'
            placeholder='Price'
            required={formData.payment_required === true ? true : false}
            disabled={formData.payment_required === false ? true : false}
            name='price'
            min='0.00'
            step='0.01'
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='flex flex-row space-x-3'>
          <Button type='submit'>Create Booking Type</Button>
          <Button type='button' color='red' onClick={() => navigate("/")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
