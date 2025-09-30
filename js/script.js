document.addEventListener('DOMContentLoaded', function() {
    
    /**
     * @param {number} rating
     * @returns {string}
     */
    function getRankTitle(rating) {
        if (rating < 800) {
            return '(Iniciante)';
        } else if (rating < 1200) {
            return '(Novato)';
        } else if (rating < 1600) {
            return '(Intermediário)';
        } else if (rating < 2000) {
            return '(Avançado)';
        } else if (rating < 2200) {
            return '(Especialista)';
        } else {
            return '(Mestre)';
        }
    }

    const username = 'sindikali';
    const apiUrl = `https://api.chess.com/pub/player/${username}/stats`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Usuário não encontrado ou erro na API.');
            }
            return response.json();
        })
        .then(data => {
            const blitzRating = data.chess_blitz?.last?.rating;
            if (blitzRating) {
                document.getElementById('chess-rating-blitz').textContent = blitzRating;
                document.getElementById('chess-rank-blitz').textContent = getRankTitle(blitzRating);
            } else {
                document.getElementById('chess-rating-blitz').textContent = 'N/A';
            }

            const rapidRating = data.chess_rapid?.last?.rating;
            if (rapidRating) {
                document.getElementById('chess-rating-rapid').textContent = rapidRating;
                document.getElementById('chess-rank-rapid').textContent = getRankTitle(rapidRating);
            } else {
                document.getElementById('chess-rating-rapid').textContent = 'N/A';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar dados do Chess.com:', error);
            document.getElementById('chess-rating-blitz').textContent = 'Erro';
            document.getElementById('chess-rating-rapid').textContent = 'Erro';
        });
});