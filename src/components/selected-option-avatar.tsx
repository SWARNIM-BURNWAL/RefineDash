import CustomAvator from "./custom-avatar";
import { Text } from "./text";

type Props = {
  avatarUrl?: string;
  name: string;
  shape?: "circle" | "square";
};
const SelectedOptionWithAvatar = ({ avatarUrl, name, shape }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <CustomAvator shape={shape} name={name} src={avatarUrl} />
      <Text>{name}</Text>
    </div>
  );
};

export default SelectedOptionWithAvatar;
