// src/pages/catalog/product-reviews/list.tsx

import { useAtomValue } from 'jotai';
import { useParams } from 'react-router-dom';
import { reviewsState } from '@/state';
import { Review } from '@/types';
import { Avatar, Box, Header, Icon, Page, Text } from 'zmp-ui';
import { Suspense } from 'react';

const ReviewItem: React.FC<{ review: Review }> = ({ review }) => {
  const timeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " năm";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " tháng";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " ngày";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " giờ";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " phút";
    return Math.floor(seconds) + " giây";
  };

  return (
    <Box flex className="space-x-2 py-4 border-b border-gray-100 last:border-b-0">
      <Avatar size={32} src={review.author.avatar} />
      <Box className="flex-1">
        <Text size="small" bold>{review.author.name}</Text>
        <Box flex className="items-center">
          {Array.from({ length: 5 }).map((_, i) => <Icon key={i} icon={i < review.rating ? 'zi-star-solid' : 'zi-star'} className="text-yellow-400 text-xs" />)}
        </Box>
        <Text size="small" className="whitespace-pre-wrap mt-1">{review.text}</Text>
        {review.images && review.images.length > 0 && (
          <Box className="pt-2 grid grid-cols-3 gap-1">
            {review.images.map((img, index) => (
              <img key={index} src={img} className="w-full aspect-square object-cover rounded-lg bg-skeleton" alt={`Review image ${index + 1}`} />
            ))}
          </Box>
        )}
        <Text size="xSmall" className="text-gray-500 pt-1">{timeAgo(review.timestamp)} trước</Text>
      </Box>
    </Box>
  );
};

const AllReviewsContent = () => {
    const { id } = useParams();
    const reviews = useAtomValue(reviewsState(Number(id)));

    return (
        <Box className="p-4">
             {reviews.map(review => (
              <ReviewItem key={review.id} review={review} />
            ))}
        </Box>
    );
};

const ReviewsListPage = () => {
  return (
    <Page className="flex flex-col">
      <Header title="Tất cả đánh giá" showBackIcon />
      <div className="flex-1 overflow-y-auto">
        <Suspense fallback={<Text className="p-4">Đang tải...</Text>}>
            <AllReviewsContent />
        </Suspense>
      </div>
    </Page>
  );
};

export default ReviewsListPage;