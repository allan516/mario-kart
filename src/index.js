const player1 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};

const player2 = {
  NOME: "Luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
      break;
  }

  return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} e obteve ${diceResult} + ${attribute} pontos = ${
      diceResult + attribute
    }`
  );
}

async function declareWinner(character1, character2) {
  console.log("Resultado final: ");
  console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
  console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

  if (character1.PONTOS > character2.PONTOS) {
    console.log(`\n ${character1.NOME} venceu a corrida! 🏆`);
  } else if (character2.PONTOS > character1.PONTOS) {
    console.log(`\n ${character2.NOME} venceu a corrida! 🏆`);
  } else {
    console.log("A corrida terminou em empate.");
  }
}

(async function main() {
  console.log(
    `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando ... \n`
  );

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    let block = await getRandomBlock();

    console.log(`Bloco: ${block}`);

    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

      await logRollResult(
        character1.NOME,
        "VELOCIDADE",
        diceResult1,
        character1.VELOCIDADE
      );

      await logRollResult(
        character2.NOME,
        "VELOCIDADE",
        diceResult2,
        character2.VELOCIDADE
      );

      if (totalTestSkill1 > totalTestSkill2) {
        console.log(`${character1.NOME} marcou um ponto!`);
        character1.PONTOS++;
      } else if (totalTestSkill2 > totalTestSkill1) {
        console.log(`${character2.NOME} marcou um ponto!`);
        character2.PONTOS++;
      } else if (totalTestSkill2 === totalTestSkill1) {
        console.log("Empate.");
      }
    }
    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

      await logRollResult(
        character1.NOME,
        "MANOBRABILIDADE",
        diceResult1,
        character1.MANOBRABILIDADE
      );

      await logRollResult(
        character2.NOME,
        "MANOBRABILIDADE",
        diceResult2,
        character2.MANOBRABILIDADE
      );

      if (totalTestSkill1 > totalTestSkill2) {
        console.log(`${character1.NOME} marcou um ponto!`);
        character1.PONTOS++;
      } else if (totalTestSkill2 > totalTestSkill1) {
        console.log(`${character2.NOME} marcou um ponto!`);
        character2.PONTOS++;
      } else if (totalTestSkill2 === totalTestSkill1) {
        console.log("Empate.");
      }
    }
    if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER;

      console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);

      await logRollResult(
        character1.NOME,
        "poder",
        diceResult1,
        character1.PODER
      );

      await logRollResult(
        character2.NOME,
        "poder",
        diceResult2,
        character2.PODER
      );

      if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
        console.log(
          `${character1.NOME} venceu o confronto! ${character2.NOME} perdeu um ponto.🐢`
        );
        character2.PONTOS--;
      } else if (powerResult1 > powerResult2 && character2.PONTOS === 0) {
        console.log(
          `${character1.NOME} venceu o confronto! Mas ${character2.NOME} não tem pontos para perder.🐢`
        );
      }

      if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
        console.log(
          `${character2.NOME} venceu o confronto! ${character1.NOME} perdeu um ponto.🐢`
        );
        character1.PONTOS--;
      } else if (powerResult2 > powerResult1 && character1.PONTOS === 0) {
        console.log(
          `${character2.NOME} venceu o confronto! Mas ${character1.NOME} não tem pontos para perder.🐢`
        );
      }

      console.log(
        powerResult2 === powerResult1
          ? "confronto empatado! Nenhum ponto foi perdido."
          : ""
      );
    }

    console.log(
      "*__________________________________________________________________*"
    );
  }
}
