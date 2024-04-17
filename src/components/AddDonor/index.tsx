/* eslint-disable @typescript-eslint/ban-types */
import React, { useState } from "react";
import axios from "axios";
import { TextInput } from "@mantine/core";
import { v4 as uuidv4 } from "uuid";
import { notifications } from "@mantine/notifications";
import { ClipLoader } from "react-spinners";

const AddDonor = ({ close }: { close: Function }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: uuidv4(),
    firstName: "",
    lastName: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("https://donate-backend-l3fb.onrender.com/api/donor/create", formData)
      .then(() => {
        notifications.show({
          title: "Create Donor",
          message: "Successfully Created a Donor! 🤥",
        });
        close();
      })
      .catch((error) => {
        console.error("Error creating donor", error);
        notifications.show({
          title: "Error creating donor:",
          message: error.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-full h-full">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <TextInput
            label="First Name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, firstName: e.target.value }))
            }
            required
          />
        </div>
        <div className="mb-4">
          <TextInput
            label="Last Name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, lastName: e.target.value }))
            }
            required
          />
        </div>
        <div className="mt-6">
          <button
            className="px-4 py-3 bg-[#3B82F6] text-center text-sm text-white rounded-lg font-semibold"
            type="submit"
          >
            {loading ? (
              <div>
                <ClipLoader size={18} color="white" />
              </div>
            ) : (
              "Create Donor"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDonor;
