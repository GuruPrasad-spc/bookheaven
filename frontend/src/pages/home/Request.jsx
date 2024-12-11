import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useAuth } from '../../context/AuthContext'


const RequestPage = () => {
        //const currentUser = true;
        const {  currentUser} = useAuth()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
      //const [isChecked, setIsChecked]= useState(false)
      const onSubmit = async (data) => {
     
        const request = {
            title: data.booktitle,
            email: currentUser?.email,
            Isbn:data.isbn,
            author:data.author
        }
       // console.log(request);
        // try {
        //     await createRequest(request).unwrap();
        //     Swal.fire({
        //         title: "Confirmed Request",
        //         text: "Your Request placed successfully!",
        //         icon: "warning",
        //         showCancelButton: true,
        //         confirmButtonColor: "#3085d6",
        //         cancelButtonColor: "#d33",
        //         confirmButtonText: "Yes, It's Okay!"
        //       });
        //       navigate("/")
        // } catch (error) {
        //     console.error("Error", error);
        //     alert("Failed to place an request")
        // }
    }
  return (
    <section><div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
    <div className="container max-w-screen-lg mx-auto">
        <div>
            <div>
            <h2 className="font-semibold text-xl text-gray-600 mb-2">Request a Book</h2>
            <p>Please fill up the form below to Request a Book. We will inform you as soon as the book is available.
            </p>
            </div>

            {
                <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
                        <div className="text-gray-600">
                            <p className="font-medium text-lg">Book Details</p>
                            <p>Please fill out all the fields.</p>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                <div className="md:col-span-5">
                                    <label htmlFor="full_name">Book Title</label>
                                    <input
                                       
                                        type="text" name="name" id="booktitle" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  />
                                </div>

                                <div className="md:col-span-5">
                                    <label html="isbn">ISBN number</label>
                                    <input
                                        
                                        type="text" name="isbn" id="isbn" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                </div>
                                <div className="md:col-span-5">
                                    <label html="author">Author</label>
                                    <input
                                     
                                        type="text" name="author" id="author" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  />
                                </div>
                                <div className="md:col-span-5">
                                                <label html="email">Email Address</label>
                                                <input

                                                    type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    disabled
                                                    defaultValue={currentUser?.email}
                                                    placeholder="email@domain.com" />
                                            </div>

                                
                                <div className="md:col-span-5 text-right">
                                    <div className="inline-flex items-end">
                                        <button 
                                        onClick={onSubmit}
                                        //disabled={!isChecked}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
  }

           
        </div>

        
    </div>
</div></section>
  )
}

export default RequestPage