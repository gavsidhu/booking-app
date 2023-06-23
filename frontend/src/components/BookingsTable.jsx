import axios from "axios";
import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import moment from "moment";
import { HiTrash } from "react-icons/hi2";

export default function BookingsTable({ bookingTypes }) {
  const [bookings, setBookings] = useState([]);
  const { user, token } = useUser();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URl}/api/booking/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
        params: { user_id: user.userId },
        withCredentials: true,
      })
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(
      `${process.env.REACT_APP_BACKEND_URl}/api/booking/${id}/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        withCredentials: true,
      }
    );

    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  const handleConfirm = async (id) => {
    await axios.patch(
      `${process.env.REACT_APP_BACKEND_URl}/api/booking/${id}/`,
      { status: "Confirmed" },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        withCredentials: true,
      }
    );

    setBookings(
      bookings.map((booking) => {
        if (booking.id === id) {
          return { ...booking, status: "Confirmed" };
        }
        return booking;
      })
    );
  };

  return (
    <div className='relative overflow-x-auto border-2 border-black sm:rounded-lg'>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Name
            </th>
            <th scope='col' className='px-6 py-3'>
              Email
            </th>
            <th scope='col' className='px-6 py-3'>
              Start Time
            </th>
            <th scope='col' className='px-6 py-3'>
              End Time
            </th>
            <th scope='col' className='px-6 py-3'>
              Status
            </th>
            <th scope='col' className='px-6 py-3'>
              Booking Type
            </th>
            <th scope='col' className='px-6 py-3'>
              <span className='sr-only'>Confirm</span>
            </th>
            <th scope='col' className='px-6 py-3'>
              <span className='sr-only'>Delete</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 &&
            bookings.map((booking) => {
              return (
                <tr
                  id={booking.id}
                  key={booking.id}
                  className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'
                >
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                  >
                    {`${booking.first_name} ${booking.last_name}`}
                  </th>
                  <td className='px-6 py-4'>{booking.email}</td>
                  <td className='px-6 py-4'>
                    {moment(booking.start_at)
                      .utc()
                      .format("MMMM Do YYYY, h:mm:ss a")}
                  </td>
                  <td className='px-6 py-4'>
                    {moment(booking.end_at)
                      .utc()
                      .format("MMMM Do YYYY, h:mm:ss a")}
                  </td>
                  <td className='px-6 py-4'>{booking.status}</td>
                  <td className='px-6 py-4'>
                    {
                      bookingTypes.find(
                        (bookingType) => bookingType.id === booking.booking_type
                      )?.name
                    }
                  </td>
                  <td className='px-6 py-4'>
                    {booking.status === "unconfirmed" && (
                      <button
                        onClick={() => handleConfirm(booking.id)}
                        className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                      >
                        Confirm
                      </button>
                    )}
                  </td>
                  <td className='px-6 py-4'>
                    <button
                      onClick={() => handleDelete(booking.id)}
                      className='font-medium text-red-600 dark:text-red-600'
                    >
                      <HiTrash className='h-4 w-4' />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
