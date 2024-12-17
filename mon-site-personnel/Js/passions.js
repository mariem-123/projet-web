function showDetails(passion) {
    const details = document.getElementById('details');
    const content = document.getElementById('details-content');
    
    const passions = {
        passion1: "La musique réduit le stress, améliore la concentration et favorise une meilleure expression émotionnelle.",
        passion2: "La lecture enrichit l'esprit, développe l'imagination et renforce les capacités d'analyse.",
        passion3: "La danse améliore la condition physique, stimule la créativité et renforce la confiance en soi.",
        passion4: "La cuisine favorise la créativité, renforce les liens sociaux et encourage une alimentation saine."
    };
    
    content.textContent = passions[passion];
    details.style.display = 'block';
}

function hideDetails() {
    const details = document.getElementById('details');
    details.style.display = 'none';
}
