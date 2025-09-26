// src/pages/catalog/product-reviews/form.tsx

import { postReviewAtom } from '@/state';
import { useSetAtom } from 'jotai';
import React, { useState } from 'react';
import { Box, Button, Icon, Text } from 'zmp-ui';
import toast from 'react-hot-toast';
import { chooseImage } from 'zmp-sdk';

const StarRating = ({ rating, setRating }: { rating: number, setRating: (r: number) => void }) => {
  return (
    <Box flex className="justify-center items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <div key={star} onClick={() => setRating(star)} className="cursor-pointer">
          <Icon
            icon={star <= rating ? 'zi-star-solid' : 'zi-star'}
            className="text-yellow-400 text-3xl"
          />
        </div>
      ))}
    </Box>
  );
};

interface ProductReviewFormProps {
  productId: number;
  onSubmitSuccess: () => void;
}

const ProductReviewForm: React.FC<ProductReviewFormProps> = ({ productId, onSubmitSuccess }) => {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const postReview = useSetAtom(postReviewAtom);

  const handleChooseImage = async () => {
    if (images.length >= 3) {
      toast.error("Bạn chỉ có thể tải lên tối đa 3 ảnh.");
      return;
    }

    try {
      // --- SỬA LỖI: Truyền vào một đối tượng options hợp lệ ---
      const { filePaths } = await chooseImage({
        count: 3 - images.length, // Thêm lại tham số count để giới hạn số lượng ảnh
      });
      
      setImages(prev => [...prev, ...filePaths]);

    } catch (error) {
      console.error("Lỗi khi chọn ảnh:", error);
      if (typeof error === 'object' && error !== null && 'errMsg' in error && String((error as any).errMsg).includes('cancel')) {
        return;
      }
      toast.error("Không thể tải ảnh lên. Vui lòng thử lại.");
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async () => {
    if (!text.trim()) {
      toast.error("Vui lòng nhập nội dung đánh giá");
      return;
    }
    await postReview({ productId, review: { rating, text, images } });
    
    setRating(5);
    setText('');
    setImages([]);
    onSubmitSuccess();
  };

  return (
    <Box className="p-4 space-y-4">
      <Text size="large" bold className="text-center">Viết đánh giá của bạn</Text>
      <StarRating rating={rating} setRating={setRating} />
      
      <textarea
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
        rows={4}
        placeholder="Cảm nhận của bạn về sản phẩm..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      
      <Box flex className="flex-wrap gap-2 items-center">
        {images.map((imageUrl, index) => (
          <div key={index} className="relative w-24 h-24 border rounded-lg overflow-hidden">
            <img src={imageUrl} alt={`Review ${index}`} className="w-full h-full object-cover" />
            <Button
              icon={<Icon icon="zi-close-circle-solid" />}
              size="small"
              className="absolute -top-1 -right-1 !bg-transparent !text-red-500"
              onClick={() => handleRemoveImage(index)}
            />
          </div>
        ))}
        {images.length < 3 && (
          <Button
            variant="secondary"
            className="w-24 h-24 border-dashed border-gray-300 flex flex-col items-center justify-center !bg-gray-50"
            onClick={handleChooseImage}
          >
            <Icon icon="zi-add-photo" className="text-xl" />
            <Text size="xSmall" className="mt-1">Thêm ảnh</Text>
          </Button>
        )}
      </Box>

      <Button fullWidth onClick={handleSubmit}>Gửi đánh giá</Button>
    </Box>
  );
};

export default ProductReviewForm;