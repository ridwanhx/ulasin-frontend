import { useState, useEffect } from 'react';

export default function MovieModal({ movie, onClose, onSave }) {
    const [formData, setFormData] = useState({
        judul: '',
        poster: '',
        sutradara: '',
        genre: '',
        tahun_rilis: '',
        sinopsis: '',
    });
    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
        if (movie) {
            setFormData({
                judul: movie.judul || '',
                poster: movie.poster || '',
                sutradara: movie.sutradara || '',
                genre: movie.genre || '',
                tahun_rilis: movie.tahun_rilis || '',
                sinopsis: movie.sinopsis || '',
            });
            setPreviewImage(movie.poster || '');
        }
    }, [movie]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validasi tipe file
            if (!file.type.startsWith('image/')) {
                alert('File harus berupa gambar!');
                return;
            }

            // Validasi ukuran file (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('Ukuran file maksimal 2MB!');
                return;
            }

            // Convert to base64
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setFormData(prev => ({ ...prev, poster: base64String }));
                setPreviewImage(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setFormData(prev => ({ ...prev, poster: '' }));
        setPreviewImage('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">
                        {movie ? 'Edit Movie' : 'Tambah Movie Baru'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                    >
                        ×
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-4">
                        {/* Judul */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Judul <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="judul"
                                value={formData.judul}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                                placeholder="Masukkan judul film"
                            />
                        </div>

                        {/* Poster Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Poster Film
                            </label>

                            {/* Preview Image */}
                            {previewImage && (
                                <div className="mb-3 relative inline-block">
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="w-32 h-48 object-cover rounded-lg border-2 border-gray-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700 text-sm"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}

                            {/* File Input */}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Format: JPG, PNG, GIF. Maksimal 2MB
                            </p>
                        </div>

                        {/* Sutradara */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Sutradara <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="sutradara"
                                value={formData.sutradara}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                                placeholder="Masukkan nama sutradara"
                            />
                        </div>

                        {/* Genre */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Genre <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="genre"
                                value={formData.genre}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                                placeholder="Contoh: Action, Drama, Sci-Fi"
                            />
                        </div>

                        {/* Tahun Rilis */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tahun Rilis <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="tahun_rilis"
                                value={formData.tahun_rilis}
                                onChange={handleChange}
                                required
                                min="1900"
                                max="2099"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                                placeholder="2024"
                            />
                        </div>

                        {/* Sinopsis */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Sinopsis <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="sinopsis"
                                value={formData.sinopsis}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                                placeholder="Masukkan sinopsis film"
                            />
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        >
                            {movie ? 'Update' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}