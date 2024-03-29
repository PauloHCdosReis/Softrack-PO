import { useColorScheme } from "nativewind";
import { Container } from "@/components/ui";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { colors } from "../colors";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { Progress, Modal, Button, ScrollView } from "native-base";
import { useEffect, useState, useRef } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Checklist, Pergunta } from "@/json/checklist";
import TimerComponent from "@/components/timeSendAuto";

export const Home = () => {
  //valor do dark mode
  const { colorScheme } = useColorScheme();
  //pegar largura da tela
  const widthDimensions = Dimensions.get("window").width;
  // barra de progresso
  const [checklistProgress, setChecklistProgress] = useState(0);
  // mudar checklist
  const [toogleChecklist, setToogleChecklist] = useState<"OFF" | "ON">("OFF");
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
  const [respostasChecklistOFF, setRespostasChecklistOFF] = useState<
    {
      idPergunta: number;
      resposta: boolean | null;
      critica: boolean;
    }[]
  >(
    checklistDataOFF.map((item) => ({
      idPergunta: item.idPergunta,
      resposta: null,
      critica: item.critica,
    }))
  );

  const [respostasChecklistON, setRespostasChecklistON] = useState<
    {
      idPergunta: number;
      resposta: boolean | null;
      critica: boolean;
    }[]
  >(
    checklistDataON.map((item) => ({
      idPergunta: item.idPergunta,
      resposta: null,
      critica: false,
    }))
  );
  // carouselRef
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

    // ordena as perguntas com o campo ordem
    const perguntasOrdenadas = perguntasCopiadas.sort(
      (a, b) => a.ordem - b.ordem
    );
    perguntasOrdenadas.forEach((pergunta) => {
      pergunta.filhas = OrdenarPerguntas(pergunta.filhas);
    });

    //retorna valor
    return perguntasOrdenadas;
  }

  // funcao para atualizar barra de progresso
  function BarraProgresso(index: number) {
    let porcentual = 0;
    if (toogleChecklist === "OFF") {
      porcentual = (index * 100) / checklistDataOFF.length;
    } else {
      porcentual = (index * 100) / checklistDataON.length;
    }
    setChecklistProgress(porcentual);
  }

  // style dos componentes utilizados
  const styles = StyleSheet.create({
    cardCarousel: {
      width: widthDimensions,
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

  // setar resposta para as perguntas
  const setResposta = (
    resposta: boolean | null,
    index: number,
    typeChecklist: "OFF" | "ON"
  ) => {
    if (typeChecklist === "OFF") {
      setRespostasChecklistOFF((prev) => {
        const newStatus = [...prev];
        newStatus[index] = {
          ...newStatus[index],
          resposta: resposta,
        };
        return newStatus;
      });
    } else {
      setRespostasChecklistON((prev) => {
        const newStatus = [...prev];
        newStatus[index] = {
          ...newStatus[index],
          resposta: resposta,
        };
        return newStatus;
      });
    }
  };

  // função que manda o Carousel para o index 0 com animação
  function scrollToFirstIndex() {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ index: 0, animated: true });
    }
  }

  // mandar resposta
  function mandarResposta() {
    const respostasChecklistOFFFiltered = respostasChecklistOFF.filter(
      (resposta) => resposta.idPergunta !== 99999
    );
    const respostasChecklistONFiltered = respostasChecklistON.filter(
      (resposta) => resposta.idPergunta !== 99999
    );
    console.log(respostasChecklistOFFFiltered);
    console.log(respostasChecklistONFiltered);
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
          height={widthDimensions / 2.8}
          autoPlay={false}
          data={toogleChecklist === "OFF" ? checklistDataOFF : checklistDataON}
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
            parallaxScrollingOffset: 85,
          }}
          onSnapToItem={(index: number) => BarraProgresso(index + 1)}
          renderItem={({ index, item }: { index: number; item: Pergunta }) => (
            // view do card dentro do carousel
            <View style={styles.cardCarousel}>
              {/* view da pergunta pai, e para alinhar todos em uma borda */}
              {item.pergunta !== "" && (
                <View className="flex-row justify-between p-1 pl-2 pe-2 rounded-md w-full max-w-full bg-light-primaria dark:bg-dark-primaria">
                  {/* pressable do botão */}
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
                  {/* text da pergunta */}
                  <Text className="text-base ml-2 max-w-[85%] text-light-text2 dark:text-dark-text2">
                    {String(index + 1).padStart(2, "0")} - {item.pergunta}
                  </Text>
                  {/* view dos icones para responder  */}
                  <View className="flex-row gap-2">
                    <Pressable
                      onPress={() =>
                        setResposta(
                          true,
                          index,
                          toogleChecklist
                        )
                      }>
                      {toogleChecklist === "OFF" ? (
                        <AntDesign
                          name={
                            respostasChecklistOFF[index] &&
                            respostasChecklistOFF[index].resposta === true
                              ? "checkcircle"
                              : "checkcircleo"
                          }
                          size={24}
                          color={
                            respostasChecklistOFF[index] &&
                            respostasChecklistOFF[index].resposta === true
                              ? "green"
                              : colors[colorScheme].icons
                          }
                        />
                      ) : (
                        <AntDesign
                          name={
                            respostasChecklistON[index] &&
                            respostasChecklistON[index].resposta === true
                              ? "checkcircle"
                              : "checkcircleo"
                          }
                          size={24}
                          color={
                            respostasChecklistON[index] &&
                            respostasChecklistON[index].resposta === true
                              ? "green"
                              : colors[colorScheme].icons
                          }
                        />
                      )}
                    </Pressable>
                    <Pressable
                      onPress={() =>
                        setResposta(
                          false,
                          index,
                          toogleChecklist
                        )
                      }>
                      {toogleChecklist === "OFF" ? (
                        <AntDesign
                          name={
                            respostasChecklistOFF[index] &&
                            respostasChecklistOFF[index].resposta === false
                              ? "closecircle"
                              : "closecircleo"
                          }
                          size={24}
                          color={
                            respostasChecklistOFF[index] &&
                            respostasChecklistOFF[index].resposta === false
                              ? "red"
                              : colors[colorScheme].icons
                          }
                        />
                      ) : (
                        <AntDesign
                          name={
                            respostasChecklistON[index] &&
                            respostasChecklistON[index].resposta === false
                              ? "closecircle"
                              : "closecircleo"
                          }
                          size={24}
                          color={
                            respostasChecklistON[index] &&
                            respostasChecklistON[index].resposta === false
                              ? "red"
                              : colors[colorScheme].icons
                          }
                        />
                      )}
                    </Pressable>
                  </View>
                </View>
              )}
              {/* view da descrição */}
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
              {/* view das filhas */}
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
                  {/* view do envio automatico */}
                  <View className="w-auto flex-row p-3 mb-8 justify-between rounded-md border border-light-primaria dark:border-dark-primaria">
                    <TimerComponent time={item.fim.autoSendTime} />
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
                        <Text className="ml-4 text-light-text dark:text-dark-text">
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
                      if (toogleChecklist === "OFF") {
                        setToogleChecklist("ON");
                      } else {
                        mandarResposta();
                      }
                    }}>
                    {item.fim.btn}
                  </Button>
                </>
              )}
            </View>
          )}
        />
      </View>
      {/* Modal do native base */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxWidth="80%" maxHeight="90%" {...styles["modal"]}>
          <Modal.CloseButton />
          <Modal.Header>Descrição</Modal.Header>
          <Modal.Body>
            <Text className="text-justify text-light-text dark:text-dark-text">
              {activeDescription}
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button
              _text={{ color: colors[colorScheme].text2 }}
              bg={colors[colorScheme].primaria}
              _pressed={{ bg: "" }}
              flex="1"
              onPress={() => {
                setShowModal(false);
              }}>
              Continue
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Container>
  );
};

export default Home;
