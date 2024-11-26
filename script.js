let storyState = {
    enemyStrength: 5, // Força do inimigo
    diplomacy: 0,     // Nível de diplomacia
    morale: 5,        // Moral das tropas
    resources: 5,     // Recursos do reino
    trust: 5,         // Nível de confiança com o conselheiro
    kingdomStability: 5, // Estabilidade do reino
};

// Texto da história
const storyText = {
    start: "Você é um jovem nobre que acabou de assumir a liderança de um pequeno reino. O que você fará a seguir?",
    battleChoice: "O inimigo está se aproximando do seu reino com um grande exército. Você pode escolher entre ir ao campo de batalha ou tentar negociar.",
    battleResult: "A batalha foi árdua, mas você derrotou o inimigo! Seu reino está a salvo, por enquanto.",
    negotiationChoice: "O inimigo aceitou uma conversa, mas há uma grande desconfiança. Você pretende fazer concessões para evitar a guerra?",
    negotiationResult: "A negociação foi bem-sucedida, mas seu reino precisará ceder em algumas áreas. Sua diplomacia aumentou, mas seus inimigos agora estão mais confiantes.",
    rebellionChoice: "Seu povo está começando a questionar sua liderança. Você vai tentar um discurso para reconquistar a confiança deles ou usar a força militar?",
    rebellionOutcome: "Seu discurso foi poderoso, e o povo voltou a confiar em você. Porém, a força militar aumentou, criando tensões internas.",
    finalOutcome: "Com base em suas escolhas, o futuro do reino está em suas mãos. O que você decidirá a seguir?",
    
    // Novas histórias
    allyChoice: "Um velho aliado aparece pedindo ajuda. Ele está sendo atacado por uma facção rebelde. Você irá ajudá-lo?",
    allyOutcome: "Você ajudou seu aliado, mas a facção rebelde ficou mais forte. Agora você tem uma dívida com ele.",
    traitorChoice: "Seu conselheiro está agindo de maneira estranha. Você vai investigar suas ações?",
    traitorOutcome: "Você descobriu que o conselheiro estava traindo o reino. Agora você precisa lidar com as consequências de sua traição.",
    finalBattle: "O inimigo se aliou a facções internas. Uma grande batalha se aproxima. Seu reino está pronto?",
    finalBattleOutcome: "A batalha foi decisiva. Seu reino ou floresceu ou caiu, dependendo das escolhas anteriores.",
};

// Função para atualizar o texto da história e as opções de escolha
function updateStory(text, choices = []) {
    document.getElementById("story-text").innerHTML = `<p>${text}</p>`;
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = ""; // Limpa as escolhas antigas
    choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.classList.add("choice-button");
        button.innerText = choice.text;
        button.onclick = () => makeChoice(choice.result);
        choicesDiv.appendChild(button);
    });
}

// Função para lidar com a escolha do jogador
function makeChoice(choice) {
    switch(choice) {
        case 1:
            // Confrontar o inimigo no campo de batalha
            storyState.enemyStrength -= 2; // Diminui a força do inimigo
            storyState.morale += 2; // A moral das tropas aumenta
            updateStory(storyText.battleResult, [
                { text: "Continuar", result: 2 }
            ]);
            break;
        
        case 2:
            // Negociar com o inimigo
            storyState.diplomacy += 2; // Aumenta a diplomacia
            storyState.enemyStrength += 1; // O inimigo se fortalece
            updateStory(storyText.negotiationResult, [
                { text: "Continuar", result: 3 }
            ]);
            break;

        case 3:
            // Discurso ou usar força militar
            if (storyState.morale > 3) {
                storyState.morale += 1; // Confiança aumentada
                storyState.kingdomStability += 2; // Estabilidade aumentada
                updateStory(storyText.rebellionOutcome, [
                    { text: "Continuar", result: 4 }
                ]);
            } else {
                storyState.kingdomStability -= 1; // Estabilidade do reino diminui
                updateStory(storyText.rebellionOutcome, [
                    { text: "Continuar", result: 4 }
                ]);
            }
            break;

        case 4:
            // O aliado aparece pedindo ajuda
            if (storyState.resources > 3) {
                storyState.resources -= 2; // Recursos do reino diminuem
                storyState.morale += 2; // A moral do reino aumenta
                updateStory(storyText.allyOutcome, [
                    { text: "Preparar para a batalha final", result: 5 }
                ]);
            } else {
                storyState.resources -= 3; // Recurso diminuído drasticamente
                updateStory(storyText.allyOutcome, [
                    { text: "Preparar para a batalha final", result: 5 }
                ]);
            }
            break;

        case 5:
            // Traição do conselheiro
            if (storyState.trust > 3) {
                storyState.trust -= 2; // Confiança diminui
                storyState.kingdomStability -= 1; // Estabilidade do reino abaixa
                updateStory(storyText.traitorOutcome, [
                    { text: "Reorganizar suas forças", result: 6 }
                ]);
            } else {
                storyState.kingdomStability -= 2; // Mais instabilidade
                updateStory(storyText.traitorOutcome, [
                    { text: "Reorganizar suas forças", result: 6 }
                ]);
            }
            break;

        case 6:
            // Batalha final
            if (storyState.enemyStrength < 4 && storyState.kingdomStability > 4) {
                updateStory("A batalha foi difícil, mas você venceu. O reino agora está em paz!", [
                    { text: "Recomeçar", result: 0 }
                ]);
            } else {
                updateStory("O inimigo se alicerçou no poder,
