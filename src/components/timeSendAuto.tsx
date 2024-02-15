import React, { useState, useEffect } from "react";
import { Text } from "react-native";

const TimerComponent = ({ time }: { time: number }) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(time);

  // Função para iniciar o timer
  const startTimer = (time: number) => {
    setTimeLeft(time);
  };

  // Função para parar o timer
  const stopTimer = () => {
    setTimeLeft(null);
  };

  // Efeito para atualizar o timer a cada segundo
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (timeLeft !== null && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime !== null ? prevTime - 1 : null));
      }, 1000);
    } else if (timeLeft === 0) {
      // Aqui você pode chamar a função que deseja executar quando o tempo acabar
      console.log("Tempo acabou!");
      stopTimer(); // Para o timer
    }
    // Limpa o intervalo quando o componente é desmontado ou o timer é parado
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeLeft]);

  useEffect(() => {
    setTimeLeft(time);
  }, [time]);

  return <Text className="text-dark dark:text-white mr-4">{timeLeft !== null ? `${timeLeft}` : "Timer não iniciado"}</Text>;
};

export default TimerComponent;
