const ReviewItem = ({ review }) => {
  return (
    <div className="glass-card p-8 rounded-2xl border border-white/5">
      <div className="flex justify-between mb-4">
        <div className="flex gap-4">
          <Avatar name={review.User?.nama} />
          <div>
            <h4 className="font-bold">{review.User?.nama}</h4>
            <p className="text-gray-500 text-xs">
              {formatDate(review.CreatedAt)}
            </p>
          </div>
        </div>

        <Rating skor={review.Skor} />
      </div>

      <p className="text-gray-300 italic">"{review.Komentar}"</p>
    </div>
  );
};

export default ReviewItem;

/* ---------- helpers ---------- */

const Avatar = ({ name }) => (
  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#e50914] to-red-800 flex items-center justify-center font-bold">
    {name?.charAt(0)}
  </div>
);

const Rating = ({ skor }) => (
  <div className="bg-white/5 px-3 py-1 rounded-lg flex items-center gap-1">
    <span className="text-yellow-500">★</span>
    <span className="font-bold">{skor}</span>
  </div>
);

const formatDate = (date) =>
  new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
