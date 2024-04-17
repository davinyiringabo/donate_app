/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { NumberInput, MultiSelect } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { ClipLoader } from "react-spinners";
import { DateInput } from "@mantine/dates";

const AddDonation = ({ close }: { close: Function }) => {
  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [donors, setDonors] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [amount, setAmount] = useState<number>(0);
  const [selectedDonors, setSelectedDonors] = useState([]);
  const [selectedCampaigns, setSelectedCampaigns] = useState([]);
  const [date, setDate] = useState<Date | null>(null);
  const fetchDonations = async () => {
    setLoadingUsers(true);
    const response = await axios.get("http://localhost:3455/api/donors/all");
    console.log(response.data);
    setDonors(
      response.data.map(
        (donor: { id: string; first_name: string; last_name: string }) => {
          return {
            value: donor.id,
            label: donor.first_name + " " + donor.last_name,
          };
        },
      ),
    );
    setLoadingUsers(false);
  };
  const fetchCampaigns = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:3455/api/campaigns/all");
    setCampaigns(
      response.data.map((campaign: { id: string; name: string }) => {
        return {
          value: campaign.id,
          label: campaign.name,
        };
      }),
    );
    setLoading(false);
  };
  useEffect(() => {
    fetchDonations();
    fetchCampaigns();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      donorId: selectedDonors[0],
      campaignId: selectedCampaigns[0],
      amount: amount,
      date: date,
    };
    console.log(formData);
    axios
      .post("http://localhost:3455/api/donations/create", formData)
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
          <MultiSelect
            label="Select Donor"
            placeholder="Pick value"
            data={donors}
            value={selectedDonors}
            onChange={(e: any) => setSelectedDonors(e)}
            searchable
            maxValues={1}
          />
        </div>
        <div className="mb-4">
          <MultiSelect
            label="Select Campaign"
            placeholder="Pick value"
            data={campaigns}
            value={selectedCampaigns}
            onChange={(e: any) => setSelectedCampaigns(e)}
            searchable
            maxValues={1}
          />
        </div>
        <div className="mb-4">
          <NumberInput
            label="Amount"
            value={amount}
            onChange={(e: any) => setAmount(e)}
            allowNegative={false}
            required
          />
        </div>
        <div className="mb-4">
          <DateInput
            value={date}
            onChange={setDate}
            label="Date"
            placeholder="Select Date"
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
              "Add Donation"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDonation;
