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
import AddDonor from "../../components/AddDonor";
import { LuRefreshCw } from "react-icons/lu";
import { ClipLoader } from "react-spinners";

const DonorsPage = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const fetchDonors = async () => {
    setLoading(true);
    const response = await axios.get("https://donate-backend-l3fb.onrender.com/api/donors/all");
    setDonors(response.data.reverse());
    setLoading(false);
  };
  useEffect(() => {
    fetchDonors();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Donors List</h1>
      <div className="w-full flex justify-end gap-4">
        <button
          onClick={fetchDonors}
          className="py-2 px-4 bg-[#749ddf] text-center text-white font-semibold rounded-md text-sm flex items-center gap-2"
        >
          <LuRefreshCw color="#FFF" /> Refresh
        </button>
        <button
          onClick={open}
          className="py-2 px-4 bg-[#3B82F6] text-center text-white font-semibold rounded-md text-sm"
        >
          Add Donor
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
            <TableColumn className="bg-neutral-200">First Name</TableColumn>
            <TableColumn className="bg-neutral-200">Last Name</TableColumn>
          </TableHeader>
          <TableBody>
            {donors.map(
              (
                donor: {
                  id: string;
                  first_name: string;
                  last_name: string;
                },
                index: number,
              ) => (
                <TableRow key={donor.id}>
                  <TableCell
                    className={` ${index % 2 == 0 ? "bg-neutral-0" : "bg-neutral-300"} mb-1`}
                  >
                    {donor.id}
                  </TableCell>
                  <TableCell
                    className={` ${index % 2 == 0 ? "bg-neutral-0" : "bg-neutral-300"} mb-1`}
                  >
                    {donor.first_name}
                  </TableCell>
                  <TableCell
                    className={` ${index % 2 == 0 ? "bg-neutral-0" : "bg-neutral-300"} mb-1`}
                  >
                    {donor.last_name}
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      ) : (
        <div className="w-full flex justify-center">
          <h4 className="text-[90%] mt-4">No Donors Found</h4>
        </div>
      )}
      <Modal opened={opened} onClose={close} title="Add New Donor">
        <AddDonor close={close} />
      </Modal>
    </div>
  );
};

export default DonorsPage;
