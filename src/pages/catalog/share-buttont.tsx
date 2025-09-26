import { ShareDecor } from "@/components/vectors";
import { Product } from "@/types";
import { openShareSheet } from "zmp-sdk/apis";
import { Icon } from "zmp-ui";

export default function ShareButton(props: { product: Product }) {
  const share = () => {
    openShareSheet({
      type: "zmp_deep_link",
      data: {
        title: props.product.name,
        // The following line has been corrected
        thumbnail: props.product.images[0],
        path: `/product/${props.product.id}`,
      },
    });
  };

  return (
    // The following line has been corrected
    <button
      className="relative h-9 rounded-lg cursor-pointer overflow-hidden"
      onClick={share}
    >
      <div className="absolute inset-0 bg-[var(--zaui-light-button-secondary-background)] opacity-50" />
      <ShareDecor className="absolute inset-0" />
      {/* The following line has been corrected */}
      <div className="relative flex justify-center items-center space-x-1 text-foreground text-sm font-medium p-2 h-full">
        <div>Chia sẻ ngay cho bạn bè</div>
        <Icon icon="zi-chevron-right" />
      </div>
    </button>
  );
}