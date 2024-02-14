import { useEffect, useState } from "react";
import { Text } from "react-native";

export default function Clock() {
  const [ dataString, setDataString ] = useState('')

  useEffect(() => {
    const id = setInterval(() => {
      setDataString(new Intl.DateTimeFormat("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date()))
    }, 1000);

    return ()=>{
      clearInterval(id)
    }
  }, [])
  return <Text className="text-light-text dark:text-dark-text text-2xl">{dataString}</Text>;
}
