function AdminAlert({ type = 'success', message, onClose }) {
    // jika tidak ada pesan, kembalikan null
    if (!message) return null;

    const styles = {
        success: "bg-green-500/10 border-green-500/40 text-green-400",
        danger: "bg-red-500/10 border-red-500/40 text-red-400",
        info: "bg-blue-500/10 border-blue-500/40 text-blue-400"
    };

    return (
        <div className={`flex items-center justify-between gap-4 p-4 rounded-xl border backdrop-blur-md shadow-lg animate-slide-down ${styles[type]}`}>
            <span className="text-sm font-medium">
                {message}
            </span>

            <button
                onClick={onClose}
                className="text-lg leading-none hover:opacity-70 transition"
            >
                ×
            </button>
        </div>
    );
}

export { AdminAlert };