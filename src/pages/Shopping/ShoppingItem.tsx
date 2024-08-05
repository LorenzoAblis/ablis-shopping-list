import { motion } from "framer-motion";
import { Item } from "../../interfaces";
import { remove, update } from "../../firebase";

import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useMutation, useQueryClient } from "react-query";

const MotionBox = motion(Box);

interface ShoppingItemProps {
  item: Item;
  itemIndex: number;
  store: string;
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  selectedItem: { store: string; index: number } | null;
  setSelectedItem: (item: { store: string; index: number } | null) => void;
  itemToEdit: Item | null;
  setItemToEdit: (item: Item | null) => void;
  setShowEditModal: (show: boolean) => void;
}

const ShoppingItem = ({
  item,
  itemIndex,
  store,
  setItems,
  selectedItem,
  setSelectedItem,
  setItemToEdit,
  setShowEditModal,
}: ShoppingItemProps) => {
  const queryClient = useQueryClient();
  // Formats the selected index to include store e.g: Walmart, 3
  const handleItemClick = (store: string, index: number) => {
    setSelectedItem(
      selectedItem?.store === store && selectedItem?.index === index
        ? null
        : { store, index }
    );
  };

  const handleComplete = async (item: Item) => {
    // Toggle completed
    const updatedItem = { ...item, completed: !item.completed };

    try {
      await update(
        `shopping_items/${item.name}.json`,
        JSON.stringify({ completed: !item.completed })
      );

      // Update local state of items
      setItems((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.name === item.name ? updatedItem : prevItem
        )
      );
    } catch (error) {
      console.error("Error updating item:", error);
      // TODO: handle error
    }
  };

  const mutation = useMutation({
    mutationFn: async (item: Item) => {
      await remove(`shopping_items/${item.name}.json`);
    },
    onSuccess: () => {
      // Invalidate and refetch the query
      queryClient.invalidateQueries(["items"]);
    },
    onError: (err: Error) => {
      console.error(err);
      // TODO: handle error
    },
  });

  return (
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
          selectedItem?.store === store && selectedItem?.index === itemIndex
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
        {selectedItem?.store === store && selectedItem?.index === itemIndex && (
          <HStack>
            <Button
              colorScheme="red"
              position="absolute"
              right={0}
              top={0}
              borderLeftRadius={0}
              borderRightRadius={20}
              h="100%"
              onClick={(e) => {
                e.stopPropagation();
                mutation.mutate(item);
              }}
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
              onClick={(e) => {
                e.stopPropagation();
                setItemToEdit(item);
                setShowEditModal(true);
              }}
            >
              <EditIcon w={7} h={5} />
            </Button>
          </HStack>
        )}
      </HStack>
    </MotionBox>
  );
};

export default ShoppingItem;
