import { RiHotelLine } from "react-icons/ri";
import {
  FaChevronLeft,
  FaChevronRight,
  FaLink,
  FaPencilAlt,
  FaUnlink,
  FaTimes,
} from "react-icons/fa";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { BsCheck } from "react-icons/bs";
import { MdOutlineAttachMoney, MdNewLabel } from "react-icons/md";
import { HiOutlineCollection } from "react-icons/hi";

export const icons = {
  Hotel: RiHotelLine,
  ArrowLeft: FaChevronLeft,
  ArrowRight: FaChevronRight,
  Location: FaLocationDot,
  Money: MdOutlineAttachMoney,
  Link: FaLink,
  Unlink: FaUnlink,
  Pencil: FaPencilAlt,
  ChevronUp: BiChevronUp,
  ChevronDown: BiChevronDown,
  Check: BsCheck,
  New: MdNewLabel,
  Times: FaTimes,
  Collection: HiOutlineCollection,
} as const;
