import { getNameInitials } from "@/utilities";
import { Avatar as AntdAvatar } from "antd"
import { AvatarProps } from "antd/lib";


type Props = AvatarProps & {
  name?: string;


}
const CustomAvator = ({name, style ,...rest}:Props) => {
  return (
    <AntdAvatar
    alt={name}
    size={"large"}
    style={{
      backgroundColor:"#f56a00",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      border:"none",
      cursor:"pointer",
      ...style
    }}
    
    {...rest}
    >
        {getNameInitials(name||'')}
    </AntdAvatar>
  )
}

export default CustomAvator