// import { Button, Label, Modal, TextInput } from "flowbite-react";
// import { Fragment, useState } from "react";
// import moment from "moment";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import useUser from "../hooks/useUser";

// export default function ScheduleBookingModal() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     status: "unconfirmed",
//     start_at: "",
//   });

//   const onChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.currentTarget.name]: e.currentTarget.value,
//     });
//   };

//   const handelSubmit = async (e) => {
//     e.preventDefault();

//     // add user id, booking type and calcualate end at time
//     const updatedData = {
//       ...formData,
//       booking_type: bookingType.id,
//       user: bookingType.user,
//       end_at: moment(formData.start_at)
//         .add(bookingType.duration, "m")
//         .format("YYYY-MM-DDTHH:mm"),
//     };
//     try {
//       const res = await axios.post(
//         `${process.env.REACT_APP_BACKEND_URl}/api/bookings/schedule_booking/`,
//         updatedData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if (res.data.status === "failure") {
//         toast.error("Please select a different time");
//       }
//       navigate("/");
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   return (
//     <div className='py-16 px-6 max-w-3xl mt-16 mx-auto'>
//       <div className='py-12 text-center'>
//         <h2 className='text-4xl font-bold dark:text-white'>
//           Schedule your booking
//         </h2>
//       </div>
//       <form className='flex flex-col gap-4' onSubmit={handelSubmit}>
//         <div>
//           <div className='mb-2 block'>
//             <Label htmlFor='first_name' value='First name' />
//           </div>
//           <TextInput
//             id='first_name'
//             type='text'
//             placeholder='First name'
//             required={true}
//             name='first_name'
//             onChange={(e) => onChange(e)}
//           />
//         </div>
//         <div>
//           <div className='mb-2 block'>
//             <Label htmlFor='last_name' value='Last name' />
//           </div>
//           <TextInput
//             id='last_name'
//             type='text'
//             placeholder='Last name'
//             required={true}
//             name='last_name'
//             onChange={(e) => onChange(e)}
//           />
//         </div>
//         <div>
//           <div className='mb-2 block'>
//             <Label htmlFor='email' value='Email' />
//           </div>
//           <TextInput
//             id='email'
//             placeholder='Email Address'
//             required={true}
//             name='email'
//             onChange={(e) => onChange(e)}
//           />
//         </div>
//         <div class='relative max-w-full'>
//           <div className='mb-2 block'>
//             <Label htmlFor='start_at' value='Select booking time' />
//           </div>
//           <div class='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'></div>
//           <input
//             type='datetime-local'
//             class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
//             placeholder='Select date'
//             name='start_at'
//             onChange={(e) => {
//               setFormData({ ...formData, start_at: e.target.value });
//               setShow(false);
//             }}
//           />
//         </div>
//         <div className='flex flex-row space-x-3'>
//           <Button type='submit'>Create Booking Type</Button>
//           <Button type='button' color='red' onClick={() => setShow(false)}>
//             Cancel
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }
