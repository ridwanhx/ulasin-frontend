import ReviewItem from "./ReviewItem";

const ReviewList = ({ reviews = [] }) => {
  return (
    <div className="max-w-6xl mx-auto px-6 mt-24">
      <div className="flex justify-between mb-10 border-b border-white/5 pb-6">
        <h2 className="text-3xl font-bold">Ulasan Pengguna</h2>
        <span className="text-gray-500">{reviews.length} Komentar</span>
      </div>

      {reviews.length ? (
        <div className="grid gap-6">
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <EmptyReview />
      )}
    </div>
  );
};

export default ReviewList;

const EmptyReview = () => (
  <div className="text-center py-20 glass-card rounded-2xl border border-dashed border-white/10">
    <p className="text-gray-500">
      Belum ada ulasan. Jadilah yang pertama!
    </p>
  </div>
);
