"use client";

import Navbar from '../../components/Navbar';
import ReviewDetail from '../../modules/reviews/components/ReviewDetail';

const ReviewDetailPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-6 py-10">
        <ReviewDetail />
      </div>
    </div>
  );
};

export default ReviewDetailPage;
