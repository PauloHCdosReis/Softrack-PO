import { useColorScheme } from "nativewind";
import { Container } from "@/components/ui";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { colors } from "../colors";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { Progress, Button, ScrollView } from "native-base";
import { useEffect, useState, useRef } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Checklist, Pergunta } from "@/json/checklist";
import ModalDescription from "@/components/modais/ModalDescription";

export const Home = () => {
  const { colorScheme } = useColorScheme();
  //pegar largura da tela
  const widthDimensions = Dimensions.get("window").width;
  const heightDimensions = Dimensions.get("window").height;
  // barra de progresso
  const [checklistProgress, setChecklistProgress] = useState(0);
  // mudar checklist
  const [toogleChecklist, setToogleChecklist] = useState<"off" | "on">("off");
  // data do checklist no carousel off
  const [checklistDataOFF, setChecklistDataOFF] = useState<Pergunta[]>(() =>
    setDataChecklist("off")
  );
  // data do checklist no carousel ON
  const [checklistDataON, setChecklistDataON] = useState<Pergunta[]>(() =>
    setDataChecklist("on")
  );
  // letras para subperguntas
  const letras = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  // abrir ou fechar modal
  const [showModal, setShowModal] = useState(false);
  // setar valor da descricao no modal
  const [activeDescription, setActiveDescription] = useState<string>("");
  // status das perguntas off e on
  const [respostasChecklistOFF, setRespostasChecklistOFF] = useState<{
    [key: number]: { resposta: boolean | null; critica: boolean };
  }>([]);
  const [respostasChecklistON, setRespostasChecklistON] = useState<
    { [key: number]: { resposta: boolean | null; critica: boolean } }[]
  >([]);
  //
  const carouselRef = useRef<ICarouselInstance>(null);

  // useEffect
  useEffect(() => {
    // valor inicial da barra e quando mudar o valor do toogleChecklist
    BarraProgresso(1);
    // chama da função que reinicia o Carousel
    scrollToFirstIndex();
  }, [toogleChecklist]);

  // função que retorna valor para o checklistData, ordena perguntas e também  cria o ultimo slider
  function setDataChecklist(typeChecklist: "off" | "on"): Pergunta[] {
    // Verificar se o index 0 é o 'off' ou 'on' e salva as perguntas
    const perguntas =
      Checklist.checklists[0].checklist === typeChecklist
        ? Checklist.checklists[0].perguntas
        : Checklist.checklists[1].perguntas;

    // Criar uma cópia do array perguntas
    const perguntasCopiadas = [...perguntas];
    // Cria o ultimo slider
    let itemFinal!: Pergunta;
    // Mudar o ultimo slider de acordo com o seu respectivo checklist
    if (typeChecklist === "off") {
      itemFinal = {
        idPergunta: 99999,
        pergunta: "",
        descricao: "",
        critica: false,
        ordem: 99999,
        filhas: [],
        fim: {
          btn: "Iniciar Checklist Funcional",
          messages: [
            {
              id: 1,
              message: "Teste",
              icon: <AntDesign name="checkcircleo" size={24} color="black" />,
            },
          ],
          autoSendTime: 15,
          autoSendMessage: "Início Automático",
          statusChecklist: 1,
        },
      };
      // adiciona o ultimo slider ao array das perguntas
      perguntasCopiadas.push(itemFinal);
    } else {
      itemFinal = {
        idPergunta: 99999,
        pergunta: "",
        descricao: "",
        critica: false,
        ordem: 99999,
        filhas: [],
        fim: {
          btn: "Finalizar Checklist",
          messages: [
            {
              id: 1,
              message: "Teste",
              icon: <AntDesign name="checkcircleo" size={24} color="black" />,
            },
          ],
          autoSendTime: 10,
          autoSendMessage: "Envio Automático",
          statusChecklist: 1,
        },
      };
      // adiciona o ultimo slider ao array das perguntas
      perguntasCopiadas.push(itemFinal);
    }
    const perguntasOrdenadas = perguntasCopiadas.sort(
      (a, b) => a.ordem - b.ordem
    );
    perguntasOrdenadas.forEach((pergunta) => {
      pergunta.filhas = OrdenarPerguntas(pergunta.filhas);
    });
    return perguntasOrdenadas;
  }

  function BarraProgresso(index: number) {
    let porcentual = 0;
    if (toogleChecklist === "off") {
      porcentual = (index * 100) / checklistDataOFF.length;
    } else {
      porcentual = (index * 100) / checklistDataON.length;
    }
    setChecklistProgress(porcentual);
  }

  // style dos componentes utilizados
  const styles = StyleSheet.create({
    cardCarousel: {
      width: '100%',
      backgroundColor: colors[colorScheme].card,
      padding: 15,
      height: "100%",
      maxHeight: "100%",
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center",
    },
    modal: {
      marginBottom: "auto",
      marginTop: 5,
    },
  });

  // função para ordenar perguntas filhas
  function OrdenarPerguntas(perguntas: Pergunta[]): Pergunta[] {
    const perguntasOrdenadas = perguntas.sort((a, b) => a.ordem - b.ordem);
    perguntasOrdenadas.forEach((pergunta) => {
      pergunta.filhas = OrdenarPerguntas(pergunta.filhas);
    });
    return perguntasOrdenadas;
  }

  const setResposta = (
    idPergunta: number,
    resposta: boolean,
    critica: boolean,
    typeChecklist: "off" | "on"
  ) => {
    if (typeChecklist === "off") {
      setRespostasChecklistOFF((respostas) => ({
        ...respostas,
        [idPergunta]: {
          resposta,
          critica,
        },
      }));
    } else {
      setRespostasChecklistON((respostas) => ({
        ...respostas,
        [idPergunta]: {
          resposta,
          critica,
        },
      }));
    }
  };

  // função que manda o Carousel para o index 0 com animação
  function scrollToFirstIndex() {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ index: 0, animated: true });
    }
  }

  // return do home
  return (
    // container
    <Container>
      {/* // view da barra de progresso */}
      <View className="items-center justify-center mt-2 mb-2">
        <Progress
          value={checklistProgress}
          w={"80%"}
          colorScheme={colorScheme === "dark" ? "emerald" : "primary"}
          bg={colorScheme === "dark" ? "coolGray.600" : "coolGray.100"}
        />
      </View>
      {/* View do Carousel */}
      <View className="justify-center text-center">
        <Carousel
          loop={false}
          width={widthDimensions}
          height={heightDimensions - 120}
          autoPlay={false}
          data={toogleChecklist === "off" ? checklistDataOFF : checklistDataON}
          snapEnabled={false}
          ref={carouselRef}
          scrollAnimationDuration={400}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          defaultIndex={0}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 105,
          }}
          onSnapToItem={(index: number) => BarraProgresso(index + 1)}
          renderItem={({ index, item }: { index: number; item: Pergunta }) => (
            <View style={styles.cardCarousel}>
              {item.pergunta !== "" && (
                <View className="flex-row p-1 pl-2 pe-2 rounded-md w-full max-w-full bg-light-primaria dark:bg-dark-primaria">
                  <Pressable
                    onPress={() => {
                      setShowModal(true);
                      if (item.descricao) {
                        setActiveDescription(item.descricao);
                      }
                    }}>
                    <AntDesign
                      name="exclamationcircleo"
                      size={24}
                      color={colors[colorScheme].icons}
                    />
                  </Pressable>
                  <Text className="text-base ml-2 max-w-[85%] text-light-text2 dark:text-dark-text2">
                    {String(index + 1).padStart(2, "0")} - {item.pergunta}
                  </Text>
                </View>
              )}
              {item.descricao !== "" && item.filhas.length === 0 && (
                <View className="w-full p-2 mt-2 bg-slate-800 rounded-md border border-light-primaria dark:border-dark-primaria">
                  <Text className="mr-6 ml-6 mb-1 text-lg justify-center text-center text-light-text dark:text-dark-text">
                    Descrição:
                  </Text>
                  <ScrollView
                    style={{
                      maxHeight: "75%",
                    }}>
                    <Text className="text-justify text-light-text dark:text-dark-text">
                      {item.descricao}
                    </Text>
                  </ScrollView>
                </View>
              )}
              {item.filhas && item.filhas.length > 0 && (
                <View className="pt-2 w-full">
                  {item.filhas.map((subPergunta) => (
                    <Text
                      key={subPergunta.idPergunta}
                      className="p-1 pl-2 pe-2 m-1 rounded-md border text-light-text dark:text-dark-text border-light-primaria dark:border-dark-primaria">
                      {letras[subPergunta.ordem - 1]} - {subPergunta.pergunta}
                    </Text>
                  ))}
                </View>
              )}
              {item.fim && (
                <>
                  <View className="w-auto flex-row p-3 mb-8 justify-between rounded-md border border-light-primaria dark:border-dark-primaria">
                    <Text className="mr-4 text-justify text-light-text dark:text-dark-text">
                      {item.fim.autoSendTime}
                    </Text>
                    <Text className="text-justify text-light-text dark:text-dark-text">
                      {item.fim.autoSendMessage}
                    </Text>
                  </View>
                  {/* view da messages */}
                  <View className="w-auto mt-2 mb-12 rounded-md  border border-light-primaria dark:border-dark-primaria">
                    {item.fim.messages.map((msg) => (
                      <View
                        key={msg.id}
                        className="flex-row justify-between p-3">
                        <View>{msg.icon}</View>
                        <Text className="text-light-text dark:text-dark-text">
                          {msg.message}
                        </Text>
                      </View>
                    ))}
                  </View>
                  {/* btn do envio do checklist */}
                  <Button
                    width={"2/4"}
                    backgroundColor={colors[colorScheme].primaria}
                    _text={{
                      color: colors[colorScheme].text2,
                    }}
                    onPress={() => {
                      setToogleChecklist("on");
                    }}>
                    {item.fim.btn}
                  </Button>
                </>
              )}
            </View>
          )}
        />
      </View>
      <ModalDescription activeDescription={activeDescription} showModal={showModal} setShowModal={setShowModal}/>
    </Container>
  );
};

export default Home;
