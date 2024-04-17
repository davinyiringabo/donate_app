/* eslint-disable @typescript-eslint/ban-types */
import React, { useState } from "react";
import axios from "axios";
import { TextInput } from "@mantine/core";
import { v4 as uuidv4 } from "uuid";
import { notifications } from "@mantine/notifications";
import { ClipLoader } from "react-spinners";

const AddCampaign = ({ close }: { close: Function }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: uuidv4(),
    name: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:3455/api/campaigns/create", formData)
      .then(() => {
        notifications.show({
          title: "Register Campaign",
          message: "Successfully Registered a Campaign!",
        });
        close();
      })
      .catch((error) => {
        console.error("Error creating campaign", error);
        notifications.show({
          title: "Error creating campaign:",
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
            label="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
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
              "Create Campaign"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCampaign;
