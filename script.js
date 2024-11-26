let storyState = {
    enemyStrength: 5, // Força do inimigo
    diplomacy: 0,     // Nível de diplomacia
    morale: 5,        // Moral das tropas
};

// Texto de introdução do jogo
const storyText = {
    start: "Você é um jovem nobre que acabou de assumir a liderança de um pequeno reino. O que você fará a seguir?",
    battleChoice: "O inimigo está se aproximando do seu reino com um grande exército. Você pode escolher entre ir ao campo de batalha ou tentar negociar.",
    battleResult: "A batalha foi árdua, mas você derrotou o inimigo! Seu reino está a salvo, por enquanto.",
    negotiationChoice: "O inimigo aceitou uma conversa, mas há uma grande desconfiança. Você pretende fazer concessões para evitar a guerra?",
    negotiationResult: "A negociação foi bem-sucedida, mas seu reino precisará ceder em algumas áreas. Sua diplomacia aumentou, mas seus inimigos agora estão mais confiantes.",
    finalOutcome: "Com base em suas escolhas, o futuro do reino está em suas mãos. O que você decidirá a seguir?"
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
    if (choice === 1) {
        // Confrontar o inimigo no campo de batalha
        storyState.enemyStrength -= 2; // Diminui a força do inimigo após a batalha
        storyState.morale += 1; // A moral das tropas aumenta
        updateStory(storyText.battleResult, [
            { text: "Continuar", result: 1 }
        ]);
    } else if (choice === 2) {
        // Negociar com o inimigo
        storyState.diplomacy += 2; // A diplomacia aumenta
        storyState.enemyStrength += 1; // O inimigo fica mais forte, mas a guerra pode ser evitada
        updateStory(storyText.negotiationResult, [
            { text: "Continuar", result: 1 }
        ]);
    } else {
        // Condições finais com base nas escolhas
        if (storyState.enemyStrength > 4) {
            updateStory("O inimigo ficou mais forte após a negociação, e um novo confronto ocorre. Infelizmente, o seu reino foi invadido.", [
                { text: "Recomeçar", result: 0 }
            ]);
        } else if (storyState.morale > 4) {
            updateStory("Sua moral é alta, e você conseguiu unir o reino. Seu futuro é promissor.", [
                { text: "Recomeçar", result: 0 }
            ]);
        } else {
            updateStory("O reino enfrenta tempos difíceis, mas com sabedoria, você pode restaurar sua força.", [
                { text: "Recomeçar", result: 0 }
            ]);
        }
    }
}

// Função de reinício do jogo
function resetGame() {
    storyState = {
        enemyStrength: 5,
        diplomacy: 0,
        morale: 5
    };
    updateStory(storyText.start, [
        { text: "Confrontar o inimigo no campo de batalha", result: 1 },
        { text: "Tentar negociar com o inimigo e evitar a guerra", result: 2 }
    ]);
}

// Iniciar o jogo
resetGame();

