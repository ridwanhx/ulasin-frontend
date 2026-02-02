const StatCard = ({ title, value }) => (
  <div className="glass-card rounded-2xl p-6 border border-white/10 hover:border-[#E50914]/40 transition-all">
    <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-2">
      {title}
    </h3>
    <p className="text-4xl font-black">{value}</p>
  </div>
);

export default StatCard;