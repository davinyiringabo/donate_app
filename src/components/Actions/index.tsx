import { Menu, Modal, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { TbDotsVertical } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import DeleteCampaign from "../DeleteCampaign";
import { useState } from "react";
import EditCampaign from "../EditCampaign";

const CampaignsActions = ({ campaign }: { campaign: unknown }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [openDelete, setOpenDelete] = useState(false);
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <button>
          <TbDotsVertical color="black" />
        </button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          onClick={open}
          leftSection={
            <FaRegEdit style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Edit
        </Menu.Item>
        <Menu.Item
          onClick={() => setOpenDelete(true)}
          leftSection={
            <MdDeleteForever style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
      <Modal opened={opened} onClose={close} title="Edit Campaign">
        <EditCampaign close={() => setOpenDelete(false)} campaign={campaign} />
      </Modal>
      <Modal opened={openDelete} onClose={close} title="Delete Campaign">
        <DeleteCampaign
          close={() => setOpenDelete(false)}
          campaign={campaign}
        />
      </Modal>
    </Menu>
  );
};

export default CampaignsActions;
