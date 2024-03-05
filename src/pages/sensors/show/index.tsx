import { SensorList } from "../list";
import { SensorDetailModal } from "../list/detail-modal";

export const SensorDetailPage = () => {
  return (
    <SensorList>
      <SensorDetailModal />
    </SensorList>
  );
};
