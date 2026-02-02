const MovieHeader = () => (
    <header className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <h2 className="text-4xl font-extrabold mb-2">
                    Ulas<span className="text-[#e50914]">in</span>
                </h2>
                <p className="text-gray-400">Temukan ulasan jujur dari komunitas pecinta film.</p>
            </div>
            <div className="flex gap-3">
                <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#e50914]">
                    <option value="">Semua Genre</option>
                    <option value="Action">Action</option>
                    <option value="Horror">Horror</option>
                </select>
            </div>
        </div>
    </header>
);

export default MovieHeader;