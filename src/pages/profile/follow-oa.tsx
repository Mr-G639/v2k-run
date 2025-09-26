import { useEffect } from "react";
import { showOAWidget } from "zmp-sdk/apis";

export default function FollowOAWidget() {
  useEffect(() => {
    showOAWidget({
      id: "oaWidget",
      guidingText: "Quan tâm OA để nhận các đặc quyền ưu đãi",
      color: "#F7F7F8",
    });
  }, []);

  return <div id="oaWidget" />;
}
