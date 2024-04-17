import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import axios from "axios";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { LuRefreshCw } from "react-icons/lu";
import { ClipLoader } from "react-spinners";
import CampaignsActions from "../../components/Actions";
import AddCampaign from "../../components/AddCampaign";

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const fetchCampaigns = async () => {
    setLoading(true);
    const response = await axios.get("https://donate-backend-l3fb.onrender.com/api/campaigns/all");
    setCampaigns(response.data.reverse());
    setLoading(false);
  };
  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Campaigns List</h1>
      <div className="w-full flex justify-end gap-4">
        <button
          onClick={fetchCampaigns}
          className="py-2 px-4 bg-[#749ddf] text-center text-white font-semibold rounded-md text-sm flex items-center gap-2"
        >
          <LuRefreshCw color="white" /> Refresh
        </button>
        <button
          onClick={open}
          className="py-2 px-4 bg-[#3B82F6] text-center text-white font-semibold rounded-md text-sm"
        >
          New Campaign
        </button>
      </div>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <ClipLoader size={18} color="black" />
        </div>
      ) : campaigns.length > 0 ? (
        <Table>
          <TableHeader>
            <TableColumn className="bg-neutral-200">#</TableColumn>
            <TableColumn className="bg-neutral-200">Campaign Name</TableColumn>
            <TableColumn className="bg-neutral-200">Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {campaigns.map(
              (
                campaign: {
                  id: string;
                  name: number;
                },
                index: number,
              ) => (
                <TableRow key={campaign.id}>
                  <TableCell
                    className={` ${index % 2 == 0 ? "bg-neutral-0" : "bg-neutral-300"}`}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    className={` ${index % 2 == 0 ? "bg-neutral-0" : "bg-neutral-300"}`}
                  >
                    {campaign.name}
                  </TableCell>
                  <TableCell
                    className={` ${index % 2 == 0 ? "bg-neutral-0 w-full flex justify-end pr-[20%]" : "bg-neutral-300 w-full flex justify-end pr-[20%]"}`}
                  >
                    <CampaignsActions campaign={campaign} />
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      ) : (
        <div className="w-full flex justify-center">
          <h4 className="text-[90%] mt-4">No Campaigns Found</h4>
        </div>
      )}
      <Modal opened={opened} onClose={close} title="Add New Donation">
        <AddCampaign close={close} />
      </Modal>
    </div>
  );
};

export default CampaignsPage;
