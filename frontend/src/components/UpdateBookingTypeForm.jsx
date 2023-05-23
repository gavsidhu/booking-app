import {
  Label,
  TextInput,
  Textarea,
  ToggleSwitch,
  Button,
} from "flowbite-react";
import { HiTrash } from "react-icons/hi2";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import axios from "axios";

export default function UpdateBookingTypeForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const { id } = useParams();

  const [formData, setFormData] = useState(state);

  console.log(formData);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setFormData({ ...formData, user_id: user.userId });

      await axios.put(
        `${process.env.REACT_APP_BACKEND_URl}/api/booking_type/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URl}/api/booking_type/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=' py-16 px-6 max-w-3xl mt-16 mx-auto'>
      <div className='py-12 text-center'>
        <h2 className='text-4xl font-bold dark:text-white'>
          Update booking type
        </h2>
      </div>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='Name' value='Name' />
          </div>
          <TextInput
            id='Name'
            value={formData?.name}
            type='text'
            placeholder='Name'
            required={true}
            name='name'
            onChange={(e) => {
              onChange(e);
            }}
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='Location' value='Location' />
          </div>
          <TextInput
            id='Location'
            value={formData?.location}
            placeholder='Location'
            type='text'
            required={true}
            name='location'
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='Description' value='Description' />
          </div>
          <Textarea
            id='Description'
            value={formData?.description}
            placeholder='Description'
            required={true}
            name='description'
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='color' value='Color' />
          </div>
          <TextInput
            id='color'
            value={formData?.color}
            type='text'
            placeholder='Color Hex Code'
            required={true}
            name='color'
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='Duration' value='Duration' />
          </div>
          <TextInput
            id='Duration'
            value={formData?.duration}
            type='number'
            placeholder='Duration'
            required={true}
            min={0}
            name='duration'
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='flex items-center gap-2'>
          <ToggleSwitch
            checked={formData?.payment_required}
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
            value={formData?.price}
            type='number'
            placeholder='Price'
            name='price'
            min='0.00'
            step='0.01'
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='flex flex-row space-x-3'>
          <Button type='submit' onClick={handleSubmit}>
            Update Booking Type
          </Button>
          <Button type='button' color='failure' onClick={handleDelete}>
            <HiTrash className='mr-2 h-5 w-5' />
            Delete
          </Button>
        </div>
      </form>
    </div>
  );
}
