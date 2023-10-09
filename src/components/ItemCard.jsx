import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
  Tag,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

export default function ItemCard({ item }) {
  const navigate = useNavigate();

  async function submitOffer(item) {
    await fetch("http://localhost:3000/offers", {
      method: "POST",
      body: JSON.stringify({
        id: uuid(),
        itemId: item.id,
        offer_amount: 1000,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => console.log(response.json()))
      .catch((err) => {
        console.log(err.message);
      });
  }

  const qualityTable = {
    uncommon: {
      badgeColor: "green.400",
      fontColor: "green.900",
      name: "Uncommon",
    },
    rare: {
      badgeColor: "blue.300",
      fontColor: "blue.900",
      name: "Rare",
    },
    epic: {
      badgeColor: "purple.500",
      fontColor: "purple.900",
      name: "Epic",
    },
    legendary: {
      badgeColor: "orange.400",
      fontColor: "orange.900",
      name: "Legendary",
    },
    unique: {
      badgeColor: "yellow.100",
      fontColor: "yellow.900",
      name: "Unique",
    },
  };

  return (
    <Center py={6}>
      <Box
        maxW={"350px"}
        height={"520px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
        borderWidth={"4px"}
        borderColor={qualityTable[item.quality]["badgeColor"]}
      >
        <Stack
          textAlign={"center"}
          p={6}
          color={useColorModeValue("gray.800", "white")}
          align={"center"}
          h={"40%"}
        >
          <Text
            fontSize={"sm"}
            fontWeight={500}
            bg={qualityTable[item.quality]["badgeColor"]}
            p={2}
            px={3}
            color={qualityTable[item.quality]["fontColor"]}
            rounded={"full"}
          >
            {qualityTable[item.quality]["name"]}
          </Text>
          <Text fontSize={"3xl"}>
            {item.itemType
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </Text>
          {item.weaponDamage && (
            <Text fontSize={"1xl"}>{`Weapon Dmg: ${item.weaponDamage}`}</Text>
          )}

          {item.magicDamage && (
            <Text fontSize={"1xl"}>{`Magic Dmg: ${item.magicDamage}`}</Text>
          )}

          {item.magicWeaponDamage && (
            <Text>{`Magic Weapon Dmg: ${item.magicWeaponDamage}`}</Text>
          )}
        </Stack>

        <Stack
          bg={useColorModeValue("gray.50", "gray.900")}
          px={6}
          py={6}
          h={"60%"}
        >
          <List
            align={"left"}
            spacing={2}
            display={"flex"}
            flexDirection={"column"}
            h={"100%"}
          >
            {item.enchantments.map((enchantment) => {
              return (
                <ListItem>
                  <ListIcon
                    as={ChevronRightIcon}
                    boxSize={4}
                    color="green.400"
                  />
                  +{enchantment.value}
                  {enchantment.type === "percent" && "%"}{" "}
                  {enchantment.name
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")
                    .replace("Damage", "Dmg")}
                </ListItem>
              );
            })}
            <ListItem style={{ flex: 1 }} />
            <Button
              mt={10}
              w={"full"}
              bg={useColorModeValue("white", "gray.700")}
              color={"white"}
              rounded={"xl"}
              _hover={{
                bg: "green.500",
              }}
              _focus={{
                bg: "green.500",
              }}
              onClick={() => navigate(item.id)}
            >
              Current Offer: {item.initialOffer}
            </Button>
          </List>
        </Stack>
      </Box>
    </Center>
  );
}
