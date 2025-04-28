"use client";
import { useState } from "react";
import { axiosInstance } from "@/axios";

export function InvitationModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");

  const sendInvitation = async () => {
    try {
      await axiosInstance.post("/api/auth/invintations/send", { email });
      //alert("Invitation sent!");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4">Send Invitation</h3>
        <input
          type="email"
          placeholder="Enter email"
          className="w-full p-2 border mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            onClick={sendInvitation}
            className="bg-violet-800 text-white px-4 py-2 rounded"
          >
            Send
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}