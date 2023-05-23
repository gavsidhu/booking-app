import { Fragment, useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import {
  Button,
  Label,
  TextInput,
  Textarea,
  ToggleSwitch,
  Modal,
} from "flowbite-react";
import { HiTrash } from "react-icons/hi2";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const initializeFormData = (bookingType) => {
  return {
    name: bookingType?.name || "",
    location: bookingType?.location || "",
    description: bookingType?.description || "",
    color: bookingType?.color || "",
    duration: bookingType?.duration || 0,
    payment_required: bookingType?.payment_required || false,
    price: bookingType?.price || 0,
  };
};

export default function UpdateModal({
  onClick,
  show,
  setShow,
  id,
  bookingType,
}) {
  const { user } = useUser();
  const [formData, setFormData] = useState(initializeFormData(bookingType));

  useEffect(() => {
    setFormData(initializeFormData(bookingType));
  }, [bookingType]);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      setFormData({ ...formData, user_id: user.userId });

      const csrfToken = cookies.get("csrftoken");

      await axios.put(
        `${process.env.REACT_APP_BACKEND_URl}/api/booking_type/${id}/`,
        formData,
        {
          headers: {
            "X-CSRFToken": csrfToken,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setShow(false);
    } catch (error) {
      console.error(error);
      setShow(false);
    }
  };

  const handleDelete = async () => {
    const csrfToken = cookies.get("csrftoken");
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URl}/api/booking_type/${id}/`,
        {
          headers: {
            "X-CSRFToken": csrfToken,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setShow(false);
    } catch (error) {
      console.error(error);
      setShow(false);
    }
  };

  return (
    <Fragment>
      <Modal dismissible={true} show={show} onClose={() => setShow(false)}>
        <Modal.Header>Update booking type</Modal.Header>
        <Modal.Body>
          <form className='flex flex-col gap-4' onSubmit={handelSubmit}>
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
                onChange={(e) => onChange(e)}
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
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div className='flex flex-row space-x-3'>
            <Button type='button' onClick={handelSubmit}>
              Update Booking Type
            </Button>
            <Button type='button' color='failure' onClick={handleDelete}>
              <HiTrash className='mr-2 h-5 w-5' />
              Delete
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}
