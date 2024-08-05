import { useQuery } from "react-query";
import { useState } from "react";
import { Item } from "../../interfaces";
import {
  Heading,
  Flex,
  Text,
  Button,
  ButtonGroup,
  IconButton,
  HStack,
  Container,
} from "@chakra-ui/react";

import { AddIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { BsCart3 } from "react-icons/bs";

import ShoppingItem from "./ShoppingItem";
import AddItemModal from "./AddItemModal";
import EditItemModal from "./EditItemModal";
import CheckoutModal from "./CheckoutModal";

const ShoppingView = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [stores, setStores] = useState<string[]>([]);
  const [visibleStores, setVisibleStores] = useState<Set<string>>(new Set());

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const [selectedItem, setSelectedItem] = useState<{
    store: string;
    index: number;
  } | null>(null);

  const [itemToEdit, setItemToEdit] = useState<Item | null>(null);

  const fetchItems = async () => {
    const databaseURL = import.meta.env.VITE_FIREBASE_URL;
    const path = "shopping_items.json";

    const res = await fetch(`${databaseURL}/${path}`);
    return res.json();
  };

  // React query fetch items
  useQuery("items", fetchItems, {
    refetchInterval: 60000,
    onSuccess: (data) => {
      const itemsArray: Item[] = Object.values(data);
      setItems(itemsArray);

      // Selects unique stores from the data using Set()
      const storesList = [
        ...new Set(itemsArray.map((item) => item.store)),
      ].reverse();
      setStores(storesList);
      setVisibleStores(new Set(storesList));
    },
  });

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

  return (
    <main>
      <Container p={5} pt={10}>
        <Heading fontSize={35}>Shopping List</Heading>
        <ButtonGroup mt={3}>
          <Button
            leftIcon={<AddIcon />}
            bg="green"
            color="white"
            onClick={() => setShowAddModal(true)}
          >
            Add
          </Button>
          <Button
            leftIcon={<BsCart3 />}
            bg="skyblue"
            color="white"
            onClick={() => setShowCheckoutModal(true)}
          >
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
            {items.filter((item: Item) => item.store === store).length} items (
            {
              items.filter(
                (item) => item.store === store && item.completed === true
              ).length
            }
            /{items.filter((item) => item.store === store).length})
          </Text>
          {visibleStores.has(store) && (
            <Flex flexDirection="column" gap={5} key={storeIndex}>
              {items
                .filter((item) => item.store === store)
                .map((item, itemIndex) => (
                  <ShoppingItem
                    key={itemIndex}
                    item={item}
                    itemIndex={itemIndex}
                    store={store}
                    setItems={setItems}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    itemToEdit={itemToEdit}
                    setItemToEdit={setItemToEdit}
                    setShowEditModal={setShowEditModal}
                  />
                ))}
            </Flex>
          )}
        </Flex>
      ))}

      <AddItemModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
      <EditItemModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        itemToEdit={itemToEdit}
        setItemToEdit={setItemToEdit}
      />
      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        items={items}
      />
    </main>
  );
};

export default ShoppingView;
