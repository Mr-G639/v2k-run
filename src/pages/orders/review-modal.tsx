// src/pages/orders/review-modal.tsx

import { Product } from "@/types";
import { Sheet } from "zmp-ui";
import ProductReviewForm from "../catalog/product-reviews/form";

interface ReviewModalProps {
  product: Product | null;
  onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ product, onClose }) => {
  return (
    <Sheet
      visible={!!product}
      onClose={onClose}
      autoHeight
      mask
      handler
      swipeToClose
    >
      {product && (
        <ProductReviewForm 
          productId={product.id} 
          onSubmitSuccess={onClose} 
        />
      )}
    </Sheet>
  );
};

export default ReviewModal;