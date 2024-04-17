/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { ClipLoader } from "react-spinners";
import { TextInput } from "@mantine/core";

const EditCampaign = ({
  close,
  campaign,
}: {
  close: Function;
  campaign: any;
}) => {
  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://localhost:3455/api/campaigns/update`, {
        id: campaign.id,
        name: newName,
      });
      notifications.show({
        title: "Update Campaign",
        message: "Successfully Updated A Campaign! 🎉",
      });
      close();
    } catch (error: any) {
      console.error("Error updating campaign", error);
      notifications.show({
        title: "Error Updating campaign:",
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit} className="w-full">
        <TextInput
          label="New Name"
          value={newName}
          onChange={(event) => setNewName(event.currentTarget.value)}
          required
        />
        <div className="mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-[#3B82F6] text-center text-sm text-white rounded-lg font-semibold"
            disabled={loading}
          >
            {loading ? (
              <div>
                <ClipLoader size={18} color="white" />
              </div>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCampaign;
