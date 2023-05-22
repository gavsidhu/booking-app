import axios from "axios";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import moment from "moment";

export default function BookingsTable({ bookingTypes }) {
  const [bookings, setBookings] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URl}/api/booking/`, {
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
  return (
    <div class='relative overflow-x-auto border-2 border-black sm:rounded-lg'>
      <table class='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead class='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' class='px-6 py-3'>
              Name
            </th>
            <th scope='col' class='px-6 py-3'>
              Email
            </th>
            <th scope='col' class='px-6 py-3'>
              Start Time
            </th>
            <th scope='col' class='px-6 py-3'>
              End Time
            </th>
            <th scope='col' class='px-6 py-3'>
              Status
            </th>
            <th scope='col' class='px-6 py-3'>
              Booking Type
            </th>
            <th scope='col' class='px-6 py-3'>
              <span className='sr-only'>Edit</span>
            </th>
          </tr>
        </thead>
        {bookings.length > 0 &&
          bookings.map((booking) => {
            return (
              <tr class='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
                <th
                  scope='row'
                  class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  {`${booking.first_name} ${booking.last_name}`}
                </th>
                <td class='px-6 py-4'>{booking.email}</td>
                <td class='px-6 py-4'>
                  {moment(booking.start_at)
                    .utc()
                    .format("MMMM Do YYYY, h:mm:ss a")}
                </td>
                <td class='px-6 py-4'>
                  {moment(booking.end_at)
                    .utc()
                    .format("MMMM Do YYYY, h:mm:ss a")}
                </td>
                <td class='px-6 py-4'>{booking.status}</td>
                <td class='px-6 py-4'>
                  {
                    bookingTypes.find(
                      (bookingType) => bookingType.id === booking.booking_type
                    )?.name
                  }
                </td>
                <td class='px-6 py-4'>
                  <a
                    href='#'
                    class='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                  >
                    Edit
                  </a>
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
}
