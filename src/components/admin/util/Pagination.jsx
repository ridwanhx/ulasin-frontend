function Pagination({ currentPage, totalPages, onPageChange }) {
    // Jika total halaman kurang dari atau sama dengan 1, kembalikan null
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-2 mt-6">
            <button className="px-3 py-2 rounded-lg border border-white/10 text-sm text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/5 transition">
                &laquo;
            </button>

            {/* Page Number */}
            {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                const isActive = page === currentPage;

                return (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${isActive ? "bg-[#e50914] text-white" : "text-gray-300 hover:bg-white/5"}`}
                    >
                        {page}
                    </button>
                );
            })}

            {/* Next */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg border-white/10 text-sm text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/5 transition"
            >
                &raquo;
            </button>
        </div>
    );
}

export { Pagination };