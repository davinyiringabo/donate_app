import AddDonor from "../../components/AddDonor";
import { Menu, Modal, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IoIosAddCircleOutline } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { TbEyeCheck } from "react-icons/tb";

const Dropdown = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <button>Donors</button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          onClick={open}
          leftSection={
            <IoIosAddCircleOutline
              style={{ width: rem(14), height: rem(14) }}
            />
          }
        >
          Add Donor
        </Menu.Item>
        <Menu.Item
          leftSection={
            <TbEyeCheck style={{ width: rem(14), height: rem(14) }} />
          }
        >
          <NavLink to={"/donors"} className={"w-full h-full"}>
            View All Donors
          </NavLink>
        </Menu.Item>
      </Menu.Dropdown>
      <Modal opened={opened} onClose={close} title="Add New Donor">
        <AddDonor close={close} />
      </Modal>
    </Menu>
  );
};

export default Dropdown;
