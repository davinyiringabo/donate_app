/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { useState } from "react";
import axios from "axios";
import { Button, Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";

const DeleteCampaign = ({
  close,
  campaign,
}: {
  close: Function;
  campaign: any;
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await axios.delete(
        `http://localhost:3455/api/campaigns/delete/${campaign.id}`,
      );
      notifications.show({
        title: "Delete Campaign",
        message: "Successfully Deleted A Campaign! 🎉",
      });
      close();
    } catch (error: any) {
      console.error("Error deleting campaign", error);
      notifications.show({
        title: "Error deleting campaign:",
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <header className="text-xl font-semibold mb-8 text-center">
        Are you sure you want to delete this campaign?
      </header>
      <div className="flex justify-end">
        <Button variant="light" className="mr-4" onClick={() => close()}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="red" disabled={loading}>
          {loading ? <Loader size="sm" color="white" /> : "Delete"}
        </Button>
      </div>
    </div>
  );
};

export default DeleteCampaign;
