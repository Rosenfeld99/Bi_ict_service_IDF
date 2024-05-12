import { CiEdit, CiSearch, CiTrash } from "react-icons/ci";
import { FaBuilding, FaCriticalRole, FaRegFileExcel, FaUser } from "react-icons/fa";
import { FaGears, FaIdCard } from "react-icons/fa6";
import { GoDatabase, GoNumber } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdLightMode, MdModeNight } from "react-icons/md";
import { TbMilitaryRank, TbUsers } from "react-icons/tb";
import { GrPowerReset } from "react-icons/gr";
import { IoSettings } from "react-icons/io5";

const icons = {
    Trash: CiTrash,
    Users: TbUsers,
    User: FaUser,
    Data: GoDatabase,
    Dashboard: LuLayoutDashboard,
    Excel: FaRegFileExcel,
    San: MdLightMode,
    Moon: MdModeNight,
    Pen: CiEdit,
    Close: IoMdClose,
    Search: CiSearch,
    Card: FaIdCard,
    Rank: TbMilitaryRank,
    Numbers: GoNumber,
    Building: FaBuilding,
    Role: FaCriticalRole,
    Gears: FaGears,
    Reset: GrPowerReset,
    Settings: IoSettings,
};

export default icons;
