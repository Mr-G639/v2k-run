// src/pages/catalog/product-reviews/summary.tsx

import React, { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { Box, Text, Icon, Button } from 'zmp-ui';
import { reviewsState } from '@/state';
import Section from '@/components/section';

const ProductReviewsSummary: React.FC<{ productId: number }> = ({ productId }) => {
  const navigate = useNavigate();
  const reviews = useAtomValue(reviewsState(productId));

  const summary = useMemo(() => {
    if (!reviews || reviews.length === 0) {
      return { averageRating: 0, totalReviews: 0, imageReviewCount: 0 };
    }
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    const imageReviewCount = reviews.filter(r => r.images && r.images.length > 0).length;
    return {
      averageRating: parseFloat(averageRating.toFixed(1)),
      totalReviews: reviews.length,
      imageReviewCount,
    };
  }, [reviews]);

  if (summary.totalReviews === 0) {
    return (
      <Section title="Đánh giá sản phẩm">
        <Text className="text-center text-gray-500 p-4">Chưa có đánh giá nào cho sản phẩm này.</Text>
      </Section>
    );
  }

  return (
    <Section title="Đánh giá sản phẩm">
      <Box className="p-4">
        <div className="flex items-center space-x-4">
          <div className='text-center'>
            <Text size="xLarge" bold className="text-yellow-400">{summary.averageRating}</Text>
            <Box flex className="items-center">
              {Array.from({ length: 5 }).map((_, i) => <Icon key={i} icon={i < Math.round(summary.averageRating) ? 'zi-star-solid' : 'zi-star'} className="text-yellow-400" />)}
            </Box>
          </div>
          <div className='flex-1 grid grid-cols-2 gap-2 text-center'>
            <div className='bg-gray-100 p-2 rounded-md'>
              <Text size='large' bold>{summary.totalReviews}</Text>
              <Text size='xSmall'>Bình luận</Text>
            </div>
            <div className='bg-gray-100 p-2 rounded-md'>
              <Text size='large' bold>{summary.imageReviewCount}</Text>
              <Text size='xSmall'>Có ảnh</Text>
            </div>
          </div>
        </div>
        <Button
          onClick={() => navigate(`/product/${productId}/reviews`)}
          fullWidth
          variant="tertiary"
          className="mt-4"
        >
          Xem tất cả {summary.totalReviews} đánh giá
        </Button>
      </Box>
    </Section>
  );
};

export default ProductReviewsSummary;