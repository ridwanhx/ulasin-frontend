const API_URL = 'https://ulasin-backend-production.up.railway.app/api';

// Get all movies
export async function getMovies() {
    try {
        const response = await fetch(`${API_URL}/movies`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (!response.ok) throw new Error('Failed to fetch movies');
        return await response.json();
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}

// Get movie by ID
export async function getMovieById(id) {
    try {
        const response = await fetch(`${API_URL}/movies/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (!response.ok) throw new Error('Failed to fetch movie');
        return await response.json();
    } catch (error) {
        console.error('Error fetching movie:', error);
        throw error;
    }
}

// Create new movie
export async function createMovie(data) {
    try {
        const response = await fetch(`${API_URL}/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create movie');
        return await response.json();
    } catch (error) {
        console.error('Error creating movie:', error);
        throw error;
    }
}

// Update movie
export async function updateMovie(id, data) {
    try {
        const response = await fetch(`${API_URL}/movies/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to update movie');
        return await response.json();
    } catch (error) {
        console.error('Error updating movie:', error);
        throw error;
    }
}

// Delete movie
export async function deleteMovie(id) {
    try {
        const response = await fetch(`${API_URL}/movies/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (!response.ok) throw new Error('Failed to delete movie');
        return await response.json();
    } catch (error) {
        console.error('Error deleting movie:', error);
        throw error;
    }
}