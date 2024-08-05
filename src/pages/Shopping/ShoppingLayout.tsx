import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import {
  Heading,
  Box,
  Flex,
  Text,
  Button,
  ButtonGroup,
  IconButton,
  HStack,
  Container,
} from "@chakra-ui/react";
import {
  AddIcon,
  TriangleDownIcon,
  CheckIcon,
  EditIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import { BsCart3 } from "react-icons/bs";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const ShoppingLayout = () => {
  const [items, setItems] = useState([]);
  const [stores, setStores] = useState([]);
  const [visibleStores, setVisibleStores] = useState<Set<string>>(new Set());

  const [selectedItem, setSelectedItem] = useState<{
    store: string;
    index: number;
  } | null>(null);

  const fetchItems = async () => {
    const databaseURL = import.meta.env.VITE_FIREBASE_URL;
    const path = "shopping_items.json";

    const res = await fetch(`${databaseURL}/${path}`);
    return res.json();
  };

  // React query fetch items
  const { data, status } = useQuery("items", fetchItems);

  useEffect(() => {
    if (status === "success" && data) {
      const itemsArray = Object.values(data);
      setItems(itemsArray);

      // Selects unique stores from the data using Set()
      const storesList = [
        ...new Set(itemsArray.map((item) => item.store)),
      ].reverse();
      setStores(storesList);
      setVisibleStores(new Set(storesList));
    }
  }, [data, status]);

  // Formats the selected index to include store e.g: Walmart, 3
  const handleItemClick = (store: string, index: number) => {
    setSelectedItem(
      selectedItem?.store === store && selectedItem?.index === index
        ? null
        : { store, index }
    );
  };

  // Changes the visibility of stores
  const handleStoreVisibility = (store: string) => {
    setVisibleStores((prev) => {
      const newVisibleStores = new Set(prev);
      if (newVisibleStores.has(store)) {
        newVisibleStores.delete(store);
      } else {
        newVisibleStores.add(store);
      }
      return newVisibleStores;
    });
  };

  const handleComplete = async (item) => {
    // Toggle completed
    const updatedItem = { ...item, completed: !item.completed };

    try {
      const databaseURL = import.meta.env.VITE_FIREBASE_URL;
      const path = `shopping_items/${item.name}.json`;

      // Send the update to Firebase
      await fetch(`${databaseURL}/${path}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });

      // Update local state of items
      setItems((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.name === item.name ? updatedItem : prevItem
        )
      );
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <main>
      <Container p={5} pt={10}>
        <Heading fontSize={35}>Shopping List</Heading>
        <ButtonGroup mt={3}>
          <Button leftIcon={<AddIcon />} bg="green" color="white">
            Add
          </Button>
          <Button leftIcon={<BsCart3 />} bg="skyblue" color="white">
            Checkout
          </Button>
        </ButtonGroup>
      </Container>
      {stores.map((store, storeIndex) => (
        <Flex flexDirection="column" p={4} key={storeIndex}>
          <HStack spacing={5}>
            <Heading fontSize={25} fontWeight={600}>
              {store}
            </Heading>
            <IconButton
              colorScheme="teal"
              aria-label="toggle-store-visibility"
              icon={<TriangleDownIcon />}
              size="sm"
              onClick={() => handleStoreVisibility(store)}
              transform={
                visibleStores.has(store) ? "rotate(180deg)" : "rotate(0deg)"
              }
              transition="transform 0.3s"
            />
          </HStack>
          <Text color="gray" pt={2} pb={5}>
            {items.filter((item) => item.store === store).length} items (
            {
              items.filter(
                (item) => item.store === store && item.completed === true
              ).length
            }
            /{items.filter((item) => item.store === store).length})
          </Text>
          {visibleStores.has(store) && (
            <Flex flexDirection="column" gap={5}>
              {items
                .filter((item) => item.store === store)
                .map((item, itemIndex) => (
                  <MotionBox
                    key={itemIndex}
                    p={5}
                    py={3}
                    border="1px"
                    borderColor="lightGray"
                    bg={item.completed ? "lightgray" : "white"}
                    borderRadius={20}
                    boxShadow="base"
                    initial={{ x: 0 }}
                    animate={{
                      x:
                        selectedItem?.store === store &&
                        selectedItem?.index === itemIndex
                          ? -50
                          : 0,
                    }}
                    transition={{ type: "spring", stiffness: 100 }}
                    onClick={() => handleItemClick(store, itemIndex)}
                    position="relative"
                  >
                    <HStack spacing={4}>
                      <Button
                        colorScheme="teal"
                        size="sm"
                        variant={item.completed ? "solid" : "outline"}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleComplete(item);
                        }}
                      >
                        <CheckIcon />
                      </Button>
                      <Text fontSize={17} fontWeight={500}>
                        {item.name}
                      </Text>
                      <Text fontSize={15} color="gray">
                        {item.quantity}
                      </Text>
                      {selectedItem?.store === store &&
                        selectedItem?.index === itemIndex && (
                          <HStack>
                            <Button
                              colorScheme="red"
                              position="absolute"
                              right={0}
                              top={0}
                              borderLeftRadius={0}
                              borderRightRadius={20}
                              h="100%"
                            >
                              <DeleteIcon w={7} h={5} />
                            </Button>
                            <Button
                              colorScheme="green"
                              position="absolute"
                              borderRadius={0}
                              right={50}
                              top={0}
                              h="100%"
                              mr={2}
                            >
                              <EditIcon w={7} h={5} />
                            </Button>
                          </HStack>
                        )}
                    </HStack>
                  </MotionBox>
                ))}
            </Flex>
          )}
        </Flex>
      ))}
    </main>
  );
};

export default ShoppingLayout;
