let storyState = {
    enemyStrength: 5,             // Força do inimigo
    diplomacy: 0,                 // Nível de diplomacia
    morale: 5,                    // Moral das tropas
    resources: 5,                 // Recursos do reino
    trust: 5,                     // Nível de confiança com o conselheiro
    kingdomStability: 5,          // Estabilidade do reino
    magicPower: 0,                // Poder mágico desbloqueado
    legendaryArtifact: false,     // Status do artefato lendário
    mysticalAllies: 0,            // Número de aliados místicos
    rebellionThreat: 0,           // Ameaça de rebelião interna
    cosmicRifts: 0,               // Número de rasgos cósmicos abertos
};

// Texto da história
const storyText = {
    start: "Você é um jovem nobre que acabou de assumir a liderança de Andorin, um reino pequeno, mas cheio de história. Porém, uma força misteriosa parece estar despertando...",
    
    firstChoice: "O inimigo, uma força sombria conhecida como Legião de Ulhar, começa a marchar para o reino. Você pode: a) Enfrentar as forças diretamente no campo de batalha, b) Tentar negociar com eles, ou c) Buscar um poder oculto nas antigas ruínas do reino.",
    
    battleChoice: "Você decidiu enfrentar o inimigo. Suas tropas estão prontas, mas a força deles é imensa. Você usará algum poder mágico, uma estratégia militar ou outra abordagem?",
    battleOutcome: "A batalha foi feroz, mas graças a sua estratégia, você venceu... ou pelo menos, isso parece. O futuro está incerto.",
    
    negotiationChoice: "O inimigo aceitou conversar, mas a desconfiança é palpável. Eles oferecem uma aliança, mas há um preço. Você está disposto a pagar?",
    negotiationOutcome: "A negociação foi difícil, e você teve que ceder a muitas condições. O reino está agora marcado pela influência dos inimigos, mas um novo equilíbrio foi estabelecido.",
    
    rebellionChoice: "O povo está começando a questionar sua liderança. Você pode: a) Fazer um grande discurso para restaurar a confiança, b) Usar força militar, ou c) Negociar com facções rebeldes em segredo.",
    rebellionOutcome: "Seu discurso foi poderoso e o povo voltou a confiar em você... mas você percebe que as facções rebeldes não desistiram e agora têm mais influência.",
    
    finalChoice: "Uma batalha final se aproxima. Com suas escolhas ao longo do caminho, o destino de Andorin está em suas mãos. Você pode: a) Confrontar o inimigo diretamente, b) Sacrificar parte do reino para obter uma vantagem sobrenatural, c) Tentar fechar um pacto com um deus desconhecido.",
    
    magicalChoice: "Um artefato mágico foi encontrado. Seu poder é imenso, mas também é perigoso. Você pode: a) Usá-lo para fortalecer suas tropas, b) Tentar destruir o artefato para evitar que ele caia nas mãos erradas, c) Levar o artefato para os sacerdotes, esperando que eles saibam o que fazer.",
    
    mysticalAlliesChoice: "Um misterioso mago aparece em sua corte, oferecendo ajuda. Ele afirma que pode chamar aliados místicos de outros planos, mas por um preço. Você aceitará?",
    
    cosmicEventChoice: "Rasgamentos cósmicos começaram a se abrir por todo o reino. Forças do além estão entrando em Andorin. Você pode: a) Usar sua magia para tentar fechar os rasgamentos, b) Explorar os rasgamentos em busca de poder, ou c) Alinhar-se com as forças cósmicas, sabendo que isso pode mudar tudo para sempre.",
    
    finalOutcome: "Com base em suas escolhas, o futuro do reino está incerto. Andorin pode se tornar uma nação poderosa ou cair em ruínas. O que acontecerá agora depende de você."
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
            // Enfrentar no campo de batalha
            storyState.enemyStrength -= 2;
            storyState.morale += 1;
            storyState.magicPower += 1;
            updateStory(storyText.battleOutcome, [
                { text: "Continuar", result: 2 }
            ]);
            break;
        
        case 2:
            // Negociar com o inimigo
            storyState.diplomacy += 2;
            storyState.enemyStrength += 1;
            storyState.rebellionThreat += 1;
            updateStory(storyText.negotiationOutcome, [
                { text: "Continuar", result: 3 }
            ]);
            break;

        case 3:
            // Buscar poder mágico
            storyState.magicPower += 2;
            storyState.resources -= 1;
            updateStory(storyText.magicalChoice, [
                { text: "Usar poder mágico", result: 4 },
                { text: "Destruir o artefato", result: 5 },
                { text: "Levar aos sacerdotes", result: 6 }
            ]);
            break;

        case 4:
            // Usar poder mágico
            if (storyState.magicPower > 2) {
                storyState.enemyStrength -= 2;
                updateStory("O poder mágico alterou o curso da batalha. As forças sombrias foram derrotadas.", [
                    { text: "Finalizar", result: 7 }
                ]);
            } else {
                updateStory("O poder mágico não foi suficiente. O inimigo ainda é forte.", [
                    { text: "Continuar", result: 8 }
                ]);
            }
            break;

        case 5:
            // Destruir o artefato
            storyState.magicPower = 0;
            updateStory("Você destruiu o artefato, mas algo se quebrou dentro de você. O reino perde uma grande chance de poder.", [
                { text: "Continuar", result: 8 }
            ]);
            break;

        case 6:
            // Levar aos sacerdotes
            storyState.resources -= 2;
            storyState.mysticalAllies += 1;
            updateStory("Os sacerdotes decifram o artefato e o entregam para você. Seu poder mágico agora é imenso!", [
                { text: "Finalizar", result: 7 }
            ]);
            break;

        case 7:
            // Final - vitória ou derrota
            if (storyState.enemyStrength < 3 && storyState.kingdomStability > 4) {
                updateStory("Você venceu! O reino de Andorin prospera, com um novo equilíbrio entre as forças mágicas e mundanas.", [
                    { text: "Recomeçar", result: 0 }
                ]);
            } else {
                updateStory("O reino caiu, envolto em sombras e destruição. As forças cósmicas destruíram tudo.", [
                    { text: "Recomeçar", result: 0 }
                ]);
            }
            break;

        case 8:
            // Continuar a luta
            updateStory(storyText.finalChoice, [
                { text: "Confrontar o inimigo", result: 1 },
                { text: "Pacto com os deuses", result: 9 },
                { text: "Sacrifício do reino", result: 10 }
            ]);
            break;

        case 9:
            // Pacto com os deuses
            updateStory("Você fez um pacto com um deus desconhecido. O destino do reino agora está além do seu controle.", [
                { text: "Final", result: 7 }
            ]);
            break;

        case 10:
            // Sacrifício do reino
            updateStory("Você sacrificou uma parte do reino, mas com isso obteve um poder imenso. Agora, o destino de Andorin depende apenas de você.", [
                { text: "Final", result: 7 }
            ]);
            break;
    }
}

// Começo do jogo
updateStory(storyText.start, [
    { text: "Iniciar", result: 1 }
]);
