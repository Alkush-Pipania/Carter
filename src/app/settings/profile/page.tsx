"use client";

import { useState } from "react";
import { Upload } from "lucide-react"
export default function Profile() {
  const [name, setName] = useState("Ayush Sotiya");
  const [email, setEmail] = useState("ayushsotiya56@gmail.com");
  const [profileImage, setProfileImage] = useState("/android-chrome-192x192.png");

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
  };

  return (
    <div className="p-6 w-full h-full ml-10 mt-10">
      <h1 className="text-3xl font-bold text-white mb-6">Profile Settings</h1>
        
      <div className="mt-10 bg-[#1f1e2e] rounded-2xl w-[50%] h-[50%] p-6 space-y-8 border border-[#2c2b3d] shadow-xl shadow-purpleShadow">

        {/* Profile Image Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={profileImage}  
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-white"
            />
            <div>
              <p className="text-white font-semibold text-lg">Profile Image</p>
              <p className="text-gray-400 text-sm">Used for your account avatar</p>
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="profile-upload"
              className="flex items-center gap-2 text-sm bg-white text-black font-medium py-1.5 px-4 rounded-md hover:bg-gray-200 transition cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              Change
            </label>
            <input
              type="file"
              id="profile-upload"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* Editable Name Section */}
        <div className="flex items-center gap-x-4">
          <div className="w-full">
            <p className="text-gray-400 text-sm">Name</p>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder={name}
              className="mt-1 w-full bg-[#2c2b3d] text-white font-medium px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
            />
          </div>
          <button className="text-sm bg-white text-black font-medium py-1.5 px-4 rounded-md hover:bg-gray-200 transition mt-5">
            Change
          </button>
        </div>

        {/* Email Section */}
        <div className="flex items-center gap-x-4">
          <div className="w-full">
            <p className="text-gray-400 text-sm">Email</p>
            <input
              type="text"
              disabled={true}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={email}
              className={`mt-1 w-full bg-[#2c2b3d] text-white hover:cursor-not-allowed font-medium px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition`}
            />
          </div>
          <button className="text-sm bg-white text-black font-medium  hover:cursor-not-allowed py-1.5 px-4 rounded-md hover:bg-gray-200 transition mt-5">
            Change
          </button>
        </div>
      </div>
    </div>
  );
}
