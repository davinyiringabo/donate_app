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
import AddDonation from "../../components/AddDonation";

const DonationsPage = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const fetchDonations = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:3455/api/donations/all");
    console.log("Donations", response);
    setDonors(response.data.reverse());
    setLoading(false);
  };
  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Donations List</h1>
      <div className="w-full flex justify-end gap-4">
        <button
          onClick={fetchDonations}
          className="py-2 px-4 bg-[#749ddf] text-center text-white font-semibold rounded-md text-sm flex items-center gap-2"
        >
          <LuRefreshCw color="white" /> Refresh
        </button>
        <button
          onClick={open}
          className="py-2 px-4 bg-[#3B82F6] text-center text-white font-semibold rounded-md text-sm"
        >
          New Donation
        </button>
      </div>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <ClipLoader size={18} color="black" />
        </div>
      ) : donors.length > 0 ? (
        <Table>
          <TableHeader>
            <TableColumn className="bg-neutral-200">#</TableColumn>
            <TableColumn className="bg-neutral-200">Donor Name</TableColumn>
            <TableColumn className="bg-neutral-200">Amount</TableColumn>
          </TableHeader>
          <TableBody>
            {donors.map(
              (
                donor: {
                  id: string;
                  amount: number;
                  first_name: string;
                  last_name: string;
                },
                index: number,
              ) => (
                <TableRow key={donor.id}>
                  <TableCell
                    className={` ${index % 2 == 0 ? "bg-neutral-0" : "bg-neutral-300"} mb-1`}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    className={` ${index % 2 == 0 ? "bg-neutral-0" : "bg-neutral-300"} mb-1`}
                  >
                    {donor.first_name + " " + donor.last_name}
                  </TableCell>
                  <TableCell
                    className={` ${index % 2 == 0 ? "bg-neutral-0" : "bg-neutral-300"} mb-1`}
                  >
                    {donor.amount}
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      ) : (
        <div className="w-full flex justify-center">
          <h4 className="text-[90%] mt-4">No Donations Found</h4>
        </div>
      )}
      <Modal opened={opened} onClose={close} title="Add New Donation">
        <AddDonation close={close} />
      </Modal>
    </div>
  );
};

export default DonationsPage;
